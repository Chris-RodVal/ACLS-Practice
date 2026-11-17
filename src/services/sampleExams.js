export const SAMPLE_EXAMS = [
  {
    id: 'sample-eunacom-1',
    title: 'Simulacro EUNACOM: Medicina Interna & Urgencias GES (MINSAL)',
    specialty: 'Medicina Interna',
    difficulty: 'EUNACOM Oficial (Nivel 6-7/10)',
    createdAt: new Date().toISOString(),
    clinicalCase: {
      patientInfo: "Simulacro de casos clínicos de alta fidelidad clínica según el Perfil de Conocimientos oficial de EUNACOM Chile.",
      chiefComplaint: "Evaluación de competencias clínicas en Atención Primaria de Salud y Urgencias.",
      vitals: { ta: "130/85 mmHg", fc: "82 lpm", fr: "16 rpm", temp: "36.8 °C", spo2: "97%" },
      physicalExam: "Evaluación por sistemas según cada paciente.",
      labs: "Laboratorios clínicos estándar MINSAL."
    },
    questions: [
      {
        id: 'q1',
        clinicalVignette: "Hombre de 64 años, hipertenso y fumador, consulta en el SAPU por dolor retroesternal opresivo de 50 minutos de duración, irradiado a mandíbula y extremidad superior izquierda, asociado a diaforesis y náuseas. Al examen: PA 145/90 mmHg, FC 98 lpm, saturación 94% al aire ambiente. Se realiza ECG a los 5 minutos que muestra supradesnivel del segmento ST de 3.5 mm en derivaciones V1 a V4.",
        text: "¿Cuál es la conducta de reperfusión más adecuada si el tiempo de traslado estimado a un centro con hemodinamia es de 150 minutos?",
        options: [
          "Administrar trombolisis intravenosa con Tenecteplase inmediatamente en el centro local",
          "Iniciar traslado inmediato en ambulancia básica sin trombolisis para angioplastia primaria",
          "Administrar Heparina no fraccionada en bolo y diferir la trombolisis hasta la llegada al hospital",
          "Indicar Nitroglicerina sublingual y esperar resolución espontánea del supradesnivel",
          "Solicitar curva de Troponinas I y esperar el resultado cuantitativo antes de reperfundir"
        ],
        correctAnswer: 0,
        explanation: {
          gpcReference: "Guía Clínica GES MINSAL Chile: Infarto Agudo del Miocardio con Supradesnivel del Segmento ST.",
          rationale: "De acuerdo a la Guía GES MINSAL, si el tiempo proyectado desde el primer contacto médico hasta la insuflación del balón (tiempo puerta-balón) supera los 120 minutos, la indicación perentoria es realizar trombolisis farmacológica inmediata (tiempo puerta-aguja <30 min) con un agente fibrino-específico como Tenecteplase (TNK-tPA) o Alteplase, en ausencia de contraindicaciones.",
          distractors: [
            "Opción B es incorrecta: Un retraso de 150 minutos para angioplastia primaria supera la ventana de seguridad de 120 minutos y aumenta significativamente la mortalidad transmural.",
            "Opción C es incorrecta: La heparina es coadyuvante pero no sustituye la terapia de reperfusión primaria de emergencia.",
            "Opción D es incorrecta: Los nitratos alivian los síntomas pero no abren la arteria coronaria ocluida.",
            "Opción E es incorrecta: En IAMCEST con supradesnivel electrocardiográfico no se debe esperar el resultado de biomarcadores para iniciar la reperfusión."
          ],
          pearl: "PERLA EUNACOM: En IAMCEST, 'Tiempo es miocardio'. Si el tiempo a angioplastia primaria es > 120 minutos, se debe trombolisar de inmediato (< 30 min puerta-aguja)."
        }
      },
      {
        id: 'q2',
        clinicalVignette: "Mujer de 52 años, con antecedente de hipotiroidismo en tratamiento con Levotiroxina 75 mcg/día, consulta en CESFAM para control de salud. Asintomática. En sus exámenes de laboratorio destaca: Glicemia en ayunas de 136 mg/dL. Se repite una segunda glicemia en ayunas a los 7 días que resulta en 142 mg/dL. Examen físico: IMC 31.5 kg/m2, PA 132/84 mmHg, examen cardiopulmonar y abdominal normal.",
        text: "¿Cuál es el diagnóstico nosológico definitivo y la conducta terapéutica inicial según la Guía GES de Diabetes Mellitus Tipo 2?",
        options: [
          "Diabetes Mellitus Tipo 2; iniciar cambios en el estilo de vida más Metformina",
          "Intolerancia a la glucosa oral; solicitar Prueba de Tolerancia a la Glucosa Oral (PTGO)",
          "Glicemia de ayuno alterada; indicar solo dieta estricta y control en 6 meses",
          "Diabetes Mellitus Tipo 2; iniciar inmediatamente Insulina NPH nocturna",
          "Hipotiroidismo descompensado; ajustar dosis de Levotiroxina a 100 mcg/día"
        ],
        correctAnswer: 0,
        explanation: {
          gpcReference: "Guía Clínica GES MINSAL: Diabetes Mellitus Tipo 2 en personas de 15 años y más.",
          rationale: "El diagnóstico de Diabetes Mellitus se confirma con 2 glicemias en ayunas ≥ 126 mg/dL en días distintos. La Guía GES MINSAL establece como pilar de inicio la educación en estilo de vida saludable asociada a monoterapia farmacológica con Metformina desde el diagnóstico (salvo contraindicación por TFG < 30 mL/min).",
          distractors: [
            "Opción B es incorrecta: La PTGO no es necesaria cuando ya se cuenta con dos glicemias de ayuno confirmatorias ≥ 126 mg/dL.",
            "Opción C es incorrecta: La glicemia de ayuno alterada es de 100-125 mg/dL; valores ≥126 mg/dL son diagnósticos de DM2.",
            "Opción D es incorrecta: La insulina no es de primera línea en un paciente estable, asintomático y sin criterios de insulinización aguda.",
            "Opción E es incorrecta: El hipotiroidismo no explica los valores diagnósticos de diabetes mellitus."
          ],
          pearl: "PERLA EUNACOM: Diagnóstico de DM2 en Chile: 1) Dos glicemias de ayuno ≥ 126 mg/dL en días distintos, o 2) Glicemia ≥ 200 mg/dL a las 2h post PTGO, o 3) Síntomas clásicos de diabetes + glicemia al azar ≥ 200 mg/dL."
        }
      },
      {
        id: 'q3',
        clinicalVignette: "Hombre de 28 años, sin antecedentes mórbidos, consulta en el Servicio de Urgencias por cuadro de 14 horas de evolución de dolor abdominal que inició en epigastrio y periumbilical, migrando en las últimas 4 horas hacia fosa ilíaca derecha. Refiere anorexia y un vómito alimentario. Al examen físico: T° 37.9 °C, abdomen blando, con dolor exquisito a la palpación profunda en punto de McBurney y signo de Blumberg francamente positivo. Laboratorio: Leucocitos 14.800/uL con 82% de neutrófilos.",
        text: "¿Cuál es la conducta diagnóstica y terapéutica más adecuada en este paciente?",
        options: [
          "Indicar hospitalización y resolución quirúrgica mediante apendicectomía sin requerir imágenes adicionales",
          "Solicitar Tomografía Computarizada (TC) de abdomen y pelvis con contraste endovenoso antes de evaluar cirugía",
          "Indicar analgésicos antiespasmódicos por vía oral y dar de alta con control ambulatorio en 24 horas",
          "Realizar Ecografía abdominal para descartar diverticulitis de Meckel previa a la cirugía",
          "Iniciar tratamiento antibiótico exclusivo con Ciprofloxacino más Metronidazol por 7 días vía oral"
        ],
        correctAnswer: 0,
        explanation: {
          gpcReference: "Norma Técnica y Guía de Práctica Clínica de Abdomen Agudo / Apendicitis Aguda (Sociedad de Cirujanos de Chile / MINSAL).",
          rationale: "En un hombre adulto joven con cuadro clínico típico de apendicitis aguda (cronología de Murphy: dolor periumbilical que migra a FID, signo de McBurney y Blumberg positivos, fiebre y leucocitosis), el diagnóstico es eminentemente CLÍNICO y la conducta es la apendicectomía precoz sin demora ni necesidad de estudios imagenológicos complementarios.",
          distractors: [
            "Opción B es incorrecta: La TC de abdomen se reserva para dudas diagnósticas, pacientes añosos o presentaciones atípicas, no en hombres jóvenes con clínica clásica.",
            "Opción C es incorrecta: Dar de alta un abdomen agudo quirúrgico con antiespasmódicos enmascara el cuadro y predispone a perforación y peritonitis.",
            "Opción D es incorrecta: La ecografía no es obligatoria en hombres jóvenes cuando la clínica es categórica.",
            "Opción E es incorrecta: El manejo estándar de la apendicitis aguda no complicada en el adulto es quirúrgico."
          ],
          pearl: "PERLA EUNACOM: En hombres jóvenes con presentación clásica de apendicitis (Murphy (+) + Blumberg (+) + leucocitosis), el diagnóstico es 100% clínico y va directo a pabellón."
        }
      }
    ]
  }
];
