// Cases 51 to 75 for ACLS Simulator
export const CASES_51_75 = [
  {
    id: "caso-51",
    title: "Caso 51: STEMI Ínfero-posterior con compromiso de VD, bradicardia extrema y degeneración a FV",
    type: "bradicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Raúl Valenzuela",
      age: 58,
      gender: "M",
      location: "Box de Reanimación - Urgencias",
      history: "Dislipidemia, fumador activo (20 cig/día). Sin controles médicos.",
      presentation: "Dolor retroesternal opresivo irradiado a mandíbula y epigastrio, náuseas intensas y diaforesis profusa."
    },
    initialVitals: {
      hr: 34,
      bp: "76/42",
      spo2: 90,
      etco2: 30,
      rr: 24,
      temp: 36.2,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Sinusal Severa con Supradesnivel ST en II, III, aVF y V4R",
      isStable: false,
      stabilityReason: "Hipotensión severa (76/42), bradicardia extrema e hipoperfusión tisular.",
      consciousness: "Somnoliento, obnubilado",
      airway: "Espontánea permeable",
      ivAccess: "Vía venosa periférica 18G en MSD"
    },
    degenerationMessage: "¡El paciente pierde bruscamente el conocimiento! Palidece intensamente, entra en apnea y el monitor traza Fibrilación Ventricular gruesa de alta amplitud.",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.2,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina", "marcapasos"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 78,
      bp: "92/58",
      spo2: 96,
      etco2: 44,
      rr: 14,
      temp: 36.0,
      rhythm: "SINUSAL_ST_ELEVATION",
      rhythmName: "Ritmo Sinusal con Supradesnivel ST Ínfero-posterior (STEMI)",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM"
    },
    reversibleCause: "Oclusión trombótica aguda de arteria coronaria derecha (Trombosis coronaria)",
    hytCategory: "Trombosis coronaria (Síndrome Coronario Agudo)",
    teachingNotes: "El infarto de VD cursa con hipotensión y bradicardia dependiente de precarga. Evitar nitratos; reanimar con volumen y descarga rápida al degenerar a FV.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente, sin crépitos.",
        cardiovascular: "Ruidos cardíacos rítmicos muy lentos, ingurgitación yugular evidente a 45°.",
        perfusion: "Piel marmórea, sudoración fría, llenado capilar 4s.",
        temperature: "36.2 °C"
      },
      pocus: {
        cardiac: "Ventrículo derecho severamente dilatado e hipocinético. Ventrículo izquierdo con función preservada.",
        lung: "Líneas A normales bilateralmente, sin edema pulmonar.",
        vci: "VCI 23 mm distendida con nula variabilidad respiratoria."
      },
      labs: {
        gsa: "pH 7.28 | pCO2 38 | pO2 72 | HCO3 18 | Lactato 3.8 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 137 | Cl- 102",
        glucose: "HGT: 135 mg/dL",
        others: "Troponina I ultrasensible: 4.8 ng/mL (marcadamente elevada)"
      },
      history: {
        witness: "Esposa indica que el dolor comenzó hace 40 minutos mientras descansaba en el sillón.",
        medications: "Ninguno crónico.",
        allergies: "Sin alergias conocidas."
      }
    }
  },
  {
    id: "caso-52",
    title: "Caso 52: Cetoacidosis Diabética Extrema con respiración de Kussmaul y colapso en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Camila Lagos",
      age: 23,
      gender: "F",
      location: "Servicio de Urgencias - Box de Agudos",
      history: "Diabetes Mellitus Tipo 1 desde los 12 años. Suspensión de insulina por vómitos.",
      presentation: "Polipnea extrema, aliento cetónico frutal, dolor abdominal difuso y compromiso de conciencia."
    },
    initialVitals: {
      hr: 142,
      bp: "82/46",
      spo2: 95,
      etco2: 14,
      rr: 38,
      temp: 37.1,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal Compensatoria con Ondas T Picadas",
      isStable: false,
      stabilityReason: "Hipotensión severa (82/46), taquipnea profunda y acidosis metabólica extrema.",
      consciousness: "Soporosa, desorientada (AVPU: P)",
      airway: "Respiración de Kussmaul profunda",
      ivAccess: "Vía periférica 20G en flexura"
    },
    degenerationMessage: "¡La paciente deja de ventilar súbitamente! Cae la mandíbula, tono flácido y pulso carotídeo ausente. El monitor muestra complejo QRS ancho aberrante a 42 lpm sin pulso palpable (AESP).",
    arrestVitals: {
      hr: 42,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 37.1,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - QRS ancho)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 110,
      bp: "96/60",
      spo2: 98,
      etco2: 38,
      rr: 16,
      temp: 36.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con T normalizada post-bicarbonato y calcio",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado a UCI"
    },
    reversibleCause: "Acidosis metabólica extrema e hiperpotasemia secundaria (Hidrogeniones / Acidosis)",
    hytCategory: "Hidrogeniones (Acidosis severa)",
    teachingNotes: "En acidosis extrema (pH < 7.00) con AESP, el Bicarbonato de Sodio y el Gluconato de Calcio estabilizan la membrana miocárdica junto a expansión vigorosa.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular rudo bilateral, sin sibilancias ni estertores.",
        cardiovascular: "Ruidos cardíacos taquicárdicos apagados, pulsos periféricos impalpables.",
        perfusion: "Mucosas marcadamente secas, enoftalmos, signo del pliegue positivo.",
        temperature: "37.1 °C"
      },
      pocus: {
        cardiac: "Contractilidad miocárdica global disminuida, cámaras de volumen disminuido.",
        lung: "Patrón de líneas A bilaterales, pulmón seco.",
        vci: "VCI < 10 mm con colapso inspiratorio superior al 80% (depleción de volumen)."
      },
      labs: {
        gsa: "pH 6.89 | pCO2 18 | pO2 96 | HCO3 4.2 | Exceso de base -26 | Lactato 4.9 mmol/L",
        electrolytes: "K+ 7.2 | Na+ 129 | Cl- 98 | Osmolalidad 335 mOsm/kg",
        glucose: "HGT: 560 mg/dL (Cetonemia ++++)",
        others: "Cetonas en sangre: 6.8 mmol/L"
      },
      history: {
        witness: "Hermana refiere que no usaba su pluma de insulina hace 3 días por gastroenteritis aguda.",
        medications: "Insulina Glargina e Insulina Aspart.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-53",
    title: "Caso 53: Intoxicación digitálica severa con taquicardia bidireccional y degeneración a FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Ernesto Sepúlveda",
      age: 79,
      gender: "M",
      location: "Servicio de Medicina Interna - Sala de Hospitalizados",
      history: "Insuficiencia Cardíaca con FEy 28%, Fibrilación Auricular crónica, ERC etapa 3b.",
      presentation: "Náuseas, vómitos, visión con halos amarillos (xantopsia) y palpitaciones con mareos intensos."
    },
    initialVitals: {
      hr: 165,
      bp: "80/50",
      spo2: 92,
      etco2: 31,
      rr: 22,
      temp: 36.6,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Bidireccional (QRS con alternancia de eje)",
      isStable: false,
      stabilityReason: "Hipotensión sintomática (80/50), lipotimia y ritmo ventricular inestable.",
      consciousness: "Confuso, letárgico",
      airway: "Espontánea",
      ivAccess: "Vía periférica 20G en antebrazo izquierdo"
    },
    degenerationMessage: "¡Paciente colapsa con desviación de la mirada! Se ausenta el pulso central y el trazo ECG transmuta en Fibrilación Ventricular caótica desorganizada.",
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
      bp: "102/65",
      spo2: 96,
      etco2: 40,
      rr: 14,
      temp: 36.3,
      rhythm: "FIBRILACION_AURICULAR",
      rhythmName: "Fibrilación Auricular con cubeta digitálica y control de frecuencia",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y anticuerpos Fab anti-digoxina"
    },
    reversibleCause: "Sobredosis / acumulación de Digoxina en contexto de falla renal (Tóxicos)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "La TV bidireccional es patognomónica de toxicidad digitálica. Indicación de anticuerpos específicos Fab (DigiFab) y evitar choques innecesarios previos al paro.",
    clinicalExam: {
      physical: {
        pulmonary: "Estertores crepitantes basales bilaterales leves.",
        cardiovascular: "Ruidos arrítmicos y rápidos, soplo holosistólico en ápex.",
        perfusion: "Palidez generalizada, pulso irregularmente irregular filiforme.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Ventrículo izquierdo severamente dilatado con hipocinesia global difusa (FEy reducida).",
        lung: "Líneas B bilaterales en bases pulmonares.",
        vci: "VCI 20 mm con colapso disminuido < 50%."
      },
      labs: {
        gsa: "pH 7.34 | pCO2 40 | pO2 85 | HCO3 21 | Lactato 2.6 mmol/L",
        electrolytes: "K+ 5.8 | Na+ 136 | Creatinina 2.8 mg/dL | BUN 48 mg/dL",
        glucose: "HGT: 118 mg/dL",
        others: "Nivel plasmático de Digoxina: 4.6 ng/mL (Rango tóxico > 2.0)"
      },
      history: {
        witness: "Enfermera refiere que paciente aumentó la dosis de digoxina por error en domicilio hace 5 días.",
        medications: "Digoxina 0.25 mg/día, Furosemida 40 mg, Espironolactona 25 mg.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-54",
    title: "Caso 54: Hipotermia Profunda Accidental (28 °C) por inmersión con bradicardia y FV",
    type: "bradicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Mateo Carrasco",
      age: 34,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación Trauma",
      history: "Sin antecedentes mórbidos. Accidente en kayak en lago cordillerano en invierno.",
      presentation: "Rigidez corporal, cianosis acral, bradipnea severa, ropa mojada congelada y pupilas perezosas."
    },
    initialVitals: {
      hr: 28,
      bp: "68/38",
      spo2: 82,
      etco2: 18,
      rr: 6,
      temp: 28.1,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Severa con Ondas J de Osborn gigantes",
      isStable: false,
      stabilityReason: "Hipotermia grave (< 30°C), bradicardia extrema e hipotensión crítica.",
      consciousness: "Comatoso, no responde a la voz (AVPU: U)",
      airway: "Ventilación agónica bradipneica",
      ivAccess: "Vía periférica 16G en fosa antecubital"
    },
    degenerationMessage: "¡Durante la movilización para retirar ropa mojada, el paciente presenta contracción ventricular ectópica y degenera súbitamente a FV refractaria!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 28.1,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular por Hipotermia Grave",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "desfibrilar", "adrenalina", "amiodarona"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 64,
      bp: "98/62",
      spo2: 97,
      etco2: 41,
      rr: 12,
      temp: 32.4,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con atenuación de ondas J post-recalentamiento",
      pulsePresent: true,
      consciousness: "Comatoso, recalentamiento activo continuo en UCI"
    },
    reversibleCause: "Hipotermia accidental severa por inmersión en agua helada (Hipotermia)",
    hytCategory: "Hipotermia Accidental",
    teachingNotes: "En hipotermia grave (< 30°C), limitar las descargas a un máximo de 3 choques y espaciar adrenalina hasta que temp supere 30-32°C. 'Nadie está muerto hasta que está caliente y muerto'.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular disminuido bilateralmente por hipoventilación profunda.",
        cardiovascular: "Ruidos cardíacos distantes, muy bradicárdicos, rigidez de pared torácica.",
        perfusion: "Piel marmórea grisácea gélida al tacto, acrocianosis generalizada.",
        temperature: "28.1 °C (Termómetro esofágico central)"
      },
      pocus: {
        cardiac: "Contractilidad miocárdica bradicárdica lenta pero coordinada previo al colapso. Sin derrame.",
        lung: "Ausencia de neumotórax, líneas A normales.",
        vci: "VCI 14 mm con colapso variable."
      },
      labs: {
        gsa: "pH 7.18 (corregido por temp) | pCO2 52 | pO2 65 | HCO3 19 | Lactato 5.2 mmol/L",
        electrolytes: "K+ 3.8 | Na+ 140 | Ca2+ 1.15",
        glucose: "HGT: 145 mg/dL",
        others: "Hematocrito 48% (hemoconcentración por frío)"
      },
      history: {
        witness: "Compañero de rescate informa que cayó al agua helada y estuvo atrapado cerca de 45 minutos.",
        medications: "Ninguno.",
        allergies: "Sin alergias conocidas."
      }
    }
  },
  {
    id: "caso-55",
    title: "Caso 55: Sobredosis por Fentanilo con depresión respiratoria extrema y PCR en Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Nicolás Vera",
      age: 28,
      gender: "M",
      location: "Vía Pública - Asistencia SAMU Avanzado",
      history: "Consumo problemático de sustancias. Episodios previos de sobredosis.",
      presentation: "Encontrado inconsciente en el baño de un local nocturno, jeringa al lado, miosis puntiforme."
    },
    initialVitals: {
      hr: 38,
      bp: "70/40",
      spo2: 68,
      etco2: 65,
      rr: 4,
      temp: 35.8,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Sinusal Extrema Hipóxica",
      isStable: false,
      stabilityReason: "Insuficiencia respiratoria inminente (FR 4), hipoxemia severa (68%) y coma.",
      consciousness: "Coma profundo, Glasgow 3 (AVPU: U)",
      airway: "Obstrucción de vía aérea por caída de lengua, ruidos de estridor",
      ivAccess: "Vía venosa periférica 20G permeable en dorso de mano"
    },
    degenerationMessage: "¡El paciente presenta cianosis facial oscura generalizada, sobreviene apnea terminal y el trazado ECG colapsa en una línea plana isoeléctrica (Asistolia)!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 35.8,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia Verificada en 2 Derivaciones",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 82,
      bp: "108/68",
      spo2: 98,
      etco2: 39,
      rr: 14,
      temp: 36.0,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Normal tras Naloxona y Oxigenación",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, respuesta pupilar recuperada"
    },
    reversibleCause: "Intoxicación aguda por opioides con hipoxia severa secundaria (Tóxicos / Hipoxia)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En paro cardiorrespiratorio por opioides, la prioridad absoluta son las compresiones de alta calidad, ventilación con O2 al 100% y Naloxona 0.4-2 mg IV.",
    clinicalExam: {
      physical: {
        pulmonary: "Hipoexpansión torácica severa, estridor laríngeo alto, murmullo casi inaudible.",
        cardiovascular: "Tonos cardíacos apagados y espaciados, pulsos periféricos ausentes.",
        perfusion: "Cianosis peribucal y ungueal intensa, piel fría y húmeda.",
        temperature: "35.8 °C"
      },
      pocus: {
        cardiac: "Bradicinesia extrema progresiva hasta el paro completo. Ausencia de trombos en cavidades derechas.",
        lung: "Líneas A sin consolidaciones ni derrame.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.02 | pCO2 88 | pO2 42 | HCO3 22 | Lactato 4.8 mmol/L",
        electrolytes: "K+ 4.6 | Na+ 138 | Cl- 101",
        glucose: "HGT: 98 mg/dL",
        others: "Screening toxicológico de orina: Positivo fuerte para Opioides/Fentanilo"
      },
      history: {
        witness: "Amigo relata que consumió polvo blanco intravenoso hace 15 minutos y se desvaneció de inmediato.",
        medications: "Ninguno prescrito.",
        allergies: "Desconocidas."
      }
    }
  },
  {
    id: "caso-56",
    title: "Caso 56: TEP Masivo con colapso hemodinámico fulminante post-inmovilización y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Teresa Fuentes",
      age: 64,
      gender: "F",
      location: "Servicio de Traumatología - Piso de Hospitalizados",
      history: "Cirugía de prótesis de cadera hace 10 días, reposo en cama prolongado.",
      presentation: "Disnea súbita catastrófica, dolor torácico pleurítico punzante, angustia mortal y síncope al ponerse de pie."
    },
    initialVitals: {
      hr: 138,
      bp: "72/38",
      spo2: 74,
      etco2: 12,
      rr: 36,
      temp: 36.7,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Patrón S1Q3T3 y Bloqueo Incompleto de Rama Derecha",
      isStable: false,
      stabilityReason: "Shock obstructivo severo (72/38), hipoxemia refractaria y disnea extrema.",
      consciousness: "Obnubilada, diaforética (AVPU: V)",
      airway: "Taquipneica superficial con musculatura accesoria",
      ivAccess: "Vía periférica 18G en brazo derecho"
    },
    degenerationMessage: "¡La paciente se desvanece por completo! Palidez cérea, pulso carotídeo ausente y apnea. El monitor muestra ritmo sinusal taquicárdico a 125 lpm pero sin ninguna onda de pulso ni presión arterial (AESP).",
    arrestVitals: {
      hr: 125,
      bp: "0/0",
      spo2: 0,
      etco2: 9,
      rr: 0,
      temp: 36.7,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Ritmo Taquicárdico)",
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
      bp: "94/60",
      spo2: 94,
      etco2: 36,
      rr: 16,
      temp: 36.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal post-trombolisis exitosa con Alteplasa",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, traslado prioritario a UCI"
    },
    reversibleCause: "Tromboembolismo pulmonar masivo con sobrecarga aguda de cavidades derechas (Trombosis pulmonar)",
    hytCategory: "Trombosis pulmonar (TEP Masivo)",
    teachingNotes: "En AESP por sospecha clínica o confirmación de TEP masivo, la administración precoz de fibrinolíticos (Alteplasa 50 mg bolo IV) y RCP prolongada (hasta 60-90 min) salva vidas.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado simétrico, sin ruidos agregados, tórax resonante.",
        cardiovascular: "R2 marcadamente reforzado en foco pulmonar, ingurgitación yugular hasta el ángulo mandibular.",
        perfusion: "Asimetría en extremidad inferior izquierda con edema, empastamiento y calor local.",
        temperature: "36.7 °C"
      },
      pocus: {
        cardiac: "Ventrículo derecho severamente dilatado (signo de McConnell positivo: acinesia de pared libre con ápex preservado). Tabique interventricular aplanado hacia el VI en sístole y diástole (signo de la D).",
        lung: "Líneas A bilaterales sin condensación ni derrame.",
        vci: "VCI 25 mm pletórica sin colapso."
      },
      labs: {
        gsa: "pH 7.22 | pCO2 32 | pO2 48 | HCO3 16 | Lactato 4.9 mmol/L",
        electrolytes: "K+ 4.3 | Na+ 139 | Cl- 104",
        glucose: "HGT: 122 mg/dL",
        others: "Dímero D: > 10.000 ng/mL | Troponina T: 0.85 ng/mL (Positiva)"
      },
      history: {
        witness: "Kinesióloga del servicio señala que al iniciar la bipedestación la paciente refirió falta de aire fulminante y se desmayó.",
        medications: "Clexane profiláctico omitido por el paciente los últimos 2 días.",
        allergies: "Alergia a la Penicilina."
      }
    }
  },
  {
    id: "caso-57",
    title: "Caso 57: Torsades de Pointes por QT prolongado inducido por fármacos y colapso en FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Javiera Morales",
      age: 41,
      gender: "F",
      location: "Servicio de Urgencias - Box de Observación",
      history: "Gastroenteritis aguda severa con deshidratación. Tratada con Azitromicina y Ondansetrón EV.",
      presentation: "Episodios repetidos de palpitaciones sincópales rápidas, mareo rotatorio y palidez intensa."
    },
    initialVitals: {
      hr: 195,
      bp: "78/48",
      spo2: 91,
      etco2: 28,
      rr: 24,
      temp: 36.8,
      rhythm: "TORSADES",
      rhythmName: "Taquicardia Ventricular Polimorfa (Torsades de Pointes con QTc 580 ms)",
      isStable: false,
      stabilityReason: "Hipotensión severa (78/48), lipotimia recurrente e inestabilidad eléctrica.",
      consciousness: "Semiconsciente, confusa (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 20G en mano derecha"
    },
    degenerationMessage: "¡El trazado de Torsades se vuelve continuo, pierde su modulación helicoidal y degenera de golpe en una Fibrilación Ventricular caótica de alto voltaje sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 36.8,
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
      bp: "105/65",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con acortamiento del QT post-Sulfato de Magnesio",
      pulsePresent: true,
      consciousness: "Comatosa, candidata a TTM"
    },
    reversibleCause: "Intervalo QT adquirido prolongado por fármacos e hipomagnesemia/hipokalemia (Tóxicos)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En Torsades de Pointes el Sulfato de Magnesio 2g IV es el fármaco de elección. NUNCA usar amiodarona ni procainamida ya que prolongan aún más el QT.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular limpio bilateralmente.",
        cardiovascular: "Ruidos cardíacos taquicárdicos irregulares, pulsos periféricos muy débiles.",
        perfusion: "Palidez mucocutánea, sequedad de mucosas por deshidratación.",
        temperature: "36.8 °C"
      },
      pocus: {
        cardiac: "Función sistólica de ventrículo izquierdo conservada, cámaras de tamaño normal.",
        lung: "Ausencia de derrame pleural ni neumotórax.",
        vci: "VCI 11 mm con colapso inspiratorio superior al 70%."
      },
      labs: {
        gsa: "pH 7.46 | pCO2 36 | pO2 88 | HCO3 25 | Lactato 2.1 mmol/L",
        electrolytes: "K+ 3.1 mEq/L (Bajo) | Mg2+ 1.2 mg/dL (Muy bajo) | Ca2+ 1.18 mmol/L",
        glucose: "HGT: 92 mg/dL",
        others: "ECG basal previo reporta intervalo QTc en 585 ms"
      },
      history: {
        witness: "Pareja indica que vomitó durante 3 días y le administraron Ondansetrón y Azitromicina en centro ambulatorio.",
        medications: "Azitromicina 500 mg, Ondansetrón 8 mg.",
        allergies: "Sin alergias declaradas."
      }
    }
  },
  {
    id: "caso-58",
    title: "Caso 58: Shock Anafiláctico a medio de contraste radiológico con colapso y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Manuel Quintana",
      age: 52,
      gender: "M",
      location: "Servicio de Imagenología - Sala de Tomografía (TAC)",
      history: "Hipertensión arterial. Realizándose angioTAC por sospecha de patología vascular.",
      presentation: "Inmediatamente tras la inyección del contraste yodado presenta eritema facial, broncoespasmo severo, estridor y disfonía."
    },
    initialVitals: {
      hr: 148,
      bp: "62/34",
      spo2: 78,
      etco2: 18,
      rr: 32,
      temp: 37.0,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Alto Gasto",
      isStable: false,
      stabilityReason: "Colapso distributivo anafiláctico (62/34), edema laríngeo agudo e hipoxia.",
      consciousness: "Agitado, luego confuso (AVPU: V)",
      airway: "Estridor laríngeo inspiratorio severo, edema de úvula y labios",
      ivAccess: "Vía periférica 18G en flexura de codo"
    },
    degenerationMessage: "¡Edema de glotis ocluye totalmente la vía aérea! El paciente entra en apnea obstructiva, pierde el pulso carotídeo y el trazado ECG muestra complejos anchos a 52 lpm sin pulso (AESP).",
    arrestVitals: {
      hr: 52,
      bp: "0/0",
      spo2: 0,
      etco2: 9,
      rr: 0,
      temp: 37.0,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Bradicardia Extrema)",
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
      bp: "106/66",
      spo2: 98,
      etco2: 38,
      rr: 14,
      temp: 36.8,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con vía aérea asegurada y PA estabilizada",
      pulsePresent: true,
      consciousness: "Comatoso, intubado con tubo #7.5 vía cricotiroidotomía/quirúrgica a UCI"
    },
    reversibleCause: "Shock anafiláctico refractario con asfixia por angioedema laríngeo (Hipoxia / Hipovolemia)",
    hytCategory: "Hipoxia",
    teachingNotes: "En anafilaxia grave, la Adrenalina intramuscular o intravenosa precoz (0.5 mg IM o bolos titulados IV) junto a expansión masiva de fluidos previene el colapso en AESP.",
    clinicalExam: {
      physical: {
        pulmonary: "Sibilancias espiratorias generalizadas y ausencia de entrada de aire a nivel traqueal por estridor.",
        cardiovascular: "Taquicardia extrema con tonos apagados, colapso vascular periférico.",
        perfusion: "Exantema eritematoso urticariano confluente en tórax y cuello, angioedema facial marcado.",
        temperature: "37.0 °C"
      },
      pocus: {
        cardiac: "Cámaras cardíacas hiperdinámicas sin derrame pericárdico.",
        lung: "Líneas A normales bilaterales, sin neumotórax.",
        vci: "VCI < 10 mm colapsable completamente por shock distributivo."
      },
      labs: {
        gsa: "pH 7.15 | pCO2 62 | pO2 45 | HCO3 20 | Lactato 5.4 mmol/L",
        electrolytes: "K+ 4.4 | Na+ 138 | Cl- 102",
        glucose: "HGT: 130 mg/dL",
        others: "Triptasa sérica en curso"
      },
      history: {
        witness: "Tecnólogo médico de TAC señala que a los 20 segundos de pasar el medio de contraste el paciente gritó '¡me ahogo!' y se brotó entero.",
        medications: "Losartán 50 mg.",
        allergies: "Desconocidas para fármacos; antecedente de reacción alérgica a mariscos no consignada."
      }
    }
  },
  {
    id: "caso-59",
    title: "Caso 59: Síndrome de Brugada desenmascarado por fiebre alta con síncope y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Rodrigo Toledo",
      age: 38,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Sin antecedentes patológicos. Hermano menor fallecido súbitamente a los 32 años mientras dormía.",
      presentation: "Cuadro de 24 horas de fiebre en 39.5 °C por neumonía comunitaria. Palpitaciones intensas seguidas de pérdida de conocimiento."
    },
    initialVitals: {
      hr: 178,
      bp: "82/52",
      spo2: 93,
      etco2: 30,
      rr: 26,
      temp: 39.4,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Polimorfa con Elevación de ST en V1-V2 (Patrón Brugada Tipo 1 en aleta de tiburón)",
      isStable: false,
      stabilityReason: "Hipotensión sintomática (82/52), síncope recurrente y arritmia ventricular.",
      consciousness: "Confuso, balbuceante (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 20G en antebrazo derecho"
    },
    degenerationMessage: "¡El paciente emite un estertor agónico respiratorio, pierde el tono postural por completo y el monitor traza Fibrilación Ventricular caótica de alto voltaje sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 11,
      rr: 0,
      temp: 39.4,
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
      hr: 88,
      bp: "112/72",
      spo2: 97,
      etco2: 42,
      rr: 14,
      temp: 37.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con Patrón Brugada Tipo 1 persistente en V1-V2",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y antipiréticos agresivos"
    },
    reversibleCause: "Canalopatía cardíaca hereditaria (Síndrome de Brugada) descompensada por hipertermia febril",
    hytCategory: "Tóxicos / Desencadenante ambiental o febril",
    teachingNotes: "En el Síndrome de Brugada la fiebre alta precipita arritmias ventriculares letales. Es mandatorio tratar activamente la fiebre con antipiréticos EV y evitar fármacos antiarrítmicos bloqueadores de Na+ (como lidocaína o procainamida).",
    clinicalExam: {
      physical: {
        pulmonary: "Crpitantes bronquiales en base pulmonar derecha.",
        cardiovascular: "Ruidos cardíacos taquicárdicos, sin soplos.",
        perfusion: "Piel caliente, sudorosa, eritematosa.",
        temperature: "39.4 °C"
      },
      pocus: {
        cardiac: "Estructura cardíaca anatómicamente normal, buena fracción de eyección biventricular.",
        lung: "Consolidación focal en lóbulo inferior derecho con broncograma aéreo.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.35 | pCO2 35 | pO2 78 | HCO3 22 | Lactato 2.4 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 136 | Cl- 101",
        glucose: "HGT: 104 mg/dL",
        others: "PCR: 140 mg/L | Leucocitosis: 16.500/uL"
      },
      history: {
        witness: "Esposa refiere que el paciente estaba con neumonía desde ayer y de pronto empezó con temblores y se desmayó en el baño.",
        medications: "Paracetamol oral ocasional.",
        allergies: "Sin alergias conocidas."
      }
    }
  },
  {
    id: "caso-60",
    title: "Caso 60: Coma Hipoglicémico Severo (HGT 20 mg/dL) con bradiarritmia extrema y Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Gladys Cárdenas",
      age: 72,
      gender: "F",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Diabetes Mellitus Tipo 2, Insuficiencia Renal Crónica etapa 4. Uso de Glibenclamida.",
      presentation: "Encontrada por familiares en coma profundo, fría, intensamente empapada en sudor, sin respuesta verbal ni motora."
    },
    initialVitals: {
      hr: 32,
      bp: "74/42",
      spo2: 89,
      etco2: 24,
      rr: 8,
      temp: 35.4,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Ritmo de Escape Nodal con Bradicardia Severa Hipoglicémica",
      isStable: false,
      stabilityReason: "Neuroglucopenia profunda, coma (Glasgow 3), hipotensión y bradicardia extrema.",
      consciousness: "Coma profundo arrefléxico (AVPU: U)",
      airway: "Respiración estertorosa superficial",
      ivAccess: "Vía periférica 20G en mano izquierda"
    },
    degenerationMessage: "¡La paciente cesa todo esfuerzo respiratorio espontáneo! Palidez cadavérica y el trazo ECG cae en una línea horizontal plana (Asistolia total).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 35.4,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia Confirmada en 2 Derivaciones",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 74,
      bp: "114/70",
      spo2: 97,
      etco2: 40,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras corrección de glicemia y RCP",
      pulsePresent: true,
      consciousness: "Recupera apertura ocular y respuesta a la voz (Glasgow 10)"
    },
    reversibleCause: "Hipoglicemia severa inducida por acumulación de sulfonilurea (Glibenclamida) en ERC",
    hytCategory: "Hipoglicemia",
    teachingNotes: "El Hemoglucotest es mandatorio en todo paciente con compromiso de conciencia o PCR. La infusión de Glucosa hipertónica al 50% EV revierte la neuroglucopenia y previene el daño cerebral irreversible.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado simétrico bilateral.",
        cardiovascular: "Ruidos cardíacos rítmicos muy apagados.",
        perfusion: "Diaforesis profusa fría 'bañada en sudor', piel pálida y fría.",
        temperature: "35.4 °C"
      },
      pocus: {
        cardiac: "Bradicinesia marcada previo al paro. Sin derrame pericárdico ni hipertrofia patológica.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.29 | pCO2 44 | pO2 76 | HCO3 19 | Lactato 3.1 mmol/L",
        electrolytes: "K+ 4.0 | Na+ 141 | Creatinina 2.9 mg/dL | ClCr estimado 18 mL/min",
        glucose: "HGT: 20 mg/dL (Hipoglicemia severa crítica)",
        others: "Toxicología: Sulfonilureas presentes"
      },
      history: {
        witness: "Hija refiere que la paciente no almorzó pero se tomó su dosis habitual de Glibenclamida por la mañana.",
        medications: "Glibenclamida 5 mg c/12h, Losartán 50 mg.",
        allergies: "Sin alergias conocidas."
      }
    }
  },
  {
    id: "caso-61",
    title: "Caso 61: Ruptura de Músculo Papilar e Insuficiencia Mitral Aguda post-IAM con AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Sergio Pino",
      age: 67,
      gender: "M",
      location: "Unidad Coronaria (UCO) - 3er día post-IAM inferior",
      history: "IAM de pared inferior tratado tardíamente hace 72 horas.",
      presentation: "Disnea súbita extrema, esputo asalmonado rosado espumoso por boca y nariz, hipotensión catastrófica."
    },
    initialVitals: {
      hr: 135,
      bp: "64/38",
      spo2: 72,
      etco2: 15,
      rr: 38,
      temp: 36.5,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Sobrecarga Auricular Izquierda",
      isStable: false,
      stabilityReason: "Shock cardiogénico mecánico catastrófico (64/38), edema agudo pulmonar masivo.",
      consciousness: "Obnubilado, disneico terminal (AVPU: V)",
      airway: "Abundante secreción rosada espumosa en vía aérea",
      ivAccess: "Vía venosa central yugular derecha"
    },
    degenerationMessage: "¡El paciente pierde el conocimiento mientras borbotea líquido pulmonar espumoso! Pulso carotídeo ausente. El monitor muestra ritmo sinusal taquicárdico a 118 lpm sin pulso (AESP).",
    arrestVitals: {
      hr: 118,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 36.5,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Mecánica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 96,
      bp: "90/55",
      spo2: 95,
      etco2: 38,
      rr: 14,
      temp: 36.1,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con soporte inotrópico y preparación quirúrgica",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, traslado urgente a Pabellón Cardíaco"
    },
    reversibleCause: "Complicación mecánica post-infarto: ruptura aguda de músculo papilar posteromedial (Trombosis coronaria)",
    hytCategory: "Trombosis coronaria (Complicación Mecánica)",
    teachingNotes: "El POCUS identifica el prolapso/flail de la valva mitral y el jet de regurgitación masivo. Requiere estabilización inmediata con intubación, vasopresores y cirugía cardíaca urgente.",
    clinicalExam: {
      physical: {
        pulmonary: "Estertores crepitantes en marea ascendente hasta ambos vértices pulmonares.",
        cardiovascular: "Soplo holosistólico grado IV/VI áspero en ápex irradiado a axila de nueva aparición.",
        perfusion: "Piel marmórea grisácea fría, cianosis central intensa.",
        temperature: "36.5 °C"
      },
      pocus: {
        cardiac: "Valva mitral posterior con movimiento descontrolado hacia aurícula izquierda en sístole ('flail leaflet') y músculo papilar roto móvil. Insuficiencia mitral masiva.",
        lung: "Líneas B confluentes masivas ('pulmón blanco') bilateralmente.",
        vci: "VCI 22 mm distendida."
      },
      labs: {
        gsa: "pH 7.12 | pCO2 56 | pO2 44 | HCO3 17 | Lactato 5.8 mmol/L",
        electrolytes: "K+ 4.5 | Na+ 137 | Cl- 103",
        glucose: "HGT: 140 mg/dL",
        others: "Troponina I: 8.5 ng/mL"
      },
      history: {
        witness: "Médico de turno refiere que el paciente estaba estable recuperándose de un IAM posteroinferior cuando comenzó con disnea explosiva.",
        medications: "Aspirina, Clopidogrel, Atorvastatina.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-62",
    title: "Caso 62: Miocardiopatía Hipertrófica Obstructiva en joven deportista con FV en cancha",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Agustín Benítez",
      age: 21,
      gender: "M",
      location: "Complejo Deportivo - Asistencia Extrahospitalaria SAMU",
      history: "Futbolista universitario. Antecedente de fatiga de esfuerzo en los últimos partidos.",
      presentation: "Síncope súbito de esfuerzo al terminar una carrera rápida en partido de fútbol."
    },
    initialVitals: {
      hr: 185,
      bp: "74/46",
      spo2: 90,
      etco2: 29,
      rr: 28,
      temp: 37.4,
      rhythm: "TV_MONOMORFA",
      rhythmName: "Taquicardia Ventricular Monomorfa con Hipertrofia Ventricular Severa",
      isStable: false,
      stabilityReason: "Hipotensión severa (74/46), síncope de esfuerzo y arritmia ventricular sostenida.",
      consciousness: "Obnubilado, responde sólo a estímulo doloroso (AVPU: P)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El deportista pierde bruscamente el conocimiento! Se desploma en el pasto, tono postural abolido, entra en apnea y el DEA/monitor detecta Fibrilación Ventricular gruesa.",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 37.4,
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
      hr: 84,
      bp: "110/70",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 36.8,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con ondas Q profundas y criterios de Cornell para HVI",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM y estudio electrofisiológico/CDI"
    },
    reversibleCause: "Isquemia subendocárdica y arritmogénesis por Miocardiopatía Hipertrófica Obstructiva (MHO)",
    hytCategory: "Trombosis coronaria / Cardiopatía Estructural",
    teachingNotes: "Causa principal de muerte súbita en atletas jóvenes. El acceso precoz a desfibrilación con DEA en recintos deportivos eleva la sobrevida por sobre el 70%.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Soplo mesosistólico eyectivo en foco aórtico y borde esternal izquierdo que aumenta con maniobra de Valsalva.",
        perfusion: "Palidez cutánea, pulso bisferiens palpable previo al paro.",
        temperature: "37.4 °C"
      },
      pocus: {
        cardiac: "Septum interventricular marcadamente engrosado (28 mm) asimétrico, movimiento anterior sistólico (SAM) de valva mitral.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.32 | pCO2 38 | pO2 86 | HCO3 20 | Lactato 3.0 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 139 | Cl- 101",
        glucose: "HGT: 108 mg/dL",
        others: "Troponina T: 0.12 ng/mL"
      },
      history: {
        witness: "Compañero de equipo relata que el paciente corrió a disputar una pelota, se agarró el pecho y cayó desplomado.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-63",
    title: "Caso 63: Neumotórax a Tensión iatrogénico post-vía venosa central con colapso en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Lorena Guzmán",
      age: 49,
      gender: "F",
      location: "UCI Médica - Cama 4",
      history: "Shock séptico en resolución. Punción de vena subclavia derecha realizada hace 20 minutos.",
      presentation: "Desaturación brusca, disnea extrema, taquicardia galopante y asimetría de excursión torácica."
    },
    initialVitals: {
      hr: 144,
      bp: "68/36",
      spo2: 76,
      etco2: 16,
      rr: 34,
      temp: 37.2,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con bajo voltaje",
      isStable: false,
      stabilityReason: "Hipotensión extrema (68/36), hipoxemia severa (76%) e hiperinsuflación unilateral.",
      consciousness: "Agitada, sudorosa, luego desvanecida (AVPU: V)",
      airway: "Ventilación asistida con BVM dificultosa (alta resistencia)",
      ivAccess: "Vía periférica 18G en brazo izquierdo"
    },
    degenerationMessage: "¡El tórax derecho queda totalmente congelado en hiperexpansión! El paciente pierde el pulso carotídeo y la presión cae a cero. El monitor muestra ritmo sinusal a 130 lpm sin pulso palpable (AESP).",
    arrestVitals: {
      hr: 130,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 37.2,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Ritmo Taquicárdico Rápido)",
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
      bp: "116/74",
      spo2: 98,
      etco2: 40,
      rr: 14,
      temp: 37.0,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Normal tras Toracocentesis Descompresiva",
      pulsePresent: true,
      consciousness: "Sedada, intubada, pleurostomía con trampa de agua instalada"
    },
    reversibleCause: "Neumotórax a tensión derecho por punción de cúpula pleural durante abordaje subclavio (Neumotórax)",
    hytCategory: "Neumotórax a Tensión",
    teachingNotes: "El neumotórax a tensión colapsa el retorno venoso a la aurícula derecha. El tratamiento es INMEDIATO con descompresión con aguja en 2° espacio intercostal LMC o 5° EIC línea axilar anterior sin esperar radiografía.",
    clinicalExam: {
      physical: {
        pulmonary: "Abolición completa del murmullo pulmonar en hemitórax derecho, timpanismo resonante a la percusión.",
        cardiovascular: "Desviación traqueal visible hacia la izquierda, ingurgitación yugular bilateral masiva a 90°.",
        perfusion: "Cianosis cervicofacial, piel fría y sudorosa.",
        temperature: "37.2 °C"
      },
      pocus: {
        cardiac: "Colapso diastólico de cavidades derechas por compresión extrínseca intratorácica.",
        lung: "Ausencia de deslizamiento pleural ('lung sliding') en hemitórax derecho. Signo de la estratosfera / código de barras en modo M. 'Punto pulmón' visualizado lateralmente.",
        vci: "VCI 26 mm pletórica sin colapso respiratorio."
      },
      labs: {
        gsa: "pH 7.18 | pCO2 58 | pO2 46 | HCO3 19 | Lactato 4.6 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 140 | Cl- 103",
        glucose: "HGT: 115 mg/dL",
        others: "Gases arteriales confirman hipoxemia e hipercapnia severa"
      },
      history: {
        witness: "Beca de anestesia informa que la punción subclavia fue dificultosa y requirió múltiples intentos con aspiración de aire.",
        medications: "Noradrenalina en dosis bajas.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-64",
    title: "Caso 64: Taponamiento Cardíaco Hemorrágico post-cirugía cardíaca con Tríada de Beck y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Víctor Henríquez",
      age: 63,
      gender: "M",
      location: "UCI Cardiovascular - Postoperatorio Inmediato Cirugía By-pass",
      history: "Cirugía de revascularización miocárdica (puentes coronarios) hace 6 horas.",
      presentation: "Cese súbito del débito por los drenajes mediastínicos ('tubos tapados con coágulos') seguido de hipotensión profunda."
    },
    initialVitals: {
      hr: 132,
      bp: "70/52",
      spo2: 88,
      etco2: 20,
      rr: 26,
      temp: 36.2,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con Alternancia Eléctrica (variación cíclica de amplitud del QRS)",
      isStable: false,
      stabilityReason: "Tríada de Beck clásica: Hipotensión (70/52 con presión de pulso pinzada), ruidos cardíacos apagados y yugulares ingurgitadas.",
      consciousness: "Soporoso, sudoroso (AVPU: V)",
      airway: "Intubado conectado a ventilador mecánico",
      ivAccess: "Catéter venoso central yugular interno y línea arterial radial"
    },
    degenerationMessage: "¡La presión arterial en la línea arterial radial colapsa a una línea plana! Pérdida inmediata de pulso femoral y carotídeo. El monitor conserva complejos QRS regulares a 110 lpm sin pulso (AESP).",
    arrestVitals: {
      hr: 110,
      bp: "0/0",
      spo2: 0,
      etco2: 9,
      rr: 0,
      temp: 36.2,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Taponamiento)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 86,
      bp: "112/68",
      spo2: 99,
      etco2: 41,
      rr: 14,
      temp: 36.4,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con recuperación hemodinámica post-evacuación pericárdica",
      pulsePresent: true,
      consciousness: "Bajo sedación y analgesia en ventilación mecánica protegida"
    },
    reversibleCause: "Taponamiento pericárdico por coágulos retenidos en el saco pericárdico (Taponamiento cardíaco)",
    hytCategory: "Taponamiento Cardíaco",
    teachingNotes: "En el postoperatorio de cirugía cardíaca el cese brusco del drenaje torácico junto a hipotensión y pulso paradójico indica taponamiento. La re-esternotomía / pericardiocentesis es mandatoria.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos distantes muy velados e inaudibles. Pulso paradójico > 20 mmHg.",
        perfusion: "Ingurgitación yugular franca visible por sobre el borde mandibular.",
        temperature: "36.2 °C"
      },
      pocus: {
        cardiac: "Derrame pericárdico circunferencial significativo con ecos densos (coágulos hemáticos). Colapso diastólico de aurícula derecha y ventrículo derecho. Variación respiratoria del flujo mitral > 30%.",
        lung: "Líneas A normales sin neumotórax.",
        vci: "VCI 24 mm pletórica fija sin colapso."
      },
      labs: {
        gsa: "pH 7.21 | pCO2 45 | pO2 82 | HCO3 18 | Lactato 4.8 mmol/L",
        electrolytes: "K+ 4.4 | Na+ 138 | Cl- 102",
        glucose: "HGT: 128 mg/dL",
        others: "Hematocrito 27% (anemia aguda postquirúrgica) | INR 1.6"
      },
      history: {
        witness: "Enfermera de intensivo informa que drenaba 200 ml/hora de sangre fresca y súbitamente el débito cayó a cero con caída brusca de la PAM a 40 mmHg.",
        medications: "Sedación con Propofol y Remifentanilo.",
        allergies: "Sin alergias conocidas."
      }
    }
  },
  {
    id: "caso-65",
    title: "Caso 65: Taquicardia Supraventricular Paroxística a 225 lpm con isquemia crítica y TV sin pulso",
    type: "taquicardia",
    arrestType: "TVSP",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Claudia Méndez",
      age: 46,
      gender: "F",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Episodios de taquicardia paroxística no estudiada. Fumadora ocasional.",
      presentation: "Palpitaciones angustiantes 'como un motor desbocado en el cuello', mareos intensos y opresión precordial."
    },
    initialVitals: {
      hr: 225,
      bp: "78/48",
      spo2: 92,
      etco2: 30,
      rr: 26,
      temp: 36.6,
      rhythm: "TAQUICARDIA_SUPRAVENTRICULAR",
      rhythmName: "Taquicardia por Reentrada Nodal AV (AVNRT) a 225 lpm con Infradesnivel ST",
      isStable: false,
      stabilityReason: "Hipotensión sintomática (78/48), dolor isquémico torácico anginoso y lipotimia.",
      consciousness: "Lipotímica, ansiosa (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en fosa antecubital izquierda"
    },
    degenerationMessage: "¡Durante el intento de maniobras vagales la paciente pierde la visión y el conocimiento! Cae en coma y el trazado degenera en Taquicardia Ventricular de complejo ancho muy rápida sin pulso palpable.",
    arrestVitals: {
      hr: 240,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.6,
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
      hr: 76,
      bp: "114/72",
      spo2: 98,
      etco2: 43,
      rr: 14,
      temp: 36.4,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular con resolución del infradesnivel ST",
      pulsePresent: true,
      consciousness: "Despierta progresivamente, responde a la voz (Glasgow 13)"
    },
    reversibleCause: "Isquemia miocárdica crítica por frecuencia ventricular extrema no tolerada (Trombosis coronaria / Taquiarritmia)",
    hytCategory: "Trombosis coronaria (Isquemia por Demanda)",
    teachingNotes: "En TSV inestable con pulso la cardioversión sincronizada (50-100J) o Adenosina rápida (6 mg IV) deben aplicarse con premura antes de que degenere a TV sin pulso o FV.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos rítmicos taquicárdicos incalculables por palpación periférica. Latido venoso visible en cuello (signo de onda 'a' cañón).",
        perfusion: "Palidez generalizada, sudoración fría en frente y palmas.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Contracción miocárdica sumamente rápida con llenado diastólico ventricular severamente acortado.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.33 | pCO2 36 | pO2 84 | HCO3 19 | Lactato 3.1 mmol/L",
        electrolytes: "K+ 4.0 | Na+ 139 | Cl- 102",
        glucose: "HGT: 106 mg/dL",
        others: "Troponina I: 0.28 ng/mL (leve elevación por demanda hemodinámica)"
      },
      history: {
        witness: "Hermana refiere que estaba en una reunión familiar, tomó café y de golpe sintió el aleteo incontrolable en el pecho.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-66",
    title: "Caso 66: Intoxicación por Antidepresivos Tricíclicos (Amitriptilina) con QRS ensanchado y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Julián Oyarzún",
      age: 31,
      gender: "M",
      location: "Servicio de Urgencias - Box de Agudos",
      history: "Trastorno depresivo mayor. Tratamiento con Amitriptilina.",
      presentation: "Encontrado en su domicilio con frascos vacíos de Amitriptilina (30 comprimidos de 75 mg). Convulsión tónico-clónica previa al ingreso."
    },
    initialVitals: {
      hr: 152,
      bp: "72/40",
      spo2: 90,
      etco2: 28,
      rr: 22,
      temp: 38.1,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con QRS extremadamente ancho (180 ms) y onda R > 3 mm en aVR",
      isStable: false,
      stabilityReason: "Hipotensión refractaria (72/40), bloqueo de canales de sodio cardíacos y depresión del SNC.",
      consciousness: "Comatoso postictal, mioclonías periorales (AVPU: P)",
      airway: "Vía aérea con riesgo de aspiración, reflejo nauseoso disminuido",
      ivAccess: "Vía periférica 18G en dorso de mano derecha"
    },
    degenerationMessage: "¡El complejo QRS se ensancha progresivamente fusionándose con la onda T y el paciente cae en Fibrilación Ventricular incoordinada de alto voltaje sin pulso carotídeo!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 11,
      rr: 0,
      temp: 38.1,
      rhythm: "FV",
      rhythmName: "Fibrilación Ventricular (FV por Cardiotoxicidad)",
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
      bp: "108/66",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 37.4,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con QRS estrechado tras Bicarbonato de Sodio molar",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, alcalinización sérica continua con bicarbonato"
    },
    reversibleCause: "Intoxicación aguda por Amitriptilina con bloqueo masivo de canales de sodio cardíacos (Tóxicos / Hidrogeniones)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En intoxicación por tricíclicos con QRS > 100 ms o hipotensión, el Bicarbonato de Sodio 8.4% (1-2 mEq/kg en bolo EV) es el antídoto específico al desplazar el fármaco del canal de sodio.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular presente simétrico bilateral.",
        cardiovascular: "Taquicardia rítmica con ruidos cardíacos secos.",
        perfusion: "Midriasis bilateral reactiva lenta, boca y axilas completamente secas (signos anticolinérgicos).",
        temperature: "38.1 °C"
      },
      pocus: {
        cardiac: "Depresión moderada de contractilidad miocárdica global por cardiotoxicidad.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 14 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.22 | pCO2 48 | pO2 78 | HCO3 19 | Lactato 4.2 mmol/L",
        electrolytes: "K+ 4.6 | Na+ 137 | Cl- 101",
        glucose: "HGT: 124 mg/dL",
        others: "Screening toxicológico positivo para Antidepresivos Tricíclicos"
      },
      history: {
        witness: "Madre encontró carta de despedida y cajas vacías de amitriptilina hace 1 hora.",
        medications: "Amitriptilina 75 mg/día.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-67",
    title: "Caso 67: Hipocalcemia Severa sintomática post-tiroidectomía con Torsades y FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Marcela Navarrete",
      age: 44,
      gender: "F",
      location: "Servicio de Cirugía - Cama 12",
      history: "Tiroidectomía total por bocio multinodular realizada hace 48 horas.",
      presentation: "Parestesias peribucales intensas, espasmo carpopedal doloroso (mano en comadrona), estridor y palpitaciones."
    },
    initialVitals: {
      hr: 172,
      bp: "82/50",
      spo2: 91,
      etco2: 29,
      rr: 26,
      temp: 36.7,
      rhythm: "TORSADES",
      rhythmName: "Torsades de Pointes con QTc de 610 ms (Prolongación extrema del segmento ST)",
      isStable: false,
      stabilityReason: "Hipotensión severa (82/50), tetania muscular e inestabilidad arrítmica ventricular.",
      consciousness: "Agitada, dolorida, luego estuporosa (AVPU: V)",
      airway: "Espasmo laríngeo incipiente",
      ivAccess: "Vía periférica 20G en antebrazo derecho"
    },
    degenerationMessage: "¡El trazado ventricular helicoidal se torna caótico de ultra alta frecuencia y la paciente entra en paro cardíaco por Fibrilación Ventricular sin pulso!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
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
      hr: 78,
      bp: "116/74",
      spo2: 98,
      etco2: 41,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con normalización del intervalo QT post-Gluconato de Calcio",
      pulsePresent: true,
      consciousness: "Comatosa, intubada, reposición continua de calcio y magnesio EV"
    },
    reversibleCause: "Hipocalcemia aguda severa por hipoparatiroidismo quirúrgico iatrogénico (Electrolitos)",
    hytCategory: "Hipo / Hiperkalemia y Electrolitos",
    teachingNotes: "La hipocalcemia prolonga el segmento ST y el intervalo QT predisponiendo a Torsades y FV. El tratamiento inmediato es Gluconato de Calcio al 10% (10-20 ml en infusión lenta en 10 min).",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos taquicárdicos irregulares. Signo de Trousseau positivo marcado al inflar el manguito de PA. Signo de Chvostek positivo en mejilla.",
        perfusion: "Palidez mucocutánea, rigidez flexora de extremidades superiores.",
        temperature: "36.7 °C"
      },
      pocus: {
        cardiac: "Función sistólica conservada, sin valvulopatías ni derrame.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.44 | pCO2 38 | pO2 88 | HCO3 24 | Lactato 2.2 mmol/L",
        electrolytes: "Calcio iónico: 0.62 mmol/L (Normal 1.15-1.30) | K+ 3.8 | Mg2+ 1.5",
        glucose: "HGT: 98 mg/dL",
        others: "PTH intacta sérica: < 3 pg/mL (indetectable)"
      },
      history: {
        witness: "Enfermera de sala refiere que la paciente empezó con calambres en las manos y espasmos antes de desvanecerse.",
        medications: "Levotiroxina 100 mcg (iniciada postquirúrgica).",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-68",
    title: "Caso 68: Rotura de Aneurisma de Aorta Abdominal con shock hemorrágico masivo y AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Hernán Garrido",
      age: 74,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación Vascular",
      history: "Tabaquismo severo (50 paquetes/año), EPOC, Hipertensión arterial.",
      presentation: "Dolor abdominal y lumbar desgarrante de inicio brutal hace 30 minutos, palidez marmórea y colapso circulatorio."
    },
    initialVitals: {
      hr: 145,
      bp: "58/30",
      spo2: 84,
      etco2: 14,
      rr: 34,
      temp: 35.8,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal Extrema Hipovolémica con bajo voltaje",
      isStable: false,
      stabilityReason: "Shock hipovolémico hemorrágico exanguinante (58/30), colapso vascular periférico.",
      consciousness: "Estuporoso, desorientado (AVPU: P)",
      airway: "Respiración agónica taquipneica superficial",
      ivAccess: "Dos vías periféricas 14G y 16G en extremidades superiores"
    },
    degenerationMessage: "¡El pulso periférico y carotídeo desaparecen simultáneamente! Palidez cadavérica total y apnea. El monitor ECG registra complejos sinuosales a 120 lpm sin pulso (AESP por exanguinación).",
    arrestVitals: {
      hr: 120,
      bp: "0/0",
      spo2: 0,
      etco2: 7,
      rr: 0,
      temp: 35.8,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Exanguinación Hipovolémica)",
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
      bp: "92/56",
      spo2: 95,
      etco2: 37,
      rr: 16,
      temp: 35.5,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal con infusión masiva de hemoderivados (1:1:1)",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, clampaje aórtico de urgencia en pabellón"
    },
    reversibleCause: "Rotura de aneurisma aórtico abdominal infrarrenal con hemorragia retroperitoneal masiva (Hipovolemia)",
    hytCategory: "Hipovolemia",
    teachingNotes: "En shock hemorrágico masivo, la RCP compresiva es inútil sin restitución de volumen urgente: protocolo de transfusión masiva (glóbulos rojos, plasma y plaquetas 1:1:1) y control quirúrgico del sangrado.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado simétrico bilateral.",
        cardiovascular: "Ruidos cardíacos taquicárdicos casi inaudibles, pulsos periféricos femorales ausentes.",
        perfusion: "Piel marmórea grisácea gélida, abdomen distendido doloroso con masa pulsátil palpable en mesogastrio.",
        temperature: "35.8 °C"
      },
      pocus: {
        cardiac: "Cámaras cardíacas colapsadas 'en beso' ('kissing walls') por vaciamiento sistólico extremo.",
        lung: "Líneas A normales sin hemotórax.",
        vci: "VCI filiforme (< 5 mm) completamente colapsada. Aorta abdominal con dilatación aneurismática de 7.5 cm con hematoma retroperitoneal activo."
      },
      labs: {
        gsa: "pH 7.08 | pCO2 34 | pO2 70 | HCO3 12 | Lactato 8.5 mmol/L",
        electrolytes: "K+ 5.1 | Na+ 136 | Cl- 104",
        glucose: "HGT: 142 mg/dL",
        others: "Hematocrito: 19% | Hemoglobina: 6.2 g/dL | Plaquetas: 85.000"
      },
      history: {
        witness: "Esposa relata que el paciente estaba almorzando y sintió una 'puñalada en la espalda y el estómago' y cayó al suelo.",
        medications: "Enalapril, Atorvastatina.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-69",
    title: "Caso 69: Asma Casi Fatal (Status Asmaticus) con hiperinsuflación dinámica y paro en AESP",
    type: "taquicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Felipe Astudillo",
      age: 26,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación Respiratorio",
      history: "Asma bronquial severa de difícil control, múltiples hospitalizaciones previas en UCI.",
      presentation: "Crisis asmática de 6 horas de evolución refractaria a Salbutamol domiciliario. Llega con 'tórax silente', cianosis y agotamiento respiratorio."
    },
    initialVitals: {
      hr: 155,
      bp: "76/44",
      spo2: 70,
      etco2: 68,
      rr: 36,
      temp: 37.0,
      rhythm: "TAQUICARDIA_SINUSAL",
      rhythmName: "Taquicardia Sinusal de Alto Esfuerzo con P Pulmonale",
      isStable: false,
      stabilityReason: "Paro respiratorio inminente (tórax silente, hipoxemia severa 70%), acidosis hipercápnica y agotamiento.",
      consciousness: "Soporoso, incapaz de articular palabras (AVPU: P)",
      airway: "Uso exhaustivo de musculatura intercostal y esternal",
      ivAccess: "Vía periférica 18G en brazo derecho"
    },
    degenerationMessage: "¡El paciente deja de ventilar bruscamente por fatiga diafragmática total! Cae en coma arrefléxico, el pulso central desaparece y el monitor muestra complejos rítmicos a 48 lpm sin pulso (AESP por auto-PEEP extrema y asfixia).",
    arrestVitals: {
      hr: 48,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 37.0,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP - Bradicardia Asfíctica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 92,
      bp: "112/70",
      spo2: 97,
      etco2: 39,
      rr: 12,
      temp: 36.8,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Normal tras Descompresión de Auto-PEEP y Broncodilatación",
      pulsePresent: true,
      consciousness: "Comatoso, bajo sedo-relajación profunda en ventilación mecánica con tiempo espiratorio prolongado"
    },
    reversibleCause: "Insuficiencia respiratoria hipercápnica asfíctica e hiperinsuflación dinámica crítica (Hipoxia / Hidrogeniones)",
    hytCategory: "Hipoxia",
    teachingNotes: "En el paro en asma severa, la desconexión transitoria del ventilador/BVM y compresión manual del tórax alivia el auto-PEEP (hiperinsuflación) restaurando el retorno venoso al corazón.",
    clinicalExam: {
      physical: {
        pulmonary: "Tórax completamente silente bilateralmente, murmullo vesicular inaudible por obstrucción bronquial extrema.",
        cardiovascular: "Ruidos cardíacos taquicárdicos velados por el atrapamiento aéreo.",
        perfusion: "Cianosis central violácea profunda, diaforesis fría.",
        temperature: "37.0 °C"
      },
      pocus: {
        cardiac: "Ventrículo derecho con sobrecarga aguda moderada por vasoconstricción hipóxica pulmonar.",
        lung: "Líneas A prominentes bilaterales, deslizamiento pleural presente (descarta neumotórax).",
        vci: "VCI 23 mm pletórica por elevación extrema de presión intratorácica."
      },
      labs: {
        gsa: "pH 6.98 | pCO2 94 | pO2 38 | HCO3 21 | Lactato 5.6 mmol/L",
        electrolytes: "K+ 4.8 | Na+ 137 | Cl- 101",
        glucose: "HGT: 135 mg/dL",
        others: "Gasometría confirma acidosis respiratoria catastrófica"
      },
      history: {
        witness: "Pareja relata que consumió 2 inhaladores completos de Salbutamol en las últimas 4 horas sin alivio.",
        medications: "Budesonida/Formoterol, Salbutamol SOS.",
        allergies: "Alergia al Ácido Acetilsalicílico (Tríada de Samter)."
      }
    }
  },
  {
    id: "caso-70",
    title: "Caso 70: Flutter Auricular Típico 2:1 a 150 lpm con descompensación aguda a TVSP",
    type: "taquicardia",
    arrestType: "TVSP",
    isShockable: true,
    difficulty: "Intermedio",
    patient: {
      name: "Guillermo Riquelme",
      age: 71,
      gender: "M",
      location: "Servicio de Urgencias - Box de Observación",
      history: "Cardiopatía hipertensiva, EPOC moderado.",
      presentation: "Palpitaciones continuas de inicio súbito, disnea progresiva de reposo y dolor precordial sordo."
    },
    initialVitals: {
      hr: 150,
      bp: "84/52",
      spo2: 91,
      etco2: 32,
      rr: 24,
      temp: 36.6,
      rhythm: "FLUTTER_AURICULAR",
      rhythmName: "Flutter Auricular Típico con Conducción AV 2:1 fija (ondas F en dientes de sierra)",
      isStable: false,
      stabilityReason: "Hipotensión sintomática (84/52), dolor anginoso e insuficiencia cardíaca aguda.",
      consciousness: "Consciente pero marcadamente decaído y confuso (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en antebrazo izquierdo"
    },
    degenerationMessage: "¡El paciente palidece bruscamente y se desvanece en la camilla! El trazado en dientes de sierra se transforma de golpe en complejos anchos monomórficos gigantes a 230 lpm sin pulso palpable (TV sin pulso).",
    arrestVitals: {
      hr: 230,
      bp: "0/0",
      spo2: 0,
      etco2: 12,
      rr: 0,
      temp: 36.6,
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
      hr: 76,
      bp: "118/74",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 36.3,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras cardioversión eléctrica sincronizada",
      pulsePresent: true,
      consciousness: "Comatoso post-paro, candidato a TTM"
    },
    reversibleCause: "Descompensación hemodinámica e isquemia miocárdica inducida por taquiarritmia auricular rápida (Trombosis coronaria)",
    hytCategory: "Trombosis coronaria (Isquemia por Demanda)",
    teachingNotes: "El Flutter auricular inestable responde excelentemente a la cardioversión sincronizada de baja energía (50-100J). Si degenera a TV sin pulso, requiere descarga asincrónica de 200J inmediata.",
    clinicalExam: {
      physical: {
        pulmonary: "Crépitos bibasales finos en tercio inferior de ambos campos pulmonares.",
        cardiovascular: "Ruidos cardíacos rítmicos muy rápidos a exactamente 150 lpm.",
        perfusion: "Llenado capilar 3 segundos, palidez moderada.",
        temperature: "36.6 °C"
      },
      pocus: {
        cardiac: "Aurícula izquierda dilatada, función sistólica del VI levemente deprimida.",
        lung: "Líneas B aisladas en bases pulmonares.",
        vci: "VCI 19 mm con colapso disminuido."
      },
      labs: {
        gsa: "pH 7.34 | pCO2 38 | pO2 76 | HCO3 20 | Lactato 2.8 mmol/L",
        electrolytes: "K+ 4.1 | Na+ 138 | Cl- 102",
        glucose: "HGT: 112 mg/dL",
        others: "Troponina I: 0.18 ng/mL"
      },
      history: {
        witness: "Hijo refiere que el padre comenzó con palpitaciones por la mañana y no toleró caminar hasta el baño.",
        medications: "Enalapril 20 mg, Atorvastatina 20 mg.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-71",
    title: "Caso 71: Bloqueo AV Completo sintomático post-TAVI con progresión a Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Héctor Maldonado",
      age: 82,
      gender: "M",
      location: "Servicio de Hemodinamia - Recuperación Post-procedimiento",
      history: "Estenosis aórtica severa sometida a implante valvular aórtico percutáneo (TAVI) hace 4 horas.",
      presentation: "Bradicardia sintomática extrema progresiva, mareos intensos, hipotensión y disociación auriculoventricular en el monitor."
    },
    initialVitals: {
      hr: 26,
      bp: "64/36",
      spo2: 88,
      etco2: 22,
      rr: 10,
      temp: 36.0,
      rhythm: "BLOQUEO_AV_3",
      rhythmName: "Bloqueo Auriculoventricular Completo (3er Grado) con Escape Idioventricular Lento",
      isStable: false,
      stabilityReason: "Hipotensión severa (64/36), bradicardia extrema refractaria a atropina y síncope inminente.",
      consciousness: "Obnubilado, letárgico (AVPU: P)",
      airway: "Espontánea superficial",
      ivAccess: "Vía venosa periférica 18G e introductor femoral derecho"
    },
    degenerationMessage: "¡El foco de escape idioventricular se agota por completo! Las ondas P continúan aisladas sin conducir y el trazado ventricular cae en una línea isoeléctrica plana (Asistolia ventricular).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.0,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia Ventricular con Ondas P Aisladas (P-wave asystole)",
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
      bp: "114/70",
      spo2: 98,
      etco2: 41,
      rr: 14,
      temp: 36.2,
      rhythm: "RITMO_MARCAPASOS",
      rhythmName: "Ritmo Estimulado por Marcapasos Transitorio con Captura Eléctrica y Mecánica 100%",
      pulsePresent: true,
      consciousness: "Recupera conciencia tras captura efectiva de marcapasos (Glasgow 14)"
    },
    reversibleCause: "Traumatismo mecánico sobre el sistema de conducción AV por expansión de prótesis valvular percutánea (Tóxicos / Mecánica)",
    hytCategory: "Causa Mecánica / Bloqueo de Conducción",
    teachingNotes: "El bloqueo AV completo infra-Hisiano post-TAVI no responde a atropina y requiere marcapasos transitorio percutáneo o transcutáneo inmediato para evitar la asistolia.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos con variación de intensidad del 1er ruido por disociación AV.",
        perfusion: "Palidez cérea, frialdad distal en cuatro extremidades.",
        temperature: "36.0 °C"
      },
      pocus: {
        cardiac: "Prótesis valvular TAVI normoinsertada con gradiente normal. Escape ventricular lento sin contracción auricular sincronizada.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 18 mm con escaso colapso."
      },
      labs: {
        gsa: "pH 7.30 | pCO2 42 | pO2 80 | HCO3 19 | Lactato 3.2 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 137 | Cl- 101",
        glucose: "HGT: 104 mg/dL",
        others: "Hemoglobina 10.8 g/dL"
      },
      history: {
        witness: "Cardiólogo intervencionista indica que la válvula autoexpandible se implantó baja en el tracto de salida ventricular.",
        medications: "Aspirina, Clopidogrel.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-72",
    title: "Caso 72: Síndrome de Wolff-Parkinson-White con FA preexcitada rápida y degeneración a FV",
    type: "taquicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Matías Alarcón",
      age: 25,
      gender: "M",
      location: "Servicio de Urgencias - Box de Reanimación",
      history: "Síndrome de preexcitación ventricular (WPW) asintomático conocido.",
      presentation: "Palpitaciones vertiginosas extremas, opresión torácica, mareo incapacitante y sensación de desvanecimiento inminente tras ingerir bebidas energéticas."
    },
    initialVitals: {
      hr: 245,
      bp: "72/42",
      spo2: 89,
      etco2: 28,
      rr: 30,
      temp: 36.7,
      rhythm: "FA_PREEXCITADA",
      rhythmName: "Fibrilación Auricular Preexcitada (FBI: Fast, Broad, Irregular) con intervalos R-R < 200 ms",
      isStable: false,
      stabilityReason: "Hipotensión severa (72/42), frecuencia ventricular extrema (> 240 lpm) y riesgo inminente de FV.",
      consciousness: "Obnubilado, responde con quejidos (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Vía periférica 18G en brazo derecho"
    },
    degenerationMessage: "¡Un complejo ventricular conducido por la vía anómala cae en la fase vulnerable de la onda T y el ritmo degenera en Fibrilación Ventricular catastrófica sin pulso!",
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
      hr: 78,
      bp: "116/72",
      spo2: 98,
      etco2: 42,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con onda delta típica y PR corto (Patrón WPW basal)",
      pulsePresent: true,
      consciousness: "Comatoso post-reanimación, candidato a TTM y ablación por radiofrecuencia"
    },
    reversibleCause: "Conducción anterógrada ultrarrápida por vía accesoria auriculoventricular (haz de Kent)",
    hytCategory: "Arritmia Genética / Vía Accesoria",
    teachingNotes: "En FA preexcitada están CONTRAINDICADOS los fármacos que bloquean el nodo AV (adenosina, betabloqueadores, diltiazem, digoxina), ya que desvían la conducción a la vía anómala y causan FV. Tratamiento de elección: cardioversión eléctrica precoz.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos taquicárdicos irregulares incalculables.",
        perfusion: "Palidez fría sudorosa, pulso periférico filiforme apenas perceptible.",
        temperature: "36.7 °C"
      },
      pocus: {
        cardiac: "Contracción ventricular extremadamente veloz e incoordinada.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 15 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.31 | pCO2 37 | pO2 82 | HCO3 18 | Lactato 3.4 mmol/L",
        electrolytes: "K+ 4.2 | Na+ 138 | Cl- 101",
        glucose: "HGT: 110 mg/dL",
        others: "Troponina I: 0.15 ng/mL"
      },
      history: {
        witness: "Amigos refieren que consumió 3 latas de bebida energizante antes del entrenamiento de crossfit.",
        medications: "Ninguno crónico.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-73",
    title: "Caso 73: Síndrome de Lisis Tumoral con Hiperkalemia Extrema (K+ 8.9) y FV",
    type: "bradicardia",
    arrestType: "FV",
    isShockable: true,
    difficulty: "Avanzado",
    patient: {
      name: "Gonzalo Ibáñez",
      age: 55,
      gender: "M",
      location: "Servicio de Hematoncología - Sala de Hospitalizados",
      history: "Linfoma de Burkitt de alta carga tumoral. Inicio de quimioterapia citotóxica hace 24 horas.",
      presentation: "Debilidad muscular ascendente severa, náuseas, vómitos, anuria y palpitaciones con dolor precordial."
    },
    initialVitals: {
      hr: 38,
      bp: "74/40",
      spo2: 90,
      etco2: 26,
      rr: 22,
      temp: 36.8,
      rhythm: "RITMO_SINOVENTRICULAR",
      rhythmName: "Ritmo Sinoventricular con QRS ensanchado en onda sinusoidal y T picadas gigantes",
      isStable: false,
      stabilityReason: "Hiperpotasemia potencialmente letal (K+ 8.9), hipotensión (74/40) y pre-paro cardíaco.",
      consciousness: "Soporoso, parálisis flácida de cuatro extremidades (AVPU: V)",
      airway: "Espontánea permeable",
      ivAccess: "Catéter venoso central subclavio y vía periférica 18G"
    },
    degenerationMessage: "¡El trazado en onda sinusoidal se desintegra en una onda fibrilatoria desorganizada y el paciente cae en Fibrilación Ventricular sin pulso carotídeo!",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 10,
      rr: 0,
      temp: 36.8,
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
      hr: 82,
      bp: "106/64",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con QRS estrechado post-Gluconato de Calcio, Insulina/Glucosa y Bicarbonato",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, conectado a hemodiálisis de emergencia en UCI"
    },
    reversibleCause: "Hiperpotasemia letal por lisis tumoral masiva y fallo renal agudo (Hipo / Hiperkalemia)",
    hytCategory: "Hipo / Hiperkalemia y Electrolitos",
    teachingNotes: "En hiperkalemia extrema con alteración del ECG, el Gluconato o Cloruro de Calcio EV es prioritario para estabilizar la membrana, seguido de medidas de desplazamiento (insulina con glucosa, salbutamol nebulizado) y hemodiálisis urgente.",
    clinicalExam: {
      physical: {
        pulmonary: "Murmullo vesicular conservado bilateralmente.",
        cardiovascular: "Ruidos cardíacos lentos y apagados.",
        perfusion: "Tetraparesia flácida arrefléxica franca, piel fría.",
        temperature: "36.8 °C"
      },
      pocus: {
        cardiac: "Contractilidad miocárdica deprimida difusamente sin anomalías valvulares.",
        lung: "Líneas A normales bilaterales.",
        vci: "VCI 17 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.18 | pCO2 36 | pO2 82 | HCO3 14 | Lactato 3.8 mmol/L",
        electrolytes: "K+ 8.9 mEq/L (Crítico) | Fósforo: 9.8 mg/dL | Ácido Úrico: 16.2 mg/dL | Calcio: 0.70 mmol/L",
        glucose: "HGT: 92 mg/dL",
        others: "Creatinina: 4.8 mg/dL | BUN: 78 mg/dL"
      },
      history: {
        witness: "Médico oncólogo refiere que el paciente recibió primer ciclo de quimioterapia de alta dosis ayer por la tarde.",
        medications: "Rasburicasa, Alopurinol, Hidratación EV.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-74",
    title: "Caso 74: Ahogamiento por Sumersión en Piscina con paro respiratorio secundario y Asistolia",
    type: "bradicardia",
    arrestType: "ASISTOLIA",
    isShockable: false,
    difficulty: "Intermedio",
    patient: {
      name: "Tomás Rivas",
      age: 22,
      gender: "M",
      location: "Borde de Piscina - Asistencia SAMU",
      history: "Sin antecedentes mórbidos. Rescatado del fondo de una piscina tras sumersión estimada en 8 minutos.",
      presentation: "Cianosis generalizada, hipotermia moderada, abundante espuma blanquecina por boca y nariz, apnea total."
    },
    initialVitals: {
      hr: 24,
      bp: "50/20",
      spo2: 52,
      etco2: 12,
      rr: 0,
      temp: 33.2,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Ritmo Agónico de Asfixia Terminal por Hipoxemia",
      isStable: false,
      stabilityReason: "Paro respiratorio consumado, asfixia profunda (SpO2 52%), colapso hemodinámico total.",
      consciousness: "Coma profundo arrefléxico (AVPU: U)",
      airway: "Vía aérea inundada con agua y secreción espumosa",
      ivAccess: "Vía periférica 18G en antebrazo izquierdo"
    },
    degenerationMessage: "¡El escaso complejo agónico desaparece del monitor! Queda una línea recta isoeléctrica horizontal confirmada en derivaciones I y II (Asistolia total).",
    arrestVitals: {
      hr: 0,
      bp: "0/0",
      spo2: 0,
      etco2: 7,
      rr: 0,
      temp: 33.2,
      rhythm: "ASISTOLIA",
      rhythmName: "Asistolia por Hipoxia Asfíctica",
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
      bp: "102/62",
      spo2: 96,
      etco2: 40,
      rr: 14,
      temp: 34.0,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal Regular tras despeje de vía aérea, ventilación O2 100% y RCP",
      pulsePresent: true,
      consciousness: "Comatoso, candidato a TTM activo en UCI"
    },
    reversibleCause: "Asfixia por sumersión con laringoespasmo e inundación alveolar (Hipoxia)",
    hytCategory: "Hipoxia",
    teachingNotes: "En el paro por ahogamiento, las ventilaciones de rescate son la intervención más crítica. La secuencia recomendada es dar 5 ventilaciones iniciales seguidas de RCP estándar 30:2 y O2 al 100%.",
    clinicalExam: {
      physical: {
        pulmonary: "Gorgoteo y estertores húmedos masivos audibles sin fonendoscopio, salida continua de líquido pulmonar.",
        cardiovascular: "Ruidos cardíacos inaudibles.",
        perfusion: "Cianosis cérea corporal completa, midriasis paralítica bilateral.",
        temperature: "33.2 °C (Termómetro esofágico)"
      },
      pocus: {
        cardiac: "Acinesia miocárdica completa en asistolia.",
        lung: "Líneas B confluentes masivas ('pulmón húmedo') por aspiración líquida y edema alveolar.",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.04 | pCO2 78 | pO2 36 | HCO3 16 | Lactato 7.2 mmol/L",
        electrolytes: "K+ 4.6 | Na+ 135 | Cl- 98",
        glucose: "HGT: 118 mg/dL",
        others: "Gases arteriales demuestran acidosis mixta severa"
      },
      history: {
        witness: "Amigos señalan que estaban consumiendo alcohol en una fiesta y se percataron de que Tomás no salía de la piscina.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  },
  {
    id: "caso-75",
    title: "Caso 75: Intoxicación por Organofosforados con síndrome colinérgico severo y paro en AESP",
    type: "bradicardia",
    arrestType: "AESP",
    isShockable: false,
    difficulty: "Avanzado",
    patient: {
      name: "Belisario Parra",
      age: 48,
      gender: "M",
      location: "Servicio de Urgencias Rural - Box de Reanimación",
      history: "Trabajador agrícola fumigador. Exposición accidental sin elementos de protección personal.",
      presentation: "Miosis puntiforme bilateral arreactiva, salivación copiosa ('espuma por boca'), broncorrea masiva, diaforesis, fasciculaciones musculares y vómitos."
    },
    initialVitals: {
      hr: 30,
      bp: "62/34",
      spo2: 72,
      etco2: 20,
      rr: 8,
      temp: 36.2,
      rhythm: "BRADICARDIA_SINUSAL",
      rhythmName: "Bradicardia Sinusal Extrema Colinérgica",
      isStable: false,
      stabilityReason: "Crisis colinérgica letal (síndrome DUMBELS), insuficiencia respiratoria por broncorrea y colapso circulatorio.",
      consciousness: "Comatoso, responde sólo a dolor con fasciculaciones (AVPU: P)",
      airway: "Inundación masiva de vía aérea por hipersecreción bronquial",
      ivAccess: "Vía periférica 18G en brazo derecho"
    },
    degenerationMessage: "¡El paciente sufre un colapso ventilatorio terminal por inundación bronquial y parálisis muscular diafragmática! Pulso carotídeo ausente. El monitor muestra ritmo nodal ancho a 36 lpm sin pulso (AESP).",
    arrestVitals: {
      hr: 36,
      bp: "0/0",
      spo2: 0,
      etco2: 8,
      rr: 0,
      temp: 36.2,
      rhythm: "AESP",
      rhythmName: "Actividad Eléctrica Sin Pulso (AESP Colinérgica)",
      pulsePresent: false,
      consciousness: "Inconsciente en apnea"
    },
    requiredInterventions: {
      initialExpected: ["oxigeno", "monitor", "via_iv", "atropina"],
      arrestExpected: ["iniciar_rcp", "adrenalina", "buscar_hyt"],
      postRceExpected: ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
    },
    rceVitals: {
      hr: 88,
      bp: "110/68",
      spo2: 97,
      etco2: 41,
      rr: 14,
      temp: 36.5,
      rhythm: "RITMO_SINUSAL",
      rhythmName: "Ritmo Sinusal con reversión de broncorrea tras Atropinización agresiva y Pralidoxima",
      pulsePresent: true,
      consciousness: "Comatoso, intubado, infusión de atropina continua en UCI"
    },
    reversibleCause: "Intoxicación por plaguicida inhibidor irreversible de acetilcolinesterasa (Tóxicos)",
    hytCategory: "Tóxicos / Sobredosis farmacológica",
    teachingNotes: "En intoxicación por organofosforados la Atropina debe titularse en dosis crecientes (2-5 mg EV cada 3-5 minutos) sin tope de dosis hasta lograr la 'atropinización': secado de secreciones bronquiales y FC > 80 lpm.",
    clinicalExam: {
      physical: {
        pulmonary: "Broncorrea masiva con estertores húmedos y sibilancias bilaterales audibles a distancia.",
        cardiovascular: "Bradicardia extrema con tonos velados.",
        perfusion: "Miosis puntiforme ('en cabeza de alfiler'), diaforesis profusa, fasciculaciones generalizadas.",
        temperature: "36.2 °C"
      },
      pocus: {
        cardiac: "Bradicinesia marcada sin anomalías estructurales.",
        lung: "Líneas B difusas bilaterales ('pulmón hipersecretor').",
        vci: "VCI 16 mm con colapso normal."
      },
      labs: {
        gsa: "pH 7.15 | pCO2 64 | pO2 48 | HCO3 20 | Lactato 4.5 mmol/L",
        electrolytes: "K+ 4.3 | Na+ 138 | Cl- 102",
        glucose: "HGT: 125 mg/dL",
        others: "Actividad de colinesterasa plasmática: < 15% del valor normal"
      },
      history: {
        witness: "Compañero de faena relata que se le rompió la manguera de la mochila fumigadora de Clorpirifós y se empapó la ropa y el rostro hace 2 horas.",
        medications: "Ninguno.",
        allergies: "Sin alergias."
      }
    }
  }
];
