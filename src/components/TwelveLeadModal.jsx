import React, { useRef, useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Activity, Heart, ShieldAlert, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

// Helper to accurately classify STEMI territory from case data and rhythm
export function detectStemiType(currentCase, rhythm, phase) {
  const activeRhythm = phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythm || '')
    : (rhythm || currentCase?.initialVitals?.rhythm || '');

  const activeRhythmName = phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythmName || '')
    : (currentCase?.initialVitals?.rhythmName || '');

  // Verify if this case actually has a STEMI / Supradesnivel ST
  const isStemiCase = activeRhythm === 'SINUSAL_ST_ELEVATION' ||
                      activeRhythm.includes('STEMI') ||
                      activeRhythmName.toLowerCase().includes('stemi') ||
                      activeRhythmName.toLowerCase().includes('supradesnivel');

  if (!isStemiCase) {
    return 'NONE';
  }

  const text = [
    activeRhythmName,
    activeRhythm,
    currentCase?.title || '',
    currentCase?.reversibleCause || '',
    currentCase?.hytCategory || ''
  ].join(' ').toLowerCase();

  // Anterolateral / Anterior / V1-V6 / Tronco
  if (text.includes('anterolateral') || text.includes('anterior') || text.includes('v1-v6') || text.includes('v1 a v6') || text.includes('v2-v4') || text.includes('tronco')) {
    return 'ANTEROLATERAL';
  }
  // Inferior / DII, DIII, aVF
  if (text.includes('inferior') || text.includes('dii') || text.includes('diii') || text.includes('avf')) {
    return 'INFERIOR';
  }

  return 'INFERIOR';
}

