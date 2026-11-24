// Clinical Rule Engine for ACLS Simulation
// Parses Spanish natural language clinical orders and manages resuscitation state machine

export function parseClinicalCommand(input) {
  if (!input) return { action: 'UNKNOWN', raw: '' };
  const raw = input.trim();
  const text = raw.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");

  // 1. Líder y funciones
  if (text.includes('rol') || text.includes('funcion') || text.includes('asignar') || text.includes('lider')) {
    return { action: 'ASSIGN_ROLES', raw };
  }

  // Adelantar tiempo RCP
  if (text.includes('adelantar') || text.includes('avanzar 30') || text.includes('+30') || text.includes('saltar tiempo')) {
    return { action: 'ADVANCE_CPR_TIME', seconds: 30, raw };
  }

  // 2. RCP / Masaje
  if (text.includes('reanudar rcp') || text.includes('continuar rcp') || text.includes('seguir masaje') || text.includes('reiniciar rcp')) {
    return { action: 'RESUME_CPR', raw };
  }
  if (text.includes('pausar rcp') || text.includes('detener masaje') || text.includes('parar masaje') || text.includes('parar compresiones')) {
    return { action: 'STOP_CPR', raw };
  }
  if (text.includes('rcp') || text.includes('cpr') || text.includes('masaje') || text.includes('compresion') || text.includes('comprimir')) {
    return { action: 'START_CPR', raw };
  }

  // 3. Comprobar pulso / ritmo / conciencia e interacción con el paciente
  if ((text.includes('pulso') && (text.includes('tomar') || text.includes('evaluar') || text.includes('chequear') || text.includes('ver') || text.includes('palpar'))) ||
      text.includes('chequear pulso') || text.includes('evaluar ritmo') || text.includes('analizar ritmo')) {
    return { action: 'CHECK_PULSE_RHYTHM', raw };
  }
  if (text.includes('conciencia') || text.includes('estimulo') || text.includes('responde') || text.includes('evaluar paciente') || 
      text.includes('me escucha') || text.includes('hola') || text.includes('parpade') || text.includes('tome mi mano') || 
      text.includes('mano') || text.includes('apriete') || text.includes('pupila') || text.includes('linterna') || 
      text.includes('avpu') || text.includes('glasgow') || text.includes('dolor')) {
    if (text.includes('mano') || text.includes('apriete')) {
      return { action: 'CHECK_HAND_GRIP', raw };
    }
    if (text.includes('parpade')) {
      return { action: 'CHECK_BLINK', raw };
    }
    if (text.includes('pupila') || text.includes('linterna') || text.includes('fotomotor')) {
      return { action: 'CHECK_PUPILS', raw };
    }
    if (text.includes('dolor') || text.includes('trapecio') || text.includes('ungueal')) {
      return { action: 'CHECK_PAIN_STIMULUS', raw };
    }
    return { action: 'CHECK_CONSCIOUSNESS', raw };
  }

  // 4. Desfibrilación y Cardioversión
  if (text.includes('cardioversion') || text.includes('cardiovertir') || text.includes('sincroniz')) {
    return { action: 'SYNC_CARDIOVERSION', raw };
  }
  if (text.includes('desfibril') || text.includes('descarga') || text.includes('chocar') || text.includes('shock') || text.includes('disparar')) {
    return { action: 'DEFIB_SHOCK', raw };
  }

  // 5. Marcapasos transcutáneo
  if (text.includes('marcapaso') || text.includes('pacing') || text.includes('marcapasos')) {
    return { action: 'START_PACER', raw };
  }

  // 6. Fármacos ACLS
  if (text.includes('adrenalina') || text.includes('epinefrina')) {
    const isInfusion = text.includes('infusion') || text.includes('goteo') || text.includes('bomba') || text.includes('mcg') || text.includes('microgram');
    let dose = '1mg';
    if (text.includes('0.5') || text.includes('medio')) dose = '0.5mg';
    if (text.includes('2 mg') || text.includes('2mg')) dose = '2mg';
    return { action: 'GIVE_ADRENALINE', isInfusion, dose, rate: isInfusion ? '2-10 mcg/min' : undefined, raw };
  }
  if (text.includes('amiodarona') || text.includes('cordarone')) {
    const is150 = text.includes('150');
    return { action: 'GIVE_AMIODARONE', isSecondDose: is150, dose: is150 ? '150mg' : '300mg', raw };
  }
  if (text.includes('lidocaina')) {
    return { action: 'GIVE_LIDOCAINE', raw };
  }
  if (text.includes('atropina')) {
    let dose = '1mg';
    if (text.includes('0.5') || text.includes('medio')) dose = '0.5mg';
    if (text.includes('3 mg') || text.includes('3mg') || text.includes('max')) dose = '3mg';
    return { action: 'GIVE_ATROPINE', dose, raw };
  }
  if (text.includes('magnesio') || text.includes('sulfato de magnesio')) {
    return { action: 'GIVE_MAGNESIUM', dose: '2g', raw };
  }
  if (text.includes('calcio') || text.includes('gluconato')) {
    return { action: 'GIVE_CALCIUM', raw };
  }
  if (text.includes('bicarbonato')) {
    return { action: 'GIVE_BICARBONATE', raw };
  }
  if (text.includes('adenosina')) {
    const is12 = text.includes('12');
    return { action: 'GIVE_ADENOSINE', dose: is12 ? '12mg' : '6mg', raw };
  }
  if (text.includes('noradrenalina') || text.includes('norepinefrina') || text.includes('dopamina') || text.includes('vasopresor')) {
    return { action: 'GIVE_VASOPRESSOR', dose: '0.1-0.5 mcg/kg/min', raw };
  }
  if (text.includes('glucosa') || text.includes('dextrosa') || text.includes('glucosado') || text.includes('sg50') || text.includes('sg 50') || text.includes('sg30') || text.includes('sg10')) {
    return { action: 'GIVE_GLUCOSE', raw };
  }
  if (text.includes('hgt') || text.includes('hemogluco') || text.includes('dextrotix') || text.includes('dextro') || text.includes('medir glucosa') || text.includes('tomar glucosa') || text.includes('glicemia') || text.includes('glucemia')) {
    return { action: 'CHECK_HGT', raw };
  }
  if (text.includes('suero') || text.includes('cristaloide') || text.includes('fisiologico') || text.includes('ringer') || text.includes('volumen') || text.includes('carga') || text.includes('solucion salina') || text.includes('sf') || text.includes('hartmann') || text.includes('lactato')) {
    const isRinger = text.includes('ringer') || text.includes('hartmann') || text.includes('lactato');
    const fluidType = isRinger ? 'ringer' : 'saline';
    // Extract numerical volume if present
    const match = text.match(/(\d+)\s*(ml|cc)?/);
    const volume = match ? parseInt(match[1], 10) : 500;
    return { action: 'GIVE_FLUIDS', volume: isNaN(volume) ? 500 : volume, fluidType, raw };
  }

  // 7. Vía Aérea y Ventilación
  if (text.includes('intubar') || text.includes('tubo endotraqueal') || text.includes('tet') || text.includes('via aerea avanzada') || text.includes('intubacion')) {
    return { action: 'START_INTUBATION', raw };
  }
  if (text.includes('capnografia') || text.includes('etco2') || text.includes('conectar co2')) {
    return { action: 'CONNECT_CAPNO', raw };
  }
  if (text.includes('oxigeno') || text.includes('mascarilla') || text.includes('reservorio') || text.includes('fio2') || text.includes('o2')) {
    return { action: 'GIVE_OXYGEN', raw };
  }

  // 8. Signos Vitales y Exámenes
  if (text.includes('presion') || text.includes('pa') || text.includes('nibp') || text.includes('medir pa') || text.includes('toma pa') || text.includes('manguito')) {
    return { action: 'TAKE_BP', raw };
  }
  if (text.includes('ecg') || text.includes('electro') || text.includes('12 derivaciones') || text.includes('electrocardiograma')) {
    return { action: 'ORDER_12_LEAD', raw };
  }
  if (text.includes('monitor') || text.includes('electrodos') || text.includes('parches') || text.includes('conectar monitor')) {
    return { action: 'CONNECT_MONITOR', raw };
  }
  if (text.includes('via venosa') || text.includes('via iv') || text.includes('acceso') || text.includes('cateter') || text.includes('intraosea')) {
    return { action: 'PLACE_IV', raw };
  }
  if (text.includes('laboratorio') || text.includes('gases') || text.includes('gsa') || text.includes('troponina') || text.includes('electrolitos') || text.includes('lactato')) {
    return { action: 'REQUEST_LABS', raw };
  }

  // 9. Causas Reversibles y Posparo
  if (text.includes('h y t') || text.includes('causas reversibles') || text.includes('buscar causas') || text.includes('descompresion') || text.includes('toracocentesis') || text.includes('neumotorax')) {
    return { action: 'TREAT_HYT', raw };
  }
  if (text.includes('ttm') || text.includes('met') || text.includes('temperatura') || text.includes('hipotermia') || text.includes('enfriamiento') || text.includes('control de temperatura')) {
    return { action: 'INITIATE_TTM', raw };
  }
  if (text.includes('derivar') || text.includes('derivacion') || text.includes('traslado') || text.includes('hemodinamia') || text.includes('icp') || text.includes('angioplastia') || text.includes('uci') || text.includes('cuidados intensivos')) {
    const dest = text.includes('uci') ? 'uci' : 'hemodinamia';
    return { action: 'REFER_PATIENT', destination: dest, raw };
  }

  return { action: 'GENERAL_ORDER', raw };
}

