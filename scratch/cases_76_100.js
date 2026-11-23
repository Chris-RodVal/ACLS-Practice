// Cases 76 to 100 for ACLS Simulator
export const CASES_76_100 = [
  {
    id: "caso-76",
    title: "Caso 76: Disección Aórtica Tipo A con hemotaponamiento pericárdico y paro en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Renato Casanova",
      age: 59,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Hipertensión arterial mal controlada. Dolor torácico transfixiante hacia la espalda iniciado hace 1 hora.",
      presentation: "Dolor desgarrante 10/10, asimetría de pulsos en miembros superiores, disfonía y caída súbita de presión arterial."
    },
    initialVitals: {
      hr: 128,
      bp: "74/52",
      spo2: 90,
      etco2: 22,
      rr: 28,
      temp: 36.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Bajo Voltaje y Alternancia Eléctrica",
      isStable: false,
      stabilityReason: "Shock obstructivo severo (74/52), taponamiento cardíaco inminente y asimetría de pulsos.",
      consciousness: "Obnubilado, letárgico (AVPU: V)",
      airway: "Espontánea taquipneica",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El paciente pierde la conciencia súbitamente! Cae la mandíbula, ausencia de pulso carotídeo y el monitor traza ritmo sinusal a 105 lpm sin pulso palpable ni onda pletismográfica (AESP).",
    arrestVitals: {
      hr: 105,
      bp: "0/0",
      spo2: 0,
      etco2: 9,
      rr: 0,
      temp: 36.4,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por Hemopericardio)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 90,
      bp: "96/60",
      spo2: 96,
      etco2: 39,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con drenaje pericárdico de rescate y traslado inmediato a Cirugía Cardíaca",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado emergente a pabellón"
    },
    reversibleCause: "Disección aórtica aguda tipo A con rotura hacia saco pericárdico (Taponamiento cardíaco)",
    hytCategory: "Taponamiento Cardíaco",
    teachingNotes: "En dolor torácico desgarrante con hipotensión y asimetría de pulsos, el POCUS subxifoideo evidencia hemopericardio y colgajo intimal ('flap'). La pericardiocentesis alivia el colapso para permitir la cirugía de rescate.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos muy apagados, soplo diastólico aórtico nuevo de insuficiencia aórtica aguda. Asimetría de pulsos radiales (> 30 mmHg de diferencia).",
        perfusion: "Ingurgitación yugular bilateral, frialdad periférica acentuada.",
        temperature: "36.4 °C"
      },
      pocus: {
        cardiac: "Derrame pericárdico circunferencial moderado-severo con ecos densos hemáticos y colapso diastólico de cavidades derechas. Dilatación de la raíz aórtica (> 4.8 cm) con flap intimal visible en ventana paraesternal.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 25 mm fija sin colapso."
      },
      labs: {
        gsa: "pH 7.22 | pCO2 40 | pO2 78 | HCO3 17 | Lactato 4.8 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 139 | Cl- 103",
        glucose: "HGT: 126 mg/dL",
        others: "Dímero D: > 15.000 ng/mL | Troponina I: 0.45 ng/mL"
      },
      history: {
        witness: "Hijo refiere que su padre sintió un 'desgarro como si le rompieran la espalda con un cuchillo' mientras levantaba una caja.",
        medications: "Enalapril (suspendido hace meses).",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-77",
    title: "Caso 77: Electrocución Industrial por Alta Tensión con Fibrilación Ventricular primaria",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Esteban Sanhueza",
      age: 36,
      gender: "M",
      location: "Planta Industrial - Asistencia Médica SAMU",
      history: "Sin antecedentes mórbidos. Contacto accidental con línea de alta tensión trifásica (380V).",
      presentation: "Colapso instantáneo al tocar el cable pelado con la mano derecha. Quemaduras de entrada en mano derecha y salida en pie izquierdo."
    },
    initialVitals: {
      hr: 210,
      bp: "70/40",
      spo2: 85,
      etco2: 24,
      rr: 12,
      temp: 36.8,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Polimórfica Eléctrica Inestable",
      isStable: false,
      stabilityReason: "Trauma eléctrico agudo, hipotensión crítica (70/40) y fibrilación inminente.",
      consciousness: "Inconsciente, respiración estertorosa (AVPU: U)",
      airway: "Espontánea con riesgo de quemadura de vía aérea",
      ivAccess: "Vía periférica 16G en brazo izquierdo"
    },
    degenerationMessage: "¡El trazado colapsa de inmediato en una Fibrilación Ventricular gruesa de alta frecuencia y gran amplitud sin pulso palpable!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.8,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular Primaria Eléctrica",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 82,
      bp: "118/74",
      spo2: 98,
      etco2: 43,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras desfibrilación precoz con 200J bifásicos",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y reposición masiva de fluidos por rabdomiólisis"
    },
    reversibleCause: "Descarga eléctrica de alta tensión con disrupción eléctrica miocárdica (Trauma eléctrico)",
    hytCategory: "Tóxicos / Trauma Eléctrico",
    teachingNotes: "En electrocución por corriente alterna el miocardio es despolarizado en la fase vulnerable causando FV. La desfibrilación precoz tiene una altísima tasa de éxito si se aplica en los primeros minutos.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos inaudibles en paro.",
        perfusion: "Quemadura de entrada en palma derecha con carbonización profunda de 3er grado y orificio de salida en talón izquierdo.",
        temperature: "36.8 °C"
      },
      pocus: {
        cardiac: "Ausencia de daño estructural previo, corazón anatómicamente sano.",
        lung: "Líneas A normales sin neumotórax.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.28 | pCO2 42 | pO2 86 | HCO3 19 | Lactato 4.1 mmol/L",
        electrolytes: "K+ 4.8 | Na+ 138 | Cl- 101",
        glucose: "HGT: 122 mg/dL",
        others: "Creatina Fosfocinasa (CPK): 12.500 U/L (Rabdomiólisis severa) | Mioglobina en orina positiva"
      },
      history: {
        witness: "Compañeros de trabajo desconectaron la energía principal con pértiga aislante e iniciaron compresiones inmediatamente.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-78",
    title: "Caso 78: Embolia de Líquido Amniótico durante el parto con colapso catastrófico y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Valeria Santibáñez",
      age: 32,
      gender: "F",
      location: "Pabellón de Maternidad - Sala de Partos",
      history: "Primigesta de 39 semanas en trabajo de parto activo.",
      presentation: "Súbita agitación, disnea violenta, escalofríos, cianosis, convulsión tónico-clónica y sangrado vaginal incoagulable."
    },
    initialVitals: {
      hr: 160,
      bp: "58/32",
      spo2: 66,
      etco2: 12,
      rr: 38,
      temp: 37.1,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Colapso con Patrón de Sobrecarga de Ventrículo Derecho",
      isStable: false,
      stabilityReason: "Shock anafilactoide obstétrico catastrófico (58/32), hipoxia extrema y coagulopatía de consumo.",
      consciousness: "Comatosa tras convulsión (AVPU: U)",
      airway: "Riesgo inminente de broncoaspiración",
      ivAccess: "Dos vías periféricas 16G permeables"
    },
    degenerationMessage: "¡La paciente entra en apnea completa y pierde el pulso carotídeo y femoral! El monitor muestra complejos anchos a 115 lpm sin pulso palpable (AESP obstétrica).",
    arrestVitals: {
      hr: 115,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 37.1,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP Obstétrica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 102,
      bp: "94/58",
      spo2: 96,
      etco2: 38,
      rr: 16,
      temp: 36.6,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal post-histerotomía perimortem de rescate y soporte intensivo",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado prioritario a UCI Obstétrica"
    },
    reversibleCause: "Síndrome anafilactoide del embarazo / Embolia de líquido amniótico (Trombosis pulmonar / Hipoxia)",
    hytCategory: "Trombosis pulmonar (Embolia Obstétrica)",
    teachingNotes: "En el paro cardíaco materno > 20 semanas es vital desplazar el útero hacia la izquierda para descomprimir la vena cava inferior. Si no hay RCE a los 4 minutos, realizar histerotomía perimortem inmediata (parto por cesárea de emergencia en < 5 min).",
    clinicalExam: {
      physical: {
        pulmonary: "Estertores difusos bilaterales, hipoxemia refractaria con FiO2 100%.",
        cardiovascular: "Ruidos cardíacos inaudibles en paro. Ingurgitación yugular extrema.",
        perfusion: "Cianosis cervicofacial intensa, sangrado genital masivo en napa incoagulable.",
        temperature: "37.1 °C"
      },
      pocus: {
        cardiac: "Ventrículo derecho agudamente dilatado e hipocinético con desplazamiento del septum hacia el ventrículo izquierdo.",
        lung: "Líneas B bilaterales de edema pulmonar no cardiogénico.",
        vci: "Compresión aortocava por útero grávido evidente."
      },
      labs: {
        gsa: "pH 7.08 | pCO2 54 | pO2 40 | HCO3 15 | Lactato 6.8 mmol/L",
        electrolytes: "K+ 4.4 | Na+ 136 | Cl- 102",
        glucose: "HGT: 120 mg/dL",
        others: "Fibrinógeno: < 100 mg/dL (CID fulminante) | Plaquetas: 45.000 | Dímero D marcadamente positivo"
      },
      history: {
        witness: "Matrona de turno señala que tras la rotura artificial de membranas la paciente refirió escalofríos intensos, tos y se desvaneció convulsionando.",
        medications: "Oxitocina en infusión continua.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-79",
    title: "Caso 79: Isquemia Mesentérica con peritonitis séptica, acidosis láctica (pH 7.02) y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Domingo Osorio",
      age: 76,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Fibrilación auricular sin anticoagulación, cardiopatía isquémica.",
      presentation: "Dolor abdominal desproporcionado al examen físico de 12 horas, náuseas, heces en 'jalea de grosella' y shock séptico."
    },
    initialVitals: {
      hr: 140,
      bp: "64/36",
      spo2: 88,
      etco2: 15,
      rr: 32,
      temp: 38.6,
      rhythm: "FIBRILACION_AURICULAR",
      rhythmName: "Fibrilación Auricular con Respuesta Ventricular Rápida e Isquemia Subendocárdica",
      isStable: false,
      stabilityReason: "Shock séptico refractario (64/36), acidosis láctica extrema y abdomen agudo quirúrgico.",
      consciousness: "Soporoso profundo, no responde órdenes (AVPU: P)",
      airway: "Respiración acidótica profunda",
      ivAccess: "Vía periférica 18G en antebrazo derecho"
    },
    degenerationMessage: "¡El paciente deja de respirar! Palidez cadavérica total y pérdida de pulso carotídeo. El monitor traza complejos irregulares a 85 lpm sin pulso palpable (AESP séptica/acidótica).",
    arrestVitals: {
      hr: 85,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 38.6,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por Acidosis y Sepsis)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 104,
      bp: "92/54",
      spo2: 95,
      etco2: 37,
      rr: 16,
      temp: 37.8,
      rhythm: "FIBRILACION_AURICULAR",
      rhythmName: "Fibrilación Auricular con soporte de Noradrenalina, Bicarbonato y laparotomía de rescate",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, laparotomía exploradora urgente en pabellón"
    },
    reversibleCause: "Acidosis láctica extrema y shock séptico por necrosis intestinal transmural (Hidrogeniones / Acidosis)",
    hytCategory: "Hidrogeniones (Acidosis severa)",
    teachingNotes: "En acidosis metabólica profunda (pH < 7.10) por isquemia intestinal, la reposición de volumen vigorosa y Bicarbonato de Sodio 1 mEq/kg EV restauran la respuesta miocárdica a las catecolaminas.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos arrítmicos rápidos y apagados.",
        perfusion: "Abdomen distendido, rígido en tabla con dolor a la descompresión difuso (signo de Blumberg +).",
        temperature: "38.6 °C"
      },
      pocus: {
        cardiac: "Ventrículo izquierdo hiperdinámico con llenado ventricular disminuido por vasodilatación séptica.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI colapsable < 10 mm. Presencia de líquido libre en fosa ilíaca derecha y espacio de Morrison con neumoperitoneo focal."
      },
      labs: {
        gsa: "pH 7.02 | pCO2 28 | pO2 74 | HCO3 7.0 | Lactato 11.4 mmol/L (Crítico)",
        electrolytes: "K+ 5.6 | Na+ 134 | Cl- 100",
        glucose: "HGT: 145 mg/dL",
        others: "Leucocitosis: 24.000/uL con 18% baciliformes | Procalcitonina: > 50 ng/mL"
      },
      history: {
        witness: "Hija refiere que el padre se quejaba de dolor abdominal insoportable desde anoche y no quiso consultar antes.",
        medications: "Digoxina (irregular), Furosemida.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-80",
    title: "Caso 80: Commotio Cordis por impacto directo en tórax con Fibrilación Ventricular instantánea",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Ignacio Prado",
      age: 20,
      gender: "M",
      location: "Campo Deportivo de Béisbol - Asistencia SAMU",
      history: "Deportista sano sin antecedentes médicos.",
      presentation: "Golpe contuso directo de pelota de béisbol en la región precordial anterior izquierda. Dio dos pasos y se desplomó al suelo inconsciente."
    },
    initialVitals: {
      hr: 195,
      bp: "68/40",
      spo2: 86,
      etco2: 26,
      rr: 8,
      temp: 36.6,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Polimórfica Instantánea post-impacto precordial",
      isStable: false,
      stabilityReason: "Colapso mecánico-eléctrico primario, hipotensión y degeneración a FV inminente.",
      consciousness: "Inconsciente de inmediato al impacto (AVPU: U)",
      airway: "Espontánea agónica",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El trazado ventricular se desorganiza en Fibrilación Ventricular caótica de alto voltaje sin pulso carotídeo!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.6,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV - Commotio Cordis)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 74,
      bp: "120/78",
      spo2: 99,
      etco2: 43,
      rr: 14,
      temp: 36.4,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Normal tras desfibrilación con DEA en < 2 minutos",
      pulsePresent: true,
      consciousness: "Recupera conciencia rápidamente, orientado (Glasgow 15)"
    },
    reversibleCause: "Impacto precordial contuso sobre la ventana vulnerable de la onda T (Commotio Cordis / Trauma)",
    hytCategory: "Tóxicos / Trauma Torácico Cerrado",
    teachingNotes: "En conmoción cordis el corazón es anatómicamente normal; la onda de choque mecánica sobre el miocito en la fase ascendente de la onda T gatilla FV. La desfibrilación precoz en < 3 minutos logra sobrevida > 90%.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular limpio bilateralmente.",
        cardiovascular: "Ruidos cardíacos limpios tras RCE. Equimosis circular en región precordial esternal izquierda coincidente con pelota.",
        perfusion: "Recuperación rápida de perfusión, rosado, pulsos amplios.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Estructura anatómica y motilidad miocárdica completamente normales. Sin derrame pericárdico ni contusión transmural.",
        lung: "Líneas A normales, sin neumotórax.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.36 | pCO2 38 | pO2 92 | HCO3 22 | Lactato 1.8 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 140 | Cl- 102",
        glucose: "HGT: 98 mg/dL",
        others: "Troponina I: 0.08 ng/mL (Normal)"
      },
      history: {
        witness: "Entrenador relata que la pelota bateada impactó directamente en el pecho del joven mientras intentaba atraparla.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-81",
    title: "Caso 81: Intoxicación por Colquicina con shock distributivo y paro en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Armando Loyola",
      age: 61,
      gender: "M",
      location: "Servicio de Urgencias - Box de Observación",
      history: "Gota tofácea recurrente. Ingesta accidental masiva de Colquicina (20 mg en 24 horas por dolor severo).",
      presentation: "Vómitos incoercibles en agua de arroz, diarrea coleriforme sanguinolenta masiva, calambres y deshidratación extrema."
    },
    initialVitals: {
      hr: 136,
      bp: "68/38",
      spo2: 89,
      etco2: 18,
      rr: 28,
      temp: 36.0,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Colapso Hemodinámico",
      isStable: false,
      stabilityReason: "Shock distributivo e hipovolémico tóxico (68/38), fallo multiorgánico precoz y deshidratación.",
      consciousness: "Soporoso, quejumbroso (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El paciente pierde bruscamente el conocimiento! Se ausenta el pulso femoral y carotídeo. El monitor conserva complejos estrechos regulares a 110 lpm sin onda de pulso (AESP).",
    arrestVitals: {
      hr: 110,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.0,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP Tóxica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 98,
      bp: "92/58",
      spo2: 96,
      etco2: 38,
      rr: 16,
      temp: 35.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con resucitación agresiva con cristaloides y vasopresores",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado a UCI para soporte multiorgánico"
    },
    reversibleCause: "Intoxicación letal por Colquicina con parálisis mitótica y colapso cardiovascular (Tóxicos)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "La colquicina tiene un estrecho margen terapéutico. No tiene antídoto específico; el soporte hemodinámico agresivo con vasopresores y volumen temprano es la única opción de supervivencia.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos taquicárdicos muy apagados.",
        perfusion: "Piel marmórea fría, sequedad de mucosas extrema.",
        temperature: "36.0 °C"
      },
      pocus: {
        cardiac: "Colapso biventricular sistólico severo ('kissing walls').",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI filiforme colapsada completamente."
      },
      labs: {
        gsa: "pH 7.18 | pCO2 34 | pO2 78 | HCO3 14 | Lactato 7.8 mmol/L",
        electrolytes: "K+ 3.2 | Na+ 132 | Cl- 96",
        glucose: "HGT: 86 mg/dL",
        others: "Leucocitosis: 28.000/uL con desviación izquierda | Creatinina: 3.4 mg/dL"
      },
      history: {
        witness: "Esposa señala que tomó 20 pastillas de 1 mg durante la noche por un dolor de gota insoportable en el pie.",
        medications: "Colquicina 1 mg, Alopurinol 300 mg.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-82",
    title: "Caso 82: Síndrome de QT Largo Congénito con síncope por alarma sonora y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Antonia Barrientos",
      age: 24,
      gender: "F",
      location: "Domicilio Particular - Asistencia SAMU",
      history: "Antecedente de síncope previo en la adolescencia atribuido a 'estrés'.",
      presentation: "Alarma despertadora de alto volumen sonó bruscamente en la mañana; la paciente emitió un quejido y cayó de la cama inconsciente."
    },
    initialVitals: {
      hr: 205,
      bp: "72/44",
      spo2: 88,
      etco2: 27,
      rr: 24,
      temp: 36.6,
      rhythm: "TORSADES",
      rhythmName: "Torsades de Pointes / TV Polimorfa con QTc de 620 ms (Canalopatía KCNQ1 / LQT1)",
      isStable: false,
      stabilityReason: "Hipotensión severa (72/44), arritmia ventricular sostenida y colapso hemodinámico.",
      consciousness: "Inconsciente, respiración estertorosa (AVPU: U)",
      airway: "Espontánea agónica",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El trazado en torsión de puntas degenera rápidamente a Fibrilación Ventricular incoordinada de alto voltaje sin pulso palpable!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 11,
      rr: 0,
      temp: 36.6,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 68,
      bp: "112/70",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 36.4,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con onda T bifásica ancha y QTc 560 ms post-Sulfato de Magnesio",
      pulsePresent: true,
      consciousness: "Comatosa, candidata a TTM, betabloqueadores no selectivos (Nadolol/Propranolol) y CDI"
    },
    reversibleCause: "Canalopatía cardíaca congénita (Síndrome de QT Largo Tipo 1 o 2) gatillada por estímulo adrenérgico acústico",
    hytCategory: "Tóxicos / Desencadenante Genético",
    teachingNotes: "En el QT largo congénito los estímulos adrenérgicos bruscos (alarma, zambullida en agua fría) precipitan Torsades de Pointes. El Magnesio EV y la desfibrilación precoz salvan al paciente.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos inaudibles en paro.",
        perfusion: "Palidez fría sudorosa.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Estructura anatómica y función sistólica biventricular normales.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.34 | pCO2 38 | pO2 86 | HCO3 21 | Lactato 2.4 mmol/L",
        electrolytes: "K+ 4.0 | Mg2+ 1.8 | Ca2+ 1.22",
        glucose: "HGT: 102 mg/dL",
        others: "Troponina I: 0.05 ng/mL (Normal)"
      },
      history: {
        witness: "Compañera de departamento oyó el golpe en el suelo inmediatamente tras sonar la alarma.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-83",
    title: "Caso 83: Hipomagnesemia Severa (Mg 0.8) en alcoholismo crónico con Torsades y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Rigoberto Salgado",
      age: 53,
      gender: "M",
      location: "Servicio de Urgencias - Box de Agudos",
      history: "Consumo problemático de alcohol diario, desnutrición calórico-proteica.",
      presentation: "Temblores intensos, agitación, delirio tremens incipiente y palpitaciones rápidas con síncope en sala de espera."
    },
    initialVitals: {
      hr: 188,
      bp: "76/46",
      spo2: 90,
      etco2: 28,
      rr: 26,
      temp: 36.4,
      rhythm: "TORSADES",
      rhythmName: "Taquicardia Ventricular Polimorfa (Torsades de Pointes por Hipomagnesemia)",
      isStable: false,
      stabilityReason: "Hipotensión severa (76/46), síncope recurrente e inestabilidad ventricular refractaria.",
      consciousness: "Soporoso, desorientado (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en antebrazo derecho"
    },
    degenerationMessage: "¡El trazado en huso helicoidal se fractura en una onda fibrilatoria desorganizada y el paciente cae en paro cardíaco por Fibrilación Ventricular sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 36.4,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 74,
      bp: "108/68",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras Sulfato de Magnesio 2g IV y reposición de potasio",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y suplementación electrolítica masiva"
    },
    reversibleCause: "Déficit iónico severo de magnesio y potasio por alcoholismo crónico (Hipo / Hiperkalemia)",
    hytCategory: "Hipo / Hiperkalemia y Electrolitos",
    teachingNotes: "El Magnesio intracelular es cofactor crítico de la bomba Na+/K+ ATPasa. En hipomagnesemia severa, las arritmias ventriculares son refractarias a descargas y antiarrítmicos si no se administra Sulfato de Magnesio de inmediato.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos taquicárdicos irregulares.",
        perfusion: "Desnutrición evidente, temblor distal, eritema palmar y telangiectasias faciales.",
        temperature: "36.4 °C"
      },
      pocus: {
        cardiac: "Cámaras cardíacas hiperdinámicas sin hipertrofia.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 14 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.42 | pCO2 36 | pO2 84 | HCO3 23 | Lactato 2.6 mmol/L",
        electrolytes: "Mg2+: 0.8 mg/dL (Severamente bajo) | K+: 2.9 mEq/L (Bajo) | Na+: 134",
        glucose: "HGT: 74 mg/dL",
        others: "Fosfatemia: 1.6 mg/dL | Albúmina: 2.8 g/dL"
      },
      history: {
        witness: "Personal de seguridad de urgencias vio caer al paciente desmayado en la sala de espera.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-84",
    title: "Caso 84: Hemotórax Masivo Traumático por arma de fuego con shock y paro en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Bastián Cifuentes",
      age: 27,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación Trauma",
      history: "Sin antecedentes patológicos. Víctima de asalto con impacto balístico penetrante en tórax lateral izquierdo.",
      presentation: "Herida de bala en 5° espacio intercostal línea axilar anterior izquierda con sangrado continuo activo, palidez extrema y disnea agónica."
    },
    initialVitals: {
      hr: 152,
      bp: "52/28",
      spo2: 78,
      etco2: 14,
      rr: 36,
      temp: 35.6,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Complejos Microvolatados por Hemotórax",
      isStable: false,
      stabilityReason: "Shock hemorrágico grado IV exanguinante (52/28), hemotórax masivo y colapso respiratorio.",
      consciousness: "Estuporoso, no responde órdenes (AVPU: P)",
      airway: "Respiración superficial con tiraje intercostal",
      ivAccess: "Dos accesos venosos periféricos 14G y 16G"
    },
    degenerationMessage: "¡El pulso femoral y carotídeo se apagan por completo! Apnea total y el monitor ECG traza complejos a 125 lpm sin ninguna onda de pulso (AESP por exanguinación intratorácica).",
    arrestVitals: {
      hr: 125,
      bp: "0/0",
      spo2: 0,
      etco2: 7,
      rr: 0,
      temp: 35.6,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Shock Hemorrágico Masivo)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 104,
      bp: "96/60",
      spo2: 97,
      etco2: 38,
      rr: 14,
      temp: 35.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con toracotomía de reanimación, clampeo y transfusión masiva",
      pulsePresent: true,
      consciousness: "Comatoso, bajo anestesia general en pabellón de trauma"
    },
    reversibleCause: "Hemotórax masivo exanguinante con compresión pulmonar e hipovolemia crítica (Hipovolemia / Neumotórax)",
    hytCategory: "Hipovolemia",
    teachingNotes: "En trauma torácico penetrante con paro cardiorrespiratorio presenciado (< 10-15 min), la toracotomía de reanimación de emergencia en el box de urgencias permite el clampeo aórtico, control del sangrado y masaje cardíaco directo.",
    clinicalExam: {
      physical: {
        pulmonary: "Matidez absoluta a la percusión en todo el hemitórax izquierdo, abolición completa del murmullo pulmonar.",
        cardiovascular: "Ruidos cardíacos casi inaudibles, pulsos distales ausentes.",
        perfusion: "Palidez marmórea cadavérica, piel fría y empapada.",
        temperature: "35.6 °C"
      },
      pocus: {
        cardiac: "Colapso biventricular extremo por hipovolemia masiva sin derrame pericárdico.",
        lung: "Colección líquida anecoica masiva en hemitórax izquierdo que comprime el pulmón atelectásico ('signo de la columna vertebral' positivo sobre el diafragma).",
        vci: "VCI completamente colapsada filiforme."
      },
      labs: {
        gsa: "pH 7.06 | pCO2 36 | pO2 65 | HCO3 11 | Lactato 9.5 mmol/L",
        electrolytes: "K+ 4.9 | Na+ 137 | Cl- 104",
        glucose: "HGT: 140 mg/dL",
        others: "Hematocrito: 17% | Hemoglobina: 5.6 g/dL"
      },
      history: {
        witness: "Paramédico del SAMU indica que drenaron 1800 ml de sangre rutilante tras colocar tubo pleural en el trayecto.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-85",
    title: "Caso 85: Miocarditis Viral Fulminante con tormenta de TV sostenida sin pulso",
    type: "taquicardia",
    arrestType: "TVSP",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Nicolás Gaete",
      age: 29,
      gender: "M",
      location: "UCI Médica - Box 2",
      history: "Cuadro viral respiratorio alto hace 1 semana con fiebre y mialgias. Sin antecedentes cardiovasculares.",
      presentation: "Disnea progresiva de reposo, dolor torácico opresivo atípico, shock cardiogénico fulminante y arritmias ventriculares frecuentes."
    },
    initialVitals: {
      hr: 175,
      bp: "74/48",
      spo2: 89,
      etco2: 26,
      rr: 30,
      temp: 37.8,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Monomorfa Sostenida de Tracto de Salida",
      isStable: false,
      stabilityReason: "Shock cardiogénico grave (74/48), disfunción sistólica biventricular aguda (FEy 15%).",
      consciousness: "Soporoso, sudoroso (AVPU: V)",
      airway: "Espontánea taquipneica con tiraje",
      ivAccess: "Catéter venoso central yugular interno y vía periférica 18G"
    },
    degenerationMessage: "¡El paciente pierde la respuesta motora y ocular! El trazo se acelera a 220 lpm con complejos anchos aberrantes sin pulso carotídeo palpable (TV sin pulso).",
    arrestVitals: {
      hr: 220,
      bp: "0/0",
      spo2: 0,
      etco2: 11,
      rr: 0,
      temp: 37.8,
      rhythm: "TVSP",
      rhythmName: "Taquicardia Ventricular Sin Pulso (TVSP)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 92,
      bp: "94/58",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 37.2,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con elevación cóncava difusa del ST e inicio de soporte ECMO V-A",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, conectado a membrana de oxigenación extracorpórea (ECMO)"
    },
    reversibleCause: "Miocarditis inflamatoria viral fulminante con necrosis miocárdica difusa (Trombosis coronaria / Miocarditis)",
    hytCategory: "Trombosis coronaria / Cardiopatía Aguda",
    teachingNotes: "En pacientes jóvenes con shock cardiogénico fulminante y tormenta arrítmica post-viral, el soporte circulatorio mecánico precoz (ECMO veno-arterial) como puente a la recuperación es la terapia que salva la vida.",
    clinicalExam: {
      physical: {
        pulmonary: "Crépitos bibasales en ambos campos pulmonares.",
        cardiovascular: "Ritmo de galope por 3er ruido (R3), soplo sistólico mitral funcional.",
        perfusion: "Palidez cérea, frialdad distal, sudoración profusa.",
        temperature: "37.8 °C"
      },
      pocus: {
        cardiac: "Hipocinesia difusa severa biventricular con FEy estimada en 15-20%. Engrosamiento inflamatorio de paredes miocárdicas sin dilatación de cavidades.",
        lung: "Líneas B bilaterales de edema intersticial pulmonar.",
        vci: "VCI 23 mm distendida con mínimo colapso."
      },
      labs: {
        gsa: "pH 7.24 | pCO2 42 | pO2 76 | HCO3 18 | Lactato 5.4 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 136 | Cl- 101",
        glucose: "HGT: 116 mg/dL",
        others: "Troponina T ultrasensible: 12.800 ng/L (Marcadamente positiva) | BNP: > 5.000 pg/mL"
      },
      history: {
        witness: "Madre relata que el joven consultó hace 3 días por 'gripe fuerte' y hoy amaneció ahogado sin poder ponerse de pie.",
        medications: "Paracetamol.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-86",
    title: "Caso 86: Shock Séptico de Foco Urológico refractario con colapso en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Eliana Santelices",
      age: 78,
      gender: "F",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Urolitiasis obstructiva, Diabetes Mellitus Tipo 2.",
      presentation: "Fiebre con calofríos intensos en 39.2 °C, dolor lumbar derecho, orina fétida turbia, hipotensión profunda y confusión mental."
    },
    initialVitals: {
      hr: 138,
      bp: "62/34",
      spo2: 89,
      etco2: 18,
      rr: 32,
      temp: 39.1,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con bajo voltaje",
      isStable: false,
      stabilityReason: "Shock distributivo séptico refractario (62/34), hipoperfusión tisular y acidosis.",
      consciousness: "Obnubilada, no coopera (AVPU: V)",
      airway: "Espontánea taquipneica",
      ivAccess: "Dos vías periféricas 18G en extremidades superiores"
    },
    degenerationMessage: "¡La paciente cesa el esfuerzo ventilatorio! Cae la mandíbula, ausencia de pulsos periféricos y centrales. El monitor traza ritmo sinusal a 95 lpm sin pulso palpable (AESP séptica).",
    arrestVitals: {
      hr: 95,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 39.1,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP Séptica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 106,
      bp: "94/56",
      spo2: 96,
      etco2: 38,
      rr: 16,
      temp: 38.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con titulación de Noradrenalina, antibióticos y volumen",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, descompresión urológica de urgencia programada"
    },
    reversibleCause: "Shock séptico severo por urosepsis obstructiva con vasodilatación extrema (Hipovolemia / Hidrogeniones)",
    hytCategory: "Hipovolemia",
    teachingNotes: "En sepsis refractaria, la resucitación con cristaloides balanceados (30 ml/kg) e inicio precoz de vasopresores (Noradrenalina) dentro de la primera hora previene la progresión a paro en AESP.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Taquicardia rítmica con ruidos cardíacos apagados.",
        perfusion: "Piel marmórea con livideces en rodillas (Mottling score 3), extremidades frías, llenado capilar > 4s.",
        temperature: "39.1 °C"
      },
      pocus: {
        cardiac: "Ventrículo izquierdo hiperdinámico con llenado diastólico disminuido por vasoplejía.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 9 mm con colapso inspiratorio > 80%. Riñón derecho con hidronefrosis moderada-severa por cálculo obstructivo piélico."
      },
      labs: {
        gsa: "pH 7.19 | pCO2 30 | pO2 78 | HCO3 13 | Lactato 6.2 mmol/L",
        electrolytes: "K+ 4.4 | Na+ 135 | Cl- 101",
        glucose: "HGT: 185 mg/dL",
        others: "Sedimento de orina: Piuria masiva, bacterias abundantes | Leucocitosis: 22.000/uL"
      },
      history: {
        witness: "Hijo refiere que la paciente llevaba 2 días con ardor al orinar y hoy comenzó con fiebre y delirio.",
        medications: "Metformina 850 mg, Enalapril 10 mg.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-87",
    title: "Caso 87: Intoxicación por Cianuro en incendio industrial con anoxia celular y Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Cristóbal Palma",
      age: 40,
      gender: "M",
      location: "Fábrica de Plásticos - Asistencia SAMU de Rescate",
      history: "Sin antecedentes patológicos. Rescatado de un recinto cerrado en llamas con combustión de poliuretano y plásticos sintéticos.",
      presentation: "Inconsciente, hollín abundante en cavidad oral y narinas, aliento con olor a 'almendras amargas', respiración agónica y acidosis extrema."
    },
    initialVitals: {
      hr: 28,
      bp: "54/26",
      spo2: 82,
      etco2: 12,
      rr: 6,
      temp: 36.5,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Ritmo Agónico de Asfixia Celular por Cianuro",
      isStable: false,
      stabilityReason: "Inhibición de la citocromo c oxidasa mitocondrial, acidosis láctica letal y colapso respiratorio.",
      consciousness: "Coma profundo arrefléxico, midriasis bilateral (AVPU: U)",
      airway: "Inhalación de humo caliente con hollín en glotis",
      ivAccess: "Vía periférica 16G en brazo izquierdo"
    },
    degenerationMessage: "¡El trazado bradicárdico agónico se desvanece por completo! La línea del monitor queda plana horizontal continua en dos derivaciones (Asistolia total).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 6,
      rr: 0,
      temp: 36.5,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia por Bloqueo Mitocondrial por Cianuro",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 76,
      bp: "110/68",
      spo2: 98,
      etco2: 40,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras Hidroxocobalamina (Cyanokit 5g IV) y ventilación con O2 100%",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado a Centro de Toxicología / UCI"
    },
    reversibleCause: "Intoxicación aguda por cianuro con inhibición de la fosforilación oxidativa mitocondrial (Tóxicos / Hipoxia)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En víctimas de incendios en recintos cerrados con acidosis láctica desproporcionada (> 8-10 mmol/L) y compromiso neurológico, la Hidroxocobalamina (Cyanokit 5g EV) es el antídoto específico de rescate.",
    clinicalExam: {
      physical: {
        pulmonary: "Hollín en boca y faringe, estridor laríngeo por calor, murmullo vesicular disminuido.",
        cardiovascular: "Ruidos cardíacos inaudibles en paro.",
        perfusion: "Piel con coloración 'rojo cereza' paradójica en presencia de colapso respiratorio profundo.",
        temperature: "36.5 °C"
      },
      pocus: {
        cardiac: "Acinesia miocárdica completa en asistolia.",
        lung: "Líneas A normales, sin neumotórax.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 6.92 | pCO2 42 | pO2 90 (oxígeno disuelto presente) | HCO3 9.0 | Lactato 14.8 mmol/L (Crítico)",
        electrolytes: "K+ 4.8 | Na+ 138 | Cl- 102",
        glucose: "HGT: 135 mg/dL",
        others: "Carboxihemoglobina: 18% | Nivel de cianuro en sangre en curso"
      },
      history: {
        witness: "Bomberos rescataron al trabajador tras 20 minutos de exposición en bodega cerrada con combustión de espumas plásticas.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-88",
    title: "Caso 88: Síndrome del Seno Enfermo con pausas sinusales prolongadas y Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Irma Valdebenito",
      age: 84,
      gender: "F",
      location: "Servicio de Urgencias - Box de Agudos",
      history: "Hipertensión arterial, disfunción del nódulo sinusal en estudio, episodios presincopales.",
      presentation: "Síncope franco al ponerse de pie con traumatismo craneofacial leve. Mareo rotatorio persistente y bradicardia extrema."
    },
    initialVitals: {
      hr: 24,
      bp: "68/38",
      spo2: 91,
      etco2: 22,
      rr: 10,
      temp: 36.2,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Sinusal Severa con Pausas Sinusales de hasta 6.8 segundos",
      isStable: false,
      stabilityReason: "Hipotensión severa (68/38), pausas sinusales prolongadas y lipotimia recurrente.",
      consciousness: "Soporosa, abre ojos al llamado (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 20G en mano izquierda"
    },
    degenerationMessage: "¡El nódulo sinusal cesa toda actividad despolarizante! No emerge ningún marcapasos de escape subsidiario y el trazado ECG traza una línea isoeléctrica horizontal total (Asistolia por paro sinusal).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.2,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia por Paro Sinusal Completo",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina", "marcapasos"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 70,
      bp: "118/72",
      spo2: 98,
      etco2: 41,
      rr: 14,
      temp: 36.4,
      rhythm: "RITMO_MARCAPASOS",
      rhythmName: "Ritmo de Marcapasos Transcutáneo con Captura 100% a 70 lpm y 75 mA",
      pulsePresent: true,
      consciousness: "Recupera la conciencia tras estimulación ventricular sostenida (Glasgow 14)"
    },
    reversibleCause: "Degeneración fibrocalcárea intrínseca del nódulo sinusal (Causa Primaria de Conducción)",
    hytCategory: "Causa Mecánica / Bloqueo de Conducción",
    teachingNotes: "En el paro sinusal sintomático refractario a atropina (1 mg IV), el inicio precoz del marcapasos transcutáneo (TCP) mientras se prepara el marcapasos transvenoso definitivo evita la asistolia refractaria.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos rítmicos muy espaciados.",
        perfusion: "Palidez cérea, frialdad en manos y pies, llenado capilar 3.5s.",
        temperature: "36.2 °C"
      },
      pocus: {
        cardiac: "Contracción miocárdica bradicárdica sin cardiopatía estructural significativa.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 17 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.33 | pCO2 40 | pO2 80 | HCO3 21 | Lactato 2.4 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 139 | Cl- 102",
        glucose: "HGT: 108 mg/dL",
        others: "Troponina I: 0.04 ng/mL"
      },
      history: {
        witness: "Hija presenció cuando la madre se levantó de la silla, dijo 'me voy a desmayar' y cayó al suelo.",
        medications: "Enalapril 10 mg (sin betabloqueadores ni calcioantagonistas).",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-89",
    title: "Caso 89: Tromboembolismo Pulmonar Paradójico a través de FOP con hipoxemia y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Mariana Almonacid",
      age: 45,
      gender: "F",
      location: "Servicio de Urgencias - Box de Agudos",
      history: "Trombosis venosa profunda en extremidad inferior derecha tratada irregularmente. Foramen Oval Permeable (FOP) congénito.",
      presentation: "Disnea súbita catastrófica, dolor torácico opresivo, déficit neurológico focal (hemiplejia izquierda) por embolia paradójica y síncope."
    },
    initialVitals: {
      hr: 142,
      bp: "70/42",
      spo2: 74,
      etco2: 14,
      rr: 34,
      temp: 36.6,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Bloqueo Completo de Rama Derecha (BCRD) nuevo",
      isStable: false,
      stabilityReason: "Shock obstructivo e hipóxico crítico (70/42), sobrecarga aguda de ventrículo derecho y focalidad neurológica.",
      consciousness: "Soporosa, desviación de la comisura bucal (AVPU: V)",
      airway: "Espontánea taquipneica con tiraje",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡La paciente entra en apnea súbita y el pulso carotídeo desaparece! El monitor ECG continúa mostrando complejos con patrón de BCRD a 120 lpm sin pulso palpable (AESP por TEP masivo).",
    arrestVitals: {
      hr: 120,
      bp: "0/0",
      spo2: 0,
      etco2: 9,
      rr: 0,
      temp: 36.6,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por TEP Paradójico)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 98,
      bp: "102/64",
      spo2: 96,
      etco2: 38,
      rr: 14,
      temp: 36.3,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con atenuación de sobrecarga derecha post-fibrinolítico sistémico",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado urgente a UCI / Neurocirugía"
    },
    reversibleCause: "Tromboembolismo pulmonar masivo con embolia paradójica sistémica a través de FOP (Trombosis pulmonar)",
    hytCategory: "Trombosis pulmonar (TEP Masivo)",
    teachingNotes: "El TEP con shunt de derecha a izquierda por FOP causa hipoxemia refractaria al 100% de O2 y fenómenos embólicos paradójicos cerebrales. El tratamiento del paro por TEP requiere trombolítico de rescate y RCP prolongada.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado simétrico, sin estertores.",
        cardiovascular: "Refuerzo marcado del componente pulmonar del 2° ruido, ingurgitación yugular evidente.",
        perfusion: "Asimetría de pantorrillas con empastamiento y edema en pierna derecha.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Ventrículo derecho masivamente dilatado con rectificación del septum interventricular hacia el VI. Trombo móvil alargado visualizado a caballo a través del tabique interauricular (trombo atrapado en FOP).",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 24 mm pletórica sin colapso."
      },
      labs: {
        gsa: "pH 7.21 | pCO2 32 | pO2 44 | HCO3 15 | Lactato 5.2 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 138 | Cl- 103",
        glucose: "HGT: 114 mg/dL",
        others: "Dímero D: > 12.000 ng/mL | Troponina T: 0.92 ng/mL"
      },
      history: {
        witness: "Esposo indica que la paciente refirió falta de aire repentina mientras almorzaban y dejó de mover el brazo izquierdo.",
        medications: "Rivaroxabán (suspendido por el paciente hace 1 semana).",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-90",
    title: "Caso 90: Taquicardia Ventricular Fascicular Posterior (Belhassen) con colapso en FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Nicolás Bórquez",
      age: 26,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Joven sin cardiopatía estructural previa. Episodios autolimitados de palpitaciones.",
      presentation: "Palpitaciones taquicárdicas rápidas regulares, mareo intenso y dolor precordial tras ejercicio físico."
    },
    initialVitals: {
      hr: 198,
      bp: "80/50",
      spo2: 92,
      etco2: 30,
      rr: 24,
      temp: 36.7,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Fascicular Posterior (QRS con morfología de BCRD y eje superior izquierdo)",
      isStable: false,
      stabilityReason: "Hipotensión sintomática (80/50), lipotimia y taquicardia ventricular sostenida.",
      consciousness: "Confuso, mareado (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El paciente pierde bruscamente el conocimiento! Palidece intensamente, apnea súbita y el trazado ECG degenera en Fibrilación Ventricular caótica sin pulso.",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 11,
      rr: 0,
      temp: 36.7,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 76,
      bp: "114/72",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular con conducción normal post-desfibrilación y Verapamilo",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y ablación electrofisiológica por catéter"
    },
    reversibleCause: "Taquicardia ventricular idiopática sensible a verapamilo (TV fascicular de Belhassen)",
    hytCategory: "Arritmia Idiopática / Taquicardia Ventricular",
    teachingNotes: "La TV fascicular suele confundirse erróneamente con TSV con aberrancia por tener un QRS relativamente estrecho (120-140 ms). Si causa inestabilidad hemodinámica, la cardioversión eléctrica sincronizada o desfibrilación al degenerar es mandatoria.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos rítmicos muy taquicárdicos.",
        perfusion: "Palidez fría sudorosa, pulsos radiales filiformes.",
        temperature: "36.7 °C"
      },
      pocus: {
        cardiac: "Función sistólica del ventrículo izquierdo completamente normal sin cardiopatía estructural previa.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.33 | pCO2 38 | pO2 84 | HCO3 20 | Lactato 2.8 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 139 | Cl- 102",
        glucose: "HGT: 104 mg/dL",
        others: "Troponina I: 0.12 ng/mL"
      },
      history: {
        witness: "Amigo relata que el joven estaba trotando y de golpe se detuvo agarrándose el pecho antes de caer desmayado.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-91",
    title: "Caso 91: Neumoperitoneo a Tensión post-laparoscopía con colapso de retorno venoso y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Guacolda Vera",
      age: 52,
      gender: "F",
      location: "Pabellón Quirúrgico Central - Colecistectomía Laparoscópica",
      history: "Litiasis vesicular sintomática.",
      presentation: "Insuflación de CO2 peritoneal descontrolada con presiones intraabdominales > 30 mmHg durante la cirugía, colapso circulatorio brusco."
    },
    initialVitals: {
      hr: 138,
      bp: "56/32",
      spo2: 82,
      etco2: 58,
      rr: 26,
      temp: 36.3,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Colapso con Bajo Voltaje",
      isStable: false,
      stabilityReason: "Síndrome compartimental abdominal agudo iatrogénico (56/32), colapso de VCI y restricción ventilatoria diafragmática.",
      consciousness: "Bajo anestesia general",
      airway: "Intubada, alta presión de vía aérea en ventilador (> 45 cmH2O)",
      ivAccess: "Vía periférica 16G y vía venosa central"
    },
    degenerationMessage: "¡La presión arterial colapsa a cero en la línea arterial y desaparece el pulso carotídeo! El monitor conserva complejos estrechos a 110 lpm sin pulso (AESP obstructiva).",
    arrestVitals: {
      hr: 110,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.3,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por Neumoperitoneo a Tensión)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 88,
      bp: "114/70",
      spo2: 98,
      etco2: 40,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Normal tras desinsuflación peritoneal inmediata de CO2 y apertura de trócares",
      pulsePresent: true,
      consciousness: "Bajo sedación y relajación neuromuscular en pabellón"
    },
    reversibleCause: "Compresión de vena cava inferior y disminución crítica de precarga por neumoperitoneo a tensión (Taponamiento / Obstructivo)",
    hytCategory: "Taponamiento Cardíaco / Causa Obstructiva",
    teachingNotes: "El neumoperitoneo hipertensivo actúa fisiopatológicamente igual a un taponamiento cardíaco al bloquear el retorno venoso de la VCI. La desinsuflación peritoneal inmediata es la medida salvadora.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular bilateral muy disminuido por elevación diafragmática extrema.",
        cardiovascular: "Ruidos cardíacos casi inaudibles, ingurgitación yugular masiva.",
        perfusion: "Abdomen en bóveda de madera extremadamente tenso timpánico a la percusión.",
        temperature: "36.3 °C"
      },
      pocus: {
        cardiac: "Colapso diastólico de cavidades derechas por compresión extrínseca y falta de retorno venoso.",
        lung: "Ausencia de neumotórax.",
        vci: "VCI colapsada filiforme en su trayecto intraabdominal por debajo del diafragma."
      },
      labs: {
        gsa: "pH 7.14 | pCO2 62 | pO2 65 | HCO3 19 | Lactato 4.9 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 138 | Cl- 102",
        glucose: "HGT: 120 mg/dL",
        others: "Gases arteriales demuestran acidosis mixta severa"
      },
      history: {
        witness: "Anestesiólogo advierte al cirujano que la presión en el insuflador de CO2 se disparó por fallo en la válvula reguladora.",
        medications: "Anestesia general balanceada.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-92",
    title: "Caso 92: Hipertermia Maligna intraoperatoria con rigidez muscular, hiperkalemia y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Matías Zúñiga",
      age: 23,
      gender: "M",
      location: "Pabellón Quirúrgico Central - Apendicectomía",
      history: "Sin antecedentes anestésicos previos. Inducción con Sevoflurano y Succinilcolina.",
      presentation: "Rigidez mandibular masiva irreductible ('trismus'), aumento exponencial de EtCO2 (> 85 mmHg), taquicardia galopante y fiebre súbita de 41.2 °C."
    },
    initialVitals: {
      hr: 182,
      bp: "74/42",
      spo2: 86,
      etco2: 88,
      rr: 32,
      temp: 41.2,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular con Hiperkalemia Extrema (T picadas gigantes y QRS ancho)",
      isStable: false,
      stabilityReason: "Crisis hipermetabólica fulminante, hipertermia extrema (41.2°C), rabdomiólisis e hiperpotasemia.",
      consciousness: "Bajo anestesia general",
      airway: "Intubado orotraqueal",
      ivAccess: "Dos vías periféricas 16G"
    },
    degenerationMessage: "¡El trazado ventricular se torna caótico de alta frecuencia y amplitud, sobreviene Fibrilación Ventricular sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 14,
      rr: 0,
      temp: 41.2,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 96,
      bp: "105/65",
      spo2: 97,
      etco2: 42,
      rr: 16,
      temp: 37.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal Regular tras Dantroleno sódico EV (2.5 mg/kg) y enfriamiento activo",
      pulsePresent: true,
      consciousness: "Comatoso, bajo sedación en UCI, monitoreo de rabdomiólisis"
    },
    reversibleCause: "Hipertermia maligna genética por mutación del receptor de Ryanodina (RYR1) desencadenada por halogenados/succinilcolina (Tóxicos / Hipertermia)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En hipertermia maligna el tratamiento urgente es suspender de inmediato los halogenados, hiperventilar con O2 al 100%, administrar Dantroleno EV precoz y tratar agresivamente la hiperkalemia.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular rudo bilateral con hiperinsuflación.",
        cardiovascular: "Ruidos taquicárdicos violentos con tonos acentuados.",
        perfusion: "Rigidez muscular generalizada en 'tabla', piel intensamente caliente y marmórea con sudoración profusa.",
        temperature: "41.2 °C (Sonda esofágica)"
      },
      pocus: {
        cardiac: "Contractilidad miocárdica deprimida difusamente por hipertermia y acidosis.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 6.94 | pCO2 88 | pO2 62 | HCO3 16 | Lactato 12.0 mmol/L (Acidosis mixta extrema)",
        electrolytes: "K+: 8.2 mEq/L (Crítico) | Ca2+: 0.82 mmol/L | Na+: 136",
        glucose: "HGT: 160 mg/dL",
        others: "CPK: > 45.000 U/L | Mioglobinuria masiva (orina color coñac/coca-cola)"
      },
      history: {
        witness: "Anestesiólogo constata aumento inexplicable del EtCO2 a pesar de duplicar la ventilación minuto tras inducir con sevoflurano.",
        medications: "Sevoflurano, Succinilcolina, Fentanilo.",
        allergies: "Desconocidas."
      }
    }
  },
  {
    id: "caso-93",
    title: "Caso 93: Bloqueo Bifascicular crónico con progresión a Bloqueo AV Completo y Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Leopoldo Figueroa",
      age: 77,
      gender: "M",
      location: "Servicio de Medicina Interna - Sala 8",
      history: "Cardiopatía isquémica crónica con bloqueo de rama derecha (BCRD) y hemibloqueo anterior izquierdo (HBAI) en ECG basal.",
      presentation: "Episodios de síncope brusco 'de Stokes-Adams' sin pródromos mientras caminaba por la sala."
    },
    initialVitals: {
      hr: 22,
      bp: "62/34",
      spo2: 89,
      etco2: 20,
      rr: 8,
      temp: 36.1,
      rhythm: "BLOQUEO_AV_3",
      rhythmName: "Bloqueo AV Completo Trifascicular con Escape Ventricular Lento (QRS muy ancho aberrante)",
      isStable: false,
      stabilityReason: "Hipotensión severa (62/34), bradicardia extrema refractaria y crisis de Stokes-Adams.",
      consciousness: "Comatoso, rigidez de descerebración transitoria postictal (AVPU: P)",
      airway: "Espontánea estertorosa",
      ivAccess: "Vía periférica 18G en brazo derecho"
    },
    degenerationMessage: "¡El escaso escape ventricular infra-Hisiano se agota por completo! Las ondas P continúan disociadas sin conducir hasta que desaparecen, quedando una línea isoeléctrica plana (Asistolia).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.1,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia por Bloqueo Trifascicular Completo",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina", "marcapasos"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 70,
      bp: "116/74",
      spo2: 98,
      etco2: 41,
      rr: 14,
      temp: 36.3,
      rhythm: "RITMO_MARCAPASOS",
      rhythmName: "Ritmo de Marcapasos Transcutáneo con Captura Completa a 70 lpm",
      pulsePresent: true,
      consciousness: "Recupera la vigilia, orientado (Glasgow 14)"
    },
    reversibleCause: "Falla degenerativa completa del sistema de conducción His-Purkinje (Bloqueo Trifascicular)",
    hytCategory: "Causa Mecánica / Bloqueo de Conducción",
    teachingNotes: "El bloqueo bifascicular (BCRD + HBAI) con síncope indica afectación del tercer fascículo. El bloqueo resultante es infra-Hisiano; no responde a atropina y requiere marcapasos inmediato.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos con 1er tono variable y latido venoso 'a' cañón en cuello.",
        perfusion: "Palidez cérea, frialdad distal.",
        temperature: "36.1 °C"
      },
      pocus: {
        cardiac: "Contracción ventricular extremadamente lenta disociada de la contracción auricular.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 18 mm con escaso colapso."
      },
      labs: {
        gsa: "pH 7.31 | pCO2 42 | pO2 78 | HCO3 20 | Lactato 2.8 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 139 | Cl- 102",
        glucose: "HGT: 106 mg/dL",
        others: "Troponina I: 0.05 ng/mL (descarta isquemia aguda)"
      },
      history: {
        witness: "TENS del servicio presenció cuando el paciente se desplomó como un fardo al suelo sin aviso.",
        medications: "Aspirina, Atorvastatina.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-94",
    title: "Caso 94: Golpe de Calor de Esfuerzo con rabdomiólisis, hiperkalemia y paro en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Cristóbal Marín",
      age: 22,
      gender: "M",
      location: "Escuela Militar - Asistencia SAMU de Emergencia",
      history: "Conscripto militar en entrenamiento físico extenuante bajo 36 °C ambiental con equipo pesado.",
      presentation: "Colapso con pérdida de conocimiento, anhidrosis (piel seca y ardiente), temperatura central de 41.8 °C y convulsiones."
    },
    initialVitals: {
      hr: 165,
      bp: "64/36",
      spo2: 87,
      etco2: 20,
      rr: 34,
      temp: 41.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal Extrema con Ondas T Picadas Altas",
      isStable: false,
      stabilityReason: "Golpe de calor severo con disfunción del SNC (coma), shock distributivo térmico y rabdomiólisis.",
      consciousness: "Coma profundo arrefléxico postconvulsivo (AVPU: U)",
      airway: "Espontánea taquipneica superficial",
      ivAccess: "Dos vías periféricas 16G en ambos brazos"
    },
    degenerationMessage: "¡El paciente deja de respirar! Cae la mandíbula y se pierde el pulso carotídeo. El monitor ECG traza complejos regulares a 90 lpm sin pulso palpable (AESP por fallo multiorgánico e hiperkalemia).",
    arrestVitals: {
      hr: 90,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 41.8,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por Golpe de Calor)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 98,
      bp: "102/62",
      spo2: 97,
      etco2: 39,
      rr: 14,
      temp: 38.2,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con enfriamiento activo rápido por inmersión y sueros fríos",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado prioritario a UCI"
    },
    reversibleCause: "Hipertermia extrema ambiental por esfuerzo con rabdomiólisis e hipovolemia crítica (Hipotermia / Hipertermia / Hipovolemia)",
    hytCategory: "Hipotermia / Hipertermia extrema",
    teachingNotes: "En el golpe de calor la medida más urgente es el enfriamiento rápido inmediato (inmersión en agua fría o compresas de hielo y ventilación) para descender la temperatura a < 39°C en < 30 minutos.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular rudo bilateral.",
        cardiovascular: "Taquicardia extrema con tonos secos.",
        perfusion: "Piel completamente seca, caliente, eritematosa, ausencia total de sudor (anhidrosis térmica).",
        temperature: "41.8 °C (Termómetro rectal)"
      },
      pocus: {
        cardiac: "Cámaras cardíacas hiperdinámicas con llenado disminuido por deshidratación masiva.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI colapsable filiforme (< 8 mm)."
      },
      labs: {
        gsa: "pH 7.12 | pCO2 32 | pO2 72 | HCO3 11 | Lactato 9.4 mmol/L",
        electrolytes: "K+: 6.9 mEq/L (Hiperpotasemia por lisis muscular) | Na+: 152 | Cl-: 112",
        glucose: "HGT: 82 mg/dL",
        others: "CPK: > 60.000 U/L | Creatinina: 3.8 mg/dL | Orina oscura colúrica"
      },
      history: {
        witness: "Instructor militar informa que el joven marchó 15 km con mochila de 25 kg bajo el sol, comenzó a delirar y cayó desplomado convulsionando.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-95",
    title: "Caso 95: IAM con Supradesnivel de Tronco Coronario Izquierdo y FV refractaria",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Eugenio Manríquez",
      age: 65,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Diabetes Mellitus Tipo 2, Dislipidemia severa, Hipertensión arterial.",
      presentation: "Dolor retroesternal opresivo catastrófico irradiado a ambos hombros y mandíbula, sensación de muerte inminente y diaforesis profusa."
    },
    initialVitals: {
      hr: 168,
      bp: "72/46",
      spo2: 89,
      etco2: 28,
      rr: 30,
      temp: 36.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Supradesnivel ST en aVR y V1, e Infradesnivel ST difuso en 8 derivaciones (Patrón de Tronco / Multivaso)",
      isStable: false,
      stabilityReason: "Shock cardiogénico isquémico crítico (72/46), patrón ECG de oclusión de tronco coronario izquierdo.",
      consciousness: "Obnubilado, intensamente pálido (AVPU: V)",
      airway: "Espontánea taquipneica con disnea de reposo",
      ivAccess: "Dos vías periféricas 18G en extremidades superiores"
    },
    degenerationMessage: "¡El paciente grita de dolor, pierde la visión y el conocimiento! Entra en apnea y el trazado ECG colapsa en una Fibrilación Ventricular gruesa catastrófica de alta amplitud sin pulso.",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.4,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV Isquémica Masiva)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 94,
      bp: "92/58",
      spo2: 96,
      etco2: 43,
      rr: 14,
      temp: 36.1,
      rhythm: "SINUSAL_ST_ELEVATION",
      rhythmName: "Ritmo Sinusal con lesión subepicárdica masiva e indicación de Angioplastia Inmediata",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado directo a Pabellón de Hemodinamia"
    },
    reversibleCause: "Oclusión trombótica aguda de tronco coronario izquierdo o equivalente multivaso (Trombosis coronaria)",
    hytCategory: "Trombosis coronaria (Síndrome Coronario Agudo)",
    teachingNotes: "El supradesnivel del ST en aVR superior al de V1 con infradesnivel difuso en cara anterior y lateral indica oclusión crítica del tronco coronario izquierdo. La angioplastia coronaria de emergencia (ICP) precoz es la única terapia curativa.",
    clinicalExam: {
      physical: {
        pulmonary: "Crépitos húmedos ascendentes hasta campos medios bilaterales (Killip III).",
        cardiovascular: "Ruidos cardíacos taquicárdicos apagados, galope por 3er y 4to ruido.",
        perfusion: "Piel marmórea grisácea gélida empapada en sudor, llenado capilar 4s.",
        temperature: "36.4 °C"
      },
      pocus: {
        cardiac: "Acinesia extensa de pared anterior, septal y lateral con severa disfunción sistólica global (FEy < 20%).",
        lung: "Líneas B confluentes en bases y campos medios.",
        vci: "VCI 23 mm distendida con mínimo colapso."
      },
      labs: {
        gsa: "pH 7.24 | pCO2 38 | pO2 70 | HCO3 17 | Lactato 5.6 mmol/L",
        electrolytes: "K+ 4.3 | Na+ 137 | Cl- 101",
        glucose: "HGT: 178 mg/dL",
        others: "Troponina I ultrasensible: > 25.000 ng/L (Positiva máxima)"
      },
      history: {
        witness: "Esposa señala que el dolor empezó hace 45 minutos mientras miraba televisión y se intensificó hasta hacerlo llorar.",
        medications: "Metformina, Enalapril, Atorvastatina.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-96",
    title: "Caso 96: Rotura de Várices Esofágicas con hematemesis masiva, broncoaspiración y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Osvaldo Miranda",
      age: 58,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Cirrosis hepática por alcohol Child-Pugh C, antecedentes de várices esofágicas grado III.",
      presentation: "Hematemesis exanguinante a chorro (más de 1500 ml de sangre fresca en batea), melena profusa y pérdida de conocimiento con broncoaspiración."
    },
    initialVitals: {
      hr: 156,
      bp: "50/24",
      spo2: 68,
      etco2: 12,
      rr: 32,
      temp: 35.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Colapso Exanguinante con Microvoltaje",
      isStable: false,
      stabilityReason: "Shock hemorrágico exanguinante masivo (50/24), hipoxia por inundación hemática de vía aérea y coma.",
      consciousness: "Comatoso, inconsciente (AVPU: U)",
      airway: "Vía aérea completamente inundada con sangre rutilante activa",
      ivAccess: "Dos vías periféricas 14G y catéter venoso central"
    },
    degenerationMessage: "¡El paciente deja de respirar mientras brota sangre por boca y fosas nasales! Se pierde todo pulso palpable. El monitor ECG registra complejos a 125 lpm sin pulso (AESP por exanguinación y asfixia).",
    arrestVitals: {
      hr: 125,
      bp: "0/0",
      spo2: 0,
      etco2: 6,
      rr: 0,
      temp: 35.4,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP por Exanguinación)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 108,
      bp: "90/54",
      spo2: 95,
      etco2: 37,
      rr: 16,
      temp: 35.6,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con intubación endotraqueal de rescate, Terlipresina y transfusión masiva",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, balón de Sengstaken-Blakemore instalado hacia Endoscopía"
    },
    reversibleCause: "Shock hipovolémico hemorrágico masivo por sangrado variceal y asfixia por broncoaspiración (Hipovolemia / Hipoxia)",
    hytCategory: "Hipovolemia",
    teachingNotes: "En hematemesis masiva con PCR, la prioridad es intubación inmediata con aspiración continua, restitución de volumen con glóbulos rojos y plasma, vasoconstrictores esplácnicos (Terlipresina) y taponamiento con balón.",
    clinicalExam: {
      physical: {
        pulmonary: "Gorgoteo hemático continuo en orofaringe y tráquea, estertores húmedos bilaterales.",
        cardiovascular: "Ruidos cardíacos taquicárdicos casi inaudibles, pulsos periféricos impalpables.",
        perfusion: "Palidez cadavérica extrema, ictericia escleral franca, estigmas de hepatopatía crónica (arañas vasculares y ascitis).",
        temperature: "35.4 °C"
      },
      pocus: {
        cardiac: "Colapso biventricular sistólico severo ('kissing walls') por vaciamiento de volumen.",
        lung: "Líneas B bilaterales por inundación hemática alveolar.",
        vci: "VCI colapsada filiforme. Hígado cirrótico nodular pequeño con abundante líquido ascítico libre en abdomen."
      },
      labs: {
        gsa: "pH 7.04 | pCO2 40 | pO2 45 | HCO3 11 | Lactato 10.2 mmol/L",
        electrolytes: "K+ 5.2 | Na+ 130 | Cl- 98",
        glucose: "HGT: 90 mg/dL",
        others: "Hematocrito: 15% | Hemoglobina: 4.8 g/dL | INR: 2.8 | Plaquetas: 38.000"
      },
      history: {
        witness: "Hijo refiere que el paciente vomitó 3 litros de sangre oscura y roja brillante de golpe en el baño.",
        medications: "Espironolactona, Propranolol, Lactulosa.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-97",
    title: "Caso 97: Cardiotoxicidad por Doxorrubicina con tormenta arrítmica de TV polimórfica y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Loreto Albornoz",
      age: 48,
      gender: "F",
      location: "UCI Médica - Box 6",
      history: "Cáncer de mama tratado con quimioterapia acumulativa de antraciclinas (Doxorrubicina). Miocardiopatía tóxica con FEy 22%.",
      presentation: "Insuficiencia cardíaca congestiva descompensada, ortopnea, mareos constantes y extrasistolía ventricular frecuente en salvas."
    },
    initialVitals: {
      hr: 174,
      bp: "76/48",
      spo2: 90,
      etco2: 28,
      rr: 28,
      temp: 36.6,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Polimorfa Inestable con bajo voltaje difuso",
      isStable: false,
      stabilityReason: "Hipotensión severa (76/48), miocardiopatía dilatada tóxica terminal e inestabilidad ventricular.",
      consciousness: "Soporosa, confusa (AVPU: V)",
      airway: "Espontánea taquipneica con disnea",
      ivAccess: "Catéter Port-a-cath central y vía periférica 18G"
    },
    degenerationMessage: "¡El trazado ventricular se fragmenta en ondas fibrilatorias rápidas desorganizadas y la paciente entra en paro cardíaco por Fibrilación Ventricular sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 36.6,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 86,
      bp: "96/60",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 36.3,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular con soporte inotrópico de Milrinona y candidato a asistencia ventricular",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado a UCI Cardiológica"
    },
    reversibleCause: "Cardiomiopatía dilatada tóxica irreversible inducida por antraciclinas (Tóxicos)",
    hytCategory: "Tóxicos / Cardiotoxicidad",
    teachingNotes: "Las antraciclinas generan daño miocárdico directo mediado por radicales libres y fibrosis miocárdica extensa. El manejo de la tormenta arrítmica requiere desfibrilación y soporte inotrópico no catecolaminérgico.",
    clinicalExam: {
      physical: {
        pulmonary: "Crépitos bibasales finos en tercio inferior de ambos hemitórax.",
        cardiovascular: "Ruidos cardíacos apagados, galope por R3, desplazamiento del choque de la punta al 6° EIC línea axilar anterior.",
        perfusion: "Palidez cérea, frialdad acral moderada.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Ventrículo izquierdo severamente dilatado esférico con hipocinesia global difusa severa (FEy 20%). Insuficiencia mitral funcional moderada.",
        lung: "Líneas B en bases pulmonares.",
        vci: "VCI 22 mm distendida con mínimo colapso."
      },
      labs: {
        gsa: "pH 7.30 | pCO2 40 | pO2 78 | HCO3 19 | Lactato 3.8 mmol/L",
        electrolytes: "K+ 4.0 | Na+ 134 | Cl- 99",
        glucose: "HGT: 110 mg/dL",
        others: "BNP: 3.800 pg/mL | Troponina I: 0.24 ng/mL"
      },
      history: {
        witness: "Hermana refiere que la paciente completó su 6° ciclo de quimioterapia hace 1 mes y progresivamente toleraba menos caminar.",
        medications: "Carvedilol 6.25 mg, Furosemida 40 mg, Espironolactona 25 mg.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-98",
    title: "Caso 98: Tormenta Tiroidea con Fibrilación Auricular a 195 lpm y degeneración a TVSP",
    type: "taquicardia",
    arrestType: "TVSP",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Daniela Urzúa",
      age: 35,
      gender: "F",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Enfermedad de Graves-Basedow con abandono de tratamiento antitiroideo hace 3 meses.",
      presentation: "Fiebre alta (40.2 °C), agitación psicomotora extrema, temblores generalizados, bocio difuso con soplo, exoftalmos y palpitaciones torrenciales."
    },
    initialVitals: {
      hr: 195,
      bp: "84/40",
      spo2: 91,
      etco2: 28,
      rr: 32,
      temp: 40.2,
      rhythm: "FIBRILACION_AURICULAR",
      rhythmName: "Fibrilación Auricular con Respuesta Ventricular Rápida e Infradesnivel ST",
      isStable: false,
      stabilityReason: "Tormenta tiroidea descompensada (Score Burch-Wartofsky > 65), shock hiperdinámico e insuficiencia cardíaca de alto gasto.",
      consciousness: "Delirium agitado, luego estuporosa (AVPU: V)",
      airway: "Espontánea taquipneica profunda",
      ivAccess: "Dos vías periféricas 18G en ambos antebrazos"
    },
    degenerationMessage: "¡La paciente se desvanece por completo! Se apagan los pulsos periféricos y centrales. El trazo ECG degenera en complejos anchos regulares gigantes a 235 lpm sin pulso (TV sin pulso).",
    arrestVitals: {
      hr: 235,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 40.2,
      rhythm: "TVSP",
      rhythmName: "Taquicardia Ventricular Sin Pulso (TVSP)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "cardioversion_sincronizada"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 104,
      bp: "108/66",
      spo2: 97,
      etco2: 42,
      rr: 16,
      temp: 38.6,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con inicio de Propranolol EV, Propiltiouracilo/Metimazol e Hidrocortisona",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, enfriamiento activo en UCI"
    },
    reversibleCause: "Crisis tirotóxica hiperdinámica con toxicidad miocárdica por exceso de hormonas tiroideas (Tóxicos)",
    hytCategory: "Tóxicos / Trastorno Endocrino",
    teachingNotes: "En la tormenta tiroidea el exceso de T3/T4 hipersensibiliza los receptores beta-adrenérgicos. Requiere betabloqueadores (Propranolol), antitiroideos de síntesis, yodo inorgánico (Lugol) y corticoides.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos taquicárdicos violentos, soplo sistólico sobre glándula tiroides aumentada de tamaño.",
        perfusion: "Piel intensamente caliente, empapada en sudor, temblor fino de extremidades.",
        temperature: "40.2 °C"
      },
      pocus: {
        cardiac: "Cámaras cardíacas sumamente hiperdinámicas con acortamiento sistólico extremo.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 14 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.30 | pCO2 34 | pO2 82 | HCO3 17 | Lactato 3.9 mmol/L",
        electrolytes: "K+ 3.8 | Na+ 136 | Cl- 101",
        glucose: "HGT: 148 mg/dL",
        others: "TSH: < 0.01 uUI/mL | T4 Libre: > 7.7 ng/dL (Valores extremadamente elevados)"
      },
      history: {
        witness: "Madre relata que la paciente estaba muy ansiosa con insomnio de días, dejó el tiamazol hace meses y hoy comenzó con fiebre y delirio.",
        medications: "Ninguno activo.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-99",
    title: "Caso 99: Sobredosis accidental de Metadona con prolongación extrema del QTc y FV",
    type: "bradicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Mauricio San Martín",
      age: 42,
      gender: "M",
      location: "Domicilio - Asistencia SAMU",
      history: "Programa de mantención con Metadona para deshabituación de opioides. Uso concomitante de Ciprofloxacino por infección urinaria.",
      presentation: "Encontrado en su cama con respiración agónica superficial, cianosis perioral y pérdida brusca de respuesta motora."
    },
    initialVitals: {
      hr: 36,
      bp: "72/40",
      spo2: 70,
      etco2: 60,
      rr: 6,
      temp: 35.8,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Sinusal con Prolongación Severa del QTc (630 ms) y extrasístoles ventriculares en R sobre T",
      isStable: false,
      stabilityReason: "Depresión respiratoria por opioides, hipoxemia severa (70%) e intervalo QT críticamente prolongado.",
      consciousness: "Coma profundo, miosis bilateral (AVPU: U)",
      airway: "Obstrucción de vía aérea por lengua",
      ivAccess: "Vía periférica 18G en flexura"
    },
    degenerationMessage: "¡Un extrasístole ventricular cae directamente sobre el vértice de la onda T gigante y desencadena una Fibrilación Ventricular caótica sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 35.8,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 78,
      bp: "112/70",
      spo2: 98,
      etco2: 41,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras Naloxona, Sulfato de Magnesio y desfibrilación precoz",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y monitoreo de arritmias por vida media prolongada de metadona"
    },
    reversibleCause: "Efecto cardiotóxico de Metadona (bloqueo hERG) potenciado por fluoroquinolona con hipoxia secundaria (Tóxicos)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "La metadona bloquea los canales de potasio hERG prolongando significativamente el QT. Al combinarse con fármacos como ciprofloxacino o hipoxia, el riesgo de Torsades y FV aumenta drásticamente.",
    clinicalExam: {
      physical: {
        pulmonary: "Hipoexpansión torácica severa, estridor y ronquidos respiratorios.",
        cardiovascular: "Ruidos cardíacos muy lentos y espaciados.",
        perfusion: "Miosis marcada, cianosis labial, piel fría.",
        temperature: "35.8 °C"
      },
      pocus: {
        cardiac: "Contractilidad miocárdica deprimida bradicárdica previo al paro.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.10 | pCO2 76 | pO2 48 | HCO3 22 | Lactato 4.2 mmol/L",
        electrolytes: "K+ 3.6 | Mg2+ 1.4 | Ca2+ 1.16",
        glucose: "HGT: 94 mg/dL",
        others: "Screening toxicológico positivo para Metadona"
      },
      history: {
        witness: "Pareja refiere que el paciente tomó su jarabe de metadona habitual y agregó ciprofloxacino que le recetaron por cistitis.",
        medications: "Metadona 80 mg/día, Ciprofloxacino 500 mg c/12h.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-100",
    title: "Caso 100: Intoxicación por Monóxido de Carbono (CO) en espacio cerrado con colapso en Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Gloria Troncoso",
      age: 63,
      gender: "F",
      location: "Baño Domiciliario - Asistencia Médica SAMU",
      history: "Hipertensión arterial. Encontrada inconsciente en baño cerrado con calefón de gas defectuoso encendido.",
      presentation: "Coma profundo, relajación de esfínteres, coloración de piel sonrosada paradójica y respiración agónica casi imperceptible."
    },
    initialVitals: {
      hr: 26,
      bp: "52/28",
      spo2: 98,
      etco2: 14,
      rr: 4,
      temp: 35.6,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Ritmo Agónico Terminal por Hipoxia Tisular Histotóxica Anémica",
      isStable: false,
      stabilityReason: "Bloqueo del transporte de oxígeno por Carboxihemoglobina (> 50%), anoxia miocárdica y cerebral fulminante.",
      consciousness: "Coma profundo arrefléxico (AVPU: U)",
      airway: "Apnea obstructiva terminal",
      ivAccess: "Vía periférica 18G en dorso de mano derecha"
    },
    degenerationMessage: "¡El escaso complejo nodal desaparece por completo del monitor! Se confirma línea recta isoeléctrica horizontal en dos derivaciones ortogonales (Asistolia total).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 7,
      rr: 0,
      temp: 35.6,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia por Anoxia Tisular Grave",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 80,
      bp: "114/70",
      spo2: 100,
      etco2: 41,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras ventilación mecánica con O2 al 100% hiperbárico programado",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado a Unidad de Medicina Hiperbárica / UCI"
    },
    reversibleCause: "Intoxicación severa por monóxido de carbono con bloqueo del transporte y utilización de oxígeno celular (Hipoxia / Tóxicos)",
    hytCategory: "Hipoxia",
    teachingNotes: "El oxímetro de pulso estándar es engañoso: lee la carboxihemoglobina como si fuera oxihemoglobina reportando falsos SpO2 normales (98-100%). La administración de Oxígeno al 100% normobárico o hiperbárico acelera la eliminación del CO reduciendo su vida media de 320 min a < 80 min.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular casi inaudible por hipoventilación extrema bradipneica.",
        cardiovascular: "Ruidos cardíacos inaudibles en paro.",
        perfusion: "Coloración rosada 'rojo cereza' llamativa en labios y lechos ungueales a pesar del estado crítico agónico.",
        temperature: "35.6 °C"
      },
      pocus: {
        cardiac: "Acinesia miocárdica completa en asistolia.",
        lung: "Líneas A normales bilaterales, sin neumotórax.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.08 | pCO2 56 | pO2 88 | HCO3 15 | Lactato 8.2 mmol/L",
        electrolytes: "K+ 4.6 | Na+ 138 | Cl- 101",
        glucose: "HGT: 118 mg/dL",
        others: "Carboxihemoglobina (CoHb): 54% (Nivel letal > 50%)"
      },
      history: {
        witness: "Familiar refiere que la madre entró a ducharse hace 40 minutos, no respondía y al forzar la puerta había fuerte olor a combustión de gas.",
        medications: "Enalapril 20 mg.",
        allergies: "Sin alergias."
      }
    }
  }
];