export default function TwelveLeadModal({ isOpen, onClose, currentCase, phase, rhythm }) {
  const canvasRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCaliperActive, setIsCaliperActive] = useState(false);

  // Active rhythm identifier
  const getActiveRhythmKey = () => {
    if (phase === 'arrest') {
      return currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP');
    }
    if (phase === 'post_rce') {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      if (stemiType === 'INFERIOR') return 'STEMI_INFERIOR';
      if (stemiType === 'ANTEROLATERAL') return 'STEMI_ANTEROLATERAL';
      return currentCase?.rceVitals?.rhythm || 'RITMO_SINUSAL';
    }
    const baseRhythm = rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA';
    if (baseRhythm === 'SINUSAL_ST_ELEVATION' || baseRhythm.includes('STEMI')) {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      return stemiType === 'ANTEROLATERAL' ? 'STEMI_ANTEROLATERAL' : 'STEMI_INFERIOR';
    }
    return baseRhythm;
  };

  const activeRhythmKey = getActiveRhythmKey();

  // Full Clinical Diagnosis
  const getActiveDiagnosis = () => {
    if (phase === 'arrest') {
      return currentCase?.arrestVitals?.rhythmName || 'Paro Cardiorrespiratorio en Curso (PCR)';
    }
    if (phase === 'post_rce') {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      if (stemiType === 'INFERIOR') {
        return 'RCE Posparo: STEMI Inferior (Supradesnivel DII, DIII, aVF) ➔ Hemodinamia Inmediata';
      }
      if (stemiType === 'ANTEROLATERAL') {
        return 'RCE Posparo: STEMI Anterolateral Extenso (Supradesnivel V1-V6, DI, aVL) ➔ Hemodinamia Inmediata';
      }
      return `RCE Posparo: ${currentCase?.rceVitals?.rhythmName || 'Ritmo Sinusal (Sin elevación del ST)'} ➔ Traslado a UCI`;
    }
    return currentCase?.initialVitals?.rhythmName || rhythm || 'Arritmia Inicial';
  };

  // Electrocardiographic measurements (HR, PR, QRS, QT/QTc, Axis)
  const getMeasurements = () => {
    const key = activeRhythmKey.toUpperCase();
    if (key.includes('ASISTOLIA')) {
      return { hr: '0 lpm', pr: '—', qrs: '—', qtc: '—', axis: 'Indeterminado', interp: 'ASISTOLIA / LÍNEA PLANA EN TODAS LAS DERIVACIONES' };
    }
    if (key.includes('FV_FINA')) {
      return { hr: 'Caótico (>350)', pr: '—', qrs: '—', qtc: '—', axis: 'Caótico', interp: 'FIBRILACIÓN VENTRICULAR FINA (<2 mm)' };
    }
    if (key.includes('FV')) {
      return { hr: 'Caótico (>300)', pr: '—', qrs: '—', qtc: '—', axis: 'Caótico', interp: 'FIBRILACIÓN VENTRICULAR GRUESA' };
    }
    if (key.includes('TORSADES') || key.includes('TVSP')) {
      return { hr: '220 lpm', pr: '—', qrs: '180 ms', qtc: '>560 ms', axis: 'Torsión periódica', interp: 'TAQUICARDIA VENTRICULAR POLIMORFA / TORSADES DE POINTES' };
    }
    if (key.includes('TV_MONOMORFA') || key === 'TV') {
      return { hr: '185 lpm', pr: '—', qrs: '160 ms', qtc: 'Prolongado', axis: '-90° (Eje extremo)', interp: 'TAQUICARDIA VENTRICULAR MONOMORFA (QRS Ancho regular)' };
    }
    if (key.includes('TSVP') || key.includes('TAQUICARDIA_SUPRAVENTRICULAR')) {
      return { hr: '200 lpm', pr: '— (P oculta)', qrs: '78 ms', qtc: '410 ms', axis: '+60° Normal', interp: 'TAQUICARDIA SUPRAVENTRICULAR PAROXÍSTICA (QRS Angosto regular)' };
    }
    if (key.includes('FLUTTER')) {
      return { hr: '150 lpm (Conducción 2:1)', pr: 'Ondas F 300/min', qrs: '84 ms', qtc: '390 ms', axis: '+75°', interp: 'FLUTTER AURICULAR TÍPICO CON RESPUESTA VENTRICULAR 2:1' };
    }
    if (key.includes('FA_RVR') || key.includes('FA_RAPIDA') || key.includes('FIBRILACION_AURICULAR')) {
      return { hr: '148 lpm (Variable)', pr: 'Ausente (Ondas f)', qrs: '86 ms', qtc: '425 ms', axis: '+45°', interp: 'FIBRILACIÓN AURICULAR CON RESPUESTA VENTRICULAR RÁPIDA (RVR)' };
    }
    if (key.includes('FA_PREEXCITADA')) {
      return { hr: '190 lpm (Caótico)', pr: '<100 ms (Onda Delta)', qrs: '145 ms', qtc: 'Variable', axis: '+15°', interp: 'FA PREEXCITADA (SÍNDROME DE WOLFF-PARKINSON-WHITE CON CONDUCCIÓN ANTERÓGRADA)' };
    }
    if (key.includes('BLOQUEO_AV_3') || key.includes('BAV_3')) {
      return { hr: '34 lpm (Ventricular) / 75 lpm (Auricular)', pr: 'Disociado', qrs: '150 ms', qtc: '480 ms', axis: '-30°', interp: 'BLOQUEO AURICULOVENTRICULAR COMPLETO (3° GRADO) - ESCAPE VENTRICULAR' };
    }
    if (key.includes('BAV_2_MOBITZ_2') || key.includes('BAV2_MOBITZ_2')) {
      return { hr: '42 lpm', pr: '190 ms (Fijo)', qrs: '120 ms', qtc: '430 ms', axis: '0°', interp: 'BLOQUEO AV 2° GRADO MOBITZ II (CONDUCCIÓN 2:1 CON RIESGO DE ASISTOLIA)' };
    }
    if (key.includes('BAV_2') || key.includes('WENCKEBACH')) {
      return { hr: '54 lpm', pr: 'Progresivo (180➔320ms)', qrs: '88 ms', qtc: '410 ms', axis: '+50°', interp: 'BLOQUEO AV 2° GRADO MOBITZ I (FENÓMENO DE WENCKEBACH)' };
    }
    if (key.includes('BAV_1')) {
      return { hr: '62 lpm', pr: '280 ms (Prolongado)', qrs: '84 ms', qtc: '400 ms', axis: '+55°', interp: 'BLOQUEO AV 1° GRADO (CONDUCCIÓN AV 1:1 CON PR PROLONGADO >0.20s)' };
    }
    if (key.includes('BRADICARDIA')) {
      return { hr: '38 lpm', pr: '170 ms', qrs: '82 ms', qtc: '440 ms', axis: '+60° Normal', interp: 'BRADICARDIA SINUSAL SEVERA' };
    }
    if (key.includes('TAQUICARDIA_SINUSAL')) {
      return { hr: '135 lpm', pr: '140 ms', qrs: '80 ms', qtc: '380 ms', axis: '+65° Normal', interp: 'TAQUICARDIA SINUSAL REGULAR' };
    }
    if (key.includes('RITMO_MARCAPASOS') || key.includes('PACED')) {
      return { hr: '70 lpm', pr: '—', qrs: '160 ms (LBBB)', qtc: '460 ms', axis: '-60°', interp: 'RITMO ESTIMULADO POR MARCAPASOS VENTRICULAR CON CAPTURA 100%' };
    }
    if (key.includes('STEMI_INFERIOR')) {
      return { hr: '82 lpm', pr: '165 ms', qrs: '90 ms', qtc: '445 ms', axis: '+105°', interp: '🚨 SUPRADESNIVEL ST AGUDO EN CARA INFERIOR (DII, DIII, aVF) CON ESPEJO RECÍPROCO (DI, aVL) ➔ REPERFUSIÓN INMEDIATA' };
    }
    if (key.includes('STEMI_ANTEROLATERAL')) {
      return { hr: '94 lpm', pr: '160 ms', qrs: '98 ms', qtc: '470 ms', axis: '+30°', interp: '🚨 SUPRADESNIVEL ST AGUDO EXTENSO EN CARA ANTEROLATERAL (V1-V6, DI, aVL) ➔ INFARTO CON ELEVACIÓN DEL ST (OCLUSIÓN DA)' };
    }
    if (key.includes('NSTEMI')) {
      return { hr: '88 lpm', pr: '155 ms', qrs: '86 ms', qtc: '430 ms', axis: '+45°', interp: 'SÍNDROME CORONARIO AGUDO SIN ELEVACIÓN DEL ST (INFRADESNIVEL ST Y T INVERTIDA V4-V6)' };
    }
    if (key.includes('AESP')) {
      return { hr: '40 lpm (Eléctrico)', pr: 'Variable', qrs: '150 ms', qtc: 'Prolongado', axis: 'Indeterminado', interp: 'ACTIVIDAD ELÉCTRICA SIN PULSO (AESP) - DISOCIACIÓN ELECTROMECÁNICA' };
    }

    return { hr: '75 lpm', pr: '160 ms', qrs: '84 ms', qtc: '415 ms', axis: '+60° Normal', interp: 'RITMO SINUSAL NORMAL. SIN HALLAZGOS AGUDOS DE ISQUEMIA NI ARRITMIAS' };
  };

  const measurements = getMeasurements();

  // Draw full 12-lead Canvas
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const width = 940;
    const height = 540;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // 1. Classical pink ECG paper
    ctx.fillStyle = '#FFF5F5';
    ctx.fillRect(0, 0, width, height);

    // 2. High-precision millimeter grid (1mm minor and 5mm major boxes)
    drawEcgPaperGrid(ctx, width, height);

    // 3. Clinical Waveforms for 12 leads + Lead II rhythm strip
    drawTwelveLeads(ctx, width, height, currentCase, rhythm, phase);

  }, [isOpen, currentCase, rhythm, phase]);

  // Export / Download ECG canvas to PNG
  const handleDownloadEcg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ECG_12_Derivaciones_${currentCase?.patient?.name?.replace(/\s+/g, '_') || 'Paciente'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header Superior: Información Clínica y de Calibración */}
        <div className="p-3 sm:px-4 sm:py-3 border-b border-slate-800 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-2.5 py-1 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-900/40">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>ELECTROCARDIOGRAMA DE 12 DERIVACIONES</span>
            </div>
            <div className="text-slate-300 text-xs sm:text-sm font-semibold truncate hidden sm:inline">
              {currentCase?.patient?.name} ({currentCase?.patient?.age} años, {currentCase?.patient?.gender === 'M' ? 'Hombre' : 'Mujer'})
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.15))}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
                title="Alejar (Zoom Out)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-bold text-cyan-300 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(1.8, prev + 0.15))}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition"
                title="Acercar (Zoom In)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 text-amber-400 hover:text-amber-300 rounded hover:bg-slate-800 transition border-l border-slate-800"
                  title="Restablecer escala al 100%"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Descargar trazado PNG */}
            <button
              onClick={handleDownloadEcg}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition"
              title="Descargar imagen PNG del electrocardiograma completo"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar PNG</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ficha Diagnóstica y Mediciones Electrocardiográficas */}
        <div className="bg-[#141E33] px-3 sm:px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-amber-400 font-bold">Diagnóstico:</span>
            <span className="text-white font-semibold bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-700/80">
              {getActiveDiagnosis()}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              phase === 'arrest'
                ? 'bg-rose-950/90 border-rose-600 text-rose-300 animate-pulse'
                : phase === 'post_rce'
                ? 'bg-emerald-950/90 border-emerald-600 text-emerald-300'
                : 'bg-amber-950/90 border-amber-600 text-amber-300'
            }`}>
              {phase === 'arrest' ? 'EN PARO (PCR)' : phase === 'post_rce' ? 'POSPARO (RCE)' : 'FASE INICIAL'}
            </span>
          </div>

          {/* Parámetros Automáticos del Electrocardiógrafo */}
          <div className="flex items-center gap-3 text-[11px] text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800 overflow-x-auto">
            <span><strong className="text-cyan-400">FC:</strong> {measurements.hr}</span>
            <span><strong className="text-cyan-400">PR:</strong> {measurements.pr}</span>
            <span><strong className="text-cyan-400">QRS:</strong> {measurements.qrs}</span>
            <span><strong className="text-cyan-400">QTc:</strong> {measurements.qtc}</span>
            <span><strong className="text-cyan-400">Eje:</strong> {measurements.axis}</span>
          </div>
        </div>

        {/* Diagnostic Interpretation Banner */}
        <div className="bg-[#0B101D] px-4 py-1.5 border-b border-slate-800 text-[11px] font-mono flex items-center justify-between">
          <div className="text-slate-300 flex items-center gap-2">
            <span className="text-rose-400 font-bold">INFORME AUTOMÁTICO:</span>
            <span className="font-semibold text-slate-100">{measurements.interp}</span>
          </div>
          <div className="text-[10px] text-slate-400 hidden md:inline">
            Filtros: 0.05-150 Hz | Velocidad: 25 mm/s | Voltaje: 10 mm/mV | Impreso según estándar AHA/ILCOR
          </div>
        </div>

        {/* ECG Viewer Area (Vector Canvas con papel milimetrado) */}
        <div className="p-3 sm:p-5 overflow-auto flex-1 flex justify-center items-center bg-[#070B14] min-h-[440px]">
          <div 
            className="transition-transform duration-150 border-2 border-rose-950 rounded-xl shadow-2xl bg-white overflow-hidden"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          >
            <canvas ref={canvasRef} className="block select-none cursor-crosshair" />
          </div>
        </div>

        {/* Footer con Guía de Interpretación ACLS */}
        <div className="p-3 border-t border-slate-800 bg-[#0B1120] flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>
              <strong>Pauta ACLS:</strong> Evaluar si el ritmo es taquicardia o bradicardia, regular o irregular, complejo angosto (&lt;0.12s) o ancho (&gt;0.12s), y buscar signos de isquemia/elevación del ST para activación inmediata del laboratorio de hemodinamia.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-xs transition"
          >
            Cerrar Visor
          </button>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// DIBUJO DE CUADRÍCULA MILIMETRADA DE PAPEL ECG CLÁSICO
// -------------------------------------------------------------
function drawEcgPaperGrid(ctx, width, height) {
  // Cuadrícula Menor (1 mm = 4 píxeles a escala estándar de 25 mm/s, 10 mm/mV)
  ctx.strokeStyle = '#FCA5A5';
  ctx.lineWidth = 0.45;
  const small = 4;
  ctx.beginPath();
  for (let x = 0; x < width; x += small) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += small) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Cuadrícula Mayor (5 mm = 20 píxeles = 0.20 seg en tiempo, 0.5 mV en voltaje)
  ctx.strokeStyle = '#F87171';
  ctx.lineWidth = 1.0;
  const major = 20;
  ctx.beginPath();
  for (let x = 0; x < width; x += major) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += major) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

// Secuencia irregular de intervalos R-R para Fibrilación Auricular (píxeles por latido)
const AFIB_RR_PATTERN = [36, 56, 28, 64, 42, 34, 58, 46, 30, 70, 38, 52, 32, 60, 44, 34, 62];

function getSampleProgress(distX, isAfib, defaultCycle = 55) {
  if (!isAfib) {
    return (distX % defaultCycle) / defaultCycle;
  }
  let accumulated = 0;
  for (let i = 0; i < 200; i++) {
    const cycleLen = AFIB_RR_PATTERN[i % AFIB_RR_PATTERN.length];
    if (distX < accumulated + cycleLen) {
      return (distX - accumulated) / cycleLen;
    }
    accumulated += cycleLen;
  }
  return (distX % defaultCycle) / defaultCycle;
}

// -------------------------------------------------------------
// DIBUJO DE LA MATRIZ DE 12 DERIVACIONES + TIRA LARGA DE RITMO DII
// -------------------------------------------------------------
function drawTwelveLeads(ctx, width, height, currentCase, rhythm, phase) {
  const activeRhythm = phase === 'arrest'
    ? (currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP'))
    : phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythm || 'SINUSAL_ST_ELEVATION')
    : (rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA');

  const isAfib = typeof activeRhythm === 'string' && (activeRhythm.includes('FA') || activeRhythm.includes('FIBRILACION'));

  // Disposición estándar de 4 columnas × 3 filas:
  // Col 1: Derivaciones bipolares de extremidades (I, II, III)
  // Col 2: Derivaciones monopolares aumentadas (aVR, aVL, aVF)
  // Col 3: Precordiales septales y anteriores (V1, V2, V3)
  // Col 4: Precordiales anterolaterales (V4, V5, V6)
  const leads = [
    { name: 'I', col: 0, row: 0 },
    { name: 'II', col: 0, row: 1 },
    { name: 'III', col: 0, row: 2 },
    { name: 'aVR', col: 1, row: 0 },
    { name: 'aVL', col: 1, row: 1 },
    { name: 'aVF', col: 1, row: 2 },
    { name: 'V1', col: 2, row: 0 },
    { name: 'V2', col: 2, row: 1 },
    { name: 'V3', col: 2, row: 2 },
    { name: 'V4', col: 3, row: 0 },
    { name: 'V5', col: 3, row: 1 },
    { name: 'V6', col: 3, row: 2 },
  ];

  const colWidth = width / 4;
  const rowHeight = (height - 95) / 3;

  // Estilo de trazo médico (estilete negro clásico)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 1.35;
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 11px Fira Code, monospace';

  // Ciclo base en píxeles según ritmo (frecuencia cardíaca)
  let defaultCycle = 55;
  const rKey = String(activeRhythm).toUpperCase();
  if (rKey.includes('BRADICARDIA') || rKey.includes('BLOQUEO_AV_3')) defaultCycle = 95;
  else if (rKey.includes('TSVP') || rKey.includes('TV')) defaultCycle = 34;
  else if (rKey.includes('TAQUICARDIA')) defaultCycle = 42;

  leads.forEach((lead) => {
    const x0 = lead.col * colWidth;
    const y0 = lead.row * rowHeight;
    const baselineY = y0 + rowHeight * 0.55;

    // Nombre de la derivación
    ctx.fillText(lead.name, x0 + 10, y0 + 17);

    // Pulso rectangular de calibración estándar (1 mV = 10 mm = 40 px)
    ctx.beginPath();
    ctx.moveTo(x0 + 8, baselineY);
    ctx.lineTo(x0 + 12, baselineY);
    ctx.lineTo(x0 + 12, baselineY - 24);
    ctx.lineTo(x0 + 18, baselineY - 24);
    ctx.lineTo(x0 + 18, baselineY);
    ctx.lineTo(x0 + 24, baselineY);
    ctx.stroke();

    // Dibujo del trazado continuo de la derivación
    ctx.beginPath();
    const waveStart = x0 + 24;
    const waveEnd = x0 + colWidth - 4;
    for (let x = waveStart; x < waveEnd; x++) {
      const p = getSampleProgress(x - waveStart, isAfib, defaultCycle);
      const val = calculateLeadSample(lead.name, p, rhythm, phase, currentCase, x - waveStart);
      const y = baselineY - val * 19;
      if (x === waveStart) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  });

  // Tira de Ritmo Continua en la parte inferior (Lead II Largo)
  const stripY = height - 50;
  ctx.fillText('II (Tira de Ritmo Continua - Evaluación de Arritmias y Conducción)', 10, stripY - 26);
  ctx.beginPath();
  for (let x = 10; x < width - 10; x++) {
    const p = getSampleProgress(x - 10, isAfib, defaultCycle);
    const val = calculateLeadSample('II', p, rhythm, phase, currentCase, x - 10);
    const y = stripY - val * 19;
    if (x === 10) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// -------------------------------------------------------------
// SÍNTESIS VECTORIAL DE ONDAS ELECTROCARDIOGRÁFICAS POR DERIVACIÓN
// -------------------------------------------------------------
function calculateLeadSample(leadName, p, rhythm, phase, currentCase, globalX = 0) {
  const rawRhythm = phase === 'arrest'
    ? (currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP'))
    : phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythm || 'SINUSAL_ST_ELEVATION')
    : (rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA');

  const activeRhythm = String(rawRhythm).toUpperCase();

  // 1. ASISTOLIA: Línea isoeléctrica plana verificada en 12 derivaciones
  if (activeRhythm === 'ASISTOLIA' || activeRhythm.includes('ASISTOLIA')) {
    return (Math.random() - 0.5) * 0.02;
  }

  // 2. FIBRILACIÓN VENTRICULAR
  if (activeRhythm === 'FV' || activeRhythm === 'FV_GRUESA') {
    return (Math.sin(p * 26) + Math.cos(p * 39)) * 0.8 + (Math.random() - 0.5) * 0.08;
  }
  if (activeRhythm === 'FV_FINA') {
    return (Math.sin(p * 36) + Math.cos(p * 55)) * 0.12 + (Math.random() - 0.5) * 0.03;
  }

  // 3. TORSADES DE POINTES / TV POLIMORFA
  if (activeRhythm === 'TORSADES' || activeRhythm.includes('TORSADE') || activeRhythm === 'TVSP') {
    const spindle = Math.sin(p * Math.PI * 4) * Math.sin(p * Math.PI);
    return spindle * 1.25;
  }

  // 4. TAQUICARDIA VENTRICULAR MONOMORFA
  if (activeRhythm === 'TV_MONOMORFA' || activeRhythm === 'TV') {
    const isNegativeLead = ['aVR', 'V1'].includes(leadName);
    const wave = Math.sin(p * Math.PI * 2);
    const shape = wave > 0 ? Math.pow(wave, 0.8) * 1.35 : -Math.pow(Math.abs(wave), 1.2) * 1.15;
    return (isNegativeLead ? -shape : shape) + (Math.random() - 0.5) * 0.03;
  }

  // 5. FLUTTER AURICULAR (Ondas F en dientes de sierra a 300 lpm en DII, DIII, aVF)
  if (activeRhythm === 'FLUTTER' || activeRhythm.includes('FLUTTER')) {
    const isInferior = ['II', 'III', 'aVF'].includes(leadName);
    const sawTooth = ((p * 4) % 1) - 0.5;
    let y = isInferior ? -sawTooth * 0.45 : sawTooth * 0.22;
    if (p >= 0.22 && p < 0.28) {
      y += 1.25;
    }
    return y;
  }

  // 6. FIBRILACIÓN AURICULAR CON RVR
  if (activeRhythm.includes('FA_RVR') || activeRhythm.includes('FA_RAPIDA') || activeRhythm === 'FA' || activeRhythm.includes('FIBRILACION_AURICULAR')) {
    let y = 0;
    // Ondas f fibrilatorias caóticas
    const fWave = Math.sin(p * 48) * 0.05 + Math.cos(p * 76) * 0.038 + (Math.random() - 0.5) * 0.025;
    y += fWave;

    const isNegative = leadName === 'aVR';
    if (p >= 0.18 && p < 0.20) {
      y -= 0.12;
    } else if (p >= 0.20 && p < 0.24) {
      y += isNegative ? -1.0 : (leadName.startsWith('V') ? 1.45 : 1.15);
    } else if (p >= 0.24 && p < 0.27) {
      y -= isNegative ? -0.2 : 0.35;
    } else if (p >= 0.36 && p <= 0.52) {
      y += Math.sin(((p - 0.36) / 0.16) * Math.PI) * (isNegative ? -0.18 : 0.26);
    }
    return y;
  }

  // 7. TAQUICARDIA SUPRAVENTRICULAR (TSVP)
  if (activeRhythm.includes('TSVP') || activeRhythm.includes('SUPRAVENTRICULAR')) {
    let y = 0;
    if (p >= 0.16 && p < 0.22) {
      y += leadName === 'aVR' ? -1.0 : 1.35;
    } else if (p >= 0.22 && p < 0.26) {
      y -= 0.3;
    } else if (p >= 0.32 && p < 0.44) {
      y += 0.28;
    }
    return y;
  }

  // 8. RITMO ESTIMULADO POR MARCAPASOS
  if (activeRhythm.includes('MARCAPASOS') || activeRhythm.includes('PACED')) {
    let y = 0;
    // Espiga de marcapasos vertical angosta y de gran voltaje
    if (p >= 0.18 && p < 0.20) {
      y += 1.8;
    } else if (p >= 0.20 && p < 0.26) {
      // QRS ancho con morfología de bloqueo de rama izquierda (LBBB)
      y -= leadName === 'V1' ? 1.3 : 0.9;
    } else if (p >= 0.26 && p < 0.34) {
      y += leadName.startsWith('V') && leadName !== 'V1' ? 1.2 : -0.4;
    } else if (p >= 0.40 && p <= 0.56) {
      y += Math.sin(((p - 0.40) / 0.16) * Math.PI) * 0.3;
    }
    return y;
  }

  // 9. BLOQUEO AV COMPLETO (3° GRADO) - DISOCIACIÓN AV COMPLETA
  if (activeRhythm.includes('BLOQUEO_AV_3') || activeRhythm.includes('BAV_3')) {
    let y = 0;
    // Ondas P regulares a ritmo auricular propio (~75 lpm, ciclo cada 45 px)
    const pAuricularPhase = ((globalX % 45) / 45);
    if (pAuricularPhase >= 0.1 && pAuricularPhase <= 0.25) {
      y += Math.sin(((pAuricularPhase - 0.1) / 0.15) * Math.PI) * 0.22;
    }
    // Complejo QRS de escape idioventricular lento y ancho
    if (p >= 0.28 && p < 0.36) {
      y += leadName === 'aVR' ? -1.1 : 1.2;
    } else if (p >= 0.36 && p < 0.42) {
      y -= 0.35;
    } else if (p >= 0.52 && p <= 0.70) {
      y += Math.sin(((p - 0.52) / 0.18) * Math.PI) * (leadName === 'aVR' ? -0.25 : 0.32);
    }
    return y;
  }

  // 10. BLOQUEO AV 1° GRADO (PR Prolongado >0.20s constante)
  if (activeRhythm.includes('BAV_1') || activeRhythm.includes('BAV1')) {
    let y = 0;
    // Onda P muy anticipada (PR ~280ms)
    if (p >= 0.02 && p <= 0.10) {
      y += Math.sin(((p - 0.02) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
    }
    // Segmento PR isoeléctrico largo
    if (p >= 0.22 && p < 0.26) y += leadName === 'aVR' ? -1.0 : (leadName.startsWith('V') ? 1.4 : 1.15);
    if (p >= 0.26 && p < 0.30) y -= leadName === 'aVR' ? -0.2 : 0.38;
    if (p >= 0.44 && p <= 0.60) {
      y += Math.sin(((p - 0.44) / 0.16) * Math.PI) * (leadName === 'aVR' ? -0.25 : 0.35);
    }
    return y;
  }

  // 11. BLOQUEO AV 2° GRADO MOBITZ I (Wenckebach) / MOBITZ II
  if (activeRhythm.includes('BAV_2') || activeRhythm.includes('BAV2') || activeRhythm.includes('MOBITZ')) {
    let y = 0;
    // Onda P presente
    if (p >= 0.06 && p <= 0.14) {
      y += Math.sin(((p - 0.06) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
    }
    // QRS conducido
    if (p >= 0.22 && p < 0.26) y += leadName === 'aVR' ? -1.0 : 1.15;
    if (p >= 0.26 && p < 0.30) y -= 0.35;
    if (p >= 0.44 && p <= 0.60) {
      y += Math.sin(((p - 0.44) / 0.16) * Math.PI) * 0.32;
    }
    return y;
  }

  // 12. INFARTO CON ELEVACIÓN DEL ST (STEMI INFERIOR vs ANTEROLATERAL)
  const stemiType = detectStemiType(currentCase, rhythm, phase);
  const isStemi = stemiType !== 'NONE';

  if (isStemi) {
    let y = 0;
    // Onda P normal
    if (p >= 0.08 && p <= 0.16) {
      y += Math.sin(((p - 0.08) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
    }

    if (stemiType === 'INFERIOR') {
      // DII, DIII, aVF: Supradesnivel marcado del ST (+4 a +5 mm) y T hiperaguda
      if (['II', 'III', 'aVF'].includes(leadName)) {
        if (p >= 0.18 && p < 0.20) y -= 0.25; // Onda Q patológica
        if (p >= 0.20 && p < 0.24) y += 1.15; // Onda R
        if (p >= 0.24 && p < 0.42) {
          const stPhase = (p - 0.24) / 0.18;
          y += 0.80 + Math.sin(stPhase * Math.PI) * 0.25;
        }
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.85;
        }
        return y;
      }

      // DI, aVL: Infradesnivel especular/recíproco (-2 a -3 mm)
      if (['I', 'aVL'].includes(leadName)) {
        if (p >= 0.20 && p < 0.24) y += 1.0;
        if (p >= 0.24 && p < 0.28) y -= 0.35;
        if (p >= 0.28 && p < 0.42) y -= 0.38;
        if (p >= 0.42 && p <= 0.58) {
          y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }

      if (leadName === 'aVR') {
        if (p >= 0.20 && p < 0.24) y -= 1.1;
        if (p >= 0.42 && p <= 0.58) y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.25;
        return y;
      }

      // Precordiales V1 a V6: ISOELÉCTRICAS
      if (leadName.startsWith('V')) {
        const leadNum = parseInt(leadName.slice(1), 10) || 1;
        const rHeight = 0.3 + (leadNum * 0.22);
        const sDepth = 1.4 - (leadNum * 0.20);
        if (p >= 0.20 && p < 0.23) y += rHeight;
        if (p >= 0.23 && p < 0.27) y -= sDepth;
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }
    } else {
      // STEMI ANTEROLATERAL EXTENSO: Supradesnivel tombstone masivo en V1-V6, DI, aVL
      if (['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'I', 'aVL'].includes(leadName)) {
        if (p >= 0.18 && p < 0.20) y -= 0.2;
        if (p >= 0.20 && p < 0.24) y += leadName.startsWith('V') ? 1.55 : 1.15;
        if (p >= 0.24 && p < 0.42) {
          const stPhase = (p - 0.24) / 0.18;
          y += 0.85 + Math.sin(stPhase * Math.PI) * 0.25;
        }
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.90;
        }
        return y;
      }

      // Espejo inferior recíproco
      if (['II', 'III', 'aVF'].includes(leadName)) {
        if (p >= 0.20 && p < 0.24) y += 0.9;
        if (p >= 0.24 && p < 0.28) y -= 0.35;
        if (p >= 0.28 && p < 0.42) y -= 0.38;
        if (p >= 0.42 && p <= 0.58) {
          y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }

      if (leadName === 'aVR') {
        if (p >= 0.20 && p < 0.24) y -= 1.0;
        if (p >= 0.28 && p < 0.42) y += 0.28;
        return y;
      }
    }
  }

  // 13. RITMO SINUSAL / BRADICARDIA / TAQUICARDIA SINUSAL NORMAL
  let y = 0;
  if (p >= 0.08 && p <= 0.16) {
    y += Math.sin(((p - 0.08) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
  }
  if (p >= 0.18 && p < 0.20) y -= 0.1;
  if (p >= 0.20 && p < 0.24) y += leadName === 'aVR' ? -1.0 : (leadName.startsWith('V') ? 1.4 : 1.15);
  if (p >= 0.24 && p < 0.28) y -= leadName === 'aVR' ? -0.2 : 0.4;
  if (p >= 0.42 && p <= 0.58) {
    y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * (leadName === 'aVR' ? -0.25 : 0.35);
  }
  return y;
}