// Generate complete evaluation rubric based directly on the uploaded teacher sheets
export function evaluateSession(state, currentCase) {
  const {
    actionsTaken = [],
    criticalErrors = [],
    phase = 'initial',
    elapsedSeconds = 0,
    cprCyclesCompleted = 0,
    shockCount = 0,
    adrenalineCount = 0,
    amiodaroneCount = 0,
    hasGivenAtropine = false,
    hasGivenVolume = false,
    hasIdentifiedHyt = false,
    has12Lead = false,
    hasTtm = false,
    hasCheckedBp = false,
    hasSecuredAirway = false,
    hasAssignedRoles = false,
    hasConnectedMonitor = false,
    hasIvAccess = false,
    hasGivenOxygen = false,
    hasAchievedRce = false,
    hasReferred = false,
    isShockable = currentCase.isShockable,
    treatedCauses = [],
    consciousness = '',
    studentDiagnosedRhythm = null,
    isCprActive = false
  } = state;

  const items = [];
  const teacherNotes = [];

  const didCpr = cprCyclesCompleted > 0 || actionsTaken.some(a => a.type === 'START_CPR' || a.type === 'RESUME_CPR') || isCprActive;

  // Category 1: Líder del equipo
  items.push({ isCategoryHeader: true, title: '1. Líder del equipo' });
  items.push({
    label: 'Garantiza una RCP de alta calidad en todo momento (100-120 cpm, prof. 5cm, retroceso completo)',
    done: Boolean(didCpr && !criticalErrors.some(e => e.includes('RCP lenta') || e.includes('interrupción'))),
    note: didCpr ? 'Frecuencia y profundidad adecuadas (110 cpm)' : 'No supervisó calidad de compresiones'
  });
  items.push({
    label: 'Asigna funciones a los integrantes del equipo (Vía aérea, Compresor, Monitor, Fármacos)',
    done: Boolean(hasAssignedRoles || actionsTaken.some(a => a.type === 'ASSIGN_ROLES')),
    note: (hasAssignedRoles || actionsTaken.some(a => a.type === 'ASSIGN_ROLES')) ? 'Roles asignados oportunamente' : 'Equipo trabajó sin delimitación clara de roles'
  });
  items.push({
    label: 'Se asegura de que los miembros del equipo actúan bien y con circuito cerrado',
    done: Boolean((hasAssignedRoles || actionsTaken.some(a => a.type === 'ASSIGN_ROLES')) && criticalErrors.length === 0),
    note: criticalErrors.length === 0 ? 'Comunicación en circuito cerrado' : 'Fallas en la supervisión del equipo'
  });

  // Category 2: Manejo de la Arritmia Inicial (Taquicardia / Bradicardia)
  if (currentCase.type === 'taquicardia') {
    items.push({ isCategoryHeader: true, title: '2. Manejo de la Taquicardia Inicial' });
    items.push({
      label: 'Administra oxígeno si es necesario, coloca el monitor, abre una vía IV',
      done: Boolean(hasConnectedMonitor && (hasIvAccess || currentCase.initialVitals.ivAccess !== 'Sin vía venosa instalada')),
      note: hasConnectedMonitor ? 'Monitorización y acceso logrados' : 'Demora en monitorizar o canalizar vía'
    });
    items.push({
      label: 'Coloca las derivaciones del monitor en la posición correcta',
      done: Boolean(hasConnectedMonitor),
      note: 'Derivaciones DII y precordiales verificadas'
    });
    items.push({
      label: `Reconoce la taquicardia (${currentCase.initialVitals.rhythmName})`,
      done: Boolean(hasConnectedMonitor || studentDiagnosedRhythm || actionsTaken.some(a => ['SYNC_CARDIOVERSION', 'ORDER_12_LEAD', 'CONNECT_MONITOR', 'GIVE_ADENOSINE', 'GIVE_AMIODARONE', 'CHECK_PULSE_RHYTHM'].includes(a.type))),
      note: `Diagnóstico: ${currentCase.initialVitals.rhythmName}`
    });
    items.push({
      label: 'Reconoce síntomas ocasionados por la taquicardia (Inestabilidad hemodinámica)',
      done: Boolean(hasCheckedBp || actionsTaken.some(a => ['TAKE_BP', 'SYNC_CARDIOVERSION', 'CHECK_CONSCIOUSNESS', 'CHECK_PULSE_RHYTHM'].includes(a.type))),
      note: currentCase.initialVitals.isStable ? 'Paciente estable' : `Inestable: ${currentCase.initialVitals.stabilityReason}`
    });
    items.push({
      label: 'Realiza la cardioversión sincronizada inmediata (si inestable) o terapia farmacológica apropiada',
      done: Boolean(actionsTaken.some(a => ['SYNC_CARDIOVERSION', 'GIVE_ADENOSINE', 'GIVE_AMIODARONE'].includes(a.type)) || (currentCase.initialVitals.isStable && hasConnectedMonitor)),
      note: 'Conducta terapéutica acorde al algoritmo de taquicardia con pulso'
    });
  } else {
    items.push({ isCategoryHeader: true, title: '2. Manejo de la Bradicardia Inicial' });
    items.push({
      label: 'Administra oxígeno si es necesario, coloca el monitor, abre una vía IV',
      done: Boolean(hasConnectedMonitor),
      note: 'Soporte vital inicial completado'
    });
    items.push({
      label: 'Reconoce la bradicardia sintomática',
      done: Boolean(studentDiagnosedRhythm || actionsTaken.some(a => ['GIVE_ATROPINE', 'START_PACER', 'TAKE_BP', 'CHECK_PULSE_RHYTHM'].includes(a.type))),
      note: `FC inicial: ${currentCase.initialVitals.hr} lpm sintomática`
    });
    items.push({
      label: 'Administra una dosis correcta de atropina (1 mg IV en bolo) o prepara marcapasos',
      done: Boolean(hasGivenAtropine || actionsTaken.some(a => ['GIVE_ATROPINE', 'START_PACER'].includes(a.type))),
      note: (hasGivenAtropine || actionsTaken.some(a => a.type === 'START_PACER')) ? 'Tratamiento de primera línea ejecutado' : 'No administró atropina ni marcapasos de rescate'
    });
    items.push({
      label: 'Prepara todo lo necesario para tratamiento de segunda elección (Marcapasos transcutáneo / Dopamina / Adrenalina)',
      done: Boolean(actionsTaken.some(a => ['START_PACER', 'GIVE_VASOPRESSOR', 'GIVE_ADRENALINE'].includes(a.type))),
      note: 'Manejo de rescate de segunda línea preparado'
    });
  }

  // Category 3: Manejo del Paro Cardíaco (PCR)
  if (isShockable) {
    items.push({ isCategoryHeader: true, title: '3. Manejo de la FV / TV sin pulso (Ritmo Desfibrilable)' });
    items.push({
      label: 'Reconoce inmediatamente la FV / TV sin pulso',
      done: Boolean(shockCount > 0 || actionsTaken.some(a => ['START_CPR', 'DEFIB_SHOCK'].includes(a.type)) || studentDiagnosedRhythm?.isShockable),
      note: 'Reconocimiento precoz del ritmo de paro desfibrilable'
    });
    items.push({
      label: 'Despeja la zona antes de analizar y aplicar la descarga ("Fuera tú, fuera yo, fuera todos")',
      done: Boolean(shockCount > 0 && !criticalErrors.some(e => e.includes('no despejó'))),
      note: 'Seguridad del reanimador y equipo garantizada'
    });
    items.push({
      label: 'Reinicia de inmediato la RCP tras las descargas (SIN chequear pulso tras el choque)',
      done: Boolean(actionsTaken.some(a => a.type === 'RESUME_CPR' || a.type === 'START_CPR') || didCpr),
      note: 'Reanudación inmediata de compresiones post-descarga'
    });
    items.push({
      label: 'Manejo correcto de la vía aérea (Bolsa-mascarilla con reservorio O2 o intubación ET)',
      done: Boolean(hasSecuredAirway || hasGivenOxygen || actionsTaken.some(a => ['GIVE_OXYGEN', 'START_INTUBATION', 'SECURE_AIRWAY'].includes(a.type))),
      note: hasSecuredAirway ? 'Tubo ET fijado' : 'Ventilación adecuada con O2 al 100%'
    });
    items.push({
      label: 'Ciclos apropiados de administración de fármacos-comprobación de ritmo/descarga-RCP (cada 2 minutos)',
      done: Boolean(cprCyclesCompleted >= 1 || hasAchievedRce || didCpr),
      note: hasAchievedRce ? 'RCE logrado eficazmente durante los ciclos' : `${cprCyclesCompleted} ciclo(s) de 2 min completados`
    });
    items.push({
      label: 'Administra las dosis y fármacos apropiados (Adrenalina tras 2° choque, Amiodarona tras 3er choque)',
      done: Boolean((hasAchievedRce && shockCount <= 1) || (adrenalineCount >= 1 && (shockCount < 3 || amiodaroneCount >= 1)) || (shockCount >= 1 && hasAchievedRce)),
      note: (hasAchievedRce && shockCount <= 1) ? 'RCE precoz tras 1° descarga: Fármacos no requeridos' : `Adrenalina: ${adrenalineCount} dosis | Amiodarona: ${amiodaroneCount} dosis`
    });
  } else {
    items.push({ isCategoryHeader: true, title: '3. Manejo de la AESP / Asistolia (Ritmo No Desfibrilable)' });
    items.push({
      label: 'Reconoce la AESP o Asistolia (comprobando protocolo de línea plana si asistolia)',
      done: Boolean(actionsTaken.some(a => a.type === 'START_CPR') || didCpr || studentDiagnosedRhythm?.isShockable === false),
      note: 'Ritmo no desfibrilable identificado oportunamente'
    });
    items.push({
      label: 'NO aplica descarga eléctrica en ritmo no desfibrilable',
      done: !criticalErrors.some(e => e.includes('Descargó en ritmo NO desfibrilable') || e.includes('descarga en ritmo no desfibrilable')),
      note: 'Cumple principio fundamental: No chocar AESP/Asistolia'
    });
    items.push({
      label: 'Comenta y trata las causas reversibles potenciales de la AESP/Asistolia (las 5 H y 5 T)',
      done: Boolean(hasIdentifiedHyt || hasGivenVolume || treatedCauses.length > 0 || actionsTaken.some(a => ['TREAT_HYT', 'GIVE_FLUIDS', 'GIVE_GLUCOSE', 'GIVE_CALCIUM', 'GIVE_BICARBONATE', 'CHECK_HGT'].includes(a.type))),
      note: hasIdentifiedHyt ? `Causa identificada y tratada: ${currentCase.hytCategory}` : 'Investigación y tratamiento de causas reversibles completado'
    });
    items.push({
      label: 'Administra la Adrenalina 1 mg IV de forma inmediata/precoz',
      done: Boolean(adrenalineCount >= 1 || (hasAchievedRce && hasIdentifiedHyt)),
      note: adrenalineCount >= 1 ? 'Adrenalina administrada precozmente' : 'RCE logrado oportunamente con resolución de causa'
    });
    items.push({
      label: 'Reinicia de inmediato la RCP tras las comprobaciones de pulso y ritmo cada 2 minutos',
      done: Boolean(cprCyclesCompleted >= 1 || hasAchievedRce || didCpr),
      note: 'Compresiones ininterrumpidas de alta calidad'
    });
  }

  // Category 4: Atención Posparo Cardíaco (RCE)
  items.push({ isCategoryHeader: true, title: '4. Atención Posparo Cardíaco (RCE)' });
  items.push({
    label: 'Identifica el Retorno de Circulación Espontánea (RCE) con pulso y elevación súbita de EtCO2 (>35-40 mmHg)',
    done: Boolean(hasAchievedRce || phase === 'post_rce'),
    note: (hasAchievedRce || phase === 'post_rce') ? 'RCE identificado exitosamente' : 'Caso finalizado antes de consolidar RCE'
  });
  items.push({
    label: 'Se asegura de que se llevan a cabo la PA y el ECG de 12 derivaciones para descartar STEMI',
    done: Boolean((hasCheckedBp || actionsTaken.some(a => a.type === 'TAKE_BP')) && (has12Lead || actionsTaken.some(a => a.type === 'ORDER_12_LEAD'))),
    note: (has12Lead || actionsTaken.some(a => a.type === 'ORDER_12_LEAD')) ? 'ECG de 12 derivaciones completado' : 'Faltó ECG de 12 derivaciones posparo'
  });
  items.push({
    label: 'Saturación de O2 monitorizada (92-98%), expresa necesidad de intubación ET y capnografía',
    done: Boolean(hasSecuredAirway || hasGivenOxygen || actionsTaken.some(a => ['GIVE_OXYGEN', 'START_INTUBATION'].includes(a.type))),
    note: 'Objetivo SaO2 normóxica 92-98% y vía aérea avanzada'
  });
  items.push({
    label: 'Manejo hemodinámico: trata la hipotensión con bolos de fluidos o vasopresores (meta PAM > 65)',
    done: Boolean(hasCheckedBp || actionsTaken.some(a => ['GIVE_FLUIDS', 'GIVE_VASOPRESSOR', 'TAKE_BP'].includes(a.type))),
    note: 'Optimización hemodinámica posparo iniciada'
  });

  const isConsciousPatient = (consciousness || '').toLowerCase().includes('despierta') || 
                             (consciousness || '').toLowerCase().includes('orientado') || 
                             (consciousness || '').toLowerCase().includes('glasgow 14') || 
                             (consciousness || '').toLowerCase().includes('glasgow 15');

  items.push({
    label: 'Considera el Manejo Específico de la Temperatura (MET / TTM 32-36 °C x 24h si no obedece órdenes)',
    done: Boolean(hasTtm || isConsciousPatient || actionsTaken.some(a => a.type === 'INITIATE_TTM')),
    note: isConsciousPatient 
      ? 'Paciente consciente: No requiere TTM invasivo (prevención estricta de hipertermia)' 
      : (hasTtm ? 'Protocolo MET activado oportunamente' : 'No consideró MET en paciente comatoso')
  });
  items.push({
    label: 'Coordinación de derivación definitiva: Hemodinamia (ICP urgente si sospecha de STEMI) o UCI Cuidados Críticos',
    done: Boolean(hasReferred || actionsTaken.some(a => a.type === 'REFER_PATIENT')),
    note: (hasReferred || actionsTaken.some(a => a.type === 'REFER_PATIENT')) ? 'Derivación especializada coordinada exitosamente' : 'Faltó coordinar derivación definitiva'
  });

  // Category 5: Aspectos de Evaluación Presencial en el Box (No aplicables en simulador virtual)
  items.push({ isCategoryHeader: true, title: '5. Aspectos de Evaluación Presencial por el Docente (NO APLICABLE en simulador virtual)' });
  items.push({
    label: 'Comprueba que el equipo (desfibrilador, cables, parches, carro de paro y monitor) funcione adecuadamente',
    done: false,
    isNotApplicable: true,
    note: 'No aplicable a la simulación virtual — Evaluado en box presencial por el docente mediante lista de chequeo'
  });
  items.push({
    label: 'Técnica física y ergonomía de las compresiones torácicas (postura vertical a 90°, talón en mitad inferior del esternón)',
    done: false,
    isNotApplicable: true,
    note: 'No aplicable a la simulación virtual — Evaluado en box presencial directamente sobre el maniquí'
  });
  items.push({
    label: 'Habilidades no técnicas y liderazgo presencial en el box (lenguaje corporal, tono de voz claro y circuito cerrado)',
    done: false,
    isNotApplicable: true,
    note: 'No aplicable a la simulación virtual — Evaluado en box presencial por el docente'
  });

  // Calculate scores (strictly excluding non-evaluable / isNotApplicable items)
  const scoreableItems = items.filter(i => !i.isCategoryHeader && !i.isNotApplicable);
  const correctCount = scoreableItems.filter(i => i.done).length;
  let scorePercent = Math.round((correctCount / scoreableItems.length) * 100);

  // Deduct for unique critical errors only
  const uniqueCriticalErrors = [...new Set(criticalErrors)];
  if (uniqueCriticalErrors.length > 0) {
    scorePercent = Math.max(10, scorePercent - (uniqueCriticalErrors.length * 15));
  }

  // Chilean standard grading scale: 1.0 to 7.0 (60% cut-off for 4.0 pass mark)
  let grade = 1.0;
  if (scorePercent >= 60) {
    grade = 4.0 + (scorePercent - 60) * (3.0 / 40);
  } else {
    grade = 1.0 + scorePercent * (3.0 / 60);
  }
  grade = Math.min(7.0, Math.max(1.0, grade));

  const isPassed = grade >= 4.0 && uniqueCriticalErrors.length <= 1;

  // Teacher feedback notes matching photos
  if (uniqueCriticalErrors.length > 0) {
    teacherNotes.push(...uniqueCriticalErrors);
  }
  if (!hasAssignedRoles) {
    teacherNotes.push('El líder no asignó funciones claras a los integrantes al inicio del escenario.');
  }
  if (isShockable && amiodaroneCount === 0 && shockCount >= 3) {
    teacherNotes.push('Tras el 3er choque refractario en FV, correspondía administrar Amiodarona 300 mg en bolo.');
  }
  if (!isShockable && !hasIdentifiedHyt) {
    teacherNotes.push(`En AESP/Asistolia es mandatorio investigar activamente las causas reversibles (en este caso: ${currentCase.hytCategory}).`);
  }
  if (hasAchievedRce && !hasTtm && !isConsciousPatient) {
    teacherNotes.push('En cuidados posparo, el paciente no obedece órdenes: debió indicarse TTM (hipotermia de 32 a 36°C).');
  }

  return {
    items,
    criticalErrors: uniqueCriticalErrors,
    scorePercent,
    grade,
    isPassed,
    durationSeconds: elapsedSeconds,
    teacherFeedback: teacherNotes
  };
}
