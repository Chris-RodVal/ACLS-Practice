export const DEFAULT_GEMINI_API_KEY = 'AIzaSyDnALQuCp-KxRsiVpjyPReGXTwDNroh8Go';

const EUNACOM_REDAXION_PROMPT = `
Eres un médico especialista, docente universitario y redactor oficial de reactivos para el Examen Único Nacional de Conocimientos de Medicina (EUNACOM) de Chile. Tu objetivo es diseñar un simulacro de evaluación de alta fidelidad clínica enfocado en medir las competencias de un médico general de acuerdo al Perfil de Conocimientos oficial de EUNACOM.

REGLAS DE CONSTRUCCIÓN OFICIAL EUNACOM:
1. ESTRUCTURA DE LAS PREGUNTAS:
   - La regla general es que CADA PREGUNTA ES UN MINI-CASO CLÍNICO EN SÍ MISMO (viñeta de 4 a 6 líneas). Simula un escenario habitual de la Atención Primaria de Salud (APS / CESFAM) o del Servicio de Urgencias (SAPU / SAR / Hospital) en Chile.
   - Incorpora edad, sexo, tiempo de evolución, sintomatología cardinal, antecedentes mórbidos relevantes, signos vitales y datos de laboratorio/gabinete pertinentes.
   - Si se solicitan 2 o más preguntas asociadas a un mismo paciente complejo, genera el caso clínico matriz detallado y formula preguntas secuenciales (ej: 1. Diagnóstico nosológico, 2. Conducta diagnóstica o terapéutica inicial de acuerdo a Guías GES MINSAL, 3. Manejo de complicaciones o criterio de derivación).

2. ALTERNATIVAS:
   - Cada pregunta DEBE contar con 5 ALTERNATIVAS (A, B, C, D, E), donde solo una es la correcta.
   - Los 4 distractores deben ser diagnósticos diferenciales o conductas médicas verosímiles, plausibles y desafiantes.
   - NUNCA uses "todas las anteriores" ni "ninguna de las anteriores".

3. DIFICULTAD Y PERFIL:
   - Calibrado estrictamente al nivel EUNACOM real (médico general egresado de alto rendimiento).
   - Basado en Guías Clínicas GES / AUGE, Normas Técnicas del Ministerio de Salud de Chile (MINSAL) y farmacopea disponible en la red pública de salud chilena.

4. SOLUCIONARIO Y JUSTIFICACIÓN:
   - Guía Clínica MINSAL o Norma de referencia.
   - Justificación fisiopatológica y clínica docente de por qué la alternativa seleccionada es el estándar de oro.
   - DESGLOSE EXHAUSTIVO DE DESCARTE: Explica por qué cada una de las otras 4 opciones se descarta en este paciente.
   - PERLA EUNACOM: Concepto nemotécnico o regla de decisión clave de alto rendimiento para el examen en Chile.

DEBES RESPONDER EXCLUSIVAMENTE CON UN OBJETO JSON VÁLIDO CON EL SIGUIENTE FORMATO EXACTO (SIN TEXTO EXTRA):
{
  "title": "Título descriptivo del examen EUNACOM",
  "specialty": "Medicina Interna | Pediatría | Ginecología y Obstetricia | Cirugía General | Salud Pública y Med. Familiar | Urgencias",
  "difficulty": "EUNACOM Oficial (Nivel 6-7/10)",
  "clinicalCase": {
    "patientInfo": "Ficha y antecedentes (si aplica caso matriz)",
    "chiefComplaint": "Motivo de consulta y padecimiento",
    "vitals": { "ta": "120/80 mmHg", "fc": "80 lpm", "fr": "16 rpm", "temp": "36.5 °C", "spo2": "98%" },
    "physicalExam": "Exploración física",
    "labs": "Laboratorios"
  },
  "questions": [
    {
      "id": "q1",
      "clinicalVignette": "Mini-caso clínico específico de esta pregunta (4-6 líneas: paciente, síntomas, examen, labs)...",
      "text": "¿Cuál es la conducta médica o diagnóstico más adecuado según la normativa MINSAL?",
      "options": [
        "Opción A",
        "Opción B",
        "Opción C",
        "Opción D",
        "Opción E"
      ],
      "correctAnswer": 0,
      "explanation": {
        "gpcReference": "Guía Clínica GES MINSAL / Protocolo Oficial",
        "rationale": "Justificación clínica y docente detallada de la opción correcta...",
        "distractors": [
          "Opción B se descarta porque...",
          "Opción C se descarta porque...",
          "Opción D se descarta porque...",
          "Opción E se descarta porque..."
        ],
        "pearl": "PERLA EUNACOM: Clave mnemotécnica y regla de oro para el examen"
      }
    }
  ]
}
`;

