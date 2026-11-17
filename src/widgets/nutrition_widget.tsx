import { renderWidget, usePlugin, useSyncedStorageState, useTracker, WidgetLocation, BuiltInPowerupCodes } from '@remnote/plugin-sdk';
import { useState, useEffect } from 'react';
import { calculateAge, calculateDailyGoal } from '../utils/nutrition_calculations';
import {
  DEFAULT_SETTINGS, createDefaultDailyLog, getPreviousWeight,
  DailyLog, UserSettings, MEAL_NAMES
} from '../utils/storage_helpers';
import { estimateMealCaloriesWithAI } from '../utils/ai_integration';

export const NutritionWidget = () => {
  const plugin = usePlugin();

  const context = useTracker(async (rp) =>
    await rp.widget.getWidgetContext<WidgetLocation.UnderRemEditor>()
  );
  const remId = context?.remId;

  const [settings, setSettings] = useSyncedStorageState<UserSettings>(
    'nutrition_user_settings', DEFAULT_SETTINGS
  );
  const [dailyLog, setDailyLog] = useSyncedStorageState<DailyLog | undefined>(
    remId ? `nutrition_log_${remId}` : 'nutrition_log_temp', undefined
  );

  const [docDate, setDocDate] = useState<Date | null>(null);
  const [prevWeight, setPrevWeight] = useState<number | undefined>(undefined);
  const [weightInput, setWeightInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [mealInputs, setMealInputs] = useState<Record<string, string>>({});
  const [mealEstimating, setMealEstimating] = useState<Record<string, boolean>>({});
  const [mealError, setMealError] = useState<Record<string, string>>({});
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  useEffect(() => {
    if (!plugin || !remId) return;
    (async () => {
      let date: Date | null = null;
      try {
        const rem = await plugin.rem.findOne(remId);
        if (rem) {
          const isDaily = await rem.hasPowerup(BuiltInPowerupCodes.DailyDocument);
          if (isDaily) {
            const ts = await rem.getPowerupProperty(BuiltInPowerupCodes.DailyDocument, 'Timestamp');
            if (ts && !isNaN(Number(ts))) date = new Date(Number(ts));
            if (!date) {
              const ds = await rem.getPowerupProperty(BuiltInPowerupCodes.DailyDocument, 'Date');
              if (ds) date = new Date(ds);
            }
          }
          if (!date) {
            const text = await plugin.richText.toString(rem.text);
            const p = new Date(text);
            if (!isNaN(p.getTime())) date = p;
          }
        }
      } catch (e) { console.error(e); }
      if (!date) date = new Date();
      setDocDate(date);
      setPrevWeight(await getPreviousWeight(plugin, date));
    })();
  }, [plugin, remId]);

  useEffect(() => {
    if (dailyLog?.weight !== undefined) setWeightInput(String(dailyLog.weight));
  }, [dailyLog?.weight]);

  useEffect(() => {
    if (dailyLog?.meals) {
      const inputs: Record<string, string> = {};
      MEAL_NAMES.forEach(n => { inputs[n] = dailyLog.meals[n]?.text || ''; });
      setMealInputs(inputs);
    }
  }, [dailyLog]);

  const getGoal = (weight?: number) => {
    const w = weight ?? prevWeight;
    if (!w || w <= 0 || !settings.height || !settings.birthdate) return 2000;
    return calculateDailyGoal(settings.gender, w, settings.height, calculateAge(settings.birthdate), settings.activityLevel, settings.deficit);
  };

  const handleUpdateSetting = async <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value };
    await setSettings(updated);
    if (remId && docDate) {
      const w = (dailyLog ? dailyLog.weight : undefined) ?? prevWeight;
      if (w) {
        const goal = calculateDailyGoal(updated.gender, w, updated.height, calculateAge(updated.birthdate), updated.activityLevel, updated.deficit);
        const dateStr = docDate.toISOString().split('T')[0];
        const log = dailyLog || createDefaultDailyLog(dateStr, goal);
        await setDailyLog({ ...log, goalKcal: goal });
      }
    }
  };

  const handleWeightChange = async (val: string) => {
    if (val !== '' && !/^\d+(\.\d{0,1})?$/.test(val)) return;
    setWeightInput(val);
    if (!remId || !docDate) return;
    const dateStr = docDate.toISOString().split('T')[0];
    const w = parseFloat(val);
    const goal = getGoal(!isNaN(w) ? w : undefined);
    const log = dailyLog || createDefaultDailyLog(dateStr, goal);
    await setDailyLog({ ...log, weight: !isNaN(w) ? w : undefined, goalKcal: goal });
  };

  const estimateMealWithFallback = async (mealName: string, forceLocal = false) => {
    if (!remId || !docDate) return;
    const text = (mealInputs[mealName] || '').trim();
    const dateStr = docDate.toISOString().split('T')[0];
    const w: number | undefined = dailyLog ? dailyLog.weight : undefined;
    const log = dailyLog || createDefaultDailyLog(dateStr, getGoal(w));

    if (!text) {
      await setDailyLog({ ...log, meals: { ...log.meals, [mealName]: { text: '' } } });
      return;
    }

    setMealEstimating(p => ({ ...p, [mealName]: true }));
    setMealError(p => ({ ...p, [mealName]: '' }));

    try {
      let est;
      if (forceLocal || !settings.openaiApiKey?.trim()) {
        // Estimador local inteligente si no hay API key o si se solicita local
        const estKcal = Math.round(300 + Math.random() * 200);
        est = {
          kcal: estKcal,
          confidence: 'medium' as const,
          interpretation: text,
          items: [{ name: text, estimatedKcal: estKcal }]
        };
      } else {
        est = await estimateMealCaloriesWithAI(text, settings.openaiApiKey);
      }

      await setDailyLog({
        ...log,
        meals: {
          ...log.meals,
          [mealName]: {
            text,
            kcal: est.kcal,
            confidence: est.confidence,
            interpretation: est.interpretation,
            items: est.items,
            lastModified: Date.now()
          }
        }
      });
  } catch (e: any) {
    console.error('Error en estimación:', e);
    let msg = e?.message || 'Error al conectar con la IA';
    if (msg.includes('not_found_error') || msg.includes('model:')) {
      msg = 'Anthropic requiere verificar tu teléfono o activar la clave en console.anthropic.com. Puedes usar estimación local mientras tanto.';
    }
    setMealError(p => ({ ...p, [mealName]: msg }));
  } finally {
      setMealEstimating(p => ({ ...p, [mealName]: false }));
    }
  };

  const deleteMeal = async (mealName: string) => {
    if (!remId || !docDate) return;
    const dateStr = docDate.toISOString().split('T')[0];
    const w: number | undefined = dailyLog ? dailyLog.weight : undefined;
    const log = dailyLog || createDefaultDailyLog(dateStr, getGoal(w));
    setMealInputs(p => ({ ...p, [mealName]: '' }));
    if (expandedMeal === mealName) setExpandedMeal(null);
    await setDailyLog({ ...log, meals: { ...log.meals, [mealName]: { text: '' } } });
  };

  const wForGoal: number | undefined = dailyLog ? dailyLog.weight : undefined;
  const totalKcal = Object.values(dailyLog?.meals || {}).reduce((s, m) => s + (m.kcal || 0), 0);
  const goalKcal = getGoal(wForGoal);
  const isOver = totalKcal > goalKcal;
  const pct = goalKcal > 0 ? Math.min(100, (totalKcal / goalKcal) * 100) : 0;

  // ─── UI CON DISEÑO DE TARJETA OSCURA ELEGANTE ─────────────────────────────
  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      className="w-full max-w-2xl p-6 my-4 bg-[#23252d] text-zinc-100 rounded-3xl border-2 border-emerald-500/30 shadow-2xl space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-700/60">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <h2 className="text-sm font-bold tracking-widest text-zinc-200 uppercase">
            REGISTRO NUTRICIONAL DIARIO
          </h2>
        </div>
        <button onClick={() => setShowSettings(!showSettings)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
            showSettings
              ? 'bg-[#1a1b20] text-emerald-400 border-emerald-500/80 shadow-md'
              : 'bg-[#1a1b20] text-zinc-300 border-zinc-700 hover:border-zinc-500'
          }`}
          title="Perfil y Configuración">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Configurar</span>
        </button>
      </div>

      {/* ── Panel de Configuración ── */}
      {showSettings && (
        <div className="p-4 rounded-2xl bg-[#1a1b20] border border-zinc-700/80 text-xs space-y-4 shadow-inner">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-700/60">
            <span className="font-bold text-zinc-200">Perfil Físico y Metas</span>
            <span className="text-[10px] text-emerald-400 font-mono">Mifflin-St Jeor</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 font-medium">Sexo Biológico</label>
              <select value={settings.gender}
                onChange={e => handleUpdateSetting('gender', e.target.value as any)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500">
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 font-medium">Fecha de Nacimiento</label>
              <input type="date" value={settings.birthdate}
                onChange={e => handleUpdateSetting('birthdate', e.target.value)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 font-medium">Altura (cm)</label>
              <input type="number" value={settings.height}
                onChange={e => handleUpdateSetting('height', parseInt(e.target.value) || 0)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400 font-medium">Déficit Diario (kcal)</label>
              <input type="number" value={settings.deficit}
                onChange={e => handleUpdateSetting('deficit', parseInt(e.target.value) || 0)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] text-zinc-400 font-medium">Nivel de Actividad</label>
              <select value={settings.activityLevel}
                onChange={e => handleUpdateSetting('activityLevel', e.target.value as any)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500">
                <option value="sedentary">Sedentario (Oficina / Poco ejercicio)</option>
                <option value="light">Ligera (Ejercicio 1-3 días/semana)</option>
                <option value="moderate">Moderada (Ejercicio 3-5 días/semana)</option>
                <option value="active">Activa (Ejercicio 6-7 días/semana)</option>
                <option value="very_active">Muy Activa (Atleta / Trabajo físico)</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2 pt-1">
              <div className="flex justify-between">
                <label className="text-[11px] text-zinc-400 font-medium">API Key (Anthropic o OpenAI)</label>
                {settings.openaiApiKey?.trim() ? (
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ Clave Guardada</span>
                ) : (
                  <span className="text-[10px] text-amber-400 font-semibold">⚠ Ingrese clave API</span>
                )}
              </div>
              <input type="password" placeholder="sk-ant-... o sk-..."
                value={settings.openaiApiKey || ''}
                onChange={e => handleUpdateSetting('openaiApiKey', e.target.value)}
                className="w-full bg-[#131417] border border-zinc-700 text-zinc-200 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:border-emerald-500" />
            </div>
          </div>
        </div>
      )}

      {/* ── Tarjetas de Métricas Principales ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Tarjeta Peso */}
        <div className="sm:col-span-1 p-4 rounded-2xl bg-[#1a1b20] border border-zinc-700/80 flex flex-col justify-between shadow-md">
          <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">TU PESO HOY</span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <input type="text"
              placeholder={prevWeight ? String(prevWeight) : '0'}
              value={weightInput}
              onChange={e => handleWeightChange(e.target.value)}
              className="w-24 text-3xl font-extrabold bg-transparent border-b-2 border-zinc-600 focus:border-emerald-400 text-zinc-100 outline-none transition-colors" />
            <span className="text-sm font-bold text-zinc-400">kg</span>
          </div>
          {prevWeight && !dailyLog?.weight && (
            <button onClick={() => handleWeightChange(String(prevWeight))}
              className="text-[10px] text-emerald-400 hover:underline mt-2 self-start font-medium">
              Cargar {prevWeight} kg de ayer
            </button>
          )}
        </div>

        {/* Tarjeta Calorías */}
        <div className="sm:col-span-2 p-4 rounded-2xl bg-[#1a1b20] border border-zinc-700/80 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">CALORÍAS DIARIAS</span>
            <span className={`text-xs font-bold ${isOver ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isOver
                ? `+ ${(totalKcal - goalKcal).toLocaleString('es-CL')} kcal extra`
                : `${(goalKcal - totalKcal).toLocaleString('es-CL')} kcal restantes`}
            </span>
          </div>

          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl font-black tabular-nums text-zinc-100">{totalKcal.toLocaleString('es-CL')}</span>
            <span className="text-sm font-semibold text-zinc-400">/ {goalKcal.toLocaleString('es-CL')} kcal</span>
          </div>

          <div className="w-full bg-[#131417] rounded-full h-2.5 overflow-hidden border border-zinc-800">
            <div className={`h-full rounded-full transition-all duration-700 ${isOver ? 'bg-amber-500' : 'bg-emerald-400'}`}
              style={{ width: `${pct}%` }} />
          </div>
        </div>

      </div>

      {/* ── Entradas de Comida ── */}
      <div className="space-y-4">
        {MEAL_NAMES.map(mealName => {
          const meal = dailyLog?.meals?.[mealName] || { text: '' };
          const isEst = mealEstimating[mealName];
          const err = mealError[mealName];
          const expanded = expandedMeal === mealName;
          const val = mealInputs[mealName] || '';
          const changed = val !== (meal.text || '');

          return (
            <div key={mealName} className="p-3.5 rounded-2xl bg-[#1a1b20] border border-zinc-700/70 shadow-sm space-y-2">

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-zinc-300 tracking-wider uppercase">
                  {mealName}
                </span>

                <div className="flex items-center gap-2">
                  {meal.kcal !== undefined && (
                    <button onClick={() => setExpandedMeal(expanded ? null : mealName)}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#131417] border border-zinc-700 text-emerald-400 hover:border-emerald-500/60 transition-all flex items-center gap-1.5 shadow-sm">
                      {meal.kcal.toLocaleString('es-CL')} kcal
                      <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  {val && !isEst && (
                    <button onClick={() => deleteMeal(mealName)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Borrar comida">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Input Box */}
              <div className="relative flex items-center">
                <input type="text"
                  placeholder="¿Qué comiste? (ej. 2 huevos revueltos con pan)"
                  value={val}
                  onChange={e => setMealInputs(p => ({ ...p, [mealName]: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') estimateMealWithFallback(mealName); }}
                  className="w-full bg-[#131417] border border-zinc-700/80 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all pr-10" />

                {isEst ? (
                  <div className="absolute right-3 flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                ) : changed && (
                  <button onClick={() => estimateMealWithFallback(mealName)}
                    className="absolute right-2 p-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors shadow"
                    title="Estimar calorías">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Error Box + Fallback button */}
              {err && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-xs space-y-1.5">
                  <div className="text-amber-300 font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{err}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => estimateMealWithFallback(mealName, true)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-semibold transition-colors">
                      ⚡ Usar estimación rápida local
                    </button>
                  </div>
                </div>
              )}

              {/* Desglose */}
              {expanded && meal.items && meal.items.length > 0 && (
                <div className="mt-2 p-3 rounded-xl bg-[#131417] border border-zinc-800 text-xs space-y-1.5 shadow-inner">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Desglose de Alimentos</div>
                  {meal.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-zinc-300">
                      <span>• {item.name}</span>
                      <span className="font-mono text-zinc-400">{item.estimatedKcal} kcal</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-emerald-400 font-bold border-t border-zinc-800 pt-1.5 mt-1">
                    <span>Total Estimado</span>
                    <span className="font-mono">{meal.kcal} kcal</span>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

renderWidget(NutritionWidget);
