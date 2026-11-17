// Banco exhaustivo de 50 casos clínicos ACLS con aleatorización y diagnósticos etiológicos (5 H y 5 T)
// Patrón: Arritmia Inicial (Taqui/Bradi) -> Descompensación y PCR -> Reanimación -> RCE -> Cuidados Posparo

export const ACLS_CASES = [
  {
    "id": "caso-1",
    "title": "Caso 1: TV Monomorfa Sostenida con pulso que degenera a FV gruesa",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Jorge Morales",
      "age": 62,
      "gender": "M",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "IAM previo con FEy 35%. HTA.",
      "presentation": "Palpitaciones intensas 'aleteo en el pecho', mareos y opresión torácica 6/10."
    },
    "initialVitals": {
      "hr": 175,
      "bp": "84/50",
      "spo2": 91,
      "etco2": 32,
      "rr": 26,
      "temp": 36.4,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa Sostenida",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (84/50), dolor isquémico y palidez.",
      "consciousness": "Consciente pero confuso",
      "airway": "Espontánea",
      "ivAccess": "Vía periférica 20G"
    },
    "degenerationMessage": "¡El paciente repentinamente pierde el conocimiento! Se desvanece en la camilla y el monitor muestra degeneración a Fibrilación Ventricular gruesa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 98,
      "bp": "88/54",
      "spo2": 95,
      "etco2": 42,
      "rr": 12,
      "temp": 36.1,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "Ritmo Sinusal con supradesnivel ST (STEMI)",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM"
    },
    "reversibleCause": "Isquemia miocárdica aguda (Trombosis coronaria)",
    "hytCategory": "Trombosis coronaria (Síndrome Coronario Agudo)",
    "teachingNotes": "TV inestable con pulso requiere cardioversión sincronizada. Al degenerar a FV, la prioridad es descarga precoz (200J) y REANUDAR RCP DE INMEDIATO.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos, sin soplos.",
        "perfusion": "Piel fría y sudorosa. Llenado capilar 3s.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Acinesia de pared anterior. Sin derrame pericárdico.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 18 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.31 | pCO2 36 | pO2 82 | HCO3 18 | Lactato 3.4 mmol/L",
        "electrolytes": "K+ 4.3 | Na+ 139 | Ca2+ 1.20",
        "glucose": "HGT: 142 mg/dL",
        "others": "Troponina I: 2.4 ng/mL (Positiva)"
      },
      "history": {
        "witness": "Hijo refiere dolor opresivo al subir escaleras hace 1 hora.",
        "medications": "Enalapril, Carvedilol, Aspirina.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-2",
    "title": "Caso 2: TSVP Inestable en Paciente Joven que colapsa en TV sin pulso",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Valentina Soto",
      "age": 24,
      "gender": "F",
      "location": "Box de Reanimación SAPU",
      "history": "Sin antecedentes mórbidos. Episodios de taquicardia previa.",
      "presentation": "Palpitaciones súbitas de 2 horas de evolución, disnea y marcada frialdad distal con mareo."
    },
    "initialVitals": {
      "hr": 220,
      "bp": "78/46",
      "spo2": 93,
      "etco2": 30,
      "rr": 28,
      "temp": 36.6,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Supraventricular Paroxística",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (78/46 mmHg), mala perfusión periférica, disnea.",
      "consciousness": "Consciente, angustiada",
      "airway": "Espontánea",
      "ivAccess": "Sin vía venosa"
    },
    "degenerationMessage": "La paciente cierra los ojos bruscamente, se torna cianótica y cae en colapso hemodinámico total con TV sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular sin pulso (TVSP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 105,
      "bp": "96/60",
      "spo2": 97,
      "etco2": 38,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal",
      "pulsePresent": true,
      "consciousness": "Recupera conciencia gradualmente"
    },
    "reversibleCause": "Isquemia funcional secundaria a taquicardia extrema",
    "hytCategory": "Hipoxia / Isquemia miocárdica",
    "teachingNotes": "TSVP inestable requiere cardioversión sincronizada inmediata. Al caer en TVSP, choque de 200J y reanudación de RCP sin pausas.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Ruidos rápidos regulares.",
        "perfusion": "Piel fría distalmente.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículos hiperdinámicos sin derrame.",
        "lung": "Deslizamiento pleural normal bilateral.",
        "vci": "VCI 12 mm colapsable."
      },
      "labs": {
        "gsa": "pH 7.36 | pCO2 32 | pO2 90 | HCO3 20",
        "electrolytes": "K+ 4.0 | Na+ 140",
        "glucose": "HGT: 98 mg/dL",
        "others": "Dímero D normal"
      },
      "history": {
        "witness": "Amiga refiere consumo de bebidas energéticas antes del cuadro.",
        "medications": "Anticonceptivos orales.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-3",
    "title": "Caso 3: Fibrilación Auricular con RVR en Postoperado que cae en AESP por TEP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Hernán Castro",
      "age": 74,
      "gender": "M",
      "location": "Servicio de Cirugía General",
      "history": "Postoperado día 3 de prótesis total de cadera.",
      "presentation": "Disnea súbita, dolor torácico pleurítico y taquicardia irregular de inicio brusco."
    },
    "initialVitals": {
      "hr": 168,
      "bp": "76/48",
      "spo2": 87,
      "etco2": 28,
      "rr": 32,
      "temp": 37.1,
      "rhythm": "FA_RVR",
      "rhythmName": "Fibrilación Auricular con RVR",
      "isStable": false,
      "stabilityReason": "Shock obstructivo, hipotensión y desaturación severa.",
      "consciousness": "Somnoliento y confuso",
      "airway": "Espontánea",
      "ivAccess": "Vía venosa 18G"
    },
    "degenerationMessage": "El paciente emite un jadeo agónico y pierde el conocimiento. El monitor muestra ritmo organizado taquicárdico pero NO TIENE PULSO (AESP).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 14,
      "rr": 0,
      "temp": 37.0,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente, sin pulso"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 110,
      "bp": "92/56",
      "spo2": 94,
      "etco2": 36,
      "rr": 16,
      "temp": 36.8,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal con sobrecarga de VD",
      "pulsePresent": true,
      "consciousness": "Comatoso"
    },
    "reversibleCause": "Tromboembolismo pulmonar masivo",
    "hytCategory": "Trombosis pulmonar (TEP Masivo)",
    "teachingNotes": "En AESP por TEP masivo, la prioridad es RCP ininterrumpida, Adrenalina 1mg precoz y considerar trombolisis de emergencia.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Discreta hipoventilación basal izquierda, sin sibilancias.",
        "cardiovascular": "R2 aumentado en foco pulmonar, ingurgitación yugular evidente.",
        "perfusion": "Cianosis central y periférica.",
        "temperature": "37.1 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho severamente dilatado (signo de McConnell). Desviación septal a izquierda.",
        "lung": "Líneas A normales, sin neumotórax.",
        "vci": "VCI pletórica de 26 mm sin colapso."
      },
      "labs": {
        "gsa": "pH 7.24 | pCO2 29 | pO2 55 | HCO3 14 | Lactato 5.8 mmol/L",
        "electrolytes": "K+ 4.6 | Na+ 137",
        "glucose": "HGT: 110 mg/dL",
        "others": "Dímero D: > 10.000 ug/L (Muy elevado)"
      },
      "history": {
        "witness": "Enfermera informa reposo absoluto en cama postcirugía de cadera.",
        "medications": "Enoxaparina omitida.",
        "allergies": "Metoclopramida."
      }
    }
  },
  {
    "id": "caso-4",
    "title": "Caso 4: Flutter Auricular 2:1 Inestable en EPOC con Paro en Asistolia",
    "type": "taquicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Raúl Navarrete",
      "age": 68,
      "gender": "M",
      "location": "Box de Reanimación SAR",
      "history": "EPOC tabáquico severo y Cor Pulmonale.",
      "presentation": "Disnea extrema, cianosis labial y palpitaciones rápidas en reposo."
    },
    "initialVitals": {
      "hr": 150,
      "bp": "80/52",
      "spo2": 84,
      "etco2": 48,
      "rr": 30,
      "temp": 36.8,
      "rhythm": "FLUTTER",
      "rhythmName": "Flutter Auricular con Conducción 2:1",
      "isStable": false,
      "stabilityReason": "Insuficiencia respiratoria inestable e hipotensión.",
      "consciousness": "Obnubilado",
      "airway": "Agotamiento respiratorio",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente agota su mecánica ventilatoria, entra en bradipnea terminal y la actividad eléctrica se extingue a Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.7,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Paro respiratorio y cardíaco"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 88,
      "bp": "94/60",
      "spo2": 93,
      "etco2": 35,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con P pulmonar",
      "pulsePresent": true,
      "consciousness": "Intubado conectado a ventilación"
    },
    "reversibleCause": "Hipoxia y acidosis respiratoria severa (agotamiento ventilatorio)",
    "hytCategory": "Hipoxia / Acidosis respiratoria",
    "teachingNotes": "La asistolia secundaria a hipoxia requiere intubación orotraqueal inmediata, oxigenación al 100%, adrenalina 1mg y RCP de alta calidad.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo muy disminuido globalmente, tórax en tonel, espiración prolongada.",
        "cardiovascular": "Ruidos alejados, taquicárdicos.",
        "perfusion": "Cianosis ungueal y peribucal.",
        "temperature": "36.8 °C"
      },
      "pocus": {
        "cardiac": "Hipertrofia de VD sin derrame pericárdico.",
        "lung": "Deslizamiento pleural presente bilateralmente.",
        "vci": "VCI 20 mm con escasa variabilidad."
      },
      "labs": {
        "gsa": "pH 7.12 | pCO2 78 | pO2 48 | HCO3 26 | Lactato 4.2",
        "electrolytes": "K+ 4.8 | Na+ 136",
        "glucose": "HGT: 130 mg/dL",
        "others": "GSA demuestran acidosis hipercápnica severa"
      },
      "history": {
        "witness": "Hija refiere suspensión de inhaladores y cuadro bronquial de 4 días.",
        "medications": "Salbutamol, Ipratropio.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-5",
    "title": "Caso 5: Torsades de Pointes por Prolongación del QT que cae a FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Camila Fuentes",
      "age": 38,
      "gender": "F",
      "location": "Servicio de Urgencias",
      "history": "Uso reciente de Azitromicina + Haloperidol. Síncopes.",
      "presentation": "Mareos súbitos y pérdida de conocimiento breve en su domicilio."
    },
    "initialVitals": {
      "hr": 190,
      "bp": "70/40",
      "spo2": 89,
      "etco2": 26,
      "rr": 24,
      "temp": 36.3,
      "rhythm": "TORSADES",
      "rhythmName": "Torsades de Pointes (TV Polimorfa)",
      "isStable": false,
      "stabilityReason": "Inestabilidad hemodinámica crítica y sincope recurrente.",
      "consciousness": "Confusa, diaforética",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "La paciente presenta una convulsión tónica breve, pierde el pulso y el monitor registra Fibrilación Ventricular caótica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Paro en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 92,
      "bp": "98/62",
      "spo2": 96,
      "etco2": 40,
      "rr": 12,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con QT corregido prolongado",
      "pulsePresent": true,
      "consciousness": "Comatosa posparo"
    },
    "reversibleCause": "Toxicidad por fármacos que prolongan el intervalo QT (Hipomagnesemia)",
    "hytCategory": "Tóxicos / Hipomagnesemia",
    "teachingNotes": "Tratamiento clave: Desfibrilación en paro, Sulfato de Magnesio 2g IV en bolo y suspensión inmediata de fármacos proarrítmicos.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Limpio bilateral.",
        "cardiovascular": "Ruidos arrítmicos caóticos.",
        "perfusion": "Pálida, sudorosa.",
        "temperature": "36.3 °C"
      },
      "pocus": {
        "cardiac": "Ventrículos hiperquinéticos sin patología estructural.",
        "lung": "Líneas A normales.",
        "vci": "VCI 14 mm."
      },
      "labs": {
        "gsa": "pH 7.38 | pCO2 36 | pO2 88 | HCO3 22",
        "electrolytes": "K+ 3.2 (Bajo) | Mg2+ 1.1 mg/dL (Muy bajo)",
        "glucose": "HGT: 104 mg/dL",
        "others": "ECG previo mostraba QTc de 540 ms"
      },
      "history": {
        "witness": "Madre refiere que estaba tomando antibióticos por neumonía y antipsicótico.",
        "medications": "Azitromicina, Haloperidol, Sertralina.",
        "allergies": "Penicilina."
      }
    }
  },
  {
    "id": "caso-6",
    "title": "Caso 6: TV Polimorfa Isquémica en IAM que degenera a FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Manuel Sepúlveda",
      "age": 59,
      "gender": "M",
      "location": "Box de Reanimación Hospitalario",
      "history": "Fumador, dislipidemia. Dolor torácico opresivo desde hace 2 horas.",
      "presentation": "Dolor precordial irradiado a mandíbula y sudoración profusa."
    },
    "initialVitals": {
      "hr": 185,
      "bp": "74/48",
      "spo2": 90,
      "etco2": 28,
      "rr": 28,
      "temp": 36.5,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular Polimorfa con pulso",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico e isquemia aguda en curso.",
      "consciousness": "Consciente, angustiado",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente pierde la postura, emite un quejido gutural y entra en Fibrilación Ventricular fina/gruesa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 86,
      "bp": "88/54",
      "spo2": 95,
      "etco2": 41,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "STEMI Inferior (Supradesnivel DII, DIII, aVF)",
      "pulsePresent": true,
      "consciousness": "Comatoso posparo"
    },
    "reversibleCause": "Oclusión coronaria aguda de la arteria coronaria derecha",
    "hytCategory": "Trombosis coronaria (IAM agudo)",
    "teachingNotes": "Descarga precoz de 200J bifásica, reinicio inmediato de compresiones, Amiodarona 300mg y traslado urgente a pabellón de Hemodinamia (PCI).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crepitaciones en bases pulmonares.",
        "cardiovascular": "Ruidos taquicárdicos arrítmicos.",
        "perfusion": "Piel fría cérea.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Acinesia de cara inferior y posterior de VI.",
        "lung": "Líneas B en bases.",
        "vci": "VCI 19 mm."
      },
      "labs": {
        "gsa": "pH 7.29 | pCO2 35 | pO2 78 | HCO3 17 | Lactato 4.1",
        "electrolytes": "K+ 3.8 | Na+ 138",
        "glucose": "HGT: 160 mg/dL",
        "others": "Troponina ultrasensible: 450 ng/L"
      },
      "history": {
        "witness": "Esposa confirma inicio súbito del dolor mientras miraba televisión.",
        "medications": "Atorvastatina.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-7",
    "title": "Caso 7: Shock Hipovolémico por Hemorragia Digestiva Alta con AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "José Oyarzún",
      "age": 65,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Cirrosis hepática OH. Hematemesis masiva hace 30 minutos.",
      "presentation": "Colapso circulatorio con melena abundante, hematemesis activa y palidez extrema."
    },
    "initialVitals": {
      "hr": 155,
      "bp": "60/35",
      "spo2": 88,
      "etco2": 22,
      "rr": 30,
      "temp": 35.8,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal / TSVP compensatoria",
      "isStable": false,
      "stabilityReason": "Shock hemorrágico grado IV.",
      "consciousness": "Somnoliento, obnubilado",
      "airway": "Vía aérea en riesgo por vómito",
      "ivAccess": "Vía periférica 18G"
    },
    "degenerationMessage": "El paciente vomita abundante sangre oscura, hace apnea y cae en AESP con complejos anchos sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 35.6,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Paro en AESP por vaciamiento"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 112,
      "bp": "86/52",
      "spo2": 94,
      "etco2": 34,
      "rr": 16,
      "temp": 35.8,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal compensada con volumen",
      "pulsePresent": true,
      "consciousness": "Intubado protegido"
    },
    "reversibleCause": "Shock hipovolémico hemorrágico masivo por várices esofágicas",
    "hytCategory": "Hipovolemia (Pérdida sanguínea masiva)",
    "teachingNotes": "Prioridad absoluta: Expansión de volumen agresiva con suero salino y hemoderivados, intubación para proteger vía aérea y Adrenalina 1mg.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Roncus por sangre en orofaringe.",
        "cardiovascular": "Ruidos filiformes apagados.",
        "perfusion": "Palidez de porcelana, frialdad generalizada.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas virtuales totalmente colapsadas (kissing papillary muscles).",
        "lung": "Sin neumotórax.",
        "vci": "VCI colapsada totalmente (flat cava < 5 mm)."
      },
      "labs": {
        "gsa": "pH 7.15 | pCO2 28 | pO2 72 | HCO3 11 | Lactato 8.5 | EB -16",
        "electrolytes": "K+ 3.5 | Na+ 134",
        "glucose": "HGT: 82 mg/dL",
        "others": "Hematocrito: 18% | Hemoglobina: 6.0 g/dL"
      },
      "history": {
        "witness": "Hijo relata vómito de más de 1 litro de sangre fresca en la casa.",
        "medications": "Propranolol, Espironolactona.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-8",
    "title": "Caso 8: Neumotórax a Tensión Post-Traumático con Taquicardia y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Diego Valenzuela",
      "age": 22,
      "gender": "M",
      "location": "Servicio de Urgencias",
      "history": "Víctima de accidente de tránsito en moto con golpe torácico derecho.",
      "presentation": "Taquicárdico, taquipneico, quejándose de dolor torácico lancinante derecho y asfixia progresiva."
    },
    "initialVitals": {
      "hr": 160,
      "bp": "72/40",
      "spo2": 82,
      "etco2": 20,
      "rr": 36,
      "temp": 36.6,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal extrema reactiva",
      "isStable": false,
      "stabilityReason": "Shock obstructivo por neumotórax a tensión.",
      "consciousness": "Agitado, combativo por hipoxia",
      "airway": "Insuficiencia respiratoria",
      "ivAccess": "Vía venosa 18G"
    },
    "degenerationMessage": "El paciente deja de respirar, la tráquea se desvía a izquierda y el pulso carotídeo desaparece bruscamente.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Paro en AESP obstructivo"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 108,
      "bp": "96/64",
      "spo2": 97,
      "etco2": 39,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal",
      "pulsePresent": true,
      "consciousness": "Respira con tubo torácico"
    },
    "reversibleCause": "Neumotórax a tensión con colapso de retorno venoso",
    "hytCategory": "Neumotórax a tensión",
    "teachingNotes": "La causa es mecánica: requiere descompresión torácica inmediata con aguja/catéter en 2° espacio intercostal línea medioclavicular o 5° EIC LAA.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Abolición absoluta del murmullo pulmonar en hemitórax derecho con hipersonoridad a la percusión.",
        "cardiovascular": "Desviación marcada de la tráquea hacia la izquierda. Ingurgitación yugular.",
        "perfusion": "Cianosis facial.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Colapso de cavidades derechas por compresión mediastínica.",
        "lung": "Ausencia de deslizamiento pleural en hemitórax derecho con punto pulmonar ausente.",
        "vci": "VCI pletórica > 24 mm."
      },
      "labs": {
        "gsa": "pH 7.20 | pCO2 56 | pO2 45 | HCO3 19",
        "electrolytes": "Normales",
        "glucose": "HGT: 115 mg/dL",
        "others": "Trauma torácico evidente"
      },
      "history": {
        "witness": "Paramédico del SAMU informa impacto de tórax contra manubrio de motocicleta.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-9",
    "title": "Caso 9: Sepsis Grave Foco Urinario con FA con RVR y Colapso en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Eliana Rivas",
      "age": 81,
      "gender": "F",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "Postrada, usuaria de sonda Foley a permanencia.",
      "presentation": "Compromiso de conciencia, fiebre de 39°C y orinas francamente purulentas."
    },
    "initialVitals": {
      "hr": 165,
      "bp": "74/42",
      "spo2": 91,
      "etco2": 26,
      "rr": 32,
      "temp": 38.9,
      "rhythm": "FA_RVR",
      "rhythmName": "Fibrilación Auricular con RVR",
      "isStable": false,
      "stabilityReason": "Shock séptico distributivo con hipoperfusión tisular.",
      "consciousness": "Estuporosa, mal perfundida",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "La paciente presenta un paro cardiorrespiratorio en AESP por colapso vasomotor y acidosis láctica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 13,
      "rr": 0,
      "temp": 38.7,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Paro en AESP séptico"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 100,
      "bp": "90/58",
      "spo2": 95,
      "etco2": 37,
      "rr": 16,
      "temp": 38.2,
      "rhythm": "FA_RVR",
      "rhythmName": "Fibrilación Auricular controlada con drogas vasoactivas",
      "pulsePresent": true,
      "consciousness": "Comatosa en UCI"
    },
    "reversibleCause": "Shock séptico refractario con acidosis metabólica severa",
    "hytCategory": "Hidrogeniones (Acidosis severa) / Hipovolemia relativa",
    "teachingNotes": "Tratamiento: Carga rápida de cristaloides (suero salino), Adrenalina 1mg, corrección de acidosis y soporte con noradrenalina posparo.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Roncus basales bilaterales.",
        "cardiovascular": "Ruidos arrítmicos rápidos.",
        "perfusion": "Piel moteada (mottling score 3 en rodillas), frialdad periférica extrema.",
        "temperature": "38.9 °C"
      },
      "pocus": {
        "cardiac": "Fracción de eyección hiperdinámica (>70%) con ventrículos colapsables.",
        "lung": "Líneas B bilaterales escasas.",
        "vci": "VCI 11 mm colapsable >50%."
      },
      "labs": {
        "gsa": "pH 7.10 | pCO2 25 | pO2 78 | HCO3 9 | Lactato 9.2 mmol/L",
        "electrolytes": "K+ 5.2 | Na+ 145",
        "glucose": "HGT: 180 mg/dL",
        "others": "Leucocitosis: 28.000 con 22% baciliformes"
      },
      "history": {
        "witness": "Cuidadora relata 3 días de orina con mal olor y fiebre.",
        "medications": "Paracetamol, Ciprofloxacino.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-10",
    "title": "Caso 10: FA Preexcitada (Síndrome de Wolff-Parkinson-White) que colapsa en FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Cristóbal Silva",
      "age": 28,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Antecedente de vía accesoria no ablacionada (WPW).",
      "presentation": "Palpitaciones intolerables, mareo severo y sensación de muerte inminente."
    },
    "initialVitals": {
      "hr": 240,
      "bp": "70/40",
      "spo2": 92,
      "etco2": 28,
      "rr": 28,
      "temp": 36.6,
      "rhythm": "FA_RVR",
      "rhythmName": "FA Preexcitada con conducción por haz accesorio",
      "isStable": false,
      "stabilityReason": "Inestabilidad hemodinámica extrema (QRS ancho irregular >220 lpm).",
      "consciousness": "Pálido, mareado, confuso",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El trazado se desorganiza por completo y degenera súbitamente en Fibrilación Ventricular gruesa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Paro en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 95,
      "bp": "102/68",
      "spo2": 98,
      "etco2": 40,
      "rr": 12,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con onda delta (WPW)",
      "pulsePresent": true,
      "consciousness": "Consciente posparo"
    },
    "reversibleCause": "Conducción anterógrada rápida por vía accesoria auriculoventricular",
    "hytCategory": "Trombosis coronaria / Isquemia funcional",
    "teachingNotes": "En FA preexcitada, los bloqueadores del nodo AV (Adenosina, Verapamilo, Digoxina) están CONTRAINDICADOS porque inducen FV. Se debe cardiovertir precozmente.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar normal.",
        "cardiovascular": "Ruidos cardíacos extraordinariamente rápidos e irregulares.",
        "perfusion": "Piel fría, diaforesis profusa.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Corazón anatómicamente normal con taquicardia extrema.",
        "lung": "Normal bilateral.",
        "vci": "VCI 15 mm."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 34 | pO2 86 | HCO3 19",
        "electrolytes": "K+ 4.1 | Na+ 139",
        "glucose": "HGT: 102 mg/dL",
        "others": "ECG muestra QRS ancho, polimorfo e irregular"
      },
      "history": {
        "witness": "Paciente relata diagnóstico de WPW en la infancia.",
        "medications": "Ninguno habitual.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-11",
    "title": "Caso 11: Tormenta Arritmogénica por Intoxicación con Cocaína que degenera en FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Ignacio Pavez",
      "age": 29,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Consumo problemático de sustancias. Consumo masivo de clorhidrato de cocaína.",
      "presentation": "Agitación psicomotora extrema, diaforesis, dolor precordial y midriasis bilateral."
    },
    "initialVitals": {
      "hr": 195,
      "bp": "82/44",
      "spo2": 89,
      "etco2": 25,
      "rr": 34,
      "temp": 38.6,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa Hiperadrenérgica",
      "isStable": false,
      "stabilityReason": "Hipotensión con vasoespasmo coronario e hipertermia por cocaína.",
      "consciousness": "Combatiendo, luego somnoliento",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente sufre una convulsión tónica generalizada y el monitor cae en Fibrilación Ventricular gruesa caótica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 38.5,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 98,
      "bp": "92/58",
      "spo2": 96,
      "etco2": 39,
      "rr": 14,
      "temp": 37.8,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal / Normalización",
      "pulsePresent": true,
      "consciousness": "Comatoso en observación"
    },
    "reversibleCause": "Vasoespasmo coronario masivo y bloqueo de canales de sodio por cocaína",
    "hytCategory": "Tóxicos (Cocaína) / Trombosis coronaria",
    "teachingNotes": "Descarga inmediata 200J. En toxicidad por cocaína evitar betabloqueadores puros (riesgo de estimulación alfa sin oposición). Considerar Bicarbonato y Benzodiacepinas.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar presente.",
        "cardiovascular": "Ruidos hiperdinámicos rápidos.",
        "perfusion": "Diaforesis profusa, piel caliente central pero vasoconstricción periférica.",
        "temperature": "38.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo hiperquinético con zonas de hipocinesia segmentaria.",
        "lung": "Sin neumotórax.",
        "vci": "VCI 14 mm."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 30 | pO2 84 | HCO3 13 | Lactato 6.8 mmol/L",
        "electrolytes": "K+ 3.6 | Na+ 141",
        "glucose": "HGT: 112 mg/dL",
        "others": "Tóxicos en orina: Cocaína fuertemente positiva"
      },
      "history": {
        "witness": "Amigos admiten consumo de varios gramos de cocaína en fiesta.",
        "medications": "Ninguno crónico.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-12",
    "title": "Caso 12: Taponamiento Cardíaco por Herida Penetrante con Taquicardia y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Felipe Garrido",
      "age": 26,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Agresión por terceros con arma blanca en precordio paraesternal izquierdo.",
      "presentation": "Traído por SAMU con herida penetrante de 2 cm en 4° EIC paraesternal izquierdo. Muy hipotenso."
    },
    "initialVitals": {
      "hr": 145,
      "bp": "68/48",
      "spo2": 86,
      "etco2": 22,
      "rr": 30,
      "temp": 36.4,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal compensatoria extrema",
      "isStable": false,
      "stabilityReason": "Shock obstructivo grave (Tríada de Beck clásica).",
      "consciousness": "Estuporoso, responde con quejidos",
      "airway": "Espontánea",
      "ivAccess": "Vía 16G"
    },
    "degenerationMessage": "El paciente palidece bruscamente, cesa la respiración y el pulso se extingue por completo quedando en AESP.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro por taponamiento"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 104,
      "bp": "90/58",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con bajo voltaje",
      "pulsePresent": true,
      "consciousness": "Estable tras descompresión"
    },
    "reversibleCause": "Taponamiento cardíaco hemorrágico por herida cardíaca",
    "hytCategory": "Taponamiento cardíaco",
    "teachingNotes": "En AESP por taponamiento, la RCP y adrenalina no logran RCE sin evacuación mecánica: Pericardiocentesis subxifoidea de emergencia o toracotomía de reanimación.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar presente y simétrico bilateralmente (descarta neumotórax).",
        "cardiovascular": "Ruidos cardíacos francamente apagados / velados. Ingurgitación yugular hasta el ángulo mandibular.",
        "perfusion": "Piel fría y cérea.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Derrame pericárdico anecoico masivo > 25 mm con colapso diastólico del ventrículo derecho.",
        "lung": "Deslizamiento pleural bilateral normal.",
        "vci": "Vena Cava Inferior pletórica de 28 mm fija sin colapso."
      },
      "labs": {
        "gsa": "pH 7.26 | pCO2 34 | pO2 78 | HCO3 16 | Lactato 5.2",
        "electrolytes": "K+ 4.0 | Na+ 138",
        "glucose": "HGT: 95 mg/dL",
        "others": "Hematocrito: 26%"
      },
      "history": {
        "witness": "Paramédico informa agresión con cuchillo hace 20 minutos.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-13",
    "title": "Caso 13: Cetoacidosis Diabética Grave con Taquicardia y Paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Bastián Rojas",
      "age": 19,
      "gender": "M",
      "location": "Servicio de Urgencias",
      "history": "Diabetes Mellitus tipo 1 diagnosticada hace 2 años. Abandono de insulina.",
      "presentation": "Respiración de Kussmaul profunda, aliento cetónico, deshidratación extrema y dolor abdominal."
    },
    "initialVitals": {
      "hr": 150,
      "bp": "70/42",
      "spo2": 90,
      "etco2": 16,
      "rr": 38,
      "temp": 36.0,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal de compensación",
      "isStable": false,
      "stabilityReason": "Shock hipovolémico y acidosis metabólica extrema.",
      "consciousness": "Soporoso profundo",
      "airway": "Respiración acidótica",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente entra en apnea por fatiga de músculos respiratorios y cae en AESP con complejos lentos sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 35.9,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 96,
      "bp": "94/62",
      "spo2": 97,
      "etco2": 36,
      "rr": 16,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con onda T acuminada",
      "pulsePresent": true,
      "consciousness": "Comatoso en recuperación"
    },
    "reversibleCause": "Acidosis metabólica extrema e hipovolemia severa por diuresis osmótica",
    "hytCategory": "Hidrogeniones (Acidosis severa) / Hipovolemia",
    "teachingNotes": "Tratamiento clave: Fluidoterapia intensiva con Suero Fisiológico, Bicarbonato de Sodio IV por pH < 7.0, manejo ventilatorio y soporte de reanimación.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hiperventilación de Kussmaul profunda previa al colapso. Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Ruidos taquicárdicos deshidratados.",
        "perfusion": "Signo del pliegue cutáneo francamente positivo, mucosas secas.",
        "temperature": "36.0 °C"
      },
      "pocus": {
        "cardiac": "Ventrículos hiperquinéticos colapsables sin derrame.",
        "lung": "Pulmones secos.",
        "vci": "VCI colapsada < 6 mm."
      },
      "labs": {
        "gsa": "pH 6.88 | pCO2 16 | pO2 96 | HCO3 4 mEq/L | Lactato 4.8 | EB -24",
        "electrolytes": "K+ 6.1 (Pseudohiperkalemia) | Na+ 128",
        "glucose": "HGT: 580 mg/dL (Cetonemia ++++)",
        "others": "Glucosuria y cetonuria masiva"
      },
      "history": {
        "witness": "Madre refiere suspensión de Insulina Glargina por falta de dinero hace 5 días.",
        "medications": "Insulina NPH y Cristalina.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-14",
    "title": "Caso 14: Deshidratación Extrema por Gastroenteritis del Anciano con AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "María Teresa Baeza",
      "age": 83,
      "gender": "F",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertensa, usuaria de Enalapril e Hidroclorotiazida.",
      "presentation": "Traída por familiares tras 3 días de diarrea acuosa profusa (10 deposiciones/día) y vómitos incoercibles."
    },
    "initialVitals": {
      "hr": 140,
      "bp": "64/38",
      "spo2": 89,
      "etco2": 24,
      "rr": 26,
      "temp": 35.7,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal compensatoria de bajo gasto",
      "isStable": false,
      "stabilityReason": "Shock hipovolémico deshidratativo severo.",
      "consciousness": "Estuporosa, ojos hundidos",
      "airway": "Espontánea",
      "ivAccess": "Vía difícil 22G"
    },
    "degenerationMessage": "La paciente no responde a la llamada, el pulso radial y carotídeo se pierden y queda en AESP de bajo voltaje.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 35.6,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Paro en AESP hipovolémico"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 90,
      "bp": "92/58",
      "spo2": 95,
      "etco2": 36,
      "rr": 14,
      "temp": 36.1,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con volemia repuesta",
      "pulsePresent": true,
      "consciousness": "Responde a estímulos"
    },
    "reversibleCause": "Hipovolemia severa por pérdidas gastrointestinales",
    "hytCategory": "Hipovolemia (Deshidratación crítica)",
    "teachingNotes": "En AESP por hipovolemia pura, el tratamiento curativo es INFUSIÓN RÁPIDA DE SUERO FISIOLÓGICO a chorro (1000 a 2000 ml).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar conservado sin ruidos agregados.",
        "cardiovascular": "Ruidos cardíacos rápidos de tono muy bajo.",
        "perfusion": "Piel apergaminada con signo del pliegue persistente. Ojos enoftálmicos.",
        "temperature": "35.7 °C"
      },
      "pocus": {
        "cardiac": "Cavidades ventriculares virtuales que chocan en cada latido.",
        "lung": "Sin patología pleural.",
        "vci": "VCI colapsada filiforme < 4 mm."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 32 | pO2 86 | HCO3 16 | Lactato 3.9",
        "electrolytes": "K+ 3.1 | Na+ 152 (Hipernatremia por deshidratación)",
        "glucose": "HGT: 105 mg/dL",
        "others": "Urea: 140 mg/dL | Creatinina: 3.1 mg/dL (Falla prerrenal)"
      },
      "history": {
        "witness": "Hija confirma 3 días sin poder comer ni retener líquidos por vómitos.",
        "medications": "Hidroclorotiazida, Enalapril.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-15",
    "title": "Caso 15: Trombosis Aguda del Stent Coronario con TV Monomorfa y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Gonzalo Pinochet",
      "age": 56,
      "gender": "M",
      "location": "Urgencia Hospitalaria",
      "history": "Angioplastía coronaria con Stent medicado hace 5 días.",
      "presentation": "Dolor torácico opresivo 10/10 terebrante, diaforesis y náuseas. Suspendió Clopidogrel por cuenta propia."
    },
    "initialVitals": {
      "hr": 180,
      "bp": "80/46",
      "spo2": 90,
      "etco2": 29,
      "rr": 28,
      "temp": 36.4,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa Rápida",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico por trombosis del stent.",
      "consciousness": "Confuso, pálido",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente se desvanece con mirada fija hacia arriba y el monitor se transforma en Fibrilación Ventricular gruesa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Paro en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 94,
      "bp": "88/54",
      "spo2": 95,
      "etco2": 42,
      "rr": 12,
      "temp": 36.2,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "STEMI Anterolateral extenso (V1-V6, DI, aVL)",
      "pulsePresent": true,
      "consciousness": "Comatoso posparo"
    },
    "reversibleCause": "Trombosis aguda de stent en arteria descendente anterior",
    "hytCategory": "Trombosis coronaria (Oclusión total aguda)",
    "teachingNotes": "Desfibrilación inmediata 200J bifásica, compresiones de alta calidad, Adrenalina + Amiodarona y contacto urgente con Hemodinamista.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crepitaciones bilaterales en tercio medio.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos.",
        "perfusion": "Piel sudorosa, pálida y fría.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Acinesia apical y de pared anterior masiva.",
        "lung": "Líneas B bilaterales.",
        "vci": "VCI 20 mm con escaso colapso."
      },
      "labs": {
        "gsa": "pH 7.28 | pCO2 37 | pO2 80 | HCO3 17 | Lactato 4.5",
        "electrolytes": "K+ 4.2 | Na+ 138",
        "glucose": "HGT: 135 mg/dL",
        "others": "Troponina I: 8.9 ng/mL"
      },
      "history": {
        "witness": "Paciente admite haber suspendido la doble antiagregación plaquetaria por gastritis.",
        "medications": "Aspirina, Clopidogrel (suspendido).",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-16",
    "title": "Caso 16: TEP Submasivo que degenera en TV sin pulso por Isquemia de VD",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Patricia Leighton",
      "age": 61,
      "gender": "F",
      "location": "Servicio de Urgencias",
      "history": "Cáncer de ovario en quimioterapia. Trombosis venosa profunda previa.",
      "presentation": "Llega con disnea intensa súbita, sincope al ponerse de pie y dolor torácico."
    },
    "initialVitals": {
      "hr": 170,
      "bp": "72/44",
      "spo2": 85,
      "etco2": 24,
      "rr": 34,
      "temp": 37.0,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal con sobrecarga aguda de VD",
      "isStable": false,
      "stabilityReason": "Shock obstructivo severo e hipoxemia refractaria.",
      "consciousness": "Somnolienta",
      "airway": "Agotamiento",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente emite un quejido, pierde la consciencia y el monitor muestra Taquicardia Ventricular sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.8,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular sin pulso (TVSP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en TVSP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 108,
      "bp": "90/56",
      "spo2": 93,
      "etco2": 37,
      "rr": 16,
      "temp": 36.6,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal con patrón S1Q3T3",
      "pulsePresent": true,
      "consciousness": "Comatosa"
    },
    "reversibleCause": "Tromboembolismo pulmonar masivo con falla e isquemia aguda de VD",
    "hytCategory": "Trombosis pulmonar (TEP Masivo)",
    "teachingNotes": "Manejo de ritmo desfibrilable con descarga 200J, reanudación inmediata de RCP, oxígeno al 100% y evaluación de trombolisis sistémica.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo conservado, estertores escasos.",
        "cardiovascular": "R2 pulmonar muy acentuado, ingurgitación yugular marcada.",
        "perfusion": "Cianosis periférica.",
        "temperature": "37.0 °C"
      },
      "pocus": {
        "cardiac": "Dilatación masiva de VD con aplanamiento del tabique interventricular (D-shape del VI).",
        "lung": "Pleuras libres.",
        "vci": "VCI dilatada > 25 mm fija."
      },
      "labs": {
        "gsa": "pH 7.25 | pCO2 28 | pO2 52 | HCO3 13 | Lactato 6.1",
        "electrolytes": "K+ 4.4 | Na+ 137",
        "glucose": "HGT: 110 mg/dL",
        "others": "Dímero D: > 15.000 ug/L"
      },
      "history": {
        "witness": "Hermana informa hinchazón asimétrica de pierna izquierda desde hace 5 días.",
        "medications": "Carboplatino, Paclitaxel.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-17",
    "title": "Caso 17: Miocarditis Viral Aguda con TV Sostenida y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Lucas Montero",
      "age": 21,
      "gender": "M",
      "location": "Box de Reanimación SAR",
      "history": "Cuadro gripal febril hace 7 días. Sin antecedentes cardiovasculares.",
      "presentation": "Dolor torácico opresivo punzante, palpitaciones rápidas y disnea progresiva en reposo."
    },
    "initialVitals": {
      "hr": 190,
      "bp": "80/48",
      "spo2": 92,
      "etco2": 27,
      "rr": 28,
      "temp": 37.8,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa",
      "isStable": false,
      "stabilityReason": "Miocarditis con compromiso hemodinámico y arritmia ventricular.",
      "consciousness": "Pálido, mareado",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente sufre un colapso súbito en la camilla y el trazado se convierte en Fibrilación Ventricular.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 37.7,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 96,
      "bp": "94/60",
      "spo2": 97,
      "etco2": 40,
      "rr": 14,
      "temp": 37.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con alteraciones difusas de repolarización",
      "pulsePresent": true,
      "consciousness": "Comatoso posparo"
    },
    "reversibleCause": "Inflamación miocárdica aguda e inestabilidad eléctrica ventricular",
    "hytCategory": "Trombosis coronaria / Isquemia miocárdica",
    "teachingNotes": "Desfibrilación 200J, compresiones continuas, soporte inotrópico y antiviral/antiinflamatorio en UCI.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Frote pericárdico sutil audible previamente, murmullo conservado.",
        "cardiovascular": "Ruidos taquicárdicos con galope R3.",
        "perfusion": "Piel tibia pero pálida.",
        "temperature": "37.8 °C"
      },
      "pocus": {
        "cardiac": "Hipocinesia global difusa de VI con derrame pericárdico leve de 6 mm.",
        "lung": "Normales.",
        "vci": "VCI 17 mm."
      },
      "labs": {
        "gsa": "pH 7.32 | pCO2 34 | pO2 84 | HCO3 18",
        "electrolytes": "K+ 4.1 | Na+ 139",
        "glucose": "HGT: 99 mg/dL",
        "others": "Troponina I: 5.2 ng/mL | PCR: 120 mg/L"
      },
      "history": {
        "witness": "Madre refiere que estuvo con faringoamigdalitis viral y fiebre la semana pasada.",
        "medications": "Ibuprofeno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-18",
    "title": "Caso 18: Taquicardia Auricular Ectópica con Hiperkalemia en ERC que colapsa en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Bernardo Medina",
      "age": 69,
      "gender": "M",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "Enfermedad Renal Crónica etapa 5 en hemodiálisis trisemanal.",
      "presentation": "Faltó a sus últimas 2 sesiones de diálisis por problemas de transporte. Palpitaciones y marcada debilidad muscular."
    },
    "initialVitals": {
      "hr": 160,
      "bp": "76/44",
      "spo2": 90,
      "etco2": 26,
      "rr": 26,
      "temp": 36.3,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Auricular de QRS ensanchado por hiperkalemia",
      "isStable": false,
      "stabilityReason": "Hipotensión y toxicidad de membrana miocárdica por potasio.",
      "consciousness": "Soporoso",
      "airway": "Espontánea",
      "ivAccess": "Fístula AV en brazo izq"
    },
    "degenerationMessage": "Los complejos QRS se ensanchan progresivamente hasta perder el pulso carotídeo, quedando en AESP lenta.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP con QRS ancho)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 82,
      "bp": "92/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 12,
      "temp": 36.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con T picudas tratadas",
      "pulsePresent": true,
      "consciousness": "Comatoso"
    },
    "reversibleCause": "Hiperkalemia severa con toxicidad de membrana miocárdica",
    "hytCategory": "Hiperkalemia",
    "teachingNotes": "¡ANTÍDOTO DE EMERGENCIA! Gluconato de Calcio al 10% 10-20 ml IV para estabilizar membrana, seguido de Insulina + Glucosa y Bicarbonato de Sodio.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crepitaciones basales leves por sobrecarga.",
        "cardiovascular": "Ruidos apagados rítmicos.",
        "perfusion": "Piel cetrina, palidez terrosa.",
        "temperature": "36.3 °C"
      },
      "pocus": {
        "cardiac": "Sin derrame pericárdico. Contractilidad conservada.",
        "lung": "Líneas B basales.",
        "vci": "VCI 22 mm con poco colapso."
      },
      "labs": {
        "gsa": "pH 7.21 | pCO2 30 | pO2 82 | HCO3 12",
        "electrolytes": "K+ 7.6 mEq/L (Hiperkalemia crítica) | Na+ 135",
        "glucose": "HGT: 120 mg/dL",
        "others": "Creatinina: 8.4 mg/dL | BUN: 92 mg/dL"
      },
      "history": {
        "witness": "Hijo confirma que no se dializa desde hace 5 días.",
        "medications": "Carbonato de calcio, Furosemida (omitida).",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-19",
    "title": "Caso 19: Intoxicación por Antidepresivos Tricíclicos (Amitriptilina) con TV y Colapso",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Constanza Parra",
      "age": 27,
      "gender": "F",
      "location": "Box de Reanimación Urgencias",
      "history": "Depresión mayor en tratamiento. Intento de suicidio con fármacos.",
      "presentation": "Ingresa somnolienta con midriasis bilateral, piel seca, taquicardia con QRS ancho (>160 ms) y convulsiones."
    },
    "initialVitals": {
      "hr": 175,
      "bp": "70/40",
      "spo2": 91,
      "etco2": 25,
      "rr": 22,
      "temp": 37.4,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia de QRS Ancho por Bloqueo de Canales de Na+",
      "isStable": false,
      "stabilityReason": "Toxicidad cardiovascular grave por tricíclicos.",
      "consciousness": "Estuporosa, post-ictal",
      "airway": "En riesgo",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente presenta paro cardiorrespiratorio en TV sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 37.3,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular sin pulso (TVSP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en TVSP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 90,
      "bp": "98/64",
      "spo2": 97,
      "etco2": 39,
      "rr": 14,
      "temp": 37.0,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con estrechamiento del QRS",
      "pulsePresent": true,
      "consciousness": "Comatosa intubada"
    },
    "reversibleCause": "Bloqueo de canales de sodio cardíacos dependientes de voltaje por Amitriptilina",
    "hytCategory": "Tóxicos (Antidepresivos Tricíclicos)",
    "teachingNotes": "Tratamiento específico: Desfibrilación en paro y BICARBONATO DE SODIO IV 1-2 mEq/kg en bolos repetidos para alcalinizar el plasma (meta pH 7.50-7.55).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo conservado sin ruidos.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos.",
        "perfusion": "Piel caliente y seca, mucosas resecas, midriasis arreactiva.",
        "temperature": "37.4 °C"
      },
      "pocus": {
        "cardiac": "Corazón anatómicamente normal con mala contractilidad global.",
        "lung": "Normal.",
        "vci": "VCI 16 mm."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 48 | pO2 85 | HCO3 17",
        "electrolytes": "K+ 4.0 | Na+ 138",
        "glucose": "HGT: 108 mg/dL",
        "others": "ECG muestra onda R > 3mm en aVR y QRS de 180 ms"
      },
      "history": {
        "witness": "Pareja encontró 3 cajas vacías de Amitriptilina 25mg al lado de su cama.",
        "medications": "Amitriptilina, Clonazepam.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-20",
    "title": "Caso 20: Shock Anafiláctico Severo por Antibiótico con Taquicardia y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Andrés Cárdenas",
      "age": 45,
      "gender": "M",
      "location": "Box de Urgencias",
      "history": "Sin antecedentes alérgicos reportados. Recibió Ceftriaxona IV hace 5 minutos.",
      "presentation": "Presenta estridor laríngeo súbito, broncoespasmo severo, eritema generalizado, angioedema labial y colapso circulatorio."
    },
    "initialVitals": {
      "hr": 160,
      "bp": "55/30",
      "spo2": 82,
      "etco2": 18,
      "rr": 36,
      "temp": 36.5,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal refleja extrema por vasodilatación",
      "isStable": false,
      "stabilityReason": "Shock anafiláctico fulminante.",
      "consciousness": "Cianótico, combativo, luego pierde consciencia",
      "airway": "Estridor laríngeo inminente",
      "ivAccess": "Vía 18G permeable"
    },
    "degenerationMessage": "El paciente cierra la vía aérea por angioedema masivo, se torna cianótico negruzco y pierde el pulso carotídeo en AESP.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP anafiláctica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 100,
      "bp": "92/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal en recuperación",
      "pulsePresent": true,
      "consciousness": "Intubado protegido"
    },
    "reversibleCause": "Vasodilatación sistémica masiva, fuga capilar y colapso de vía aérea por anafilaxia",
    "hytCategory": "Tóxicos / Hipoxia (Anafilaxia severa)",
    "teachingNotes": "Tratamiento salvador: Adrenalina precoz (IM o IV), Intubación endotraqueal precoz antes del cierre glótico completo y cargas rápidas de suero salino.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Sibilancias audibles a distancia, estridor inspiratorio marcado previo al paro.",
        "cardiovascular": "Ruidos apagados rápidos.",
        "perfusion": "Habones urticariformes confluentes en tórax, angioedema de labios y lengua.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas colapsadas por vasodilatación distributiva extrema.",
        "lung": "Broncoespasmo sin neumotórax.",
        "vci": "VCI totalmente colapsada < 5 mm."
      },
      "labs": {
        "gsa": "pH 7.21 | pCO2 50 | pO2 52 | HCO3 19 | Lactato 5.9",
        "electrolytes": "K+ 4.2 | Na+ 139",
        "glucose": "HGT: 110 mg/dL",
        "others": "Triptasa sérica muy elevada"
      },
      "history": {
        "witness": "Enfermera administraba primera dosis de Ceftriaxona por celulitis cuando comenzó con prurito y disnea.",
        "medications": "Ceftriaxona.",
        "allergies": "Ninguna declarada."
      }
    }
  },
  {
    "id": "caso-21",
    "title": "Caso 21: Neumotórax a Tensión Espontáneo con TSV que degenera a AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Tomás Echeverría",
      "age": 18,
      "gender": "M",
      "location": "Box SAPU",
      "history": "Hábito marfanoide, alto y delgado. Fumador ocasional.",
      "presentation": "Dolor punzante súbito en hemitórax izquierdo mientras estaba sentado, tos seca y disnea progresiva angustiante."
    },
    "initialVitals": {
      "hr": 155,
      "bp": "74/42",
      "spo2": 84,
      "etco2": 21,
      "rr": 34,
      "temp": 36.6,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal refleja",
      "isStable": false,
      "stabilityReason": "Shock obstructivo por neumotórax hipertensivo.",
      "consciousness": "Agitado por hipoxia",
      "airway": "Insuficiencia ventilatoria",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente se torna cianótico, su tráquea se desvía visiblemente a la derecha y cesa el pulso carotídeo en AESP.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente sin pulso"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 96,
      "bp": "100/66",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal",
      "pulsePresent": true,
      "consciousness": "Respira aliviado tras toracocentesis"
    },
    "reversibleCause": "Rotura de bulas apicales con neumotórax a tensión izquierdo",
    "hytCategory": "Neumotórax a tensión",
    "teachingNotes": "Descompresión inmediata con aguja/catéter en tórax izquierdo. ¡El retraso para tomar una radiografía es un error fatal!",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Silencio auscultatorio completo en hemitórax izquierdo, timpanismo resonante a la percusión.",
        "cardiovascular": "Ruidos cardíacos desplazados a la derecha. Ingurgitación yugular.",
        "perfusion": "Cianosis central.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho comprimido.",
        "lung": "Ausencia total de deslizamiento pleural izquierdo (bar-code sign en modo M).",
        "vci": "VCI pletórica fija 25 mm."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 54 | pO2 48 | HCO3 20",
        "electrolytes": "Normales",
        "glucose": "HGT: 104 mg/dL",
        "others": "Sin antecedentes traumáticos"
      },
      "history": {
        "witness": "Amigo relata que sintió un 'chasquido' en el pecho jugando videojuegos y no podía respirar.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-22",
    "title": "Caso 22: Hemotórax Masivo por Trauma Torácico Penetrante con AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Rodrigo Tapia",
      "age": 33,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Herida por arma de fuego en región axilar derecha.",
      "presentation": "Shock hemorrágico severo, palidez terrosa y disnea aguda con gran taquicardia."
    },
    "initialVitals": {
      "hr": 165,
      "bp": "62/34",
      "spo2": 86,
      "etco2": 19,
      "rr": 32,
      "temp": 35.8,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia Sinusal compensatoria de shock hemorrágico",
      "isStable": false,
      "stabilityReason": "Shock hipovolémico grado IV.",
      "consciousness": "Somnoliento, hipotenso",
      "airway": "En riesgo",
      "ivAccess": "Vía venosa 16G"
    },
    "degenerationMessage": "El paciente cae en apnea y paro cardiorrespiratorio en AESP por desangramiento intratorácico.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.7,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en AESP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 102,
      "bp": "88/54",
      "spo2": 94,
      "etco2": 35,
      "rr": 16,
      "temp": 36.0,
      "rhythm": "SINUSAL",
      "rhythmName": "Taquicardia Sinusal con resucitación de volumen",
      "pulsePresent": true,
      "consciousness": "Intubado para pabellón"
    },
    "reversibleCause": "Shock hipovolémico hemorrágico masivo por lesión vascular intratorácica",
    "hytCategory": "Hipovolemia (Hemotórax masivo)",
    "teachingNotes": "Tratamiento: Carga rápida masiva de suero fisiológico y transfusión MTP, tubo de drenaje pleural y toracotomía de urgencia.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Matidez intensa a la percusión en hemitórax derecho con abolición del murmullo pulmonar.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos filiformes. Yugulares colapsadas.",
        "perfusion": "Palidez extrema, frialdad distal.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas hipovolémicas vacías.",
        "lung": "Gran colección líquida anecoica intratorácica derecha (>1500 ml).",
        "vci": "VCI colapsada filiforme < 4 mm."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 32 | pO2 70 | HCO3 12 | Lactato 7.8",
        "electrolytes": "K+ 3.8 | Na+ 137",
        "glucose": "HGT: 90 mg/dL",
        "others": "Hemoglobina: 6.2 g/dL | Hematocrito: 19%"
      },
      "history": {
        "witness": "Paramédicos informan impacto de bala único en tórax hace 15 minutos.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-23",
    "title": "Caso 23: Rotura de Aneurisma de Aorta Abdominal con Taquicardia y Paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Renato Carrasco",
      "age": 72,
      "gender": "M",
      "location": "Box de Reanimación Hospitalario",
      "history": "HTA severa, tabaquismo activo. Masa pulsátil abdominal conocida.",
      "presentation": "Dolor lumbar y abdominal desgarrante súbito, síncope y lipotimia en el baño."
    },
    "initialVitals": {
      "hr": 150,
      "bp": "60/30",
      "spo2": 87,
      "etco2": 20,
      "rr": 28,
      "temp": 35.5,
      "rhythm": "TSVP",
      "rhythmName": "Taquicardia refleja extrema por colapso circulatorio",
      "isStable": false,
      "stabilityReason": "Shock hemorrágico cataclísmico por rotura vascular.",
      "consciousness": "Obnubilado, pálido como el papel",
      "airway": "Espontánea",
      "ivAccess": "Dos vías 16G"
    },
    "degenerationMessage": "El abdomen se distiende visiblemente, el pulso carotídeo se desvanece y el monitor queda en AESP bradicárdica agónica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 35.4,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro por exanguinación"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 98,
      "bp": "86/50",
      "spo2": 94,
      "etco2": 34,
      "rr": 16,
      "temp": 35.8,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con volemia de rescate",
      "pulsePresent": true,
      "consciousness": "En camino a pabellón vascular"
    },
    "reversibleCause": "Exanguinación retroperitoneal e intraperitoneal masiva por rotura de AAA",
    "hytCategory": "Hipovolemia (Rotura de AAA)",
    "teachingNotes": "Prioridad: Carga rápida masiva de cristaloides (suero salino), protocolo de transfusión masiva 1:1:1 y aviso urgente a Cirugía Vascular.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar simétrico bilateral.",
        "cardiovascular": "Ruidos cardíacos lejanos. Masa abdominal pulsátil dolorosa.",
        "perfusion": "Palidez de porcelana extrema.",
        "temperature": "35.5 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo casi vacío en sístole.",
        "lung": "Sin neumotórax.",
        "vci": "Aorta abdominal dilatada a 7.5 cm con hematoma retroperitoneal evidente. VCI colapsada."
      },
      "labs": {
        "gsa": "pH 7.12 | pCO2 28 | pO2 76 | HCO3 9 | Lactato 10.2 mmol/L",
        "electrolytes": "K+ 4.0 | Na+ 138",
        "glucose": "HGT: 110 mg/dL",
        "others": "Hematocrito: 17% | Hemoglobina: 5.5 g/dL"
      },
      "history": {
        "witness": "Esposa relata que gritó de dolor en la cintura y se desmayó en el suelo.",
        "medications": "Atenolol, Losartán.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-24",
    "title": "Caso 24: Síndrome de Brugada Tipo 1 Desencadenado por Fiebre con TV Polimorfa y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Álvaro Cisternas",
      "age": 34,
      "gender": "M",
      "location": "Servicio de Urgencias",
      "history": "Hermano fallecido de muerte súbita a los 29 años.",
      "presentation": "Cuadro febril de 39.5°C por influenza. Presenta palpitaciones rápidas, mareo severo y síncope en la sala de espera."
    },
    "initialVitals": {
      "hr": 205,
      "bp": "76/45",
      "spo2": 91,
      "etco2": 26,
      "rr": 30,
      "temp": 39.4,
      "rhythm": "TVSP",
      "rhythmName": "TV Polimorfa / Taquicardia Ventricular Brugada",
      "isStable": false,
      "stabilityReason": "Inestabilidad hemodinámica y riesgo inminente de muerte súbita arrítmica.",
      "consciousness": "Confuso, sudoroso",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente entra en pérdida de consciencia súbita y el monitor registra Fibrilación Ventricular caótica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 39.3,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 88,
      "bp": "104/68",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 38.6,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con patrón de Brugada en aleta de tiburón en V1-V2",
      "pulsePresent": true,
      "consciousness": "Recupera conciencia"
    },
    "reversibleCause": "Canalopatía cardíaca (mutación SCN5A) desenmascarada por fiebre alta",
    "hytCategory": "Trombosis coronaria / Arritmia canalopática",
    "teachingNotes": "Desfibrilación 200J inmediata, antipiréticos agresivos (Paracetamol IV) para bajar la temperatura y evitar fármacos bloqueadores de sodio.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular normal.",
        "cardiovascular": "Ruidos cardíacos arrítmicos caóticos.",
        "perfusion": "Piel intensamente caliente por fiebre, pero extremidades frías.",
        "temperature": "39.4 °C"
      },
      "pocus": {
        "cardiac": "Corazón estructuralmente sano con FEy normal.",
        "lung": "Pleuras normales.",
        "vci": "VCI 15 mm."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 35 | pO2 88 | HCO3 19",
        "electrolytes": "K+ 4.1 | Na+ 140",
        "glucose": "HGT: 104 mg/dL",
        "others": "ECG basal muestra elevación del ST cóncava >2mm en V1-V2 (Patrón Brugada Tipo 1)"
      },
      "history": {
        "witness": "Madre refiere antecedentes familiares de muerte súbita durante el sueño.",
        "medications": "Paracetamol casero.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-25",
    "title": "Caso 25: Crisis Tirotóxica (Tormenta Tiroidea) con FA rápida y Colapso en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Camila Donoso",
      "age": 31,
      "gender": "F",
      "location": "Box de Urgencias",
      "history": "Enfermedad de Graves-Basedow con mal apego al tratamiento.",
      "presentation": "Hipertermia de 40.1°C, delirio agitado, diarrea, temblor fino, bocio difuso y taquicardia extrema incontrolable."
    },
    "initialVitals": {
      "hr": 190,
      "bp": "80/42",
      "spo2": 90,
      "etco2": 24,
      "rr": 34,
      "temp": 40.1,
      "rhythm": "FA_RVR",
      "rhythmName": "Fibrilación Auricular con RVR extrema",
      "isStable": false,
      "stabilityReason": "Falla circulatoria de alto gasto descompensada e hipertermia maligna.",
      "consciousness": "Delirante, desorientada",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente presenta un colapso cardiovascular abrupto, hace apnea y el monitor registra AESP taquicárdica sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 40.0,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP tirotóxica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "cardioversion_sincronizada"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 110,
      "bp": "92/58",
      "spo2": 95,
      "etco2": 38,
      "rr": 16,
      "temp": 39.0,
      "rhythm": "FA_RVR",
      "rhythmName": "FA con frecuencia controlada con Propranolol posparo",
      "pulsePresent": true,
      "consciousness": "Comatosa en UCI"
    },
    "reversibleCause": "Insuficiencia cardíaca aguda de alto gasto por tormenta tiroidea",
    "hytCategory": "Tóxicos (Hormona tiroidea endógena) / Hipertermia",
    "teachingNotes": "Reanimación cardiopulmonar de alta calidad, Adrenalina 1mg, enfriamiento activo agresivo y tratamiento antitiroideo (Propiltiouracilo/Metimazol, Yodo, Corticoides y Betabloqueo).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo conservado, crepitaciones bilaterales basales.",
        "cardiovascular": "Ruidos cardíacos hiperdinámicos muy rápidos. Bocio palpable con soplo.",
        "perfusion": "Piel enrojecida, caliente y muy sudorosa.",
        "temperature": "40.1 °C"
      },
      "pocus": {
        "cardiac": "Gasto cardíaco masivamente elevado (>10 L/min) con cavidades derechas sobrecargadas.",
        "lung": "Líneas B escasas.",
        "vci": "VCI 20 mm."
      },
      "labs": {
        "gsa": "pH 7.24 | pCO2 30 | pO2 82 | HCO3 13 | Lactato 5.4",
        "electrolytes": "K+ 3.4 | Na+ 136",
        "glucose": "HGT: 125 mg/dL",
        "others": "T4 libre: > 7.7 ng/dL (Elevadísima) | TSH: < 0.01"
      },
      "history": {
        "witness": "Hermana informa que dejó de tomar el Metimazol hace 1 mes y estaba muy estresada.",
        "medications": "Metimazol (abandonado).",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-26",
    "title": "Caso 26: Bradicardia Sinusal Severa por Intoxicación con Betabloqueadores y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Esteban Morales",
      "age": 55,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertensión arterial. Ingesta masiva de Propranolol con fines suicidas.",
      "presentation": "Bradilálico, mareado, extremidades heladas con sudoración profusa tras ingerir 40 comprimidos de Propranolol 40mg."
    },
    "initialVitals": {
      "hr": 32,
      "bp": "68/38",
      "spo2": 91,
      "etco2": 33,
      "rr": 14,
      "temp": 35.8,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Severa Tóxica",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico por intoxicación con betabloqueadores.",
      "consciousness": "Somnoliento profundo",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La frecuencia cardíaca cae a 20 lpm y finalmente la actividad eléctrica se aplana en Asistolia completa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 35.7,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Paro en Asistolia por betabloqueador"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 65,
      "bp": "92/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo de escape sinusal tras infusión de Glucagón",
      "pulsePresent": true,
      "consciousness": "Comatoso intubado"
    },
    "reversibleCause": "Bloqueo masivo de receptores beta-1 y beta-2 miocárdicos",
    "hytCategory": "Tóxicos (Betabloqueadores)",
    "teachingNotes": "Tratamiento antídoto específico: GLUCAGÓN 5-10 mg IV en bolo (actúa vía adenilato ciclasa independiente del receptor beta), Calcio IV e infusión de insulina en altas dosis (HIET).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Ruidos cardíacos extremadamente lentos.",
        "perfusion": "Piel fría y sudorosa, relleno capilar > 4 segundos.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Bradiquinesia severa con fracción de eyección deprimida (FEy 25%). Sin derrame.",
        "lung": "Pleuras limpias.",
        "vci": "VCI 18 mm."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 44 | pO2 80 | HCO3 17",
        "electrolytes": "K+ 4.8 | Na+ 138",
        "glucose": "HGT: 68 mg/dL (Hipoglicemia inducida por betabloqueo)",
        "others": "Toxicológico positivo para Propranolol"
      },
      "history": {
        "witness": "Esposa encontró las cajas vacías de Propranolol en el baño.",
        "medications": "Propranolol, Hidroclorotiazida.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-27",
    "title": "Caso 27: Bloqueo AV Completo (3er Grado) por Hiperkalemia Crítica (8.1 mEq/L) con Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Guillermo Palma",
      "age": 71,
      "gender": "M",
      "location": "Servicio de Urgencias",
      "history": "ERC etapa 5 en diálisis peritoneal. Ingesta de sustitutos de sal con cloruro de potasio.",
      "presentation": "Compromiso de consciencia, tetraparesia flácida arrefléctica y disnea."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "62/34",
      "spo2": 88,
      "etco2": 28,
      "rr": 12,
      "temp": 36.1,
      "rhythm": "BAV_3",
      "rhythmName": "Bloqueo AV de 3er Grado (Completo) con escape idioventricular",
      "isStable": false,
      "stabilityReason": "Disociación AV completa y shock por hiperkalemia extrema.",
      "consciousness": "Soporoso no reactivo",
      "airway": "Bradipneico",
      "ivAccess": "Vía venosa 18G"
    },
    "degenerationMessage": "El ritmo idioventricular de escape se enlentece, se transforma en onda sinusoidal y se apaga en Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.0,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro por potasio"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 68,
      "bp": "96/62",
      "spo2": 96,
      "etco2": 39,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con conducción AV restaurada",
      "pulsePresent": true,
      "consciousness": "Intubado para hemodiálisis urgente"
    },
    "reversibleCause": "Inactivación de canales de sodio por hiperkalemia crítica",
    "hytCategory": "Hiperkalemia",
    "teachingNotes": "¡EMERGENCIA MÉDICA MÁXIMA! GLUCONATO DE CALCIO AL 10% 20-30 ml IV en bolo para revertir el paro, Bicarbonato de Sodio 50-100 mEq y Solución Polarizante.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hipoventilación difusa, murmullo disminuido.",
        "cardiovascular": "Ruidos cardíacos agónicos aislados sin sincronía auricular.",
        "perfusion": "Piel pálida cérea, hipotonía muscular absoluta.",
        "temperature": "36.1 °C"
      },
      "pocus": {
        "cardiac": "Miocardio aturdido con contracciones muy lentas inefectivas.",
        "lung": "Líneas A normales.",
        "vci": "VCI 20 mm."
      },
      "labs": {
        "gsa": "pH 7.10 | pCO2 30 | pO2 80 | HCO3 11",
        "electrolytes": "K+ 8.1 mEq/L (Nivel letal de potasio) | Na+ 132 | Ca2+ iónico 0.95 mmol/L",
        "glucose": "HGT: 110 mg/dL",
        "others": "ECG previo mostraba ausencia de ondas P y complejos sine-wave"
      },
      "history": {
        "witness": "Hija refiere que estuvo tomando sales dietéticas de potasio y no se dializó.",
        "medications": "Enalapril, Espironolactona (combinación mortal).",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-28",
    "title": "Caso 28: Bloqueo AV de 2° Grado Mobitz II en IAM Anteroseptal que degenera en TVSP",
    "type": "bradicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Carlos Alarcón",
      "age": 64,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Dolor precordial opresivo de 3 horas de evolución irradiado a cuello.",
      "presentation": "Dolor precordial persistente, sudoración fría y mareo intenso al sentarse."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "72/42",
      "spo2": 92,
      "etco2": 31,
      "rr": 22,
      "temp": 36.5,
      "rhythm": "BAV_2_MOBITZ_2",
      "rhythmName": "Bloqueo AV 2° Grado Mobitz II con conducción 2:1",
      "isStable": false,
      "stabilityReason": "Inestabilidad hemodinámica e isquemia del sistema de conducción infrageniculado.",
      "consciousness": "Consciente angustiado",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente sufre un síncope brusco y el monitor degenera súbitamente a Taquicardia Ventricular sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular sin pulso (TVSP)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 80,
      "bp": "90/58",
      "spo2": 95,
      "etco2": 41,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "STEMI Anterior con QRS angosto y marcapasos en standby",
      "pulsePresent": true,
      "consciousness": "Comatoso posparo"
    },
    "reversibleCause": "Necrosis isquémica aguda del haz de His y ramas bundle por oclusión de DA",
    "hytCategory": "Trombosis coronaria (IAM Anteroseptal)",
    "teachingNotes": "Mobitz II no responde bien a atropina (requiere Marcapasos transcutáneo). En paro por TVSP: Desfibrilación 200J y RCP inmediata.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crepitaciones pulmonares bibasales.",
        "cardiovascular": "Ruidos bradicárdicos con pausas regulares 2:1.",
        "perfusion": "Piel pálida y sudorosa.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Acinesia septal anterior extensa.",
        "lung": "Líneas B escasas.",
        "vci": "VCI 18 mm."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 36 | pO2 82 | HCO3 18 | Lactato 3.8",
        "electrolytes": "K+ 4.1 | Na+ 139",
        "glucose": "HGT: 140 mg/dL",
        "others": "Troponina I: 3.8 ng/mL | ECG confirma supradesnivel ST en V1-V4"
      },
      "history": {
        "witness": "Esposa relata que el dolor comenzó paleando tierra en el jardín.",
        "medications": "Aspirina.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-29",
    "title": "Caso 29: Intoxicación por Calcioantagonistas (Verapamilo) con Bradicardia Nodal y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Patricia Mella",
      "age": 49,
      "gender": "F",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertensa en tratamiento con Verapamilo. Ingesta tóxica de 30 tabletas de 120mg.",
      "presentation": "Soporosa, extremadamente hipotensa, bradicárdica y con náuseas incoercibles."
    },
    "initialVitals": {
      "hr": 28,
      "bp": "58/32",
      "spo2": 90,
      "etco2": 29,
      "rr": 14,
      "temp": 36.0,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Ritmo de Escape de la Unión Lento (28 lpm)",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico por sobredosis de calcioantagonistas.",
      "consciousness": "Sopor profundo",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente entra en apnea, el pulso carotídeo se pierde por completo y queda en AESP con complejos lentos.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 35.9,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Verapamilo)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en AESP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 60,
      "bp": "90/56",
      "spo2": 96,
      "etco2": 38,
      "rr": 12,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con Marcapasos transcutáneo de captura",
      "pulsePresent": true,
      "consciousness": "Intubada en UCI"
    },
    "reversibleCause": "Bloqueo masivo de canales de calcio tipo L miocárdicos y vasculares",
    "hytCategory": "Tóxicos (Calcioantagonistas)",
    "teachingNotes": "Tratamiento salvador: Gluconato de Calcio IV en dosis altas (10-30 ml al 10%), Terapia de Insulina a altas dosis con Dextrosa (HIET) y Vasopresores.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos muy apagados y lentos.",
        "perfusion": "Piel fría y cérea, hipotensión extrema refractaria.",
        "temperature": "36.0 °C"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica severamente deprimida difusa (FEy < 20%).",
        "lung": "Normal.",
        "vci": "VCI 17 mm."
      },
      "labs": {
        "gsa": "pH 7.20 | pCO2 38 | pO2 84 | HCO3 15 | Lactato 5.1",
        "electrolytes": "K+ 4.2 | Na+ 138 | Ca2+ normal en sangre pero canales bloqueados",
        "glucose": "HGT: 240 mg/dL (Hiperglicemia típica de toxicidad por Verapamilo)",
        "others": "Toxicológico confirma Verapamilo"
      },
      "history": {
        "witness": "Hija encontró blisters vacíos de Verapamilo 120 mg.",
        "medications": "Verapamilo retard.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-30",
    "title": "Caso 30: Hipotermia Severa Accidental (27.5 °C) con Bradicardia Extrema que cae en FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Víctor Mardones",
      "age": 58,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Persona en situación de calle. Encontrado a la intemperie en noche helada (-2°C).",
      "presentation": "Comatoso, rigidez muscular, bradipnea severa de 4 rpm, piel helada como mármol y bradicardia de 22 lpm."
    },
    "initialVitals": {
      "hr": 22,
      "bp": "50/28",
      "spo2": 80,
      "etco2": 20,
      "rr": 6,
      "temp": 27.5,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Extrema por Hipotermia con ondas de Osborn",
      "isStable": false,
      "stabilityReason": "Hipotermia severa grado III con inestabilidad eléctrica miocárdica.",
      "consciousness": "Coma hipotérmico",
      "airway": "Bradipnea crítica",
      "ivAccess": "Vía central femoral"
    },
    "degenerationMessage": "Al movilizar al paciente para instalar apósitos térmicos, el miocardio irritable fibrila y cae en FV por hipotermia.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 27.4,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular por Hipotermia",
      "pulsePresent": false,
      "consciousness": "Inconsciente en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 75,
      "bp": "92/60",
      "spo2": 94,
      "etco2": 38,
      "rr": 12,
      "temp": 34.0,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con onda J de Osborn en retroceso",
      "pulsePresent": true,
      "consciousness": "Comatoso en recalentamiento activo"
    },
    "reversibleCause": "Hipotermia severa accidental con miocardio hiperexcitable a estímulos mecánicos",
    "hytCategory": "Hipotermia",
    "teachingNotes": "Axioma ACLS: 'Nadie está muerto hasta que está caliente y muerto' (recalentar hasta > 32-35°C). Limitar descargas a máximo 3 hasta recalentar.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Bradipnea superficial extrema (4 rpm), murmullo vesicular apenas audible.",
        "cardiovascular": "Ruidos cardíacos casi imperceptibles a 22 lpm.",
        "perfusion": "Rigidez fría marmórea, piel helada al tacto.",
        "temperature": "27.5 °C (Termómetro esofágico)"
      },
      "pocus": {
        "cardiac": "Contracción cardíaca sumamente lenta y perezosa.",
        "lung": "Normal.",
        "vci": "VCI 14 mm."
      },
      "labs": {
        "gsa": "pH 7.15 (corregido por T°) | pCO2 48 | pO2 65 | HCO3 16",
        "electrolytes": "K+ 3.8 | Na+ 136",
        "glucose": "HGT: 62 mg/dL",
        "others": "ECG muestra clásicas Ondas J de Osborn en cara inferior y precordiales"
      },
      "history": {
        "witness": "Carabineros lo encontró inconsciente en la ribera del río.",
        "medications": "Ninguno conocido.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-31",
    "title": "Caso 31: IAM Inferior Agudo con Reflejo de Bezold-Jarisch y Colapso en AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Héctor Valenzuela",
      "age": 67,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Diabético e hipertenso. Dolor epigástrico opresivo y náuseas intensas.",
      "presentation": "Llega con náuseas, vómitos, diaforesis fría, bradicardia extrema y sensación de desmayo."
    },
    "initialVitals": {
      "hr": 34,
      "bp": "66/38",
      "spo2": 91,
      "etco2": 30,
      "rr": 20,
      "temp": 36.4,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal con supradesnivel ST en DII, DIII y aVF",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico con hipertonía vagal refleja por isquemia de pared inferior.",
      "consciousness": "Obnubilado, nauseoso",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente emite un quejido, vomita, pierde el tono postural y cae en AESP sin pulso carotídeo.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP isquémica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en AESP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 76,
      "bp": "90/58",
      "spo2": 96,
      "etco2": 40,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "STEMI Inferior posparo para Hemodinamia",
      "pulsePresent": true,
      "consciousness": "Comatoso posparo"
    },
    "reversibleCause": "Isquemia aguda de arteria coronaria derecha con reflejo vagal inhibitorio (Bezold-Jarisch)",
    "hytCategory": "Trombosis coronaria (IAM de cara inferior)",
    "teachingNotes": "Atropina 1mg IV en bradicardia inicial. En paro en AESP: RCP de alta calidad, Adrenalina 1mg y activación inmediata de Angioplastía primaria.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Bradicardia profunda rítmica.",
        "perfusion": "Palidez, sudoración fría profusa y piloerección.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Acinesia segmentaria de cara inferior y pared de ventrículo derecho.",
        "lung": "Normal bilateral.",
        "vci": "VCI 19 mm."
      },
      "labs": {
        "gsa": "pH 7.31 | pCO2 36 | pO2 84 | HCO3 18 | Lactato 3.6",
        "electrolytes": "K+ 4.0 | Na+ 139",
        "glucose": "HGT: 155 mg/dL",
        "others": "Troponina ultrasensible: 680 ng/L | ECG muestra supradesnivel ST en cara inferior"
      },
      "history": {
        "witness": "Esposa confirma que el dolor comenzó después de almorzar, confundiéndolo con acidez.",
        "medications": "Metformina, Losartán.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-32",
    "title": "Caso 32: Taponamiento Cardíaco por Pericarditis Urémica con Bradicardia Terminal y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Margarita Godoy",
      "age": 63,
      "gender": "F",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "ERC no dializada por rechazo de la paciente. Síndrome urémico crónico.",
      "presentation": "Disnea de reposo ortopneica, ingurgitación yugular marcada, pulso paradójico y ruidos velados."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "64/46",
      "spo2": 88,
      "etco2": 24,
      "rr": 28,
      "temp": 36.3,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal de bajo voltaje con alternancia eléctrica",
      "isStable": false,
      "stabilityReason": "Shock obstructivo pericárdico terminal.",
      "consciousness": "Soporosa profunda",
      "airway": "Ortopneica",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "La presión de pulso se estrecha a cero, la paciente pierde la consciencia y queda en AESP bradicárdica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Taponamiento)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 84,
      "bp": "96/64",
      "spo2": 95,
      "etco2": 38,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras Pericardiocentesis evacuadora",
      "pulsePresent": true,
      "consciousness": "Consciente aliviada"
    },
    "reversibleCause": "Taponamiento cardíaco por derrame pericárdico urémico hemático a tensión",
    "hytCategory": "Taponamiento cardíaco",
    "teachingNotes": "La AESP no se resuelve sin descompresión: PERICARDIOCENTESIS SUBXIFOIDEA urgente guiada por ecografía para extraer líquido a tensión.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente sin neumotórax.",
        "cardiovascular": "Ruidos cardíacos apagados lejanos. Ingurgitación yugular visible hasta la mandíbula.",
        "perfusion": "Piel pálida cetrina con escarcha urémica.",
        "temperature": "36.3 °C"
      },
      "pocus": {
        "cardiac": "Derrame pericárdico severo anecoico con fibrina que comprime y colapsa la aurícula y ventrículo derecho en diástole.",
        "lung": "Líneas A normales.",
        "vci": "VCI pletórica dilatada > 28 mm sin colapso respiratorio."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 32 | pO2 80 | HCO3 13 | Urea: 210 mg/dL | Creatinina: 9.8 mg/dL",
        "electrolytes": "K+ 5.4 | Na+ 136",
        "glucose": "HGT: 102 mg/dL",
        "others": "ECG muestra bajo voltaje generalizado y alternancia eléctrica"
      },
      "history": {
        "witness": "Hijo confirma diagnóstico de uremia terminal no dializada.",
        "medications": "Ninguno habitual.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-33",
    "title": "Caso 33: Status Asmático Crítico con Bradicardia Hipóxica Terminal y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Matías Albornoz",
      "age": 17,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Asma bronquial severa de difícil control. Múltiples hospitalizaciones en UCI.",
      "presentation": "Crisis asmática de 6 horas sin respuesta a inhaladores. Silencio auscultatorio torácico y agotamiento."
    },
    "initialVitals": {
      "hr": 36,
      "bp": "62/35",
      "spo2": 68,
      "etco2": 55,
      "rr": 8,
      "temp": 36.7,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Extrema por Hipoxia Terminal (36 lpm)",
      "isStable": false,
      "stabilityReason": "Paro respiratorio inminente por fatiga de musculatura ventilatoria.",
      "consciousness": "Comatoso por hipercapnia e hipoxia",
      "airway": "Silencio auscultatorio",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente entra en apnea definitiva, se torna cianótico negruzco y el monitor cae en Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea y asistolia"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 88,
      "bp": "96/60",
      "spo2": 97,
      "etco2": 36,
      "rr": 12,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras ventilación invasiva efectiva",
      "pulsePresent": true,
      "consciousness": "Intubado conectado a VM"
    },
    "reversibleCause": "Asfixia e hipoxia cerebral y miocárdica crítica por obstrucción bronquial masiva",
    "hytCategory": "Hipoxia / Acidosis respiratoria severa",
    "teachingNotes": "Prioridad de supervivencia: INTUBACIÓN OROTRAQUEAL inmediata, ventilación con O2 al 100%, Adrenalina 1mg IV y broncodilatadores por TET.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Tórax silente (ausencia de murmullo pulmonar y sibilancias por falta de flujo aéreo).",
        "cardiovascular": "Ruidos cardíacos apenas perceptibles muy bradicárdicos.",
        "perfusion": "Cianosis central profunda facial y ungueal.",
        "temperature": "36.7 °C"
      },
      "pocus": {
        "cardiac": "Sobrecarga aguda de cavidades derechas por vasoconstricción hipóxica pulmonar.",
        "lung": "Signos ecográficos de hiperinsuflación pulmonar.",
        "vci": "VCI pletórica 22 mm."
      },
      "labs": {
        "gsa": "pH 7.02 | pCO2 92 mmHg (Hipercapnia crítica) | pO2 38 mmHg | HCO3 22 | Lactato 6.5",
        "electrolytes": "K+ 4.5 | Na+ 138",
        "glucose": "HGT: 118 mg/dL",
        "others": "GSA muestran acidosis mixta letal"
      },
      "history": {
        "witness": "Amigo relata que estuvo usando el inhalador cada 10 minutos sin alivio.",
        "medications": "Salbutamol, Fluticasona.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-34",
    "title": "Caso 34: Shock Neurogénico por Trauma Raquimedular Cervical con Bradicardia y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Sebastián Vera",
      "age": 25,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Accidente por piquero en piscina poco profunda con traumatismo cervical.",
      "presentation": "Tetraplejía flácida inmediata, hipotensión severa y bradicardia paradójica sin taquicardia compensatoria."
    },
    "initialVitals": {
      "hr": 35,
      "bp": "58/30",
      "spo2": 93,
      "etco2": 26,
      "rr": 10,
      "temp": 35.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal por Pérdida de Tono Simpático",
      "isStable": false,
      "stabilityReason": "Shock neurogénico por sección medular cervical alta.",
      "consciousness": "Consciente pero tetrapléjico y somnoliento",
      "airway": "Respiración diafragmática débil",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente presenta apnea por compromiso de músculos intercostales y cae en AESP bradicárdica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 35.1,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP neurogénica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 72,
      "bp": "94/62",
      "spo2": 98,
      "etco2": 38,
      "rr": 12,
      "temp": 35.8,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal estable con soporte de Noradrenalina",
      "pulsePresent": true,
      "consciousness": "Intubado con collar cervical rígido"
    },
    "reversibleCause": "Pérdida del tono simpático vascular y cardíaco por shock neurogénico cervical",
    "hytCategory": "Shock neurogénico / Hipovolemia relativa",
    "teachingNotes": "Tratamiento: Cargas de cristaloides (suero salino), Vasopresores tempranos (Noradrenalina/Dopamina), Adrenalina 1mg y protección estricta de columna cervical.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Respiración exclusivamente diafragmática, murmullo pulmonar simétrico.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy bradicárdicos.",
        "perfusion": "Piel caliente y seca por debajo del nivel de la lesión (vasodilatación simpática). Priapismo.",
        "temperature": "35.2 °C"
      },
      "pocus": {
        "cardiac": "Corazón anatómicamente normal con fracción de eyección conservada pero bradicárdico.",
        "lung": "Normal bilateral.",
        "vci": "VCI colapsable por venodilatación masiva."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 46 | pO2 82 | HCO3 21",
        "electrolytes": "Normales",
        "glucose": "HGT: 102 mg/dL",
        "others": "Radiografía y TAC confirman luxofractura C5-C6"
      },
      "history": {
        "witness": "Amigos relatan que se lanzó un piquero y golpeó su cabeza contra el fondo de la piscina.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-35",
    "title": "Caso 35: Intoxicación por Organofosforados (Insecticida) con Síndrome Colinérgico y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Luis Alberto Sanhueza",
      "age": 52,
      "gender": "M",
      "location": "Box de Reanimación SAR",
      "history": "Trabajador agrícola. Fumigación sin equipo de protección personal con Clorpirifos.",
      "presentation": "Sialorrea masiva, broncorrea abundante, miosis puntiforme bilateral, fasciculaciones musculares y bradicardia."
    },
    "initialVitals": {
      "hr": 28,
      "bp": "65/35",
      "spo2": 78,
      "etco2": 40,
      "rr": 28,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Extrema por Hiperestimulación Colinérgica",
      "isStable": false,
      "stabilityReason": "Crisis colinérgica grave con broncorrea e insuficiencia respiratoria.",
      "consciousness": "Estuporoso, babeando copiosamente",
      "airway": "Inundación por secreciones bronquiales",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente se broncoaspira masivamente con sus propias secreciones, entra en apnea y la actividad eléctrica se extingue en Asistolia.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.1,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por organofosforados"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 78,
      "bp": "96/62",
      "spo2": 95,
      "etco2": 37,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con pupilas midriáticas tras Atropinización masiva",
      "pulsePresent": true,
      "consciousness": "Intubado en observación"
    },
    "reversibleCause": "Inhibición irreversible de la acetilcolinesterasa con crisis colinérgica masiva",
    "hytCategory": "Tóxicos (Organofosforados / Colinérgicos)",
    "teachingNotes": "¡ANTÍDOTO DE ELECCIÓN! ATROPINA EN DOSIS MASIVAS (2 a 5 mg IV en bolo cada 3-5 minutos hasta secar secreciones bronquiales) y Pralidoxima.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Auscultación pulmonar inundada de roncus, estertores crepitantes húmedos difusos (broncorrea masiva).",
        "cardiovascular": "Ruidos cardíacos lentos amortiguados.",
        "perfusion": "Diaforesis profusa, salivación líquida abundante, miosis bilateral en cabeza de alfiler.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Corazón estructuralmente normal con ritmo bradicárdico.",
        "lung": "Patrón de 'pulmón húmedo' con líneas B confluentes por broncorrea.",
        "vci": "VCI 16 mm."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 58 | pO2 46 | HCO3 20",
        "electrolytes": "Normales",
        "glucose": "HGT: 110 mg/dL",
        "others": "Actividad de colinesterasa plasmática: < 10% del valor normal"
      },
      "history": {
        "witness": "Compañero de faena agrícola informa que estuvo fumigando huerto de manzanos sin máscara.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-36",
    "title": "Caso 36: Intoxicación Digitálica (Digoxina) con Ritmo de la Unión y FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Carmen Gloria Valdés",
      "age": 79,
      "gender": "F",
      "location": "Box de Reanimación Urgencias",
      "history": "FA crónica e insuficiencia cardíaca tratada con Digoxina. Insuficiencia renal reciente.",
      "presentation": "Náuseas, vómitos, visión amarilla (xantopsia), mareos y confusión mental progresiva."
    },
    "initialVitals": {
      "hr": 34,
      "bp": "70/40",
      "spo2": 92,
      "etco2": 28,
      "rr": 16,
      "temp": 36.4,
      "rhythm": "DIGITALIS_TOXICITY",
      "rhythmName": "Ritmo de la Unión Lento con Cubeta Digitálica",
      "isStable": false,
      "stabilityReason": "Intoxicación digitálica sintomática con compromiso hemodinámico.",
      "consciousness": "Confusa, quejumbrosa",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "La paciente presenta extrasístoles ventriculares frecuentes que degeneran en Fibrilación Ventricular caótica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro en FV"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 72,
      "bp": "98/64",
      "spo2": 96,
      "etco2": 39,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con anticuerpos antidigoxina administrados",
      "pulsePresent": true,
      "consciousness": "Comatosa posparo"
    },
    "reversibleCause": "Inhibición de la bomba Na+/K+ ATPasa miocárdica con sobrecarga de calcio intracelular",
    "hytCategory": "Tóxicos (Intoxicación Digitálica)",
    "teachingNotes": "En FV: Desfibrilación 200J. Antídoto definitivo: Fragmentos de anticuerpos específicos antidigoxina (Fab / DigiFab) y corregir hipokalemia si existe.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar normal.",
        "cardiovascular": "Ruidos cardíacos lentos regulares con cubeta digitálica en ECG.",
        "perfusion": "Pálida, sudorosa.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Fracción de eyección conservada con hipercontractilidad pero arritmias ventriculares.",
        "lung": "Normal.",
        "vci": "VCI 15 mm."
      },
      "labs": {
        "gsa": "pH 7.33 | pCO2 36 | pO2 86 | HCO3 19",
        "electrolytes": "K+ 5.6 mEq/L (Hiperkalemia por intoxicación digitálica) | Na+ 138",
        "glucose": "HGT: 105 mg/dL",
        "others": "Nivel sérico de Digoxina: 4.8 ng/mL (Rango tóxico > 2.0)"
      },
      "history": {
        "witness": "Hija confirma que por error se tomó el doble de dosis de Digoxina durante la última semana.",
        "medications": "Digoxina 0.25 mg, Furosemida.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-37",
    "title": "Caso 37: Bloqueo AV de 2° Grado Mobitz I (Wenckebach) con Deshidratación Severa y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Pedro Naranjo",
      "age": 77,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertrofia prostática. Cuadro gastrointestinal de vómitos y diarrea de 3 días.",
      "presentation": "Llega muy decaído, mareado, con sequedad de boca extrema, oliguria y pulso irregularmente lento."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "68/38",
      "spo2": 89,
      "etco2": 23,
      "rr": 20,
      "temp": 35.9,
      "rhythm": "BAV_2_WENCKEBACH",
      "rhythmName": "Bloqueo AV 2° Grado Mobitz I (Fenómeno de Wenckebach)",
      "isStable": false,
      "stabilityReason": "Shock hipovolémico deshidratativo con bloqueo nodal AV.",
      "consciousness": "Somnoliento, responde débilmente",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El paciente no responde al estímulo doloroso, el pulso carotídeo se extingue y queda en AESP con complejos anchos.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 35.8,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por hipovolemia)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en AESP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 75,
      "bp": "94/62",
      "spo2": 96,
      "etco2": 37,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con conducción AV 1:1 restablecida tras volumen",
      "pulsePresent": true,
      "consciousness": "Alerta y orientado"
    },
    "reversibleCause": "Hipovolemia severa que empeora la perfusión del nodo AV",
    "hytCategory": "Hipovolemia (Deshidratación crítica)",
    "teachingNotes": "En este caso la causa primaria del colapso es la HIPOVOLEMIA: La infusión rápida de suero fisiológico restablece el retorno venoso, la perfusión nodal y el pulso.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular limpio bilateral sin crépitos.",
        "cardiovascular": "Ruidos cardíacos con alargamiento progresivo y pausa típica de Wenckebach.",
        "perfusion": "Piel seca, signo del pliegue positivo, lengua tostada.",
        "temperature": "35.9 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas colapsables de paredes hiperdinámicas sin derrame.",
        "lung": "Normal.",
        "vci": "VCI colapsada totalmente < 5 mm."
      },
      "labs": {
        "gsa": "pH 7.32 | pCO2 33 | pO2 88 | HCO3 17",
        "electrolytes": "K+ 3.4 | Na+ 148",
        "glucose": "HGT: 92 mg/dL",
        "others": "BUN: 68 mg/dL | Creatinina: 2.4 mg/dL"
      },
      "history": {
        "witness": "Esposa confirma que no orina desde hace 24 horas y no ha podido comer nada.",
        "medications": "Tamsulosina.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-38",
    "title": "Caso 38: Hipoglicemia Severa (16 mg/dL) por Sobredosis de Sulfonilureas con Bradicardia y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Rosa María Troncoso",
      "age": 73,
      "gender": "F",
      "location": "Servicio de Urgencias",
      "history": "Diabetes Mellitus 2 tratada con Glibenclamida. ERC no diagnosticada.",
      "presentation": "Encontrada inconsciente por su esposo en la cama, empapada en sudor frío profuso, en coma no reactivo."
    },
    "initialVitals": {
      "hr": 30,
      "bp": "65/35",
      "spo2": 92,
      "etco2": 28,
      "rr": 12,
      "temp": 35.6,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Profunda Neuroglucopénica",
      "isStable": false,
      "stabilityReason": "Coma hipoglicémico con depresión de centros autonómicos cerebrales.",
      "consciousness": "Comatosa no reactiva",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "La paciente presenta un paro respiratorio seguido de asistolia eléctrica completa en el osciloscopio.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.5,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por neuroglucopenia"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 72,
      "bp": "100/66",
      "spo2": 97,
      "etco2": 39,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal normal tras infusión de Glucosa al 30%",
      "pulsePresent": true,
      "consciousness": "Despierta y orientada"
    },
    "reversibleCause": "Deprivación crítica de glucosa a nivel del sistema nervioso central y marcapasos cardíaco",
    "hytCategory": "Hipoglicemia / Fármacos (Sulfonilureas)",
    "teachingNotes": "¡TRATAMIENTO INMEDIATO! SUERO GLUCOSADO AL 30% O 50% 50-100 ml IV en bolo rápido. La hipoglicemia es causa reversible primaria de colapso.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar simétrico bilateral.",
        "cardiovascular": "Ruidos cardíacos muy lentos pero audibles.",
        "perfusion": "Sudoración fría profusa (diaforesis 'en cubeta'), palidez extrema.",
        "temperature": "35.6 °C"
      },
      "pocus": {
        "cardiac": "Ecocardiograma normal sin alteraciones estructurales.",
        "lung": "Normal.",
        "vci": "VCI 15 mm."
      },
      "labs": {
        "gsa": "pH 7.35 | pCO2 36 | pO2 88 | HCO3 20",
        "electrolytes": "Normales",
        "glucose": "HGT: 16 mg/dL (Hipoglicemia letal)",
        "others": "Orina con restos de sulfonilureas"
      },
      "history": {
        "witness": "Esposo relata que se tomó la Glibenclamida pero no cenó anoche.",
        "medications": "Glibenclamida 5 mg dos veces al día.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-39",
    "title": "Caso 39: Hipokalemia Severa (1.8 mEq/L) por Abuso de Diuréticos con Bradicardia y FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Lorena Sepúlveda",
      "age": 42,
      "gender": "F",
      "location": "Box de Reanimación SAR",
      "history": "Uso indiscriminado de Furosemida para bajar de peso. Debilidad muscular ascendente.",
      "presentation": "Calambres intensos, parálisis muscular de extremidades, mareo ortostático y sensación de latidos lentos irregulares."
    },
    "initialVitals": {
      "hr": 36,
      "bp": "70/40",
      "spo2": 90,
      "etco2": 26,
      "rr": 18,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal con Ondas U Prominentes y QT largo",
      "isStable": false,
      "stabilityReason": "Inestabilidad eléctrica miocárdica crítica por déficit de potasio.",
      "consciousness": "Confusa, hipotónica",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente presenta un síncope convulsivo y el monitor cae en Torsades de Pointes que degenera a Fibrilación Ventricular.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.1,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "desfibrilar",
        "amiodarona"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 80,
      "bp": "94/62",
      "spo2": 96,
      "etco2": 39,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras reposición agresiva de Potasio y Magnesio",
      "pulsePresent": true,
      "consciousness": "Comatosa posparo"
    },
    "reversibleCause": "Hipokalemia e hipomagnesemia crítica por pérdida renal de electrolitos",
    "hytCategory": "Hipokalemia",
    "teachingNotes": "Desfibrilación 200J inmediata, compresiones continuas y REPOSICIÓN URGENTE DE CLORURO DE POTASIO + SULFATO DE MAGNESIO por vía venosa.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Ruidos arrítmicos con pausas.",
        "perfusion": "Flacidez muscular generalizada, reflejos osteotendíneos abolidos.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Sin anomalías estructurales.",
        "lung": "Normal.",
        "vci": "VCI 13 mm."
      },
      "labs": {
        "gsa": "pH 7.48 (Alcalosis metabólica) | pCO2 42 | pO2 88 | HCO3 32",
        "electrolytes": "K+ 1.8 mEq/L (Hipokalemia crítica) | Mg2+ 1.2 mg/dL | Na+ 135",
        "glucose": "HGT: 104 mg/dL",
        "others": "ECG muestra aplanamiento de onda T y onda U gigante"
      },
      "history": {
        "witness": "Amiga admite que compraban Furosemida sin receta en la feria para adelgazar.",
        "medications": "Furosemida 40 mg 3 veces al día.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-40",
    "title": "Caso 40: Síndrome del Nódulo Sinusal Enfermo con Pausas de 8s y Paro en Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Domingo Contreras",
      "age": 85,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertenso. Mareos recurrentes y caídas frecuentes no explicadas.",
      "presentation": "Traído tras síncope con traumatismo facial leve. Monitor muestra bradicardia sinusal y pausas sinusales prolongadas de 6 a 8 segundos."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "68/36",
      "spo2": 91,
      "etco2": 30,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Extrema con Paro Sinusal",
      "isStable": false,
      "stabilityReason": "Síncopes de repetición y bajo gasto por disfunción del nódulo sinusal.",
      "consciousness": "Soporoso, mareado",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El nódulo sinusal cesa totalmente su actividad marcapasos y el trazado ECG se aplana en Asistolia sin ritmo de escape.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.1,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 70,
      "bp": "102/66",
      "spo2": 97,
      "etco2": 39,
      "rr": 12,
      "temp": 36.4,
      "rhythm": "PACED",
      "rhythmName": "Ritmo de Marcapasos Transcutáneo con Captura 100%",
      "pulsePresent": true,
      "consciousness": "Consciente posparo"
    },
    "reversibleCause": "Degeneración fibrocalcárea senil del nódulo sinusal (Enfermedad del nódulo sinusal)",
    "hytCategory": "Bradicardia extrema / Disfunción marcapasos",
    "teachingNotes": "Tratamiento de elección: MARCAPASOS TRANSCUTÁNEO inmediato (setear a 70 lpm y subir miliamperios hasta captura eléctrica y mecánica confirmada).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar normal para la edad.",
        "cardiovascular": "Ruidos cardíacos con pausas de silencio prolongadas de más de 6 segundos.",
        "perfusion": "Pálido, equimosis frontal por caída.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Corazón senil con esclerosis aórtica leve sin derrame.",
        "lung": "Normal.",
        "vci": "VCI 16 mm."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 38 | pO2 85 | HCO3 20",
        "electrolytes": "Normales (descarta causa electrolítica)",
        "glucose": "HGT: 108 mg/dL",
        "others": "Troponinas negativas"
      },
      "history": {
        "witness": "Hijo refiere que en los últimos dos meses se desmayaba de la nada al levantarse.",
        "medications": "Amlodipino.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-41",
    "title": "Caso 41: Crisis Addisoniana (Insuficiencia Suprarrenal Aguda) con Bradicardia y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Paulina Gacitúa",
      "age": 36,
      "gender": "F",
      "location": "Box de Reanimación Urgencias",
      "history": "Enfermedad de Addison diagnosticada. Suspensión de Hidrocortisona por cuadro de gastroenteritis.",
      "presentation": "Llega en colapso circulatorio extremo con hiperpigmentación cutánea, vómitos, hipotensión severa y bradicardia."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "56/30",
      "spo2": 91,
      "etco2": 26,
      "rr": 16,
      "temp": 36.3,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal de Bajo Voltaje con Onda T picuda",
      "isStable": false,
      "stabilityReason": "Shock distributivo e hipovolémico refractario por déficit de cortisol y aldosterona.",
      "consciousness": "Estuporosa",
      "airway": "Espontánea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente deja de responder al dolor, pierde el pulso carotídeo y entra en paro cardiorrespiratorio en AESP.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP addisoniana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 78,
      "bp": "92/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras Hidrocortisona y Suero Salino",
      "pulsePresent": true,
      "consciousness": "Comatosa posparo"
    },
    "reversibleCause": "Déficit absoluto de glucocorticoides y mineralocorticoides (Crisis suprarrenal)",
    "hytCategory": "Hidrogeniones / Hiperkalemia / Hipovolemia",
    "teachingNotes": "Tratamiento salvador: Expansión agresiva con Suero Fisiológico al 0.9%, HIDROCORTISONA 100-200 mg IV en bolo de emergencia y Adrenalina 1mg.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar limpio bilateral.",
        "cardiovascular": "Ruidos apagados muy bradicárdicos.",
        "perfusion": "Hiperpigmentación cutánea bronceada en pliegues y encías.",
        "temperature": "36.3 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo colapsable por hipovolemia relativa.",
        "lung": "Normal.",
        "vci": "VCI colapsada < 6 mm."
      },
      "labs": {
        "gsa": "pH 7.23 | pCO2 30 | pO2 84 | HCO3 14",
        "electrolytes": "K+ 6.4 mEq/L (Hiperkalemia) | Na+ 122 mEq/L (Hiponatremia severa)",
        "glucose": "HGT: 52 mg/dL (Hipoglicemia)",
        "others": "Cortisol sérico: < 1.0 ug/dL (Indetectable)"
      },
      "history": {
        "witness": "Pareja refiere que vomitó todos los medicamentos durante los últimos dos días.",
        "medications": "Hidrocortisona, Fludrocortisona.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-42",
    "title": "Caso 42: Hipotermia Moderada por Inmersión en Agua Helada con AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Mauricio Henríquez",
      "age": 29,
      "gender": "M",
      "location": "Servicio de Urgencias",
      "history": "Pescador artesanal que cayó a aguas del Estrecho de Magallanes (4°C) durante 30 minutos.",
      "presentation": "Comatoso, tiritona ausente, pupilas midriáticas arreactivas y bradicardia extrema de 24 lpm."
    },
    "initialVitals": {
      "hr": 24,
      "bp": "54/30",
      "spo2": 82,
      "etco2": 18,
      "rr": 6,
      "temp": 29.8,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal con Onda J de Osborn",
      "isStable": false,
      "stabilityReason": "Hipotermia severa accidental grado III.",
      "consciousness": "Coma hipotérmico",
      "airway": "Bradipnea severa",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El pulso carotídeo desaparece mientras se retira la ropa mojada y queda en AESP bradicárdica.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 29.7,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Hipotermia)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en AESP"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 70,
      "bp": "90/58",
      "spo2": 95,
      "etco2": 37,
      "rr": 12,
      "temp": 33.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con recalentamiento activo",
      "pulsePresent": true,
      "consciousness": "Comatoso en observación"
    },
    "reversibleCause": "Hipotermia accidental con depresión metabólica extrema",
    "hytCategory": "Hipotermia",
    "teachingNotes": "Reanimación cardiopulmonar con RECALENTAMIENTO ACTIVO (suero salino tibio a 42°C, mantas térmicas de aire forzado).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Bradipnea crítica, murmullo pulmonar presente sin ruidos agregados.",
        "cardiovascular": "Ruidos cardíacos sumamente lentos y alejados.",
        "perfusion": "Piel pálida, helada al tacto, rigidez fría.",
        "temperature": "29.8 °C (Termómetro timpánico/esofágico)"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica deprimida difusa por frío.",
        "lung": "Sin neumotórax.",
        "vci": "VCI 15 mm."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 42 | pO2 75 | HCO3 17",
        "electrolytes": "K+ 4.0 | Na+ 137",
        "glucose": "HGT: 88 mg/dL",
        "others": "Ondas de Osborn de 4mm en DII, DIII, aVF"
      },
      "history": {
        "witness": "Compañeros de faena lograron sacarlo del agua tras media hora de búsqueda.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-43",
    "title": "Caso 43: Bloqueo AV de 1° Grado que progresa a Bloqueo Completo por Isquemia Nodal y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Osvaldo Morales",
      "age": 78,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Hipertensión de larga data. Consulta por astenia y sensación de 'pausas' en el pecho.",
      "presentation": "Llega con mareo intenso al ponerse de pie, palidez y bradicardia progresiva."
    },
    "initialVitals": {
      "hr": 35,
      "bp": "72/40",
      "spo2": 92,
      "etco2": 30,
      "rr": 16,
      "temp": 36.4,
      "rhythm": "BAV_1",
      "rhythmName": "Bloqueo AV de 1° Grado Severo (PR 380 ms) que progresa a BAV 3",
      "isStable": false,
      "stabilityReason": "Falla intrínseca del sistema de conducción nodal.",
      "consciousness": "Somnoliento",
      "airway": "Espontánea",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "El intervalo PR se alarga indefinidamente hasta disociación auriculoventricular completa y parada en Asistolia.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 70,
      "bp": "98/64",
      "spo2": 97,
      "etco2": 40,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "PACED",
      "rhythmName": "Ritmo Estimulado con Marcapasos Transcutáneo (70 lpm)",
      "pulsePresent": true,
      "consciousness": "Consciente orientado"
    },
    "reversibleCause": "Isquemia y necrosis del nodo AV por ateromatosis",
    "hytCategory": "Trombosis coronaria / Falla de conducción",
    "teachingNotes": "Marcapasos transcutáneo de rescate inmediato, Adrenalina en infusión y preparación para marcapasos definitivo.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar normal bilateral.",
        "cardiovascular": "Ruidos cardíacos lentos regulares.",
        "perfusion": "Piel pálida, sudorosa.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Sin derrame pericárdico.",
        "lung": "Normal.",
        "vci": "VCI 16 mm."
      },
      "labs": {
        "gsa": "pH 7.33 | pCO2 37 | pO2 85 | HCO3 19",
        "electrolytes": "Normales",
        "glucose": "HGT: 115 mg/dL",
        "others": "Troponina levemente elevada"
      },
      "history": {
        "witness": "Hija refiere que el cuadro de cansancio y mareo venía progresando desde hace 1 semana.",
        "medications": "Losartán, Hidroclorotiazida.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-44",
    "title": "Caso 44: Rotura Miocárdica de Pared Libre Post-IAM con Bradicardia Extrema y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Arturo Barahona",
      "age": 70,
      "gender": "M",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "IAM anterior no reperfundido hace 4 días por consulta tardía.",
      "presentation": "Presenta dolor torácico desgarrante súbito, bradicardia extrema, pérdida súbita de pulso y disociación electromecánica."
    },
    "initialVitals": {
      "hr": 30,
      "bp": "50/20",
      "spo2": 82,
      "etco2": 18,
      "rr": 12,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Extrema Agónica por Taponamiento Catastrófico",
      "isStable": false,
      "stabilityReason": "Rotura de pared libre ventricular con hemopericardio agudo a tensión.",
      "consciousness": "Comatoso inmediato",
      "airway": "En apnea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente entra en apnea, el pulso desaparece de forma instantánea y el monitor registra AESP con complejos lentos de bajo voltaje.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 36.1,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Hemopericardio)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 75,
      "bp": "88/52",
      "spo2": 94,
      "etco2": 35,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con descompresión pericárdica de emergencia",
      "pulsePresent": true,
      "consciousness": "Pasa de urgencia a cirugía cardíaca"
    },
    "reversibleCause": "Hemopericardio masivo a tensión por rotura transmural del ventrículo izquierdo",
    "hytCategory": "Taponamiento cardíaco (Rotura miocárdica)",
    "teachingNotes": "POCUS inmediato para confirmar hemopericardio, pericardiocentesis evacuadora heroica y toracotomía de salvataje.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos completamente inaudibles (Tríada de Beck fulminante). Ingurgitación yugular hasta el ángulo mandibular.",
        "perfusion": "Cianosis severa cérvico-facial.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Hemopericardio masivo con coágulos y colapso total de cavidades derechas e izquierdas.",
        "lung": "Normal.",
        "vci": "VCI dilatada > 30 mm."
      },
      "labs": {
        "gsa": "pH 7.15 | pCO2 40 | pO2 65 | HCO3 15 | Lactato 8.2",
        "electrolytes": "Normales",
        "glucose": "HGT: 120 mg/dL",
        "others": "Hematocrito en caída libre"
      },
      "history": {
        "witness": "Enfermera presenció el colapso mientras el paciente tomaba agua en la cama de hospitalización.",
        "medications": "Aspirina, Clopidogrel.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-45",
    "title": "Caso 45: Inhalación de Monóxido de Carbono en Incendio con Bradicardia Hipóxica y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Francisco Meza",
      "age": 48,
      "gender": "M",
      "location": "Box de Reanimación Urgencias",
      "history": "Rescatado de incendio en habitación cerrada por Bomberos.",
      "presentation": "Comatoso, quemaduras en rostro, hollín en fosas nasales y esputo carbonáceo. Bradipneico y bradicárdico."
    },
    "initialVitals": {
      "hr": 32,
      "bp": "64/36",
      "spo2": 80,
      "etco2": 48,
      "rr": 8,
      "temp": 36.5,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Hipóxica por Carboxihemoglobina",
      "isStable": false,
      "stabilityReason": "Intoxicación grave por monóxido de carbono e hipoxia celular tisular.",
      "consciousness": "Coma carboxihemoglobínico",
      "airway": "Inhalación de humo",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente entra en paro respiratorio total y el monitor muestra asistolia completa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por CO"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 80,
      "bp": "98/64",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras Intubación y Oxígeno 100% de alto flujo",
      "pulsePresent": true,
      "consciousness": "Comatoso intubado en UCI"
    },
    "reversibleCause": "Anoxia histotóxica por bloqueo de transporte de oxígeno por Carboxihemoglobina (COHb)",
    "hytCategory": "Hipoxia / Tóxicos (Monóxido de Carbono)",
    "teachingNotes": "¡Oxígeno al 100% en normobaria inmediato (reduce la vida media de COHb de 320 min a 80 min)! Considerar cámara hiperbárica.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Roncus y estertores difusos por quemadura inhalatoria, esputo con hollín abundante.",
        "cardiovascular": "Ruidos cardíacos lentos apagados.",
        "perfusion": "Piel de coloración 'rojo cereza' característica, mucosa oral quemada.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Disfunción sistólica global por isquemia celular difusa.",
        "lung": "Normal.",
        "vci": "VCI 16 mm."
      },
      "labs": {
        "gsa": "pH 7.12 | pCO2 48 | pO2 85 | HCO3 14 | Lactato 9.8 mmol/L",
        "electrolytes": "Normales",
        "glucose": "HGT: 110 mg/dL",
        "others": "Nivel de Carboxihemoglobina (COHb): 48% (Nivel letal)"
      },
      "history": {
        "witness": "Bomberos confirman que estuvo atrapado 20 minutos en habitación con fuego y humo denso.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-46",
    "title": "Caso 46: Síndrome Post-RTU de Próstata por Hiponatremia Dilucional Aguda con AESP",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Hernando Zúñiga",
      "age": 76,
      "gender": "M",
      "location": "Servicio de Urología Hospitalario",
      "history": "Postoperado inmediato (2 horas) de Resección Transuretral de Próstata (RTU).",
      "presentation": "Cefalea intensa, náuseas, confusión, convulsión tónica y bradicardia extrema con hipertensión previa."
    },
    "initialVitals": {
      "hr": 32,
      "bp": "70/40",
      "spo2": 91,
      "etco2": 30,
      "rr": 12,
      "temp": 35.8,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal de QRS Ensanchado por Hiponatremia Aguda",
      "isStable": false,
      "stabilityReason": "Síndrome de absorción de líquido de irrigación hipoosmolar (Síndrome RTU).",
      "consciousness": "Comatoso post-ictal",
      "airway": "Bradipnea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente presenta una nueva convulsión con paro respiratorio y el monitor cae en Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.7,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro por síndrome RTU"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 68,
      "bp": "96/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal tras administración de Solución Salina Hipertónica al 3%",
      "pulsePresent": true,
      "consciousness": "Intubado protegido"
    },
    "reversibleCause": "Edema cerebral agudo y toxicidad miocárdica por hiponatremia dilucional severa (Na+ 108 mEq/L)",
    "hytCategory": "Hidrogeniones (Hipo-osmolaridad / Trastorno electrolítico)",
    "teachingNotes": "Tratamiento curativo de emergencia: SOLUCIÓN SALINA HIPERTÓNICA AL 3% (100 a 150 ml IV en 10-20 minutos) para revertir el edema cerebral y la sobrecarga hídrica.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crepitaciones basales por sobrecarga de volumen circulante.",
        "cardiovascular": "Ruidos cardíacos lentos regulares.",
        "perfusion": "Piel edematosa, palidez fría.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Sobrecarga de volumen con contractilidad conservada.",
        "lung": "Líneas B bilaterales.",
        "vci": "VCI pletórica 24 mm."
      },
      "labs": {
        "gsa": "pH 7.28 | pCO2 36 | pO2 84 | HCO3 17",
        "electrolytes": "Na+ 108 mEq/L (Hiponatremia dilucional extrema) | K+ 3.8 | Cl- 82",
        "glucose": "HGT: 115 mg/dL",
        "others": "Osmolaridad plasmática: 228 mOsm/kg (Hipo-osmolaridad crítica)"
      },
      "history": {
        "witness": "Urólogo informa que la cirugía demoró 90 minutos y se abrieron senos venosos prostáticos con absorción de más de 3 litros de glicina.",
        "medications": "Tamsulosina, Finasteride.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-47",
    "title": "Caso 47: Asfixia por Cuerpo Extraño en Vía Aérea con Bradicardia y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Javier Ulloa",
      "age": 44,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Comiendo asado en restaurante con ingesta alcohólica moderada.",
      "presentation": "Episodio de asfixia súbita al tragar trozo de carne (Signo universal de atragantamiento), cianosis progresiva y colapso."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "55/30",
      "spo2": 55,
      "etco2": 60,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Agónica por Asfixia Hipóxica Total",
      "isStable": false,
      "stabilityReason": "Obstrucción completa de la vía aérea por cuerpo extraño ('Café Coronario').",
      "consciousness": "Inconsciente en apnea",
      "airway": "Obstrucción completa",
      "ivAccess": "Vía periférica 20G"
    },
    "degenerationMessage": "El paciente entra en apnea completa con tórax inmóvil y el monitor cae en Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 6,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por asfixia"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 84,
      "bp": "104/68",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 36.6,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal normal tras extracción de cuerpo extraño con pinza Magill",
      "pulsePresent": true,
      "consciousness": "Recupera conciencia gradualmente"
    },
    "reversibleCause": "Hipoxia miocárdica y cerebral crítica por obstrucción mecánica de la vía aérea",
    "hytCategory": "Hipoxia / Obstrucción de vía aérea",
    "teachingNotes": "Axioma ACLS: En paciente inconsciente con atragantamiento, INICIAR RCP INMEDIATAMENTE (las compresiones ayudan a expulsar el cuerpo extraño). Visualizar orofaringe y extraer con pinza Magill.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Ausencia total de ruidos respiratorios a pesar de intentos ventilatorios (obstrucción glótica total).",
        "cardiovascular": "Ruidos cardíacos agónicos casi inaudibles.",
        "perfusion": "Cianosis violácea cervicofacial intensa.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho con signos de sobrecarga aguda por hipoxia.",
        "lung": "Sin neumotórax.",
        "vci": "VCI pletórica 22 mm."
      },
      "labs": {
        "gsa": "pH 7.08 | pCO2 86 | pO2 32 | HCO3 22",
        "electrolytes": "Normales",
        "glucose": "HGT: 105 mg/dL",
        "others": "GSA muestran asfixia aguda letal"
      },
      "history": {
        "witness": "Garzón relata que se atragantó con un trozo de carne vacuna mientras reía y se desplomó.",
        "medications": "Ninguno.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-48",
    "title": "Caso 48: Coma Mixedematoso por Hipotiroidismo Severo con Bradicardia Extrema y AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Irma Salgado",
      "age": 75,
      "gender": "F",
      "location": "Servicio de Urgencias Hospitalario",
      "history": "Hipotiroidismo de 15 años de evolución. Abandono de Levotiroxina hace 6 meses.",
      "presentation": "Comatosa, bradipnea severa, facies abotagada con macroglosia, mixedema periférico sin fóvea e hipotermia de 32.5°C."
    },
    "initialVitals": {
      "hr": 28,
      "bp": "62/34",
      "spo2": 85,
      "etco2": 42,
      "rr": 6,
      "temp": 32.5,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Extrema Mixedematosa (28 lpm)",
      "isStable": false,
      "stabilityReason": "Crisis hipotiroidea descompensada (Coma mixedematoso).",
      "consciousness": "Comatosa profunda",
      "airway": "Macroglosia que compromete vía aérea",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "La paciente presenta un paro respiratorio definitivo y el monitor entra en AESP de bajo voltaje.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 32.4,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP mixedematosa)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en paro"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 64,
      "bp": "92/58",
      "spo2": 95,
      "etco2": 37,
      "rr": 12,
      "temp": 35.0,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal con Levotiroxina IV e Hidrocortisona",
      "pulsePresent": true,
      "consciousness": "Comatosa intubada en UCI"
    },
    "reversibleCause": "Déficit tiroideo crítico con falla multiorgánica e hipotermia",
    "hytCategory": "Hipotermia / Tóxicos (Déficit endocrino severo)",
    "teachingNotes": "Tratamiento salvador: Intubación orotraqueal, LEVOTIROXINA IV (300-500 ug bolo), HIDROCORTISONA IV (100 mg cada 8h para evitar crisis suprarrenal) y recalentamiento pasivo.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hipoventilación difusa, murmullo muy disminuido.",
        "cardiovascular": "Ruidos cardíacos muy apagados y lentos. Derrame pericárdico típico.",
        "perfusion": "Facies abotagada, piel seca, pálida y fría con edema duro sin fóvea en EEII.",
        "temperature": "32.5 °C (Termómetro esofágico)"
      },
      "pocus": {
        "cardiac": "Derrame pericárdico concéntrico moderado (12 mm) sin taponamiento franco. Contractilidad miocárdica deprimida.",
        "lung": "Líneas A normales.",
        "vci": "VCI 18 mm."
      },
      "labs": {
        "gsa": "pH 7.21 | pCO2 52 | pO2 68 | HCO3 19",
        "electrolytes": "K+ 4.0 | Na+ 124 (Hiponatremia dilucional)",
        "glucose": "HGT: 62 mg/dL",
        "others": "TSH: > 100 uUI/mL | T4 libre: Indetectable (< 0.1 ng/dL)"
      },
      "history": {
        "witness": "Hija confirma que dejó de tomar el Eutirox porque se le terminó la receta.",
        "medications": "Levotiroxina 100 ug (abandonada).",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-49",
    "title": "Caso 49: Intoxicación Aguda por Clonidina con Bradicardia Profunda y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Nicolás Riquelme",
      "age": 35,
      "gender": "M",
      "location": "Box de Reanimación SAR",
      "history": "HTA resistente. Ingesta intencional de 30 comprimidos de Clonidina 0.150 mg.",
      "presentation": "Soporoso profundo, bradicardia extrema de 26 lpm, hipotensión marcada, boca seca y miosis puntiforme bilateral."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "60/32",
      "spo2": 89,
      "etco2": 31,
      "rr": 10,
      "temp": 35.9,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Profunda por Estimulación Alfa-2 Central",
      "isStable": false,
      "stabilityReason": "Shock vasopléjico y bradicardia por agonista alfa-2 adrenérgico central.",
      "consciousness": "Comatoso",
      "airway": "Bradipneico",
      "ivAccess": "Vía 18G"
    },
    "degenerationMessage": "El paciente entra en apnea respiratoria y el ritmo sinusal se extingue por completo en Asistolia plana.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.8,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por clonidina"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 66,
      "bp": "94/60",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "SINUSAL",
      "rhythmName": "Ritmo Sinusal normal tras Naloxona a altas dosis y Atropina",
      "pulsePresent": true,
      "consciousness": "Comatoso intubado"
    },
    "reversibleCause": "Inhibición simpática central masiva por agonista alfa-2 presináptico",
    "hytCategory": "Tóxicos (Clonidina / Simpatolíticos)",
    "teachingNotes": "Tratamiento específico: Atropina 1mg para bradicardia, considerar NALOXONA a altas dosis (revierte efectos hipotensores y bradicardizantes de clonidina) y fluidos.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular disminuido por hipoventilación central.",
        "cardiovascular": "Ruidos cardíacos muy lentos pero sin soplos.",
        "perfusion": "Piel fría, sequedad de mucosas, miosis bilateral bilateral que simula sobredosis de opioides.",
        "temperature": "35.9 °C"
      },
      "pocus": {
        "cardiac": "Corazón anatómicamente normal con bradicardia severa sin derrame.",
        "lung": "Normal.",
        "vci": "VCI 14 mm."
      },
      "labs": {
        "gsa": "pH 7.26 | pCO2 46 | pO2 80 | HCO3 19",
        "electrolytes": "Normales",
        "glucose": "HGT: 98 mg/dL",
        "others": "Toxicológico en orina positivo para Clonidina"
      },
      "history": {
        "witness": "Hermano encontró blisters vacíos de Clonidina y carta de despedida.",
        "medications": "Clonidina 0.150 mg.",
        "allergies": "Ninguna."
      }
    }
  },
  {
    "id": "caso-50",
    "title": "Caso 50: Falla de Marcapasos Definitivo por Agotamiento de Batería con Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Principiante",
    "patient": {
      "name": "Ernesto Bustamante",
      "age": 88,
      "gender": "M",
      "location": "Box de Reanimación SAPU",
      "history": "Portador de Marcapasos definitivo VVI instalado hace 12 años sin controles recientes.",
      "presentation": "Traído en brazos de sus hijos tras síncope presenciado en su hogar. Monitor muestra espigas aisladas que no capturan el miocardio."
    },
    "initialVitals": {
      "hr": 22,
      "bp": "52/28",
      "spo2": 86,
      "etco2": 20,
      "rr": 8,
      "temp": 36.1,
      "rhythm": "PACED",
      "rhythmName": "Falla Catastrófica de Captura y Sensado de Marcapasos",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico por fallo terminal de generador de marcapasos.",
      "consciousness": "Estuporoso profundo",
      "airway": "Bradipnea agónica",
      "ivAccess": "Vía 20G"
    },
    "degenerationMessage": "Las espigas inefectivas desaparecen por completo y el osciloscopio muestra Asistolia plana sin pulso carotídeo.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 36.0,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia (Línea Plana)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en asistolia por fallo de marcapasos"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "adrenalina",
        "buscar_hyt"
      ],
      "postRceExpected": [
        "identificar_rce",
        "tomar_pa",
        "ecg_12_derivaciones",
        "ttm"
      ]
    },
    "rceVitals": {
      "hr": 70,
      "bp": "104/66",
      "spo2": 97,
      "etco2": 40,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "PACED",
      "rhythmName": "Ritmo Estimulado con Marcapasos Transcutáneo Externo (70 lpm)",
      "pulsePresent": true,
      "consciousness": "Recupera consciencia y habla con el equipo"
    },
    "reversibleCause": "Fallo terminal de captura eléctrica por agotamiento de batería de generador de marcapasos",
    "hytCategory": "Disfunción de marcapasos / Asistolia",
    "teachingNotes": "¡ACCIÓN DE RESCATE CRÍTICA! INSTALACIÓN INMEDIATA DE MARCAPASOS TRANSCUTÁNEO EXTERNO con parches anteroposteriores a 70 lpm hasta lograr captura mecánica confirmada con pulso femoral palpable.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo pulmonar simétrico bilateral.",
        "cardiovascular": "Ruidos cardíacos agónicos sumamente lentos. Cicatriz de marcapasos infraclavicular izquierda visible.",
        "perfusion": "Palidez cérea, piel sudorosa y fría.",
        "temperature": "36.1 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas con cable de marcapasos visible en ápex de VD sin contracción efectiva.",
        "lung": "Normal.",
        "vci": "VCI 18 mm."
      },
      "labs": {
        "gsa": "pH 7.24 | pCO2 42 | pO2 78 | HCO3 17",
        "electrolytes": "K+ 4.2 | Na+ 139 (descarta causa electrolítica)",
        "glucose": "HGT: 110 mg/dL",
        "others": "Interrogador de marcapasos confirma 'End of Life (EOL)' de batería"
      },
      "history": {
        "witness": "Hijo mayor informa que el marcapasos se lo pusieron el año 2012 y nunca volvió a control.",
        "medications": "Aspirina, Enalapril.",
        "allergies": "Ninguna."
      }
    }
  }
];

// Helper function to pick a completely random case
export function getRandomCase() {
  const randomIndex = Math.floor(Math.random() * ACLS_CASES.length);
  return ACLS_CASES[randomIndex];
}