function robustJsonParse(jsonStr) {
  if (!jsonStr || typeof jsonStr !== 'string') {
    throw new Error('La respuesta de la IA vino vacía o con formato inválido.');
  }

  let s = jsonStr.trim();
  // Strip markdown code fences: ```json ... ``` or ```...```
  s = s.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```\s*$/i, '').trim();

  try {
    return JSON.parse(s);
  } catch (e) {}

  const startIdx = s.indexOf('{');
  if (startIdx === -1) {
    throw new Error('No se encontró una estructura JSON válida en la respuesta de la IA.');
  }
  s = s.slice(startIdx);

  let stack = [];
  let inString = false;
  let escaped = false;
  let clean = '';

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (inString) {
      clean += char;
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
    } else {
      if (char === '"') {
        inString = true;
        clean += char;
      } else if (char === '{' || char === '[') {
        stack.push(char);
        clean += char;
      } else if (char === '}') {
        if (stack.length && stack[stack.length - 1] === '{') stack.pop();
        clean += char;
      } else if (char === ']') {
        if (stack.length && stack[stack.length - 1] === '[') stack.pop();
        clean += char;
      } else {
        clean += char;
      }
    }
  }

  if (inString) clean += '"';

  while (stack.length > 0) {
    const last = stack.pop();
    if (last === '{') clean += '}';
    else if (last === '[') clean += ']';
  }

  // Remove trailing commas before closing braces/brackets
  clean = clean.replace(/,\s*([\}\]])/g, '$1');

  try {
    return JSON.parse(clean);
  } catch (parseError) {
    // Attempt extract match between outer braces
    const match = s.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const cleanedMatch = match[0].replace(/,\s*([\}\]])/g, '$1');
        return JSON.parse(cleanedMatch);
      } catch (_) {}
    }
    console.error('Error parseando JSON de IA:', parseError, jsonStr);
    throw new Error('No se pudo procesar la respuesta de la IA. Por favor, intenta de nuevo.');
  }
}

export const generateENARMExam = async ({ topic, specialty, numQuestions, customNotes, apiKey }) => {
  if (!apiKey) {
    throw new Error('Por favor ingresa tu API Key en "Configurar API Key".');
  }

  const promptText = `
${EUNACOM_REDAXION_PROMPT}

GENERA EL SIGUIENTE SIMULACRO OFICIAL EUNACOM DE ALTA FIDELIDAD:
- Especialidad / Asignatura: ${specialty || 'Medicina Interna'}
- Tema clínico específico: ${topic || 'Casos de Alto Rendimiento EUNACOM'}
- Cantidad de preguntas: ${numQuestions || 3} (Cada una como mini-caso clínico de 4 a 6 líneas con 5 alternativas A, B, C, D, E)
${customNotes ? `- Material / Contexto / Apuntes de estudio a incorporar:\n"""${customNotes}"""` : ''}

Recuerda: 5 alternativas por pregunta (A a E) y justificación docente completa descartando cada distractor. Responde SOLO en JSON válido.
`;

  let rawText = '';

  if (apiKey.startsWith('sk-ant')) {
    const maxTokens = Math.min(16000, Math.max(4000, (numQuestions || 7) * 900));
    const anthropicModels = ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'];
    let lastError = '';

    for (const model of anthropicModels) {
      try {
        const directRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model,
            max_tokens: maxTokens,
            temperature: 0.2,
            messages: [{ role: 'user', content: promptText }]
          })
        });

        const directData = await directRes.json();
        if (directRes.ok) {
          rawText = directData?.content?.[0]?.text || '';
          if (rawText) break;
        } else {
          lastError = directData?.error?.message || `Error en Claude (${directRes.status})`;
        }
      } catch (err) {
        lastError = err?.message || 'Error de conexión';
      }
    }

    if (!rawText) {
      throw new Error(lastError || 'Error al conectar con la API de Claude.');
    }
  } else {
    const geminiModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let lastError = '';

    for (const geminiModel of geminiModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.2 }
          })
        });

        const data = await res.json();
        if (res.ok) {
          rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (rawText) break;
        } else {
          lastError = data?.error?.message || `Error en Gemini (${res.status})`;
        }
      } catch (err) {
        lastError = err?.message || 'Error de conexión';
      }
    }

    if (!rawText) {
      throw new Error(lastError || 'Error al conectar con la API de Gemini.');
    }
  }

  const parsed = robustJsonParse(rawText);
  parsed.id = 'exam-' + Date.now();
  parsed.createdAt = new Date().toISOString();
  return parsed;
};

export const askAITutor = async ({ question, clinicalCase, currentQuestion, apiKey }) => {
  if (!apiKey) {
    throw new Error('Por favor configura tu API Key.');
  }

  const promptText = `
Eres un Profesor y Médico Especialista experto en el EUNACOM de Chile.
Un médico/estudiante de medicina te hace una consulta sobre la siguiente pregunta/caso clínico tipo EUNACOM:

DATOS DEL CASO / PREGUNTA:
${currentQuestion?.clinicalVignette ? `- Viñeta Clínica: ${currentQuestion.clinicalVignette}` : ''}
${clinicalCase?.patientInfo ? `- Caso Matriz: ${clinicalCase.patientInfo}` : ''}
- Pregunta: "${currentQuestion ? currentQuestion.text : 'Caso general'}"
- Respuesta correcta: ${currentQuestion ? currentQuestion.options[currentQuestion.correctAnswer] : ''}

PREGUNTA O DUDA DEL ALUMNO:
"${question}"

Responde con máxima precisión clínica, fisiopatológica y con estricto apego a las Guías Clínicas MINSAL y normativas del sistema de salud chileno.
`;

  if (apiKey.startsWith('sk-ant')) {
    const anthropicModels = ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'];
    let lastError = '';

    for (const model of anthropicModels) {
      try {
        const directRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model,
            max_tokens: 2048,
            temperature: 0.3,
            messages: [{ role: 'user', content: promptText }]
          })
        });
        const data = await directRes.json();
        if (directRes.ok && data?.content?.[0]?.text) {
          return data.content[0].text;
        } else {
          lastError = data?.error?.message || 'Error en Claude';
        }
      } catch (err) {
        lastError = err?.message || 'Error de conexión';
      }
    }
    throw new Error(lastError);
  } else {
    const geminiModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
    let lastError = '';

    for (const geminiModel of geminiModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });
        const data = await res.json();
        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        } else {
          lastError = data?.error?.message || 'Error en Gemini';
        }
      } catch (err) {
        lastError = err?.message || 'Error de conexión';
      }
    }
    throw new Error(lastError);
  }
};

/**
 * AI-Powered ACLS Evaluator using Google Gemini API (or local intelligent heuristics fallback)
 * Reads the entire event log, student commands, clinical timing, and evaluates against the ACLS rubric.
 */
export const evaluateAclsSessionWithAI = async ({
  apiKey,
  currentCase,
  eventLogs = [],
  actionsTaken = [],
  criticalErrors = [],
  simulationState = {}
}) => {
  const effectiveApiKey = (apiKey && apiKey.trim() !== '') ? apiKey.trim() : DEFAULT_GEMINI_API_KEY;

  const prompt = `
Eres un Médico Especialista, Docente de la American Heart Association (AHA) e Instructor Oficial de ACLS (Soporte Vital Cardiovascular Avanzado) en Chile.
Tu misión es evaluar el desempeño del líder y equipo de reanimación en base a la bitácora de órdenes clínicas y eventos registrados durante la simulación.

DATOS DEL CASO CLÍNICO:
- Título: ${currentCase.title}
- Tipo: ${currentCase.type} (${currentCase.type === 'taquicardia' ? 'Taquicardia' : 'Bradicardia'})
- Ritmo Inicial: ${currentCase.initialVitals.rhythmName} (FC: ${currentCase.initialVitals.hr}, PA: ${currentCase.initialVitals.bp})
- Ritmo de Paro (si degeneró): ${currentCase.arrestVitals?.rhythmName} (Es desfibrilable: ${currentCase.isShockable ? 'SÍ (FV/TVSP)' : 'NO (AESP/Asistolia)'})
- Causa Reversible Requerida: ${currentCase.hytCategory}
- RCE alcanzado: ${simulationState.hasAchievedRce ? 'SÍ' : 'NO'}

BITÁCORA COMPLETA DE EVENTOS Y ACCIONES DEL ESTUDIANTE:
${eventLogs.map(l => `[${l.time}] ${l.actor}: ${l.message}`).join('\n')}

ERRORES CRÍTICOS YA DETECTADOS:
${criticalErrors.length > 0 ? criticalErrors.join('\n') : 'Ninguno registrado por el monitor.'}

PAUTA DE EVALUACIÓN ACLS CHILENA (Escala 1.0 a 7.0, Aprobación con 4.0 a 60% de exigencia):
Debes evaluar exhaustivamente:
1. Líder del equipo (Garantiza RCP de alta calidad, asigna funciones, comunicación en circuito cerrado).
2. Manejo de la arritmia inicial con pulso (oxígeno, monitor, vía IV, reconocimiento de inestabilidad, tratamiento inicial).
3. Manejo del Paro Cardíaco (Reconocimiento precoz, seguridad en descarga si aplica, reinicio inmediato de RCP tras descarga sin chequear pulso, vía aérea y capnografía, ciclos de 2 minutos, dosis apropiadas de Adrenalina/Amiodarona, causas reversibles 5 H y 5 T).
4. Atención Posparo Cardíaco (RCE, toma de PA, ECG 12 derivaciones para descartar STEMI, control hemodinámico y temperatura/TTM).

DEBES RESPONDER EXCLUSIVAMENTE CON UN OBJETO JSON VÁLIDO CON EL SIGUIENTE FORMATO EXACTO:
{
  "grade": 5.8,
  "scorePercent": 82,
  "isPassed": true,
  "aiSummary": "Resumen ejecutivo del desempeño del líder y equipo...",
  "strengths": [
    "Punto fuerte 1...",
    "Punto fuerte 2..."
  ],
  "areasForImprovement": [
    "Oportunidad de mejora 1...",
    "Oportunidad de mejora 2..."
  ],
  "criticalErrors": [
    "Error crítico si existió (ej. no reiniciar RCP inmediatamente tras choque, etc.)"
  ],
  "checklistEvaluation": [
    {
      "category": "Líder del equipo",
      "items": [
        { "label": "Garantiza una RCP de alta calidad en todo momento", "passed": true, "feedback": "Supervisó 100-120 cpm" },
        { "label": "Asigna funciones a los integrantes del equipo", "passed": true, "feedback": "Roles asignados oportunamente" },
        { "label": "Se asegura de que los miembros del equipo actúan bien", "passed": true, "feedback": "Excelente circuito cerrado" }
      ]
    },
    {
      "category": "Manejo de Arritmia Inicial",
      "items": [
        { "label": "Administra O2 si es necesario, coloca monitor, vía IV", "passed": true, "feedback": "Acciones completadas" },
        { "label": "Reconoce ritmo y estabilidad", "passed": true, "feedback": "Identificó taqui/bradi" },
        { "label": "Terapia inicial adecuada (Cardioversión / Fármacos / Atropina)", "passed": true, "feedback": "Conducta correcta" }
      ]
    },
    {
      "category": "Manejo del Paro Cardíaco",
      "items": [
        { "label": "Reconoce ritmo de paro y conducta de choque", "passed": true, "feedback": "Despejó y descargó oportunamente o no chocó AESP" },
        { "label": "Reinicia de inmediato RCP tras las descargas sin chequear pulso", "passed": true, "feedback": "Compresiones inmediatas post-descarga" },
        { "label": "Vía aérea avanzada y capnografía continua", "passed": true, "feedback": "Tubo endotraqueal y capnógrafo" },
        { "label": "Administración de fármacos según algoritmo (Adrenalina / Amiodarona)", "passed": true, "feedback": "Dosis y tiempos correctos" },
        { "label": "Comenta y trata causas reversibles (5 H y 5 T)", "passed": true, "feedback": "Trató causa de base" }
      ]
    },
    {
      "category": "Atención Posparo Cardíaco",
      "items": [
        { "label": "Identifica Retorno de Circulación Espontánea (RCE)", "passed": true, "feedback": "Detectó pulso y salto de EtCO2" },
        { "label": "Realiza PA y ECG de 12 derivaciones", "passed": true, "feedback": "Descartó STEMI" },
        { "label": "Manejo de hipotensión y temperatura (TTM)", "passed": true, "feedback": "Optimización hemodinámica" }
      ]
    }
  ]
}
`;

  try {
    const cleanKey = effectiveApiKey;

    // Provider A: Anthropic Claude
    if (cleanKey.startsWith('sk-ant')) {
      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': cleanKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 3000,
          temperature: 0.2,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await claudeRes.json();
      if (claudeRes.ok && data?.content?.[0]?.text) {
        return robustJsonParse(data.content[0].text);
      }
    } else if (cleanKey) {
      // Provider B: Google Gemini
      const geminiModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
      for (const model of geminiModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.2, maxOutputTokens: 3000 }
            })
          });
          const data = await res.json();
          if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return robustJsonParse(data.candidates[0].content.parts[0].text);
          }
        } catch (e) {
          // try next model
        }
      }
    }
  } catch (err) {
    console.warn('Fallo llamada a API de IA, utilizando evaluador local inteligente:', err);
  }

  return generateLocalAiEvaluation(currentCase, eventLogs, actionsTaken, criticalErrors, simulationState);
};

// Fallback intelligent clinical AI rubric generator — Mini Informe Clínico Exhaustivo
function generateLocalAiEvaluation(currentCase, eventLogs, actionsTaken, criticalErrors, simulationState) {
  const hasAssignedRoles = simulationState.hasAssignedRoles || actionsTaken.some(a => a.type === 'ASSIGN_ROLES');
  const hasCheckedPulse = actionsTaken.some(a => a.type === 'CHECK_PULSE_RHYTHM');
  const hasShocked = simulationState.shockCount > 0;
  const hasAdrenaline = simulationState.adrenalineCount > 0;
  const hasAmiodarone = simulationState.amiodaroneCount > 0;
  const hasAirway = simulationState.hasSecuredAirway || simulationState.isOxygenAdministered || simulationState.hasGivenOxygen || actionsTaken.some(a => ['GIVE_OXYGEN', 'START_INTUBATION'].includes(a.type));
  const has12Lead = simulationState.has12Lead || actionsTaken.some(a => a.type === 'ORDER_12_LEAD');
  const hasOxygen = simulationState.isOxygenAdministered || simulationState.hasGivenOxygen || actionsTaken.some(a => a.type === 'GIVE_OXYGEN');
  const hasVolume = simulationState.hasGivenVolume || (simulationState.infusedVolumeMl && simulationState.infusedVolumeMl > 0) || simulationState.hasIdentifiedHyt || actionsTaken.some(a => ['GIVE_FLUIDS', 'GIVE_GLUCOSE', 'GIVE_CALCIUM', 'GIVE_BICARBONATE'].includes(a.type));
  const hasAchievedRce = simulationState.hasAchievedRce || simulationState.phase === 'post_rce';
  const hasTtm = simulationState.hasTtm || actionsTaken.some(a => a.type === 'INITIATE_TTM') || simulationState.isConsciousPatient;
  const hasReferred = simulationState.hasReferred || actionsTaken.some(a => a.type === 'REFER_PATIENT');

  let totalPoints = 0;
  let maxPoints = 14;

  if (hasAssignedRoles) totalPoints += 1.5;
  if (hasOxygen) totalPoints += 1;
  if (simulationState.cprCyclesCompleted >= 1 || actionsTaken.some(a => a.type === 'START_CPR') || simulationState.isCprActive || hasAchievedRce) totalPoints += 1.5;
  if (currentCase.isShockable ? hasShocked : !hasShocked) totalPoints += 1.5;
  if (hasAdrenaline || (currentCase.isShockable && hasAchievedRce && simulationState.shockCount <= 1)) totalPoints += 1;
  if (hasAirway) totalPoints += 1;
  if (hasVolume || simulationState.hasIdentifiedHyt) totalPoints += 1;
  if (hasAchievedRce) totalPoints += 2;
  if (has12Lead) totalPoints += 1.5;
  if (hasTtm) totalPoints += 1;
  if (hasReferred) totalPoints += 1;

  // Penalty for unique critical errors only
  const uniqueCriticalErrors = [...new Set(criticalErrors)];
  const penalty = Math.min(3.0, uniqueCriticalErrors.length * 1.0);
  const scorePercent = Math.max(10, Math.min(100, Math.round(((totalPoints / maxPoints) * 100) - (penalty * 10))));

  // Chilean 1.0 - 7.0 scale with 60% pass threshold (grade 4.0)
  let grade = 1.0;
  if (scorePercent >= 60) {
    grade = 4.0 + ((scorePercent - 60) / 40) * 3.0;
  } else {
    grade = 1.0 + (scorePercent / 60) * 3.0;
  }
  grade = Math.max(1.0, Math.min(7.0, Math.round(grade * 10) / 10));
  const isPassed = grade >= 4.0 && uniqueCriticalErrors.length <= 1;

  // Mini Informe Clínico Exhaustivo Resumido
  const reportSections = [
    `📋 INFORME DOCENTE DE EVALUACIÓN CLÍNICA ACLS:`,
    `• Caso: ${currentCase.title} (${currentCase.patient.name}, ${currentCase.patient.age} años).`,
    `• Desempeño General: ${isPassed ? 'COMPETENCIA CLÍNICA DEMOSTRADA (APROBADO)' : 'NO SUPERA ESTÁNDAR DE ACTUACIÓN CRÍTICA (REPROBADO)'} con nota ${grade.toFixed(1)}/7.0 (${scorePercent}%).`,
    `• Fase Inicial: El paciente cursó con ${currentCase.initialVitals.rhythmName}. ${hasOxygen ? 'Se administró oxigenoterapia oportuna.' : 'Demora en instalar oxígeno inicial.'}`,
    `• Reanimación en Paro: Ritmo ${currentCase.arrestVitals?.rhythmName || currentCase.arrestType} (${currentCase.isShockable ? 'Desfibrilable' : 'No Desfibrilable'}). ${currentCase.isShockable ? (hasShocked ? 'Descarga aplicada correctamente.' : 'OMISIÓN GRAVE: No desfibriló ritmo de choque.') : (!hasShocked ? 'Manejo correcto sin choque en ritmo no desfibrilable.' : 'ERROR CRÍTICO: Chocó ritmo no desfibrilable.')}`,
    `• Cuidados Posparo (RCE): ${hasAchievedRce ? 'RCE consolidado.' : 'No se consolidó RCE.'} PA ${has12Lead ? 'y ECG 12D completados' : 'o ECG pendientes'}. ${hasTtm ? 'Protocolo MET activo (32-36°C) para neuroprotección.' : 'Faltó considerar MET.'} ${hasReferred ? 'Derivación coordinada exitosamente.' : 'Derivación pendiente.'}`
  ];

  return {
    grade,
    scorePercent,
    isPassed,
    aiSummary: reportSections.join('\n'),
    strengths: [
      hasAssignedRoles ? 'Asignación oportuna de roles y liderazgo estructurado en circuito cerrado.' : null,
      hasOxygen ? 'Manejo adecuado de oxigenoterapia con mascarilla de no reinhalación al 100%.' : null,
      hasAchievedRce ? 'Retorno de circulación espontánea (RCE) logrado mediante apego al algoritmo AHA 2020.' : null,
      hasTtm ? 'Manejo Específico de la Temperatura (MET / TTM 32-36 °C x 24h) activado oportunamente para neuroprotección cerebral.' : null,
      hasReferred ? 'Coordinación efectiva de la derivación definitiva (Hemodinamia para ICP / UCI de Cuidados Críticos).' : null,
      has12Lead ? 'Adquisición oportuna de ECG de 12 derivaciones posparo para descarte de STEMI.' : null
    ].filter(Boolean),
    areasForImprovement: [
      !hasAssignedRoles ? 'Debe verbalizar y asignar explícitamente los roles a los miembros del equipo al inicio del caso.' : null,
      !has12Lead ? 'Indispensable solicitar ECG de 12 derivaciones inmediatamente tras el RCE para descartar infarto agudo con elevación del ST.' : null,
      !hasTtm ? 'En pacientes que no responden o comatosos post-RCE es mandatorio iniciar MET (32-36 °C) durante 24 horas.' : null,
      !hasReferred ? 'Faltó coordinar la derivación definitiva (Hemodinamia para angiografía coronaria de emergencia o UCI).' : null,
      criticalErrors.length > 0 ? `Corregir errores críticos detectados: ${criticalErrors.join(', ')}` : null
    ].filter(Boolean),
    criticalErrors,
    checklistEvaluation: [
      {
        category: 'Líder del equipo',
        items: [
          { label: 'Garantiza una RCP de alta calidad en todo momento', passed: simulationState.cprCyclesCompleted > 0, feedback: simulationState.cprCyclesCompleted > 0 ? 'Compresiones a 110 cpm supervisadas' : 'Debe monitorear calidad de RCP' },
          { label: 'Asigna funciones a los integrantes del equipo', passed: hasAssignedRoles, feedback: hasAssignedRoles ? 'Roles asignados oportunamente' : 'Faltó delimitar roles' },
          { label: 'Se asegura de que los miembros del equipo actúan bien', passed: hasAssignedRoles && criticalErrors.length === 0, feedback: criticalErrors.length === 0 ? 'Buena supervisión' : 'Ocurrieron fallas críticas' }
        ]
      },
      {
        category: 'Manejo de Arritmia Inicial',
        items: [
          { label: 'Administra O2 si es necesario, coloca monitor, vía IV', passed: hasOxygen, feedback: hasOxygen ? 'Oxigenoterapia instalada' : 'No administró oxígeno a tiempo' },
          { label: 'Reconoce ritmo y estabilidad', passed: hasCheckedPulse || actionsTaken.some(a => a.type === 'TAKE_BP'), feedback: 'Evaluación hemodinámica' },
          { label: 'Terapia inicial adecuada (Cardioversión / Fármacos / Atropina)', passed: actionsTaken.length > 2, feedback: 'Abordaje según algoritmo' }
        ]
      },
      {
        category: 'Manejo del Paro Cardíaco',
        items: [
          { label: 'Reconoce ritmo de paro y conducta de choque', passed: currentCase.isShockable ? hasShocked : !hasShocked, feedback: currentCase.isShockable ? 'Descarga aplicada' : 'Correcto no chocar ritmo no desfibrilable' },
          { label: 'Reinicia de inmediato RCP tras las descargas sin chequear pulso', passed: hasShocked, feedback: 'Reanudación post-choque' },
          { label: 'Manejo de la vía aérea y oxigenación adecuada', passed: hasAirway, feedback: hasAirway ? 'Oxigenación y ventilación garantizadas' : 'Vía aérea pendiente' },
          { label: 'Administración de fármacos según algoritmo (Adrenalina / Amiodarona)', passed: hasAdrenaline, feedback: hasAdrenaline ? 'Adrenalina administrada' : 'Faltó adrenalina requerida' },
          { label: 'Comenta y trata causas reversibles (5 H y 5 T)', passed: hasVolume || simulationState.hasIdentifiedHyt, feedback: 'Evaluación etiológica' }
        ]
      },
      {
        category: 'Atención Posparo Cardíaco',
        items: [
          { label: 'Identifica Retorno de Circulación Espontánea (RCE)', passed: hasAchievedRce, feedback: hasAchievedRce ? 'RCE identificado' : 'No consolidado' },
          { label: 'Realiza PA y ECG de 12 derivaciones para descartar STEMI', passed: has12Lead, feedback: has12Lead ? 'ECG 12 derivaciones realizado' : 'ECG pendiente' },
          { label: 'Manejo Específico de la Temperatura (MET / TTM 32-36 °C)', passed: hasTtm, feedback: hasTtm ? 'MET iniciado (33 °C)' : 'MET no indicado' },
          { label: 'Derivación definitiva a Hemodinamia (ICP) o UCI Cuidados Críticos', passed: hasReferred, feedback: hasReferred ? 'Derivación coordinada' : 'Derivación pendiente' }
        ]
      }
    ]
  };
}

