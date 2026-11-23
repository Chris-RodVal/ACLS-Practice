// Banco exhaustivo de 100 casos clínicos ACLS con aleatorización y diagnósticos etiológicos (5 H y 5 T)
// Cumplimiento estricto de guías AHA ACLS 2020 / 2025
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
      "temp": 37,
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
      "temp": 36,
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
      "temp": 37,
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
      "temp": 37,
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
      "temp": 36,
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
      "temp": 40,
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
      "temp": 39,
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
      "temp": 36,
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
      "temp": 36,
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
      "temp": 34,
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
      "temp": 35,
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
      "temp": 36,
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
  },
  {
    "id": "caso-51",
    "title": "Caso 51: STEMI Ínfero-posterior con compromiso de VD, bradicardia extrema y degeneración a FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Raúl Valenzuela",
      "age": 58,
      "gender": "M",
      "location": "Box de Reanimación - Urgencias",
      "history": "Dislipidemia, fumador activo (20 cig/día). Sin controles médicos.",
      "presentation": "Dolor retroesternal opresivo irradiado a mandíbula y epigastrio, náuseas intensas y diaforesis profusa."
    },
    "initialVitals": {
      "hr": 34,
      "bp": "76/42",
      "spo2": 90,
      "etco2": 30,
      "rr": 24,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Severa con Supradesnivel ST en II, III, aVF y V4R",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (76/42), bradicardia extrema e hipoperfusión tisular.",
      "consciousness": "Somnoliento, obnubilado",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía venosa periférica 18G en MSD"
    },
    "degenerationMessage": "¡El paciente pierde bruscamente el conocimiento! Palidece intensamente, entra en apnea y el monitor traza Fibrilación Ventricular gruesa de alta amplitud.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.2,
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
        "atropina",
        "marcapasos"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "desfibrilar",
        "adrenalina",
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
      "hr": 78,
      "bp": "92/58",
      "spo2": 96,
      "etco2": 44,
      "rr": 14,
      "temp": 36,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "Ritmo Sinusal con Supradesnivel ST Ínfero-posterior (STEMI)",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM"
    },
    "reversibleCause": "Oclusión trombótica aguda de arteria coronaria derecha (Trombosis coronaria)",
    "hytCategory": "Trombosis coronaria (Síndrome Coronario Agudo)",
    "teachingNotes": "El infarto de VD cursa con hipotensión y bradicardia dependiente de precarga. Evitar nitratos; reanimar con volumen y descarga rápida al degenerar a FV.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente, sin crépitos.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy lentos, ingurgitación yugular evidente a 45°.",
        "perfusion": "Piel marmórea, sudoración fría, llenado capilar 4s.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho severamente dilatado e hipocinético. Ventrículo izquierdo con función preservada.",
        "lung": "Líneas A normales bilateralmente, sin edema pulmonar.",
        "vci": "VCI 23 mm distendida con nula variabilidad respiratoria."
      },
      "labs": {
        "gsa": "pH 7.28 | pCO2 38 | pO2 72 | HCO3 18 | Lactato 3.8 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 137 | Cl- 102",
        "glucose": "HGT: 135 mg/dL",
        "others": "Troponina I ultrasensible: 4.8 ng/mL (marcadamente elevada)"
      },
      "history": {
        "witness": "Esposa indica que el dolor comenzó hace 40 minutos mientras descansaba en el sillón.",
        "medications": "Ninguno crónico.",
        "allergies": "Sin alergias conocidas."
      }
    }
  },
  {
    "id": "caso-52",
    "title": "Caso 52: Cetoacidosis Diabética Extrema con respiración de Kussmaul y colapso en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Camila Lagos",
      "age": 23,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Agudos",
      "history": "Diabetes Mellitus Tipo 1 desde los 12 años. Suspensión de insulina por vómitos.",
      "presentation": "Polipnea extrema, aliento cetónico frutal, dolor abdominal difuso y compromiso de conciencia."
    },
    "initialVitals": {
      "hr": 142,
      "bp": "82/46",
      "spo2": 95,
      "etco2": 14,
      "rr": 38,
      "temp": 37.1,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal Compensatoria con Ondas T Picadas",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (82/46), taquipnea profunda y acidosis metabólica extrema.",
      "consciousness": "Soporosa, desorientada (AVPU: P)",
      "airway": "Respiración de Kussmaul profunda",
      "ivAccess": "Vía periférica 20G en flexura"
    },
    "degenerationMessage": "¡La paciente deja de ventilar súbitamente! Cae la mandíbula, tono flácido y pulso carotídeo ausente. El monitor muestra complejo QRS ancho aberrante a 42 lpm sin pulso palpable (AESP).",
    "arrestVitals": {
      "hr": 42,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 37.1,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - QRS ancho)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "96/60",
      "spo2": 98,
      "etco2": 38,
      "rr": 16,
      "temp": 36.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con T normalizada post-bicarbonato y calcio",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado a UCI"
    },
    "reversibleCause": "Acidosis metabólica extrema e hiperpotasemia secundaria (Hidrogeniones / Acidosis)",
    "hytCategory": "Hidrogeniones (Acidosis severa)",
    "teachingNotes": "En acidosis extrema (pH < 7.00) con AESP, el Bicarbonato de Sodio y el Gluconato de Calcio estabilizan la membrana miocárdica junto a expansión vigorosa.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular rudo bilateral, sin sibilancias ni estertores.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos apagados, pulsos periféricos impalpables.",
        "perfusion": "Mucosas marcadamente secas, enoftalmos, signo del pliegue positivo.",
        "temperature": "37.1 °C"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica global disminuida, cámaras de volumen disminuido.",
        "lung": "Patrón de líneas A bilaterales, pulmón seco.",
        "vci": "VCI < 10 mm con colapso inspiratorio superior al 80% (depleción de volumen)."
      },
      "labs": {
        "gsa": "pH 6.89 | pCO2 18 | pO2 96 | HCO3 4.2 | Exceso de base -26 | Lactato 4.9 mmol/L",
        "electrolytes": "K+ 7.2 | Na+ 129 | Cl- 98 | Osmolalidad 335 mOsm/kg",
        "glucose": "HGT: 560 mg/dL (Cetonemia ++++)",
        "others": "Cetonas en sangre: 6.8 mmol/L"
      },
      "history": {
        "witness": "Hermana refiere que no usaba su pluma de insulina hace 3 días por gastroenteritis aguda.",
        "medications": "Insulina Glargina e Insulina Aspart.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-53",
    "title": "Caso 53: Intoxicación digitálica severa con taquicardia bidireccional y degeneración a FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Ernesto Sepúlveda",
      "age": 79,
      "gender": "M",
      "location": "Servicio de Medicina Interna - Sala de Hospitalizados",
      "history": "Insuficiencia Cardíaca con FEy 28%, Fibrilación Auricular crónica, ERC etapa 3b.",
      "presentation": "Náuseas, vómitos, visión con halos amarillos (xantopsia) y palpitaciones con mareos intensos."
    },
    "initialVitals": {
      "hr": 165,
      "bp": "80/50",
      "spo2": 92,
      "etco2": 31,
      "rr": 22,
      "temp": 36.6,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Bidireccional (QRS con alternancia de eje)",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (80/50), lipotimia y ritmo ventricular inestable.",
      "consciousness": "Confuso, letárgico",
      "airway": "Espontánea",
      "ivAccess": "Vía periférica 20G en antebrazo izquierdo"
    },
    "degenerationMessage": "¡Paciente colapsa con desviación de la mirada! Se ausenta el pulso central y el trazo ECG transmuta en Fibrilación Ventricular caótica desorganizada.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.6,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 68,
      "bp": "102/65",
      "spo2": 96,
      "etco2": 40,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "FIBRILACION_AURICULAR",
      "rhythmName": "Fibrilación Auricular con cubeta digitálica y control de frecuencia",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y anticuerpos Fab anti-digoxina"
    },
    "reversibleCause": "Sobredosis / acumulación de Digoxina en contexto de falla renal (Tóxicos)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "La TV bidireccional es patognomónica de toxicidad digitálica. Indicación de anticuerpos específicos Fab (DigiFab) y evitar choques innecesarios previos al paro.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Estertores crepitantes basales bilaterales leves.",
        "cardiovascular": "Ruidos arrítmicos y rápidos, soplo holosistólico en ápex.",
        "perfusion": "Palidez generalizada, pulso irregularmente irregular filiforme.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo severamente dilatado con hipocinesia global difusa (FEy reducida).",
        "lung": "Líneas B bilaterales en bases pulmonares.",
        "vci": "VCI 20 mm con colapso disminuido < 50%."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 40 | pO2 85 | HCO3 21 | Lactato 2.6 mmol/L",
        "electrolytes": "K+ 5.8 | Na+ 136 | Creatinina 2.8 mg/dL | BUN 48 mg/dL",
        "glucose": "HGT: 118 mg/dL",
        "others": "Nivel plasmático de Digoxina: 4.6 ng/mL (Rango tóxico > 2.0)"
      },
      "history": {
        "witness": "Enfermera refiere que paciente aumentó la dosis de digoxina por error en domicilio hace 5 días.",
        "medications": "Digoxina 0.25 mg/día, Furosemida 40 mg, Espironolactona 25 mg.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-54",
    "title": "Caso 54: Hipotermia Profunda Accidental (28 °C) por inmersión con bradicardia y FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Mateo Carrasco",
      "age": 34,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación Trauma",
      "history": "Sin antecedentes mórbidos. Accidente en kayak en lago cordillerano en invierno.",
      "presentation": "Rigidez corporal, cianosis acral, bradipnea severa, ropa mojada congelada y pupilas perezosas."
    },
    "initialVitals": {
      "hr": 28,
      "bp": "68/38",
      "spo2": 82,
      "etco2": 18,
      "rr": 6,
      "temp": 28.1,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Severa con Ondas J de Osborn gigantes",
      "isStable": false,
      "stabilityReason": "Hipotermia grave (< 30°C), bradicardia extrema e hipotensión crítica.",
      "consciousness": "Comatoso, no responde a la voz (AVPU: U)",
      "airway": "Ventilación agónica bradipneica",
      "ivAccess": "Vía periférica 16G en fosa antecubital"
    },
    "degenerationMessage": "¡Durante la movilización para retirar ropa mojada, el paciente presenta contracción ventricular ectópica y degenera súbitamente a FV refractaria!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 28.1,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular por Hipotermia Grave",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "desfibrilar",
        "adrenalina",
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
      "hr": 64,
      "bp": "98/62",
      "spo2": 97,
      "etco2": 41,
      "rr": 12,
      "temp": 32.4,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con atenuación de ondas J post-recalentamiento",
      "pulsePresent": true,
      "consciousness": "Comatoso, recalentamiento activo continuo en UCI"
    },
    "reversibleCause": "Hipotermia accidental severa por inmersión en agua helada (Hipotermia)",
    "hytCategory": "Hipotermia Accidental",
    "teachingNotes": "En hipotermia grave (< 30°C), limitar las descargas a un máximo de 3 choques y espaciar adrenalina hasta que temp supere 30-32°C. 'Nadie está muerto hasta que está caliente y muerto'.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular disminuido bilateralmente por hipoventilación profunda.",
        "cardiovascular": "Ruidos cardíacos distantes, muy bradicárdicos, rigidez de pared torácica.",
        "perfusion": "Piel marmórea grisácea gélida al tacto, acrocianosis generalizada.",
        "temperature": "28.1 °C (Termómetro esofágico central)"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica bradicárdica lenta pero coordinada previo al colapso. Sin derrame.",
        "lung": "Ausencia de neumotórax, líneas A normales.",
        "vci": "VCI 14 mm con colapso variable."
      },
      "labs": {
        "gsa": "pH 7.18 (corregido por temp) | pCO2 52 | pO2 65 | HCO3 19 | Lactato 5.2 mmol/L",
        "electrolytes": "K+ 3.8 | Na+ 140 | Ca2+ 1.15",
        "glucose": "HGT: 145 mg/dL",
        "others": "Hematocrito 48% (hemoconcentración por frío)"
      },
      "history": {
        "witness": "Compañero de rescate informa que cayó al agua helada y estuvo atrapado cerca de 45 minutos.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias conocidas."
      }
    }
  },
  {
    "id": "caso-55",
    "title": "Caso 55: Sobredosis por Fentanilo con depresión respiratoria extrema y PCR en Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Nicolás Vera",
      "age": 28,
      "gender": "M",
      "location": "Vía Pública - Asistencia SAMU Avanzado",
      "history": "Consumo problemático de sustancias. Episodios previos de sobredosis.",
      "presentation": "Encontrado inconsciente en el baño de un local nocturno, jeringa al lado, miosis puntiforme."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "70/40",
      "spo2": 68,
      "etco2": 65,
      "rr": 4,
      "temp": 35.8,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Extrema Hipóxica",
      "isStable": false,
      "stabilityReason": "Insuficiencia respiratoria inminente (FR 4), hipoxemia severa (68%) y coma.",
      "consciousness": "Coma profundo, Glasgow 3 (AVPU: U)",
      "airway": "Obstrucción de vía aérea por caída de lengua, ruidos de estridor",
      "ivAccess": "Vía venosa periférica 20G permeable en dorso de mano"
    },
    "degenerationMessage": "¡El paciente presenta cianosis facial oscura generalizada, sobreviene apnea terminal y el trazado ECG colapsa en una línea plana isoeléctrica (Asistolia)!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.8,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia Verificada en 2 Derivaciones",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "bp": "108/68",
      "spo2": 98,
      "etco2": 39,
      "rr": 14,
      "temp": 36,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal tras Naloxona y Oxigenación",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, respuesta pupilar recuperada"
    },
    "reversibleCause": "Intoxicación aguda por opioides con hipoxia severa secundaria (Tóxicos / Hipoxia)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En paro cardiorrespiratorio por opioides, la prioridad absoluta son las compresiones de alta calidad, ventilación con O2 al 100% y Naloxona 0.4-2 mg IV.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hipoexpansión torácica severa, estridor laríngeo alto, murmullo casi inaudible.",
        "cardiovascular": "Tonos cardíacos apagados y espaciados, pulsos periféricos ausentes.",
        "perfusion": "Cianosis peribucal y ungueal intensa, piel fría y húmeda.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Bradicinesia extrema progresiva hasta el paro completo. Ausencia de trombos en cavidades derechas.",
        "lung": "Líneas A sin consolidaciones ni derrame.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.02 | pCO2 88 | pO2 42 | HCO3 22 | Lactato 4.8 mmol/L",
        "electrolytes": "K+ 4.6 | Na+ 138 | Cl- 101",
        "glucose": "HGT: 98 mg/dL",
        "others": "Screening toxicológico de orina: Positivo fuerte para Opioides/Fentanilo"
      },
      "history": {
        "witness": "Amigo relata que consumió polvo blanco intravenoso hace 15 minutos y se desvaneció de inmediato.",
        "medications": "Ninguno prescrito.",
        "allergies": "Desconocidas."
      }
    }
  },
  {
    "id": "caso-56",
    "title": "Caso 56: TEP Masivo con colapso hemodinámico fulminante post-inmovilización y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Teresa Fuentes",
      "age": 64,
      "gender": "F",
      "location": "Servicio de Traumatología - Piso de Hospitalizados",
      "history": "Cirugía de prótesis de cadera hace 10 días, reposo en cama prolongado.",
      "presentation": "Disnea súbita catastrófica, dolor torácico pleurítico punzante, angustia mortal y síncope al ponerse de pie."
    },
    "initialVitals": {
      "hr": 138,
      "bp": "72/38",
      "spo2": 74,
      "etco2": 12,
      "rr": 36,
      "temp": 36.7,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Patrón S1Q3T3 y Bloqueo Incompleto de Rama Derecha",
      "isStable": false,
      "stabilityReason": "Shock obstructivo severo (72/38), hipoxemia refractaria y disnea extrema.",
      "consciousness": "Obnubilada, diaforética (AVPU: V)",
      "airway": "Taquipneica superficial con musculatura accesoria",
      "ivAccess": "Vía periférica 18G en brazo derecho"
    },
    "degenerationMessage": "¡La paciente se desvanece por completo! Palidez cérea, pulso carotídeo ausente y apnea. El monitor muestra ritmo sinusal taquicárdico a 125 lpm pero sin ninguna onda de pulso ni presión arterial (AESP).",
    "arrestVitals": {
      "hr": 125,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.7,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Ritmo Taquicárdico)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "94/60",
      "spo2": 94,
      "etco2": 36,
      "rr": 16,
      "temp": 36.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal post-trombolisis exitosa con Alteplasa",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado prioritario a UCI"
    },
    "reversibleCause": "Tromboembolismo pulmonar masivo con sobrecarga aguda de cavidades derechas (Trombosis pulmonar)",
    "hytCategory": "Trombosis pulmonar (TEP Masivo)",
    "teachingNotes": "En AESP por sospecha clínica o confirmación de TEP masivo, la administración precoz de fibrinolíticos (Alteplasa 50 mg bolo IV) y RCP prolongada (hasta 60-90 min) salva vidas.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado simétrico, sin ruidos agregados, tórax resonante.",
        "cardiovascular": "R2 marcadamente reforzado en foco pulmonar, ingurgitación yugular hasta el ángulo mandibular.",
        "perfusion": "Asimetría en extremidad inferior izquierda con edema, empastamiento y calor local.",
        "temperature": "36.7 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho severamente dilatado (signo de McConnell positivo: acinesia de pared libre con ápex preservado). Tabique interventricular aplanado hacia el VI en sístole y diástole (signo de la D).",
        "lung": "Líneas A bilaterales sin condensación ni derrame.",
        "vci": "VCI 25 mm pletórica sin colapso."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 32 | pO2 48 | HCO3 16 | Lactato 4.9 mmol/L",
        "electrolytes": "K+ 4.3 | Na+ 139 | Cl- 104",
        "glucose": "HGT: 122 mg/dL",
        "others": "Dímero D: > 10.000 ng/mL | Troponina T: 0.85 ng/mL (Positiva)"
      },
      "history": {
        "witness": "Kinesióloga del servicio señala que al iniciar la bipedestación la paciente refirió falta de aire fulminante y se desmayó.",
        "medications": "Clexane profiláctico omitido por el paciente los últimos 2 días.",
        "allergies": "Alergia a la Penicilina."
      }
    }
  },
  {
    "id": "caso-57",
    "title": "Caso 57: Torsades de Pointes por QT prolongado inducido por fármacos y colapso en FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Javiera Morales",
      "age": 41,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Observación",
      "history": "Gastroenteritis aguda severa con deshidratación. Tratada con Azitromicina y Ondansetrón EV.",
      "presentation": "Episodios repetidos de palpitaciones sincópales rápidas, mareo rotatorio y palidez intensa."
    },
    "initialVitals": {
      "hr": 195,
      "bp": "78/48",
      "spo2": 91,
      "etco2": 28,
      "rr": 24,
      "temp": 36.8,
      "rhythm": "TORSADES",
      "rhythmName": "Taquicardia Ventricular Polimorfa (Torsades de Pointes con QTc 580 ms)",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (78/48), lipotimia recurrente e inestabilidad eléctrica.",
      "consciousness": "Semiconsciente, confusa (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 20G en mano derecha"
    },
    "degenerationMessage": "¡El trazado de Torsades se vuelve continuo, pierde su modulación helicoidal y degenera de golpe en una Fibrilación Ventricular caótica de alto voltaje sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.8,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 76,
      "bp": "105/65",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con acortamiento del QT post-Sulfato de Magnesio",
      "pulsePresent": true,
      "consciousness": "Comatosa, candidata a TTM"
    },
    "reversibleCause": "Intervalo QT adquirido prolongado por fármacos e hipomagnesemia/hipokalemia (Tóxicos)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En Torsades de Pointes el Sulfato de Magnesio 2g IV es el fármaco de elección. NUNCA usar amiodarona ni procainamida ya que prolongan aún más el QT.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular limpio bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos irregulares, pulsos periféricos muy débiles.",
        "perfusion": "Palidez mucocutánea, sequedad de mucosas por deshidratación.",
        "temperature": "36.8 °C"
      },
      "pocus": {
        "cardiac": "Función sistólica de ventrículo izquierdo conservada, cámaras de tamaño normal.",
        "lung": "Ausencia de derrame pleural ni neumotórax.",
        "vci": "VCI 11 mm con colapso inspiratorio superior al 70%."
      },
      "labs": {
        "gsa": "pH 7.46 | pCO2 36 | pO2 88 | HCO3 25 | Lactato 2.1 mmol/L",
        "electrolytes": "K+ 3.1 mEq/L (Bajo) | Mg2+ 1.2 mg/dL (Muy bajo) | Ca2+ 1.18 mmol/L",
        "glucose": "HGT: 92 mg/dL",
        "others": "ECG basal previo reporta intervalo QTc en 585 ms"
      },
      "history": {
        "witness": "Pareja indica que vomitó durante 3 días y le administraron Ondansetrón y Azitromicina en centro ambulatorio.",
        "medications": "Azitromicina 500 mg, Ondansetrón 8 mg.",
        "allergies": "Sin alergias declaradas."
      }
    }
  },
  {
    "id": "caso-58",
    "title": "Caso 58: Shock Anafiláctico a medio de contraste radiológico con colapso y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Manuel Quintana",
      "age": 52,
      "gender": "M",
      "location": "Servicio de Imagenología - Sala de Tomografía (TAC)",
      "history": "Hipertensión arterial. Realizándose angioTAC por sospecha de patología vascular.",
      "presentation": "Inmediatamente tras la inyección del contraste yodado presenta eritema facial, broncoespasmo severo, estridor y disfonía."
    },
    "initialVitals": {
      "hr": 148,
      "bp": "62/34",
      "spo2": 78,
      "etco2": 18,
      "rr": 32,
      "temp": 37,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Alto Gasto",
      "isStable": false,
      "stabilityReason": "Colapso distributivo anafiláctico (62/34), edema laríngeo agudo e hipoxia.",
      "consciousness": "Agitado, luego confuso (AVPU: V)",
      "airway": "Estridor laríngeo inspiratorio severo, edema de úvula y labios",
      "ivAccess": "Vía periférica 18G en flexura de codo"
    },
    "degenerationMessage": "¡Edema de glotis ocluye totalmente la vía aérea! El paciente entra en apnea obstructiva, pierde el pulso carotídeo y el trazado ECG muestra complejos anchos a 52 lpm sin pulso (AESP).",
    "arrestVitals": {
      "hr": 52,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 37,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Bradicardia Extrema)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "106/66",
      "spo2": 98,
      "etco2": 38,
      "rr": 14,
      "temp": 36.8,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con vía aérea asegurada y PA estabilizada",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado con tubo #7.5 vía cricotiroidotomía/quirúrgica a UCI"
    },
    "reversibleCause": "Shock anafiláctico refractario con asfixia por angioedema laríngeo (Hipoxia / Hipovolemia)",
    "hytCategory": "Hipoxia",
    "teachingNotes": "En anafilaxia grave, la Adrenalina intramuscular o intravenosa precoz (0.5 mg IM o bolos titulados IV) junto a expansión masiva de fluidos previene el colapso en AESP.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Sibilancias espiratorias generalizadas y ausencia de entrada de aire a nivel traqueal por estridor.",
        "cardiovascular": "Taquicardia extrema con tonos apagados, colapso vascular periférico.",
        "perfusion": "Exantema eritematoso urticariano confluente en tórax y cuello, angioedema facial marcado.",
        "temperature": "37.0 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas hiperdinámicas sin derrame pericárdico.",
        "lung": "Líneas A normales bilaterales, sin neumotórax.",
        "vci": "VCI < 10 mm colapsable completamente por shock distributivo."
      },
      "labs": {
        "gsa": "pH 7.15 | pCO2 62 | pO2 45 | HCO3 20 | Lactato 5.4 mmol/L",
        "electrolytes": "K+ 4.4 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 130 mg/dL",
        "others": "Triptasa sérica en curso"
      },
      "history": {
        "witness": "Tecnólogo médico de TAC señala que a los 20 segundos de pasar el medio de contraste el paciente gritó '¡me ahogo!' y se brotó entero.",
        "medications": "Losartán 50 mg.",
        "allergies": "Desconocidas para fármacos; antecedente de reacción alérgica a mariscos no consignada."
      }
    }
  },
  {
    "id": "caso-59",
    "title": "Caso 59: Síndrome de Brugada desenmascarado por fiebre alta con síncope y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Rodrigo Toledo",
      "age": 38,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Sin antecedentes patológicos. Hermano menor fallecido súbitamente a los 32 años mientras dormía.",
      "presentation": "Cuadro de 24 horas de fiebre en 39.5 °C por neumonía comunitaria. Palpitaciones intensas seguidas de pérdida de conocimiento."
    },
    "initialVitals": {
      "hr": 178,
      "bp": "82/52",
      "spo2": 93,
      "etco2": 30,
      "rr": 26,
      "temp": 39.4,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Polimorfa con Elevación de ST en V1-V2 (Patrón Brugada Tipo 1 en aleta de tiburón)",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (82/52), síncope recurrente y arritmia ventricular.",
      "consciousness": "Confuso, balbuceante (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 20G en antebrazo derecho"
    },
    "degenerationMessage": "¡El paciente emite un estertor agónico respiratorio, pierde el tono postural por completo y el monitor traza Fibrilación Ventricular caótica de alto voltaje sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 39.4,
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "112/72",
      "spo2": 97,
      "etco2": 42,
      "rr": 14,
      "temp": 37.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con Patrón Brugada Tipo 1 persistente en V1-V2",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y antipiréticos agresivos"
    },
    "reversibleCause": "Canalopatía cardíaca hereditaria (Síndrome de Brugada) descompensada por hipertermia febril",
    "hytCategory": "Tóxicos / Desencadenante ambiental o febril",
    "teachingNotes": "En el Síndrome de Brugada la fiebre alta precipita arritmias ventriculares letales. Es mandatorio tratar activamente la fiebre con antipiréticos EV y evitar fármacos antiarrítmicos bloqueadores de Na+ (como lidocaína o procainamida).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crpitantes bronquiales en base pulmonar derecha.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos, sin soplos.",
        "perfusion": "Piel caliente, sudorosa, eritematosa.",
        "temperature": "39.4 °C"
      },
      "pocus": {
        "cardiac": "Estructura cardíaca anatómicamente normal, buena fracción de eyección biventricular.",
        "lung": "Consolidación focal en lóbulo inferior derecho con broncograma aéreo.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.35 | pCO2 35 | pO2 78 | HCO3 22 | Lactato 2.4 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 136 | Cl- 101",
        "glucose": "HGT: 104 mg/dL",
        "others": "PCR: 140 mg/L | Leucocitosis: 16.500/uL"
      },
      "history": {
        "witness": "Esposa refiere que el paciente estaba con neumonía desde ayer y de pronto empezó con temblores y se desmayó en el baño.",
        "medications": "Paracetamol oral ocasional.",
        "allergies": "Sin alergias conocidas."
      }
    }
  },
  {
    "id": "caso-60",
    "title": "Caso 60: Coma Hipoglicémico Severo (HGT 20 mg/dL) con bradiarritmia extrema y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Gladys Cárdenas",
      "age": 72,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Diabetes Mellitus Tipo 2, Insuficiencia Renal Crónica etapa 4. Uso de Glibenclamida.",
      "presentation": "Encontrada por familiares en coma profundo, fría, intensamente empapada en sudor, sin respuesta verbal ni motora."
    },
    "initialVitals": {
      "hr": 32,
      "bp": "74/42",
      "spo2": 89,
      "etco2": 24,
      "rr": 8,
      "temp": 35.4,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Ritmo de Escape Nodal con Bradicardia Severa Hipoglicémica",
      "isStable": false,
      "stabilityReason": "Neuroglucopenia profunda, coma (Glasgow 3), hipotensión y bradicardia extrema.",
      "consciousness": "Coma profundo arrefléxico (AVPU: U)",
      "airway": "Respiración estertorosa superficial",
      "ivAccess": "Vía periférica 20G en mano izquierda"
    },
    "degenerationMessage": "¡La paciente cesa todo esfuerzo respiratorio espontáneo! Palidez cadavérica y el trazo ECG cae en una línea horizontal plana (Asistolia total).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 35.4,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia Confirmada en 2 Derivaciones",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "hr": 74,
      "bp": "114/70",
      "spo2": 97,
      "etco2": 40,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras corrección de glicemia y RCP",
      "pulsePresent": true,
      "consciousness": "Recupera apertura ocular y respuesta a la voz (Glasgow 10)"
    },
    "reversibleCause": "Hipoglicemia severa inducida por acumulación de sulfonilurea (Glibenclamida) en ERC",
    "hytCategory": "Hipoglicemia",
    "teachingNotes": "El Hemoglucotest es mandatorio en todo paciente con compromiso de conciencia o PCR. La infusión de Glucosa hipertónica al 50% EV revierte la neuroglucopenia y previene el daño cerebral irreversible.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado simétrico bilateral.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy apagados.",
        "perfusion": "Diaforesis profusa fría 'bañada en sudor', piel pálida y fría.",
        "temperature": "35.4 °C"
      },
      "pocus": {
        "cardiac": "Bradicinesia marcada previo al paro. Sin derrame pericárdico ni hipertrofia patológica.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.29 | pCO2 44 | pO2 76 | HCO3 19 | Lactato 3.1 mmol/L",
        "electrolytes": "K+ 4.0 | Na+ 141 | Creatinina 2.9 mg/dL | ClCr estimado 18 mL/min",
        "glucose": "HGT: 20 mg/dL (Hipoglicemia severa crítica)",
        "others": "Toxicología: Sulfonilureas presentes"
      },
      "history": {
        "witness": "Hija refiere que la paciente no almorzó pero se tomó su dosis habitual de Glibenclamida por la mañana.",
        "medications": "Glibenclamida 5 mg c/12h, Losartán 50 mg.",
        "allergies": "Sin alergias conocidas."
      }
    }
  },
  {
    "id": "caso-61",
    "title": "Caso 61: Ruptura de Músculo Papilar e Insuficiencia Mitral Aguda post-IAM con AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Sergio Pino",
      "age": 67,
      "gender": "M",
      "location": "Unidad Coronaria (UCO) - 3er día post-IAM inferior",
      "history": "IAM de pared inferior tratado tardíamente hace 72 horas.",
      "presentation": "Disnea súbita extrema, esputo asalmonado rosado espumoso por boca y nariz, hipotensión catastrófica."
    },
    "initialVitals": {
      "hr": 135,
      "bp": "64/38",
      "spo2": 72,
      "etco2": 15,
      "rr": 38,
      "temp": 36.5,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Sobrecarga Auricular Izquierda",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico mecánico catastrófico (64/38), edema agudo pulmonar masivo.",
      "consciousness": "Obnubilado, disneico terminal (AVPU: V)",
      "airway": "Abundante secreción rosada espumosa en vía aérea",
      "ivAccess": "Vía venosa central yugular derecha"
    },
    "degenerationMessage": "¡El paciente pierde el conocimiento mientras borbotea líquido pulmonar espumoso! Pulso carotídeo ausente. El monitor muestra ritmo sinusal taquicárdico a 118 lpm sin pulso (AESP).",
    "arrestVitals": {
      "hr": 118,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Mecánica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "90/55",
      "spo2": 95,
      "etco2": 38,
      "rr": 14,
      "temp": 36.1,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con soporte inotrópico y preparación quirúrgica",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado urgente a Pabellón Cardíaco"
    },
    "reversibleCause": "Complicación mecánica post-infarto: ruptura aguda de músculo papilar posteromedial (Trombosis coronaria)",
    "hytCategory": "Trombosis coronaria (Complicación Mecánica)",
    "teachingNotes": "El POCUS identifica el prolapso/flail de la valva mitral y el jet de regurgitación masivo. Requiere estabilización inmediata con intubación, vasopresores y cirugía cardíaca urgente.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Estertores crepitantes en marea ascendente hasta ambos vértices pulmonares.",
        "cardiovascular": "Soplo holosistólico grado IV/VI áspero en ápex irradiado a axila de nueva aparición.",
        "perfusion": "Piel marmórea grisácea fría, cianosis central intensa.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Valva mitral posterior con movimiento descontrolado hacia aurícula izquierda en sístole ('flail leaflet') y músculo papilar roto móvil. Insuficiencia mitral masiva.",
        "lung": "Líneas B confluentes masivas ('pulmón blanco') bilateralmente.",
        "vci": "VCI 22 mm distendida."
      },
      "labs": {
        "gsa": "pH 7.12 | pCO2 56 | pO2 44 | HCO3 17 | Lactato 5.8 mmol/L",
        "electrolytes": "K+ 4.5 | Na+ 137 | Cl- 103",
        "glucose": "HGT: 140 mg/dL",
        "others": "Troponina I: 8.5 ng/mL"
      },
      "history": {
        "witness": "Médico de turno refiere que el paciente estaba estable recuperándose de un IAM posteroinferior cuando comenzó con disnea explosiva.",
        "medications": "Aspirina, Clopidogrel, Atorvastatina.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-62",
    "title": "Caso 62: Miocardiopatía Hipertrófica Obstructiva en joven deportista con FV en cancha",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Agustín Benítez",
      "age": 21,
      "gender": "M",
      "location": "Complejo Deportivo - Asistencia Extrahospitalaria SAMU",
      "history": "Futbolista universitario. Antecedente de fatiga de esfuerzo en los últimos partidos.",
      "presentation": "Síncope súbito de esfuerzo al terminar una carrera rápida en partido de fútbol."
    },
    "initialVitals": {
      "hr": 185,
      "bp": "74/46",
      "spo2": 90,
      "etco2": 29,
      "rr": 28,
      "temp": 37.4,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa con Hipertrofia Ventricular Severa",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (74/46), síncope de esfuerzo y arritmia ventricular sostenida.",
      "consciousness": "Obnubilado, responde sólo a estímulo doloroso (AVPU: P)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El deportista pierde bruscamente el conocimiento! Se desploma en el pasto, tono postural abolido, entra en apnea y el DEA/monitor detecta Fibrilación Ventricular gruesa.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 37.4,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 84,
      "bp": "110/70",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 36.8,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con ondas Q profundas y criterios de Cornell para HVI",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y estudio electrofisiológico/CDI"
    },
    "reversibleCause": "Isquemia subendocárdica y arritmogénesis por Miocardiopatía Hipertrófica Obstructiva (MHO)",
    "hytCategory": "Trombosis coronaria / Cardiopatía Estructural",
    "teachingNotes": "Causa principal de muerte súbita en atletas jóvenes. El acceso precoz a desfibrilación con DEA en recintos deportivos eleva la sobrevida por sobre el 70%.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Soplo mesosistólico eyectivo en foco aórtico y borde esternal izquierdo que aumenta con maniobra de Valsalva.",
        "perfusion": "Palidez cutánea, pulso bisferiens palpable previo al paro.",
        "temperature": "37.4 °C"
      },
      "pocus": {
        "cardiac": "Septum interventricular marcadamente engrosado (28 mm) asimétrico, movimiento anterior sistólico (SAM) de valva mitral.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.32 | pCO2 38 | pO2 86 | HCO3 20 | Lactato 3.0 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 139 | Cl- 101",
        "glucose": "HGT: 108 mg/dL",
        "others": "Troponina T: 0.12 ng/mL"
      },
      "history": {
        "witness": "Compañero de equipo relata que el paciente corrió a disputar una pelota, se agarró el pecho y cayó desplomado.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-63",
    "title": "Caso 63: Neumotórax a Tensión iatrogénico post-vía venosa central con colapso en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Lorena Guzmán",
      "age": 49,
      "gender": "F",
      "location": "UCI Médica - Cama 4",
      "history": "Shock séptico en resolución. Punción de vena subclavia derecha realizada hace 20 minutos.",
      "presentation": "Desaturación brusca, disnea extrema, taquicardia galopante y asimetría de excursión torácica."
    },
    "initialVitals": {
      "hr": 144,
      "bp": "68/36",
      "spo2": 76,
      "etco2": 16,
      "rr": 34,
      "temp": 37.2,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con bajo voltaje",
      "isStable": false,
      "stabilityReason": "Hipotensión extrema (68/36), hipoxemia severa (76%) e hiperinsuflación unilateral.",
      "consciousness": "Agitada, sudorosa, luego desvanecida (AVPU: V)",
      "airway": "Ventilación asistida con BVM dificultosa (alta resistencia)",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El tórax derecho queda totalmente congelado en hiperexpansión! El paciente pierde el pulso carotídeo y la presión cae a cero. El monitor muestra ritmo sinusal a 130 lpm sin pulso palpable (AESP).",
    "arrestVitals": {
      "hr": 130,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 37.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Ritmo Taquicárdico Rápido)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "116/74",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 37,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal tras Toracocentesis Descompresiva",
      "pulsePresent": true,
      "consciousness": "Sedada, intubada, pleurostomía con trampa de agua instalada"
    },
    "reversibleCause": "Neumotórax a tensión derecho por punción de cúpula pleural durante abordaje subclavio (Neumotórax)",
    "hytCategory": "Neumotórax a Tensión",
    "teachingNotes": "El neumotórax a tensión colapsa el retorno venoso a la aurícula derecha. El tratamiento es INMEDIATO con descompresión con aguja en 2° espacio intercostal LMC o 5° EIC línea axilar anterior sin esperar radiografía.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Abolición completa del murmullo pulmonar en hemitórax derecho, timpanismo resonante a la percusión.",
        "cardiovascular": "Desviación traqueal visible hacia la izquierda, ingurgitación yugular bilateral masiva a 90°.",
        "perfusion": "Cianosis cervicofacial, piel fría y sudorosa.",
        "temperature": "37.2 °C"
      },
      "pocus": {
        "cardiac": "Colapso diastólico de cavidades derechas por compresión extrínseca intratorácica.",
        "lung": "Ausencia de deslizamiento pleural ('lung sliding') en hemitórax derecho. Signo de la estratosfera / código de barras en modo M. 'Punto pulmón' visualizado lateralmente.",
        "vci": "VCI 26 mm pletórica sin colapso respiratorio."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 58 | pO2 46 | HCO3 19 | Lactato 4.6 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 140 | Cl- 103",
        "glucose": "HGT: 115 mg/dL",
        "others": "Gases arteriales confirman hipoxemia e hipercapnia severa"
      },
      "history": {
        "witness": "Beca de anestesia informa que la punción subclavia fue dificultosa y requirió múltiples intentos con aspiración de aire.",
        "medications": "Noradrenalina en dosis bajas.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-64",
    "title": "Caso 64: Taponamiento Cardíaco Hemorrágico post-cirugía cardíaca con Tríada de Beck y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Víctor Henríquez",
      "age": 63,
      "gender": "M",
      "location": "UCI Cardiovascular - Postoperatorio Inmediato Cirugía By-pass",
      "history": "Cirugía de revascularización miocárdica (puentes coronarios) hace 6 horas.",
      "presentation": "Cese súbito del débito por los drenajes mediastínicos ('tubos tapados con coágulos') seguido de hipotensión profunda."
    },
    "initialVitals": {
      "hr": 132,
      "bp": "70/52",
      "spo2": 88,
      "etco2": 20,
      "rr": 26,
      "temp": 36.2,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Alternancia Eléctrica (variación cíclica de amplitud del QRS)",
      "isStable": false,
      "stabilityReason": "Tríada de Beck clásica: Hipotensión (70/52 con presión de pulso pinzada), ruidos cardíacos apagados y yugulares ingurgitadas.",
      "consciousness": "Soporoso, sudoroso (AVPU: V)",
      "airway": "Intubado conectado a ventilador mecánico",
      "ivAccess": "Catéter venoso central yugular interno y línea arterial radial"
    },
    "degenerationMessage": "¡La presión arterial en la línea arterial radial colapsa a una línea plana! Pérdida inmediata de pulso femoral y carotídeo. El monitor conserva complejos QRS regulares a 110 lpm sin pulso (AESP).",
    "arrestVitals": {
      "hr": 110,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Taponamiento)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "hr": 86,
      "bp": "112/68",
      "spo2": 99,
      "etco2": 41,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con recuperación hemodinámica post-evacuación pericárdica",
      "pulsePresent": true,
      "consciousness": "Bajo sedación y analgesia en ventilación mecánica protegida"
    },
    "reversibleCause": "Taponamiento pericárdico por coágulos retenidos en el saco pericárdico (Taponamiento cardíaco)",
    "hytCategory": "Taponamiento Cardíaco",
    "teachingNotes": "En el postoperatorio de cirugía cardíaca el cese brusco del drenaje torácico junto a hipotensión y pulso paradójico indica taponamiento. La re-esternotomía / pericardiocentesis es mandatoria.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos distantes muy velados e inaudibles. Pulso paradójico > 20 mmHg.",
        "perfusion": "Ingurgitación yugular franca visible por sobre el borde mandibular.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Derrame pericárdico circunferencial significativo con ecos densos (coágulos hemáticos). Colapso diastólico de aurícula derecha y ventrículo derecho. Variación respiratoria del flujo mitral > 30%.",
        "lung": "Líneas A normales sin neumotórax.",
        "vci": "VCI 24 mm pletórica fija sin colapso."
      },
      "labs": {
        "gsa": "pH 7.21 | pCO2 45 | pO2 82 | HCO3 18 | Lactato 4.8 mmol/L",
        "electrolytes": "K+ 4.4 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 128 mg/dL",
        "others": "Hematocrito 27% (anemia aguda postquirúrgica) | INR 1.6"
      },
      "history": {
        "witness": "Enfermera de intensivo informa que drenaba 200 ml/hora de sangre fresca y súbitamente el débito cayó a cero con caída brusca de la PAM a 40 mmHg.",
        "medications": "Sedación con Propofol y Remifentanilo.",
        "allergies": "Sin alergias conocidas."
      }
    }
  },
  {
    "id": "caso-65",
    "title": "Caso 65: Taquicardia Supraventricular Paroxística a 225 lpm con isquemia crítica y TV sin pulso",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Claudia Méndez",
      "age": 46,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Episodios de taquicardia paroxística no estudiada. Fumadora ocasional.",
      "presentation": "Palpitaciones angustiantes 'como un motor desbocado en el cuello', mareos intensos y opresión precordial."
    },
    "initialVitals": {
      "hr": 225,
      "bp": "78/48",
      "spo2": 92,
      "etco2": 30,
      "rr": 26,
      "temp": 36.6,
      "rhythm": "TAQUICARDIA_SUPRAVENTRICULAR",
      "rhythmName": "Taquicardia por Reentrada Nodal AV (AVNRT) a 225 lpm con Infradesnivel ST",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (78/48), dolor isquémico torácico anginoso y lipotimia.",
      "consciousness": "Lipotímica, ansiosa (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en fosa antecubital izquierda"
    },
    "degenerationMessage": "¡Durante el intento de maniobras vagales la paciente pierde la visión y el conocimiento! Cae en coma y el trazado degenera en Taquicardia Ventricular de complejo ancho muy rápida sin pulso palpable.",
    "arrestVitals": {
      "hr": 240,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular Sin Pulso (TVSP)",
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 76,
      "bp": "114/72",
      "spo2": 98,
      "etco2": 43,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular con resolución del infradesnivel ST",
      "pulsePresent": true,
      "consciousness": "Despierta progresivamente, responde a la voz (Glasgow 13)"
    },
    "reversibleCause": "Isquemia miocárdica crítica por frecuencia ventricular extrema no tolerada (Trombosis coronaria / Taquiarritmia)",
    "hytCategory": "Trombosis coronaria (Isquemia por Demanda)",
    "teachingNotes": "En TSV inestable con pulso la cardioversión sincronizada (50-100J) o Adenosina rápida (6 mg IV) deben aplicarse con premura antes de que degenere a TV sin pulso o FV.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos rítmicos taquicárdicos incalculables por palpación periférica. Latido venoso visible en cuello (signo de onda 'a' cañón).",
        "perfusion": "Palidez generalizada, sudoración fría en frente y palmas.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Contracción miocárdica sumamente rápida con llenado diastólico ventricular severamente acortado.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.33 | pCO2 36 | pO2 84 | HCO3 19 | Lactato 3.1 mmol/L",
        "electrolytes": "K+ 4.0 | Na+ 139 | Cl- 102",
        "glucose": "HGT: 106 mg/dL",
        "others": "Troponina I: 0.28 ng/mL (leve elevación por demanda hemodinámica)"
      },
      "history": {
        "witness": "Hermana refiere que estaba en una reunión familiar, tomó café y de golpe sintió el aleteo incontrolable en el pecho.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-66",
    "title": "Caso 66: Intoxicación por Antidepresivos Tricíclicos (Amitriptilina) con QRS ensanchado y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Julián Oyarzún",
      "age": 31,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Agudos",
      "history": "Trastorno depresivo mayor. Tratamiento con Amitriptilina.",
      "presentation": "Encontrado en su domicilio con frascos vacíos de Amitriptilina (30 comprimidos de 75 mg). Convulsión tónico-clónica previa al ingreso."
    },
    "initialVitals": {
      "hr": 152,
      "bp": "72/40",
      "spo2": 90,
      "etco2": 28,
      "rr": 22,
      "temp": 38.1,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con QRS extremadamente ancho (180 ms) y onda R > 3 mm en aVR",
      "isStable": false,
      "stabilityReason": "Hipotensión refractaria (72/40), bloqueo de canales de sodio cardíacos y depresión del SNC.",
      "consciousness": "Comatoso postictal, mioclonías periorales (AVPU: P)",
      "airway": "Vía aérea con riesgo de aspiración, reflejo nauseoso disminuido",
      "ivAccess": "Vía periférica 18G en dorso de mano derecha"
    },
    "degenerationMessage": "¡El complejo QRS se ensancha progresivamente fusionándose con la onda T y el paciente cae en Fibrilación Ventricular incoordinada de alto voltaje sin pulso carotídeo!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 38.1,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV por Cardiotoxicidad)",
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "108/66",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 37.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con QRS estrechado tras Bicarbonato de Sodio molar",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, alcalinización sérica continua con bicarbonato"
    },
    "reversibleCause": "Intoxicación aguda por Amitriptilina con bloqueo masivo de canales de sodio cardíacos (Tóxicos / Hidrogeniones)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En intoxicación por tricíclicos con QRS > 100 ms o hipotensión, el Bicarbonato de Sodio 8.4% (1-2 mEq/kg en bolo EV) es el antídoto específico al desplazar el fármaco del canal de sodio.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular presente simétrico bilateral.",
        "cardiovascular": "Taquicardia rítmica con ruidos cardíacos secos.",
        "perfusion": "Midriasis bilateral reactiva lenta, boca y axilas completamente secas (signos anticolinérgicos).",
        "temperature": "38.1 °C"
      },
      "pocus": {
        "cardiac": "Depresión moderada de contractilidad miocárdica global por cardiotoxicidad.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 14 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 48 | pO2 78 | HCO3 19 | Lactato 4.2 mmol/L",
        "electrolytes": "K+ 4.6 | Na+ 137 | Cl- 101",
        "glucose": "HGT: 124 mg/dL",
        "others": "Screening toxicológico positivo para Antidepresivos Tricíclicos"
      },
      "history": {
        "witness": "Madre encontró carta de despedida y cajas vacías de amitriptilina hace 1 hora.",
        "medications": "Amitriptilina 75 mg/día.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-67",
    "title": "Caso 67: Hipocalcemia Severa sintomática post-tiroidectomía con Torsades y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Marcela Navarrete",
      "age": 44,
      "gender": "F",
      "location": "Servicio de Cirugía - Cama 12",
      "history": "Tiroidectomía total por bocio multinodular realizada hace 48 horas.",
      "presentation": "Parestesias peribucales intensas, espasmo carpopedal doloroso (mano en comadrona), estridor y palpitaciones."
    },
    "initialVitals": {
      "hr": 172,
      "bp": "82/50",
      "spo2": 91,
      "etco2": 29,
      "rr": 26,
      "temp": 36.7,
      "rhythm": "TORSADES",
      "rhythmName": "Torsades de Pointes con QTc de 610 ms (Prolongación extrema del segmento ST)",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (82/50), tetania muscular e inestabilidad arrítmica ventricular.",
      "consciousness": "Agitada, dolorida, luego estuporosa (AVPU: V)",
      "airway": "Espasmo laríngeo incipiente",
      "ivAccess": "Vía periférica 20G en antebrazo derecho"
    },
    "degenerationMessage": "¡El trazado ventricular helicoidal se torna caótico de ultra alta frecuencia y la paciente entra en paro cardíaco por Fibrilación Ventricular sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.7,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 78,
      "bp": "116/74",
      "spo2": 98,
      "etco2": 41,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con normalización del intervalo QT post-Gluconato de Calcio",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, reposición continua de calcio y magnesio EV"
    },
    "reversibleCause": "Hipocalcemia aguda severa por hipoparatiroidismo quirúrgico iatrogénico (Electrolitos)",
    "hytCategory": "Hipo / Hiperkalemia y Electrolitos",
    "teachingNotes": "La hipocalcemia prolonga el segmento ST y el intervalo QT predisponiendo a Torsades y FV. El tratamiento inmediato es Gluconato de Calcio al 10% (10-20 ml en infusión lenta en 10 min).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos irregulares. Signo de Trousseau positivo marcado al inflar el manguito de PA. Signo de Chvostek positivo en mejilla.",
        "perfusion": "Palidez mucocutánea, rigidez flexora de extremidades superiores.",
        "temperature": "36.7 °C"
      },
      "pocus": {
        "cardiac": "Función sistólica conservada, sin valvulopatías ni derrame.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.44 | pCO2 38 | pO2 88 | HCO3 24 | Lactato 2.2 mmol/L",
        "electrolytes": "Calcio iónico: 0.62 mmol/L (Normal 1.15-1.30) | K+ 3.8 | Mg2+ 1.5",
        "glucose": "HGT: 98 mg/dL",
        "others": "PTH intacta sérica: < 3 pg/mL (indetectable)"
      },
      "history": {
        "witness": "Enfermera de sala refiere que la paciente empezó con calambres en las manos y espasmos antes de desvanecerse.",
        "medications": "Levotiroxina 100 mcg (iniciada postquirúrgica).",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-68",
    "title": "Caso 68: Rotura de Aneurisma de Aorta Abdominal con shock hemorrágico masivo y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Hernán Garrido",
      "age": 74,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación Vascular",
      "history": "Tabaquismo severo (50 paquetes/año), EPOC, Hipertensión arterial.",
      "presentation": "Dolor abdominal y lumbar desgarrante de inicio brutal hace 30 minutos, palidez marmórea y colapso circulatorio."
    },
    "initialVitals": {
      "hr": 145,
      "bp": "58/30",
      "spo2": 84,
      "etco2": 14,
      "rr": 34,
      "temp": 35.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal Extrema Hipovolémica con bajo voltaje",
      "isStable": false,
      "stabilityReason": "Shock hipovolémico hemorrágico exanguinante (58/30), colapso vascular periférico.",
      "consciousness": "Estuporoso, desorientado (AVPU: P)",
      "airway": "Respiración agónica taquipneica superficial",
      "ivAccess": "Dos vías periféricas 14G y 16G en extremidades superiores"
    },
    "degenerationMessage": "¡El pulso periférico y carotídeo desaparecen simultáneamente! Palidez cadavérica total y apnea. El monitor ECG registra complejos sinuosales a 120 lpm sin pulso (AESP por exanguinación).",
    "arrestVitals": {
      "hr": 120,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 35.8,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Exanguinación Hipovolémica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "92/56",
      "spo2": 95,
      "etco2": 37,
      "rr": 16,
      "temp": 35.5,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con infusión masiva de hemoderivados (1:1:1)",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, clampaje aórtico de urgencia en pabellón"
    },
    "reversibleCause": "Rotura de aneurisma aórtico abdominal infrarrenal con hemorragia retroperitoneal masiva (Hipovolemia)",
    "hytCategory": "Hipovolemia",
    "teachingNotes": "En shock hemorrágico masivo, la RCP compresiva es inútil sin restitución de volumen urgente: protocolo de transfusión masiva (glóbulos rojos, plasma y plaquetas 1:1:1) y control quirúrgico del sangrado.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado simétrico bilateral.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos casi inaudibles, pulsos periféricos femorales ausentes.",
        "perfusion": "Piel marmórea grisácea gélida, abdomen distendido doloroso con masa pulsátil palpable en mesogastrio.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas colapsadas 'en beso' ('kissing walls') por vaciamiento sistólico extremo.",
        "lung": "Líneas A normales sin hemotórax.",
        "vci": "VCI filiforme (< 5 mm) completamente colapsada. Aorta abdominal con dilatación aneurismática de 7.5 cm con hematoma retroperitoneal activo."
      },
      "labs": {
        "gsa": "pH 7.08 | pCO2 34 | pO2 70 | HCO3 12 | Lactato 8.5 mmol/L",
        "electrolytes": "K+ 5.1 | Na+ 136 | Cl- 104",
        "glucose": "HGT: 142 mg/dL",
        "others": "Hematocrito: 19% | Hemoglobina: 6.2 g/dL | Plaquetas: 85.000"
      },
      "history": {
        "witness": "Esposa relata que el paciente estaba almorzando y sintió una 'puñalada en la espalda y el estómago' y cayó al suelo.",
        "medications": "Enalapril, Atorvastatina.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-69",
    "title": "Caso 69: Asma Casi Fatal (Status Asmaticus) con hiperinsuflación dinámica y paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Felipe Astudillo",
      "age": 26,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación Respiratorio",
      "history": "Asma bronquial severa de difícil control, múltiples hospitalizaciones previas en UCI.",
      "presentation": "Crisis asmática de 6 horas de evolución refractaria a Salbutamol domiciliario. Llega con 'tórax silente', cianosis y agotamiento respiratorio."
    },
    "initialVitals": {
      "hr": 155,
      "bp": "76/44",
      "spo2": 70,
      "etco2": 68,
      "rr": 36,
      "temp": 37,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Alto Esfuerzo con P Pulmonale",
      "isStable": false,
      "stabilityReason": "Paro respiratorio inminente (tórax silente, hipoxemia severa 70%), acidosis hipercápnica y agotamiento.",
      "consciousness": "Soporoso, incapaz de articular palabras (AVPU: P)",
      "airway": "Uso exhaustivo de musculatura intercostal y esternal",
      "ivAccess": "Vía periférica 18G en brazo derecho"
    },
    "degenerationMessage": "¡El paciente deja de ventilar bruscamente por fatiga diafragmática total! Cae en coma arrefléxico, el pulso central desaparece y el monitor muestra complejos rítmicos a 48 lpm sin pulso (AESP por auto-PEEP extrema y asfixia).",
    "arrestVitals": {
      "hr": 48,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 37,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Bradicardia Asfíctica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "hr": 92,
      "bp": "112/70",
      "spo2": 97,
      "etco2": 39,
      "rr": 12,
      "temp": 36.8,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal tras Descompresión de Auto-PEEP y Broncodilatación",
      "pulsePresent": true,
      "consciousness": "Comatoso, bajo sedo-relajación profunda en ventilación mecánica con tiempo espiratorio prolongado"
    },
    "reversibleCause": "Insuficiencia respiratoria hipercápnica asfíctica e hiperinsuflación dinámica crítica (Hipoxia / Hidrogeniones)",
    "hytCategory": "Hipoxia",
    "teachingNotes": "En el paro en asma severa, la desconexión transitoria del ventilador/BVM y compresión manual del tórax alivia el auto-PEEP (hiperinsuflación) restaurando el retorno venoso al corazón.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Tórax completamente silente bilateralmente, murmullo vesicular inaudible por obstrucción bronquial extrema.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos velados por el atrapamiento aéreo.",
        "perfusion": "Cianosis central violácea profunda, diaforesis fría.",
        "temperature": "37.0 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho con sobrecarga aguda moderada por vasoconstricción hipóxica pulmonar.",
        "lung": "Líneas A prominentes bilaterales, deslizamiento pleural presente (descarta neumotórax).",
        "vci": "VCI 23 mm pletórica por elevación extrema de presión intratorácica."
      },
      "labs": {
        "gsa": "pH 6.98 | pCO2 94 | pO2 38 | HCO3 21 | Lactato 5.6 mmol/L",
        "electrolytes": "K+ 4.8 | Na+ 137 | Cl- 101",
        "glucose": "HGT: 135 mg/dL",
        "others": "Gasometría confirma acidosis respiratoria catastrófica"
      },
      "history": {
        "witness": "Pareja relata que consumió 2 inhaladores completos de Salbutamol en las últimas 4 horas sin alivio.",
        "medications": "Budesonida/Formoterol, Salbutamol SOS.",
        "allergies": "Alergia al Ácido Acetilsalicílico (Tríada de Samter)."
      }
    }
  },
  {
    "id": "caso-70",
    "title": "Caso 70: Flutter Auricular Típico 2:1 a 150 lpm con descompensación aguda a TVSP",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Guillermo Riquelme",
      "age": 71,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Observación",
      "history": "Cardiopatía hipertensiva, EPOC moderado.",
      "presentation": "Palpitaciones continuas de inicio súbito, disnea progresiva de reposo y dolor precordial sordo."
    },
    "initialVitals": {
      "hr": 150,
      "bp": "84/52",
      "spo2": 91,
      "etco2": 32,
      "rr": 24,
      "temp": 36.6,
      "rhythm": "FLUTTER_AURICULAR",
      "rhythmName": "Flutter Auricular Típico con Conducción AV 2:1 fija (ondas F en dientes de sierra)",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (84/52), dolor anginoso e insuficiencia cardíaca aguda.",
      "consciousness": "Consciente pero marcadamente decaído y confuso (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en antebrazo izquierdo"
    },
    "degenerationMessage": "¡El paciente palidece bruscamente y se desvanece en la camilla! El trazado en dientes de sierra se transforma de golpe en complejos anchos monomórficos gigantes a 230 lpm sin pulso palpable (TV sin pulso).",
    "arrestVitals": {
      "hr": 230,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular Sin Pulso (TVSP)",
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 76,
      "bp": "118/74",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras cardioversión eléctrica sincronizada",
      "pulsePresent": true,
      "consciousness": "Comatoso post-paro, candidato a TTM"
    },
    "reversibleCause": "Descompensación hemodinámica e isquemia miocárdica inducida por taquiarritmia auricular rápida (Trombosis coronaria)",
    "hytCategory": "Trombosis coronaria (Isquemia por Demanda)",
    "teachingNotes": "El Flutter auricular inestable responde excelentemente a la cardioversión sincronizada de baja energía (50-100J). Si degenera a TV sin pulso, requiere descarga asincrónica de 200J inmediata.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crépitos bibasales finos en tercio inferior de ambos campos pulmonares.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy rápidos a exactamente 150 lpm.",
        "perfusion": "Llenado capilar 3 segundos, palidez moderada.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Aurícula izquierda dilatada, función sistólica del VI levemente deprimida.",
        "lung": "Líneas B aisladas en bases pulmonares.",
        "vci": "VCI 19 mm con colapso disminuido."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 38 | pO2 76 | HCO3 20 | Lactato 2.8 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 112 mg/dL",
        "others": "Troponina I: 0.18 ng/mL"
      },
      "history": {
        "witness": "Hijo refiere que el padre comenzó con palpitaciones por la mañana y no toleró caminar hasta el baño.",
        "medications": "Enalapril 20 mg, Atorvastatina 20 mg.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-71",
    "title": "Caso 71: Bloqueo AV Completo sintomático post-TAVI con progresión a Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Héctor Maldonado",
      "age": 82,
      "gender": "M",
      "location": "Servicio de Hemodinamia - Recuperación Post-procedimiento",
      "history": "Estenosis aórtica severa sometida a implante valvular aórtico percutáneo (TAVI) hace 4 horas.",
      "presentation": "Bradicardia sintomática extrema progresiva, mareos intensos, hipotensión y disociación auriculoventricular en el monitor."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "64/36",
      "spo2": 88,
      "etco2": 22,
      "rr": 10,
      "temp": 36,
      "rhythm": "BLOQUEO_AV_3",
      "rhythmName": "Bloqueo Auriculoventricular Completo (3er Grado) con Escape Idioventricular Lento",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (64/36), bradicardia extrema refractaria a atropina y síncope inminente.",
      "consciousness": "Obnubilado, letárgico (AVPU: P)",
      "airway": "Espontánea superficial",
      "ivAccess": "Vía venosa periférica 18G e introductor femoral derecho"
    },
    "degenerationMessage": "¡El foco de escape idioventricular se agota por completo! Las ondas P continúan aisladas sin conducir y el trazado ventricular cae en una línea isoeléctrica plana (Asistolia ventricular).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia Ventricular con Ondas P Aisladas (P-wave asystole)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
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
      "bp": "114/70",
      "spo2": 98,
      "etco2": 41,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_MARCAPASOS",
      "rhythmName": "Ritmo Estimulado por Marcapasos Transitorio con Captura Eléctrica y Mecánica 100%",
      "pulsePresent": true,
      "consciousness": "Recupera conciencia tras captura efectiva de marcapasos (Glasgow 14)"
    },
    "reversibleCause": "Traumatismo mecánico sobre el sistema de conducción AV por expansión de prótesis valvular percutánea (Tóxicos / Mecánica)",
    "hytCategory": "Causa Mecánica / Bloqueo de Conducción",
    "teachingNotes": "El bloqueo AV completo infra-Hisiano post-TAVI no responde a atropina y requiere marcapasos transitorio percutáneo o transcutáneo inmediato para evitar la asistolia.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos con variación de intensidad del 1er ruido por disociación AV.",
        "perfusion": "Palidez cérea, frialdad distal en cuatro extremidades.",
        "temperature": "36.0 °C"
      },
      "pocus": {
        "cardiac": "Prótesis valvular TAVI normoinsertada con gradiente normal. Escape ventricular lento sin contracción auricular sincronizada.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 18 mm con escaso colapso."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 42 | pO2 80 | HCO3 19 | Lactato 3.2 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 137 | Cl- 101",
        "glucose": "HGT: 104 mg/dL",
        "others": "Hemoglobina 10.8 g/dL"
      },
      "history": {
        "witness": "Cardiólogo intervencionista indica que la válvula autoexpandible se implantó baja en el tracto de salida ventricular.",
        "medications": "Aspirina, Clopidogrel.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-72",
    "title": "Caso 72: Síndrome de Wolff-Parkinson-White con FA preexcitada rápida y degeneración a FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Matías Alarcón",
      "age": 25,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Síndrome de preexcitación ventricular (WPW) asintomático conocido.",
      "presentation": "Palpitaciones vertiginosas extremas, opresión torácica, mareo incapacitante y sensación de desvanecimiento inminente tras ingerir bebidas energéticas."
    },
    "initialVitals": {
      "hr": 245,
      "bp": "72/42",
      "spo2": 89,
      "etco2": 28,
      "rr": 30,
      "temp": 36.7,
      "rhythm": "FA_PREEXCITADA",
      "rhythmName": "Fibrilación Auricular Preexcitada (FBI: Fast, Broad, Irregular) con intervalos R-R < 200 ms",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (72/42), frecuencia ventricular extrema (> 240 lpm) y riesgo inminente de FV.",
      "consciousness": "Obnubilado, responde con quejidos (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en brazo derecho"
    },
    "degenerationMessage": "¡Un complejo ventricular conducido por la vía anómala cae en la fase vulnerable de la onda T y el ritmo degenera en Fibrilación Ventricular catastrófica sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.7,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 78,
      "bp": "116/72",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con onda delta típica y PR corto (Patrón WPW basal)",
      "pulsePresent": true,
      "consciousness": "Comatoso post-reanimación, candidato a TTM y ablación por radiofrecuencia"
    },
    "reversibleCause": "Conducción anterógrada ultrarrápida por vía accesoria auriculoventricular (haz de Kent)",
    "hytCategory": "Arritmia Genética / Vía Accesoria",
    "teachingNotes": "En FA preexcitada están CONTRAINDICADOS los fármacos que bloquean el nodo AV (adenosina, betabloqueadores, diltiazem, digoxina), ya que desvían la conducción a la vía anómala y causan FV. Tratamiento de elección: cardioversión eléctrica precoz.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos irregulares incalculables.",
        "perfusion": "Palidez fría sudorosa, pulso periférico filiforme apenas perceptible.",
        "temperature": "36.7 °C"
      },
      "pocus": {
        "cardiac": "Contracción ventricular extremadamente veloz e incoordinada.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.31 | pCO2 37 | pO2 82 | HCO3 18 | Lactato 3.4 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 138 | Cl- 101",
        "glucose": "HGT: 110 mg/dL",
        "others": "Troponina I: 0.15 ng/mL"
      },
      "history": {
        "witness": "Amigos refieren que consumió 3 latas de bebida energizante antes del entrenamiento de crossfit.",
        "medications": "Ninguno crónico.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-73",
    "title": "Caso 73: Síndrome de Lisis Tumoral con Hiperkalemia Extrema (K+ 8.9) y FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Gonzalo Ibáñez",
      "age": 55,
      "gender": "M",
      "location": "Servicio de Hematoncología - Sala de Hospitalizados",
      "history": "Linfoma de Burkitt de alta carga tumoral. Inicio de quimioterapia citotóxica hace 24 horas.",
      "presentation": "Debilidad muscular ascendente severa, náuseas, vómitos, anuria y palpitaciones con dolor precordial."
    },
    "initialVitals": {
      "hr": 38,
      "bp": "74/40",
      "spo2": 90,
      "etco2": 26,
      "rr": 22,
      "temp": 36.8,
      "rhythm": "RITMO_SINOVENTRICULAR",
      "rhythmName": "Ritmo Sinoventricular con QRS ensanchado en onda sinusoidal y T picadas gigantes",
      "isStable": false,
      "stabilityReason": "Hiperpotasemia potencialmente letal (K+ 8.9), hipotensión (74/40) y pre-paro cardíaco.",
      "consciousness": "Soporoso, parálisis flácida de cuatro extremidades (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Catéter venoso central subclavio y vía periférica 18G"
    },
    "degenerationMessage": "¡El trazado en onda sinusoidal se desintegra en una onda fibrilatoria desorganizada y el paciente cae en Fibrilación Ventricular sin pulso carotídeo!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.8,
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
        "atropina"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "desfibrilar",
        "adrenalina",
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
      "hr": 82,
      "bp": "106/64",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con QRS estrechado post-Gluconato de Calcio, Insulina/Glucosa y Bicarbonato",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, conectado a hemodiálisis de emergencia en UCI"
    },
    "reversibleCause": "Hiperpotasemia letal por lisis tumoral masiva y fallo renal agudo (Hipo / Hiperkalemia)",
    "hytCategory": "Hipo / Hiperkalemia y Electrolitos",
    "teachingNotes": "En hiperkalemia extrema con alteración del ECG, el Gluconato o Cloruro de Calcio EV es prioritario para estabilizar la membrana, seguido de medidas de desplazamiento (insulina con glucosa, salbutamol nebulizado) y hemodiálisis urgente.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos lentos y apagados.",
        "perfusion": "Tetraparesia flácida arrefléxica franca, piel fría.",
        "temperature": "36.8 °C"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica deprimida difusamente sin anomalías valvulares.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 17 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 36 | pO2 82 | HCO3 14 | Lactato 3.8 mmol/L",
        "electrolytes": "K+ 8.9 mEq/L (Crítico) | Fósforo: 9.8 mg/dL | Ácido Úrico: 16.2 mg/dL | Calcio: 0.70 mmol/L",
        "glucose": "HGT: 92 mg/dL",
        "others": "Creatinina: 4.8 mg/dL | BUN: 78 mg/dL"
      },
      "history": {
        "witness": "Médico oncólogo refiere que el paciente recibió primer ciclo de quimioterapia de alta dosis ayer por la tarde.",
        "medications": "Rasburicasa, Alopurinol, Hidratación EV.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-74",
    "title": "Caso 74: Ahogamiento por Sumersión en Piscina con paro respiratorio secundario y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Tomás Rivas",
      "age": 22,
      "gender": "M",
      "location": "Borde de Piscina - Asistencia SAMU",
      "history": "Sin antecedentes mórbidos. Rescatado del fondo de una piscina tras sumersión estimada en 8 minutos.",
      "presentation": "Cianosis generalizada, hipotermia moderada, abundante espuma blanquecina por boca y nariz, apnea total."
    },
    "initialVitals": {
      "hr": 24,
      "bp": "50/20",
      "spo2": 52,
      "etco2": 12,
      "rr": 0,
      "temp": 33.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Ritmo Agónico de Asfixia Terminal por Hipoxemia",
      "isStable": false,
      "stabilityReason": "Paro respiratorio consumado, asfixia profunda (SpO2 52%), colapso hemodinámico total.",
      "consciousness": "Coma profundo arrefléxico (AVPU: U)",
      "airway": "Vía aérea inundada con agua y secreción espumosa",
      "ivAccess": "Vía periférica 18G en antebrazo izquierdo"
    },
    "degenerationMessage": "¡El escaso complejo agónico desaparece del monitor! Queda una línea recta isoeléctrica horizontal confirmada en derivaciones I y II (Asistolia total).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 33.2,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia por Hipoxia Asfíctica",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "bp": "102/62",
      "spo2": 96,
      "etco2": 40,
      "rr": 14,
      "temp": 34,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras despeje de vía aérea, ventilación O2 100% y RCP",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM activo en UCI"
    },
    "reversibleCause": "Asfixia por sumersión con laringoespasmo e inundación alveolar (Hipoxia)",
    "hytCategory": "Hipoxia",
    "teachingNotes": "En el paro por ahogamiento, las ventilaciones de rescate son la intervención más crítica. La secuencia recomendada es dar 5 ventilaciones iniciales seguidas de RCP estándar 30:2 y O2 al 100%.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Gorgoteo y estertores húmedos masivos audibles sin fonendoscopio, salida continua de líquido pulmonar.",
        "cardiovascular": "Ruidos cardíacos inaudibles.",
        "perfusion": "Cianosis cérea corporal completa, midriasis paralítica bilateral.",
        "temperature": "33.2 °C (Termómetro esofágico)"
      },
      "pocus": {
        "cardiac": "Acinesia miocárdica completa en asistolia.",
        "lung": "Líneas B confluentes masivas ('pulmón húmedo') por aspiración líquida y edema alveolar.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.04 | pCO2 78 | pO2 36 | HCO3 16 | Lactato 7.2 mmol/L",
        "electrolytes": "K+ 4.6 | Na+ 135 | Cl- 98",
        "glucose": "HGT: 118 mg/dL",
        "others": "Gases arteriales demuestran acidosis mixta severa"
      },
      "history": {
        "witness": "Amigos señalan que estaban consumiendo alcohol en una fiesta y se percataron de que Tomás no salía de la piscina.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-75",
    "title": "Caso 75: Intoxicación por Organofosforados con síndrome colinérgico severo y paro en AESP",
    "type": "bradicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Belisario Parra",
      "age": 48,
      "gender": "M",
      "location": "Servicio de Urgencias Rural - Box de Reanimación",
      "history": "Trabajador agrícola fumigador. Exposición accidental sin elementos de protección personal.",
      "presentation": "Miosis puntiforme bilateral arreactiva, salivación copiosa ('espuma por boca'), broncorrea masiva, diaforesis, fasciculaciones musculares y vómitos."
    },
    "initialVitals": {
      "hr": 30,
      "bp": "62/34",
      "spo2": 72,
      "etco2": 20,
      "rr": 8,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Extrema Colinérgica",
      "isStable": false,
      "stabilityReason": "Crisis colinérgica letal (síndrome DUMBELS), insuficiencia respiratoria por broncorrea y colapso circulatorio.",
      "consciousness": "Comatoso, responde sólo a dolor con fasciculaciones (AVPU: P)",
      "airway": "Inundación masiva de vía aérea por hipersecreción bronquial",
      "ivAccess": "Vía periférica 18G en brazo derecho"
    },
    "degenerationMessage": "¡El paciente sufre un colapso ventilatorio terminal por inundación bronquial y parálisis muscular diafragmática! Pulso carotídeo ausente. El monitor muestra ritmo nodal ancho a 36 lpm sin pulso (AESP).",
    "arrestVitals": {
      "hr": 36,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP Colinérgica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "bp": "110/68",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con reversión de broncorrea tras Atropinización agresiva y Pralidoxima",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, infusión de atropina continua en UCI"
    },
    "reversibleCause": "Intoxicación por plaguicida inhibidor irreversible de acetilcolinesterasa (Tóxicos)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En intoxicación por organofosforados la Atropina debe titularse en dosis crecientes (2-5 mg EV cada 3-5 minutos) sin tope de dosis hasta lograr la 'atropinización': secado de secreciones bronquiales y FC > 80 lpm.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Broncorrea masiva con estertores húmedos y sibilancias bilaterales audibles a distancia.",
        "cardiovascular": "Bradicardia extrema con tonos velados.",
        "perfusion": "Miosis puntiforme ('en cabeza de alfiler'), diaforesis profusa, fasciculaciones generalizadas.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Bradicinesia marcada sin anomalías estructurales.",
        "lung": "Líneas B difusas bilaterales ('pulmón hipersecretor').",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.15 | pCO2 64 | pO2 48 | HCO3 20 | Lactato 4.5 mmol/L",
        "electrolytes": "K+ 4.3 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 125 mg/dL",
        "others": "Actividad de colinesterasa plasmática: < 15% del valor normal"
      },
      "history": {
        "witness": "Compañero de faena relata que se le rompió la manguera de la mochila fumigadora de Clorpirifós y se empapó la ropa y el rostro hace 2 horas.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-76",
    "title": "Caso 76: Disección Aórtica Tipo A con hemotaponamiento pericárdico y paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Renato Casanova",
      "age": 59,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Hipertensión arterial mal controlada. Dolor torácico transfixiante hacia la espalda iniciado hace 1 hora.",
      "presentation": "Dolor desgarrante 10/10, asimetría de pulsos en miembros superiores, disfonía y caída súbita de presión arterial."
    },
    "initialVitals": {
      "hr": 128,
      "bp": "74/52",
      "spo2": 90,
      "etco2": 22,
      "rr": 28,
      "temp": 36.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Bajo Voltaje y Alternancia Eléctrica",
      "isStable": false,
      "stabilityReason": "Shock obstructivo severo (74/52), taponamiento cardíaco inminente y asimetría de pulsos.",
      "consciousness": "Obnubilado, letárgico (AVPU: V)",
      "airway": "Espontánea taquipneica",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El paciente pierde la conciencia súbitamente! Cae la mandíbula, ausencia de pulso carotídeo y el monitor traza ritmo sinusal a 105 lpm sin pulso palpable ni onda pletismográfica (AESP).",
    "arrestVitals": {
      "hr": 105,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Hemopericardio)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "96/60",
      "spo2": 96,
      "etco2": 39,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con drenaje pericárdico de rescate y traslado inmediato a Cirugía Cardíaca",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado emergente a pabellón"
    },
    "reversibleCause": "Disección aórtica aguda tipo A con rotura hacia saco pericárdico (Taponamiento cardíaco)",
    "hytCategory": "Taponamiento Cardíaco",
    "teachingNotes": "En dolor torácico desgarrante con hipotensión y asimetría de pulsos, el POCUS subxifoideo evidencia hemopericardio y colgajo intimal ('flap'). La pericardiocentesis alivia el colapso para permitir la cirugía de rescate.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos muy apagados, soplo diastólico aórtico nuevo de insuficiencia aórtica aguda. Asimetría de pulsos radiales (> 30 mmHg de diferencia).",
        "perfusion": "Ingurgitación yugular bilateral, frialdad periférica acentuada.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Derrame pericárdico circunferencial moderado-severo con ecos densos hemáticos y colapso diastólico de cavidades derechas. Dilatación de la raíz aórtica (> 4.8 cm) con flap intimal visible en ventana paraesternal.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 25 mm fija sin colapso."
      },
      "labs": {
        "gsa": "pH 7.22 | pCO2 40 | pO2 78 | HCO3 17 | Lactato 4.8 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 139 | Cl- 103",
        "glucose": "HGT: 126 mg/dL",
        "others": "Dímero D: > 15.000 ng/mL | Troponina I: 0.45 ng/mL"
      },
      "history": {
        "witness": "Hijo refiere que su padre sintió un 'desgarro como si le rompieran la espalda con un cuchillo' mientras levantaba una caja.",
        "medications": "Enalapril (suspendido hace meses).",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-77",
    "title": "Caso 77: Electrocución Industrial por Alta Tensión con Fibrilación Ventricular primaria",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Esteban Sanhueza",
      "age": 36,
      "gender": "M",
      "location": "Planta Industrial - Asistencia Médica SAMU",
      "history": "Sin antecedentes mórbidos. Contacto accidental con línea de alta tensión trifásica (380V).",
      "presentation": "Colapso instantáneo al tocar el cable pelado con la mano derecha. Quemaduras de entrada en mano derecha y salida en pie izquierdo."
    },
    "initialVitals": {
      "hr": 210,
      "bp": "70/40",
      "spo2": 85,
      "etco2": 24,
      "rr": 12,
      "temp": 36.8,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Polimórfica Eléctrica Inestable",
      "isStable": false,
      "stabilityReason": "Trauma eléctrico agudo, hipotensión crítica (70/40) y fibrilación inminente.",
      "consciousness": "Inconsciente, respiración estertorosa (AVPU: U)",
      "airway": "Espontánea con riesgo de quemadura de vía aérea",
      "ivAccess": "Vía periférica 16G en brazo izquierdo"
    },
    "degenerationMessage": "¡El trazado colapsa de inmediato en una Fibrilación Ventricular gruesa de alta frecuencia y gran amplitud sin pulso palpable!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.8,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular Primaria Eléctrica",
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 82,
      "bp": "118/74",
      "spo2": 98,
      "etco2": 43,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras desfibrilación precoz con 200J bifásicos",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y reposición masiva de fluidos por rabdomiólisis"
    },
    "reversibleCause": "Descarga eléctrica de alta tensión con disrupción eléctrica miocárdica (Trauma eléctrico)",
    "hytCategory": "Tóxicos / Trauma Eléctrico",
    "teachingNotes": "En electrocución por corriente alterna el miocardio es despolarizado en la fase vulnerable causando FV. La desfibrilación precoz tiene una altísima tasa de éxito si se aplica en los primeros minutos.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos inaudibles en paro.",
        "perfusion": "Quemadura de entrada en palma derecha con carbonización profunda de 3er grado y orificio de salida en talón izquierdo.",
        "temperature": "36.8 °C"
      },
      "pocus": {
        "cardiac": "Ausencia de daño estructural previo, corazón anatómicamente sano.",
        "lung": "Líneas A normales sin neumotórax.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.28 | pCO2 42 | pO2 86 | HCO3 19 | Lactato 4.1 mmol/L",
        "electrolytes": "K+ 4.8 | Na+ 138 | Cl- 101",
        "glucose": "HGT: 122 mg/dL",
        "others": "Creatina Fosfocinasa (CPK): 12.500 U/L (Rabdomiólisis severa) | Mioglobina en orina positiva"
      },
      "history": {
        "witness": "Compañeros de trabajo desconectaron la energía principal con pértiga aislante e iniciaron compresiones inmediatamente.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-78",
    "title": "Caso 78: Embolia de Líquido Amniótico durante el parto con colapso catastrófico y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Valeria Santibáñez",
      "age": 32,
      "gender": "F",
      "location": "Pabellón de Maternidad - Sala de Partos",
      "history": "Primigesta de 39 semanas en trabajo de parto activo.",
      "presentation": "Súbita agitación, disnea violenta, escalofríos, cianosis, convulsión tónico-clónica y sangrado vaginal incoagulable."
    },
    "initialVitals": {
      "hr": 160,
      "bp": "58/32",
      "spo2": 66,
      "etco2": 12,
      "rr": 38,
      "temp": 37.1,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Colapso con Patrón de Sobrecarga de Ventrículo Derecho",
      "isStable": false,
      "stabilityReason": "Shock anafilactoide obstétrico catastrófico (58/32), hipoxia extrema y coagulopatía de consumo.",
      "consciousness": "Comatosa tras convulsión (AVPU: U)",
      "airway": "Riesgo inminente de broncoaspiración",
      "ivAccess": "Dos vías periféricas 16G permeables"
    },
    "degenerationMessage": "¡La paciente entra en apnea completa y pierde el pulso carotídeo y femoral! El monitor muestra complejos anchos a 115 lpm sin pulso palpable (AESP obstétrica).",
    "arrestVitals": {
      "hr": 115,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 37.1,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP Obstétrica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "94/58",
      "spo2": 96,
      "etco2": 38,
      "rr": 16,
      "temp": 36.6,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal post-histerotomía perimortem de rescate y soporte intensivo",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado prioritario a UCI Obstétrica"
    },
    "reversibleCause": "Síndrome anafilactoide del embarazo / Embolia de líquido amniótico (Trombosis pulmonar / Hipoxia)",
    "hytCategory": "Trombosis pulmonar (Embolia Obstétrica)",
    "teachingNotes": "En el paro cardíaco materno > 20 semanas es vital desplazar el útero hacia la izquierda para descomprimir la vena cava inferior. Si no hay RCE a los 4 minutos, realizar histerotomía perimortem inmediata (parto por cesárea de emergencia en < 5 min).",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Estertores difusos bilaterales, hipoxemia refractaria con FiO2 100%.",
        "cardiovascular": "Ruidos cardíacos inaudibles en paro. Ingurgitación yugular extrema.",
        "perfusion": "Cianosis cervicofacial intensa, sangrado genital masivo en napa incoagulable.",
        "temperature": "37.1 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho agudamente dilatado e hipocinético con desplazamiento del septum hacia el ventrículo izquierdo.",
        "lung": "Líneas B bilaterales de edema pulmonar no cardiogénico.",
        "vci": "Compresión aortocava por útero grávido evidente."
      },
      "labs": {
        "gsa": "pH 7.08 | pCO2 54 | pO2 40 | HCO3 15 | Lactato 6.8 mmol/L",
        "electrolytes": "K+ 4.4 | Na+ 136 | Cl- 102",
        "glucose": "HGT: 120 mg/dL",
        "others": "Fibrinógeno: < 100 mg/dL (CID fulminante) | Plaquetas: 45.000 | Dímero D marcadamente positivo"
      },
      "history": {
        "witness": "Matrona de turno señala que tras la rotura artificial de membranas la paciente refirió escalofríos intensos, tos y se desvaneció convulsionando.",
        "medications": "Oxitocina en infusión continua.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-79",
    "title": "Caso 79: Isquemia Mesentérica con peritonitis séptica, acidosis láctica (pH 7.02) y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Domingo Osorio",
      "age": 76,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Fibrilación auricular sin anticoagulación, cardiopatía isquémica.",
      "presentation": "Dolor abdominal desproporcionado al examen físico de 12 horas, náuseas, heces en 'jalea de grosella' y shock séptico."
    },
    "initialVitals": {
      "hr": 140,
      "bp": "64/36",
      "spo2": 88,
      "etco2": 15,
      "rr": 32,
      "temp": 38.6,
      "rhythm": "FIBRILACION_AURICULAR",
      "rhythmName": "Fibrilación Auricular con Respuesta Ventricular Rápida e Isquemia Subendocárdica",
      "isStable": false,
      "stabilityReason": "Shock séptico refractario (64/36), acidosis láctica extrema y abdomen agudo quirúrgico.",
      "consciousness": "Soporoso profundo, no responde órdenes (AVPU: P)",
      "airway": "Respiración acidótica profunda",
      "ivAccess": "Vía periférica 18G en antebrazo derecho"
    },
    "degenerationMessage": "¡El paciente deja de respirar! Palidez cadavérica total y pérdida de pulso carotídeo. El monitor traza complejos irregulares a 85 lpm sin pulso palpable (AESP séptica/acidótica).",
    "arrestVitals": {
      "hr": 85,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 38.6,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Acidosis y Sepsis)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "92/54",
      "spo2": 95,
      "etco2": 37,
      "rr": 16,
      "temp": 37.8,
      "rhythm": "FIBRILACION_AURICULAR",
      "rhythmName": "Fibrilación Auricular con soporte de Noradrenalina, Bicarbonato y laparotomía de rescate",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, laparotomía exploradora urgente en pabellón"
    },
    "reversibleCause": "Acidosis láctica extrema y shock séptico por necrosis intestinal transmural (Hidrogeniones / Acidosis)",
    "hytCategory": "Hidrogeniones (Acidosis severa)",
    "teachingNotes": "En acidosis metabólica profunda (pH < 7.10) por isquemia intestinal, la reposición de volumen vigorosa y Bicarbonato de Sodio 1 mEq/kg EV restauran la respuesta miocárdica a las catecolaminas.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos arrítmicos rápidos y apagados.",
        "perfusion": "Abdomen distendido, rígido en tabla con dolor a la descompresión difuso (signo de Blumberg +).",
        "temperature": "38.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo hiperdinámico con llenado ventricular disminuido por vasodilatación séptica.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI colapsable < 10 mm. Presencia de líquido libre en fosa ilíaca derecha y espacio de Morrison con neumoperitoneo focal."
      },
      "labs": {
        "gsa": "pH 7.02 | pCO2 28 | pO2 74 | HCO3 7.0 | Lactato 11.4 mmol/L (Crítico)",
        "electrolytes": "K+ 5.6 | Na+ 134 | Cl- 100",
        "glucose": "HGT: 145 mg/dL",
        "others": "Leucocitosis: 24.000/uL con 18% baciliformes | Procalcitonina: > 50 ng/mL"
      },
      "history": {
        "witness": "Hija refiere que el padre se quejaba de dolor abdominal insoportable desde anoche y no quiso consultar antes.",
        "medications": "Digoxina (irregular), Furosemida.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-80",
    "title": "Caso 80: Commotio Cordis por impacto directo en tórax con Fibrilación Ventricular instantánea",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Ignacio Prado",
      "age": 20,
      "gender": "M",
      "location": "Campo Deportivo de Béisbol - Asistencia SAMU",
      "history": "Deportista sano sin antecedentes médicos.",
      "presentation": "Golpe contuso directo de pelota de béisbol en la región precordial anterior izquierda. Dio dos pasos y se desplomó al suelo inconsciente."
    },
    "initialVitals": {
      "hr": 195,
      "bp": "68/40",
      "spo2": 86,
      "etco2": 26,
      "rr": 8,
      "temp": 36.6,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Polimórfica Instantánea post-impacto precordial",
      "isStable": false,
      "stabilityReason": "Colapso mecánico-eléctrico primario, hipotensión y degeneración a FV inminente.",
      "consciousness": "Inconsciente de inmediato al impacto (AVPU: U)",
      "airway": "Espontánea agónica",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El trazado ventricular se desorganiza en Fibrilación Ventricular caótica de alto voltaje sin pulso carotídeo!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV - Commotio Cordis)",
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 74,
      "bp": "120/78",
      "spo2": 99,
      "etco2": 43,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal tras desfibrilación con DEA en < 2 minutos",
      "pulsePresent": true,
      "consciousness": "Recupera conciencia rápidamente, orientado (Glasgow 15)"
    },
    "reversibleCause": "Impacto precordial contuso sobre la ventana vulnerable de la onda T (Commotio Cordis / Trauma)",
    "hytCategory": "Tóxicos / Trauma Torácico Cerrado",
    "teachingNotes": "En conmoción cordis el corazón es anatómicamente normal; la onda de choque mecánica sobre el miocito en la fase ascendente de la onda T gatilla FV. La desfibrilación precoz en < 3 minutos logra sobrevida > 90%.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular limpio bilateralmente.",
        "cardiovascular": "Ruidos cardíacos limpios tras RCE. Equimosis circular en región precordial esternal izquierda coincidente con pelota.",
        "perfusion": "Recuperación rápida de perfusión, rosado, pulsos amplios.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Estructura anatómica y motilidad miocárdica completamente normales. Sin derrame pericárdico ni contusión transmural.",
        "lung": "Líneas A normales, sin neumotórax.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.36 | pCO2 38 | pO2 92 | HCO3 22 | Lactato 1.8 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 140 | Cl- 102",
        "glucose": "HGT: 98 mg/dL",
        "others": "Troponina I: 0.08 ng/mL (Normal)"
      },
      "history": {
        "witness": "Entrenador relata que la pelota bateada impactó directamente en el pecho del joven mientras intentaba atraparla.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-81",
    "title": "Caso 81: Intoxicación por Colquicina con shock distributivo y paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Armando Loyola",
      "age": 61,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Observación",
      "history": "Gota tofácea recurrente. Ingesta accidental masiva de Colquicina (20 mg en 24 horas por dolor severo).",
      "presentation": "Vómitos incoercibles en agua de arroz, diarrea coleriforme sanguinolenta masiva, calambres y deshidratación extrema."
    },
    "initialVitals": {
      "hr": 136,
      "bp": "68/38",
      "spo2": 89,
      "etco2": 18,
      "rr": 28,
      "temp": 36,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Colapso Hemodinámico",
      "isStable": false,
      "stabilityReason": "Shock distributivo e hipovolémico tóxico (68/38), fallo multiorgánico precoz y deshidratación.",
      "consciousness": "Soporoso, quejumbroso (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El paciente pierde bruscamente el conocimiento! Se ausenta el pulso femoral y carotídeo. El monitor conserva complejos estrechos regulares a 110 lpm sin onda de pulso (AESP).",
    "arrestVitals": {
      "hr": 110,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP Tóxica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "92/58",
      "spo2": 96,
      "etco2": 38,
      "rr": 16,
      "temp": 35.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con resucitación agresiva con cristaloides y vasopresores",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado a UCI para soporte multiorgánico"
    },
    "reversibleCause": "Intoxicación letal por Colquicina con parálisis mitótica y colapso cardiovascular (Tóxicos)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "La colquicina tiene un estrecho margen terapéutico. No tiene antídoto específico; el soporte hemodinámico agresivo con vasopresores y volumen temprano es la única opción de supervivencia.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos taquicárdicos muy apagados.",
        "perfusion": "Piel marmórea fría, sequedad de mucosas extrema.",
        "temperature": "36.0 °C"
      },
      "pocus": {
        "cardiac": "Colapso biventricular sistólico severo ('kissing walls').",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI filiforme colapsada completamente."
      },
      "labs": {
        "gsa": "pH 7.18 | pCO2 34 | pO2 78 | HCO3 14 | Lactato 7.8 mmol/L",
        "electrolytes": "K+ 3.2 | Na+ 132 | Cl- 96",
        "glucose": "HGT: 86 mg/dL",
        "others": "Leucocitosis: 28.000/uL con desviación izquierda | Creatinina: 3.4 mg/dL"
      },
      "history": {
        "witness": "Esposa señala que tomó 20 pastillas de 1 mg durante la noche por un dolor de gota insoportable en el pie.",
        "medications": "Colquicina 1 mg, Alopurinol 300 mg.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-82",
    "title": "Caso 82: Síndrome de QT Largo Congénito con síncope por alarma sonora y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Antonia Barrientos",
      "age": 24,
      "gender": "F",
      "location": "Domicilio Particular - Asistencia SAMU",
      "history": "Antecedente de síncope previo en la adolescencia atribuido a 'estrés'.",
      "presentation": "Alarma despertadora de alto volumen sonó bruscamente en la mañana; la paciente emitió un quejido y cayó de la cama inconsciente."
    },
    "initialVitals": {
      "hr": 205,
      "bp": "72/44",
      "spo2": 88,
      "etco2": 27,
      "rr": 24,
      "temp": 36.6,
      "rhythm": "TORSADES",
      "rhythmName": "Torsades de Pointes / TV Polimorfa con QTc de 620 ms (Canalopatía KCNQ1 / LQT1)",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (72/44), arritmia ventricular sostenida y colapso hemodinámico.",
      "consciousness": "Inconsciente, respiración estertorosa (AVPU: U)",
      "airway": "Espontánea agónica",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El trazado en torsión de puntas degenera rápidamente a Fibrilación Ventricular incoordinada de alto voltaje sin pulso palpable!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.6,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 68,
      "bp": "112/70",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal con onda T bifásica ancha y QTc 560 ms post-Sulfato de Magnesio",
      "pulsePresent": true,
      "consciousness": "Comatosa, candidata a TTM, betabloqueadores no selectivos (Nadolol/Propranolol) y CDI"
    },
    "reversibleCause": "Canalopatía cardíaca congénita (Síndrome de QT Largo Tipo 1 o 2) gatillada por estímulo adrenérgico acústico",
    "hytCategory": "Tóxicos / Desencadenante Genético",
    "teachingNotes": "En el QT largo congénito los estímulos adrenérgicos bruscos (alarma, zambullida en agua fría) precipitan Torsades de Pointes. El Magnesio EV y la desfibrilación precoz salvan al paciente.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos inaudibles en paro.",
        "perfusion": "Palidez fría sudorosa.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Estructura anatómica y función sistólica biventricular normales.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.34 | pCO2 38 | pO2 86 | HCO3 21 | Lactato 2.4 mmol/L",
        "electrolytes": "K+ 4.0 | Mg2+ 1.8 | Ca2+ 1.22",
        "glucose": "HGT: 102 mg/dL",
        "others": "Troponina I: 0.05 ng/mL (Normal)"
      },
      "history": {
        "witness": "Compañera de departamento oyó el golpe en el suelo inmediatamente tras sonar la alarma.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-83",
    "title": "Caso 83: Hipomagnesemia Severa (Mg 0.8) en alcoholismo crónico con Torsades y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Rigoberto Salgado",
      "age": 53,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Agudos",
      "history": "Consumo problemático de alcohol diario, desnutrición calórico-proteica.",
      "presentation": "Temblores intensos, agitación, delirio tremens incipiente y palpitaciones rápidas con síncope en sala de espera."
    },
    "initialVitals": {
      "hr": 188,
      "bp": "76/46",
      "spo2": 90,
      "etco2": 28,
      "rr": 26,
      "temp": 36.4,
      "rhythm": "TORSADES",
      "rhythmName": "Taquicardia Ventricular Polimorfa (Torsades de Pointes por Hipomagnesemia)",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (76/46), síncope recurrente e inestabilidad ventricular refractaria.",
      "consciousness": "Soporoso, desorientado (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en antebrazo derecho"
    },
    "degenerationMessage": "¡El trazado en huso helicoidal se fractura en una onda fibrilatoria desorganizada y el paciente cae en paro cardíaco por Fibrilación Ventricular sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 74,
      "bp": "108/68",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras Sulfato de Magnesio 2g IV y reposición de potasio",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y suplementación electrolítica masiva"
    },
    "reversibleCause": "Déficit iónico severo de magnesio y potasio por alcoholismo crónico (Hipo / Hiperkalemia)",
    "hytCategory": "Hipo / Hiperkalemia y Electrolitos",
    "teachingNotes": "El Magnesio intracelular es cofactor crítico de la bomba Na+/K+ ATPasa. En hipomagnesemia severa, las arritmias ventriculares son refractarias a descargas y antiarrítmicos si no se administra Sulfato de Magnesio de inmediato.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos irregulares.",
        "perfusion": "Desnutrición evidente, temblor distal, eritema palmar y telangiectasias faciales.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas hiperdinámicas sin hipertrofia.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 14 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.42 | pCO2 36 | pO2 84 | HCO3 23 | Lactato 2.6 mmol/L",
        "electrolytes": "Mg2+: 0.8 mg/dL (Severamente bajo) | K+: 2.9 mEq/L (Bajo) | Na+: 134",
        "glucose": "HGT: 74 mg/dL",
        "others": "Fosfatemia: 1.6 mg/dL | Albúmina: 2.8 g/dL"
      },
      "history": {
        "witness": "Personal de seguridad de urgencias vio caer al paciente desmayado en la sala de espera.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-84",
    "title": "Caso 84: Hemotórax Masivo Traumático por arma de fuego con shock y paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Bastián Cifuentes",
      "age": 27,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación Trauma",
      "history": "Sin antecedentes patológicos. Víctima de asalto con impacto balístico penetrante en tórax lateral izquierdo.",
      "presentation": "Herida de bala en 5° espacio intercostal línea axilar anterior izquierda con sangrado continuo activo, palidez extrema y disnea agónica."
    },
    "initialVitals": {
      "hr": 152,
      "bp": "52/28",
      "spo2": 78,
      "etco2": 14,
      "rr": 36,
      "temp": 35.6,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Complejos Microvolatados por Hemotórax",
      "isStable": false,
      "stabilityReason": "Shock hemorrágico grado IV exanguinante (52/28), hemotórax masivo y colapso respiratorio.",
      "consciousness": "Estuporoso, no responde órdenes (AVPU: P)",
      "airway": "Respiración superficial con tiraje intercostal",
      "ivAccess": "Dos accesos venosos periféricos 14G y 16G"
    },
    "degenerationMessage": "¡El pulso femoral y carotídeo se apagan por completo! Apnea total y el monitor ECG traza complejos a 125 lpm sin ninguna onda de pulso (AESP por exanguinación intratorácica).",
    "arrestVitals": {
      "hr": 125,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 35.6,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP - Shock Hemorrágico Masivo)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "96/60",
      "spo2": 97,
      "etco2": 38,
      "rr": 14,
      "temp": 35.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con toracotomía de reanimación, clampeo y transfusión masiva",
      "pulsePresent": true,
      "consciousness": "Comatoso, bajo anestesia general en pabellón de trauma"
    },
    "reversibleCause": "Hemotórax masivo exanguinante con compresión pulmonar e hipovolemia crítica (Hipovolemia / Neumotórax)",
    "hytCategory": "Hipovolemia",
    "teachingNotes": "En trauma torácico penetrante con paro cardiorrespiratorio presenciado (< 10-15 min), la toracotomía de reanimación de emergencia en el box de urgencias permite el clampeo aórtico, control del sangrado y masaje cardíaco directo.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Matidez absoluta a la percusión en todo el hemitórax izquierdo, abolición completa del murmullo pulmonar.",
        "cardiovascular": "Ruidos cardíacos casi inaudibles, pulsos distales ausentes.",
        "perfusion": "Palidez marmórea cadavérica, piel fría y empapada.",
        "temperature": "35.6 °C"
      },
      "pocus": {
        "cardiac": "Colapso biventricular extremo por hipovolemia masiva sin derrame pericárdico.",
        "lung": "Colección líquida anecoica masiva en hemitórax izquierdo que comprime el pulmón atelectásico ('signo de la columna vertebral' positivo sobre el diafragma).",
        "vci": "VCI completamente colapsada filiforme."
      },
      "labs": {
        "gsa": "pH 7.06 | pCO2 36 | pO2 65 | HCO3 11 | Lactato 9.5 mmol/L",
        "electrolytes": "K+ 4.9 | Na+ 137 | Cl- 104",
        "glucose": "HGT: 140 mg/dL",
        "others": "Hematocrito: 17% | Hemoglobina: 5.6 g/dL"
      },
      "history": {
        "witness": "Paramédico del SAMU indica que drenaron 1800 ml de sangre rutilante tras colocar tubo pleural en el trayecto.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-85",
    "title": "Caso 85: Miocarditis Viral Fulminante con tormenta de TV sostenida sin pulso",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Nicolás Gaete",
      "age": 29,
      "gender": "M",
      "location": "UCI Médica - Box 2",
      "history": "Cuadro viral respiratorio alto hace 1 semana con fiebre y mialgias. Sin antecedentes cardiovasculares.",
      "presentation": "Disnea progresiva de reposo, dolor torácico opresivo atípico, shock cardiogénico fulminante y arritmias ventriculares frecuentes."
    },
    "initialVitals": {
      "hr": 175,
      "bp": "74/48",
      "spo2": 89,
      "etco2": 26,
      "rr": 30,
      "temp": 37.8,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Monomorfa Sostenida de Tracto de Salida",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico grave (74/48), disfunción sistólica biventricular aguda (FEy 15%).",
      "consciousness": "Soporoso, sudoroso (AVPU: V)",
      "airway": "Espontánea taquipneica con tiraje",
      "ivAccess": "Catéter venoso central yugular interno y vía periférica 18G"
    },
    "degenerationMessage": "¡El paciente pierde la respuesta motora y ocular! El trazo se acelera a 220 lpm con complejos anchos aberrantes sin pulso carotídeo palpable (TV sin pulso).",
    "arrestVitals": {
      "hr": 220,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 37.8,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular Sin Pulso (TVSP)",
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "94/58",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 37.2,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con elevación cóncava difusa del ST e inicio de soporte ECMO V-A",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, conectado a membrana de oxigenación extracorpórea (ECMO)"
    },
    "reversibleCause": "Miocarditis inflamatoria viral fulminante con necrosis miocárdica difusa (Trombosis coronaria / Miocarditis)",
    "hytCategory": "Trombosis coronaria / Cardiopatía Aguda",
    "teachingNotes": "En pacientes jóvenes con shock cardiogénico fulminante y tormenta arrítmica post-viral, el soporte circulatorio mecánico precoz (ECMO veno-arterial) como puente a la recuperación es la terapia que salva la vida.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crépitos bibasales en ambos campos pulmonares.",
        "cardiovascular": "Ritmo de galope por 3er ruido (R3), soplo sistólico mitral funcional.",
        "perfusion": "Palidez cérea, frialdad distal, sudoración profusa.",
        "temperature": "37.8 °C"
      },
      "pocus": {
        "cardiac": "Hipocinesia difusa severa biventricular con FEy estimada en 15-20%. Engrosamiento inflamatorio de paredes miocárdicas sin dilatación de cavidades.",
        "lung": "Líneas B bilaterales de edema intersticial pulmonar.",
        "vci": "VCI 23 mm distendida con mínimo colapso."
      },
      "labs": {
        "gsa": "pH 7.24 | pCO2 42 | pO2 76 | HCO3 18 | Lactato 5.4 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 136 | Cl- 101",
        "glucose": "HGT: 116 mg/dL",
        "others": "Troponina T ultrasensible: 12.800 ng/L (Marcadamente positiva) | BNP: > 5.000 pg/mL"
      },
      "history": {
        "witness": "Madre relata que el joven consultó hace 3 días por 'gripe fuerte' y hoy amaneció ahogado sin poder ponerse de pie.",
        "medications": "Paracetamol.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-86",
    "title": "Caso 86: Shock Séptico de Foco Urológico refractario con colapso en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Eliana Santelices",
      "age": 78,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Urolitiasis obstructiva, Diabetes Mellitus Tipo 2.",
      "presentation": "Fiebre con calofríos intensos en 39.2 °C, dolor lumbar derecho, orina fétida turbia, hipotensión profunda y confusión mental."
    },
    "initialVitals": {
      "hr": 138,
      "bp": "62/34",
      "spo2": 89,
      "etco2": 18,
      "rr": 32,
      "temp": 39.1,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con bajo voltaje",
      "isStable": false,
      "stabilityReason": "Shock distributivo séptico refractario (62/34), hipoperfusión tisular y acidosis.",
      "consciousness": "Obnubilada, no coopera (AVPU: V)",
      "airway": "Espontánea taquipneica",
      "ivAccess": "Dos vías periféricas 18G en extremidades superiores"
    },
    "degenerationMessage": "¡La paciente cesa el esfuerzo ventilatorio! Cae la mandíbula, ausencia de pulsos periféricos y centrales. El monitor traza ritmo sinusal a 95 lpm sin pulso palpable (AESP séptica).",
    "arrestVitals": {
      "hr": 95,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 39.1,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP Séptica)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "hr": 106,
      "bp": "94/56",
      "spo2": 96,
      "etco2": 38,
      "rr": 16,
      "temp": 38.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con titulación de Noradrenalina, antibióticos y volumen",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, descompresión urológica de urgencia programada"
    },
    "reversibleCause": "Shock séptico severo por urosepsis obstructiva con vasodilatación extrema (Hipovolemia / Hidrogeniones)",
    "hytCategory": "Hipovolemia",
    "teachingNotes": "En sepsis refractaria, la resucitación con cristaloides balanceados (30 ml/kg) e inicio precoz de vasopresores (Noradrenalina) dentro de la primera hora previene la progresión a paro en AESP.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Taquicardia rítmica con ruidos cardíacos apagados.",
        "perfusion": "Piel marmórea con livideces en rodillas (Mottling score 3), extremidades frías, llenado capilar > 4s.",
        "temperature": "39.1 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo hiperdinámico con llenado diastólico disminuido por vasoplejía.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 9 mm con colapso inspiratorio > 80%. Riñón derecho con hidronefrosis moderada-severa por cálculo obstructivo piélico."
      },
      "labs": {
        "gsa": "pH 7.19 | pCO2 30 | pO2 78 | HCO3 13 | Lactato 6.2 mmol/L",
        "electrolytes": "K+ 4.4 | Na+ 135 | Cl- 101",
        "glucose": "HGT: 185 mg/dL",
        "others": "Sedimento de orina: Piuria masiva, bacterias abundantes | Leucocitosis: 22.000/uL"
      },
      "history": {
        "witness": "Hijo refiere que la paciente llevaba 2 días con ardor al orinar y hoy comenzó con fiebre y delirio.",
        "medications": "Metformina 850 mg, Enalapril 10 mg.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-87",
    "title": "Caso 87: Intoxicación por Cianuro en incendio industrial con anoxia celular y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Cristóbal Palma",
      "age": 40,
      "gender": "M",
      "location": "Fábrica de Plásticos - Asistencia SAMU de Rescate",
      "history": "Sin antecedentes patológicos. Rescatado de un recinto cerrado en llamas con combustión de poliuretano y plásticos sintéticos.",
      "presentation": "Inconsciente, hollín abundante en cavidad oral y narinas, aliento con olor a 'almendras amargas', respiración agónica y acidosis extrema."
    },
    "initialVitals": {
      "hr": 28,
      "bp": "54/26",
      "spo2": 82,
      "etco2": 12,
      "rr": 6,
      "temp": 36.5,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Ritmo Agónico de Asfixia Celular por Cianuro",
      "isStable": false,
      "stabilityReason": "Inhibición de la citocromo c oxidasa mitocondrial, acidosis láctica letal y colapso respiratorio.",
      "consciousness": "Coma profundo arrefléxico, midriasis bilateral (AVPU: U)",
      "airway": "Inhalación de humo caliente con hollín en glotis",
      "ivAccess": "Vía periférica 16G en brazo izquierdo"
    },
    "degenerationMessage": "¡El trazado bradicárdico agónico se desvanece por completo! La línea del monitor queda plana horizontal continua en dos derivaciones (Asistolia total).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 6,
      "rr": 0,
      "temp": 36.5,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia por Bloqueo Mitocondrial por Cianuro",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "bp": "110/68",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras Hidroxocobalamina (Cyanokit 5g IV) y ventilación con O2 100%",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado a Centro de Toxicología / UCI"
    },
    "reversibleCause": "Intoxicación aguda por cianuro con inhibición de la fosforilación oxidativa mitocondrial (Tóxicos / Hipoxia)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En víctimas de incendios en recintos cerrados con acidosis láctica desproporcionada (> 8-10 mmol/L) y compromiso neurológico, la Hidroxocobalamina (Cyanokit 5g EV) es el antídoto específico de rescate.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hollín en boca y faringe, estridor laríngeo por calor, murmullo vesicular disminuido.",
        "cardiovascular": "Ruidos cardíacos inaudibles en paro.",
        "perfusion": "Piel con coloración 'rojo cereza' paradójica en presencia de colapso respiratorio profundo.",
        "temperature": "36.5 °C"
      },
      "pocus": {
        "cardiac": "Acinesia miocárdica completa en asistolia.",
        "lung": "Líneas A normales, sin neumotórax.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 6.92 | pCO2 42 | pO2 90 (oxígeno disuelto presente) | HCO3 9.0 | Lactato 14.8 mmol/L (Crítico)",
        "electrolytes": "K+ 4.8 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 135 mg/dL",
        "others": "Carboxihemoglobina: 18% | Nivel de cianuro en sangre en curso"
      },
      "history": {
        "witness": "Bomberos rescataron al trabajador tras 20 minutos de exposición en bodega cerrada con combustión de espumas plásticas.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-88",
    "title": "Caso 88: Síndrome del Seno Enfermo con pausas sinusales prolongadas y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Irma Valdebenito",
      "age": 84,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Agudos",
      "history": "Hipertensión arterial, disfunción del nódulo sinusal en estudio, episodios presincopales.",
      "presentation": "Síncope franco al ponerse de pie con traumatismo craneofacial leve. Mareo rotatorio persistente y bradicardia extrema."
    },
    "initialVitals": {
      "hr": 24,
      "bp": "68/38",
      "spo2": 91,
      "etco2": 22,
      "rr": 10,
      "temp": 36.2,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal Severa con Pausas Sinusales de hasta 6.8 segundos",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (68/38), pausas sinusales prolongadas y lipotimia recurrente.",
      "consciousness": "Soporosa, abre ojos al llamado (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 20G en mano izquierda"
    },
    "degenerationMessage": "¡El nódulo sinusal cesa toda actividad despolarizante! No emerge ningún marcapasos de escape subsidiario y el trazado ECG traza una línea isoeléctrica horizontal total (Asistolia por paro sinusal).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.2,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia por Paro Sinusal Completo",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
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
      "bp": "118/72",
      "spo2": 98,
      "etco2": 41,
      "rr": 14,
      "temp": 36.4,
      "rhythm": "RITMO_MARCAPASOS",
      "rhythmName": "Ritmo de Marcapasos Transcutáneo con Captura 100% a 70 lpm y 75 mA",
      "pulsePresent": true,
      "consciousness": "Recupera la conciencia tras estimulación ventricular sostenida (Glasgow 14)"
    },
    "reversibleCause": "Degeneración fibrocalcárea intrínseca del nódulo sinusal (Causa Primaria de Conducción)",
    "hytCategory": "Causa Mecánica / Bloqueo de Conducción",
    "teachingNotes": "En el paro sinusal sintomático refractario a atropina (1 mg IV), el inicio precoz del marcapasos transcutáneo (TCP) mientras se prepara el marcapasos transvenoso definitivo evita la asistolia refractaria.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy espaciados.",
        "perfusion": "Palidez cérea, frialdad en manos y pies, llenado capilar 3.5s.",
        "temperature": "36.2 °C"
      },
      "pocus": {
        "cardiac": "Contracción miocárdica bradicárdica sin cardiopatía estructural significativa.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 17 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.33 | pCO2 40 | pO2 80 | HCO3 21 | Lactato 2.4 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 139 | Cl- 102",
        "glucose": "HGT: 108 mg/dL",
        "others": "Troponina I: 0.04 ng/mL"
      },
      "history": {
        "witness": "Hija presenció cuando la madre se levantó de la silla, dijo 'me voy a desmayar' y cayó al suelo.",
        "medications": "Enalapril 10 mg (sin betabloqueadores ni calcioantagonistas).",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-89",
    "title": "Caso 89: Tromboembolismo Pulmonar Paradójico a través de FOP con hipoxemia y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Mariana Almonacid",
      "age": 45,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Agudos",
      "history": "Trombosis venosa profunda en extremidad inferior derecha tratada irregularmente. Foramen Oval Permeable (FOP) congénito.",
      "presentation": "Disnea súbita catastrófica, dolor torácico opresivo, déficit neurológico focal (hemiplejia izquierda) por embolia paradójica y síncope."
    },
    "initialVitals": {
      "hr": 142,
      "bp": "70/42",
      "spo2": 74,
      "etco2": 14,
      "rr": 34,
      "temp": 36.6,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Bloqueo Completo de Rama Derecha (BCRD) nuevo",
      "isStable": false,
      "stabilityReason": "Shock obstructivo e hipóxico crítico (70/42), sobrecarga aguda de ventrículo derecho y focalidad neurológica.",
      "consciousness": "Soporosa, desviación de la comisura bucal (AVPU: V)",
      "airway": "Espontánea taquipneica con tiraje",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡La paciente entra en apnea súbita y el pulso carotídeo desaparece! El monitor ECG continúa mostrando complejos con patrón de BCRD a 120 lpm sin pulso palpable (AESP por TEP masivo).",
    "arrestVitals": {
      "hr": 120,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 9,
      "rr": 0,
      "temp": 36.6,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por TEP Paradójico)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "102/64",
      "spo2": 96,
      "etco2": 38,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con atenuación de sobrecarga derecha post-fibrinolítico sistémico",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado urgente a UCI / Neurocirugía"
    },
    "reversibleCause": "Tromboembolismo pulmonar masivo con embolia paradójica sistémica a través de FOP (Trombosis pulmonar)",
    "hytCategory": "Trombosis pulmonar (TEP Masivo)",
    "teachingNotes": "El TEP con shunt de derecha a izquierda por FOP causa hipoxemia refractaria al 100% de O2 y fenómenos embólicos paradójicos cerebrales. El tratamiento del paro por TEP requiere trombolítico de rescate y RCP prolongada.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado simétrico, sin estertores.",
        "cardiovascular": "Refuerzo marcado del componente pulmonar del 2° ruido, ingurgitación yugular evidente.",
        "perfusion": "Asimetría de pantorrillas con empastamiento y edema en pierna derecha.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo derecho masivamente dilatado con rectificación del septum interventricular hacia el VI. Trombo móvil alargado visualizado a caballo a través del tabique interauricular (trombo atrapado en FOP).",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 24 mm pletórica sin colapso."
      },
      "labs": {
        "gsa": "pH 7.21 | pCO2 32 | pO2 44 | HCO3 15 | Lactato 5.2 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 138 | Cl- 103",
        "glucose": "HGT: 114 mg/dL",
        "others": "Dímero D: > 12.000 ng/mL | Troponina T: 0.92 ng/mL"
      },
      "history": {
        "witness": "Esposo indica que la paciente refirió falta de aire repentina mientras almorzaban y dejó de mover el brazo izquierdo.",
        "medications": "Rivaroxabán (suspendido por el paciente hace 1 semana).",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-90",
    "title": "Caso 90: Taquicardia Ventricular Fascicular Posterior (Belhassen) con colapso en FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Nicolás Bórquez",
      "age": 26,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Joven sin cardiopatía estructural previa. Episodios autolimitados de palpitaciones.",
      "presentation": "Palpitaciones taquicárdicas rápidas regulares, mareo intenso y dolor precordial tras ejercicio físico."
    },
    "initialVitals": {
      "hr": 198,
      "bp": "80/50",
      "spo2": 92,
      "etco2": 30,
      "rr": 24,
      "temp": 36.7,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Fascicular Posterior (QRS con morfología de BCRD y eje superior izquierdo)",
      "isStable": false,
      "stabilityReason": "Hipotensión sintomática (80/50), lipotimia y taquicardia ventricular sostenida.",
      "consciousness": "Confuso, mareado (AVPU: V)",
      "airway": "Espontánea permeable",
      "ivAccess": "Vía periférica 18G en brazo izquierdo"
    },
    "degenerationMessage": "¡El paciente pierde bruscamente el conocimiento! Palidece intensamente, apnea súbita y el trazado ECG degenera en Fibrilación Ventricular caótica sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 11,
      "rr": 0,
      "temp": 36.7,
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 76,
      "bp": "114/72",
      "spo2": 98,
      "etco2": 42,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular con conducción normal post-desfibrilación y Verapamilo",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y ablación electrofisiológica por catéter"
    },
    "reversibleCause": "Taquicardia ventricular idiopática sensible a verapamilo (TV fascicular de Belhassen)",
    "hytCategory": "Arritmia Idiopática / Taquicardia Ventricular",
    "teachingNotes": "La TV fascicular suele confundirse erróneamente con TSV con aberrancia por tener un QRS relativamente estrecho (120-140 ms). Si causa inestabilidad hemodinámica, la cardioversión eléctrica sincronizada o desfibrilación al degenerar es mandatoria.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos rítmicos muy taquicárdicos.",
        "perfusion": "Palidez fría sudorosa, pulsos radiales filiformes.",
        "temperature": "36.7 °C"
      },
      "pocus": {
        "cardiac": "Función sistólica del ventrículo izquierdo completamente normal sin cardiopatía estructural previa.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 15 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.33 | pCO2 38 | pO2 84 | HCO3 20 | Lactato 2.8 mmol/L",
        "electrolytes": "K+ 4.1 | Na+ 139 | Cl- 102",
        "glucose": "HGT: 104 mg/dL",
        "others": "Troponina I: 0.12 ng/mL"
      },
      "history": {
        "witness": "Amigo relata que el joven estaba trotando y de golpe se detuvo agarrándose el pecho antes de caer desmayado.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-91",
    "title": "Caso 91: Neumoperitoneo a Tensión post-laparoscopía con colapso de retorno venoso y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Guacolda Vera",
      "age": 52,
      "gender": "F",
      "location": "Pabellón Quirúrgico Central - Colecistectomía Laparoscópica",
      "history": "Litiasis vesicular sintomática.",
      "presentation": "Insuflación de CO2 peritoneal descontrolada con presiones intraabdominales > 30 mmHg durante la cirugía, colapso circulatorio brusco."
    },
    "initialVitals": {
      "hr": 138,
      "bp": "56/32",
      "spo2": 82,
      "etco2": 58,
      "rr": 26,
      "temp": 36.3,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Colapso con Bajo Voltaje",
      "isStable": false,
      "stabilityReason": "Síndrome compartimental abdominal agudo iatrogénico (56/32), colapso de VCI y restricción ventilatoria diafragmática.",
      "consciousness": "Bajo anestesia general",
      "airway": "Intubada, alta presión de vía aérea en ventilador (> 45 cmH2O)",
      "ivAccess": "Vía periférica 16G y vía venosa central"
    },
    "degenerationMessage": "¡La presión arterial colapsa a cero en la línea arterial y desaparece el pulso carotídeo! El monitor conserva complejos estrechos a 110 lpm sin pulso (AESP obstructiva).",
    "arrestVitals": {
      "hr": 110,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.3,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Neumoperitoneo a Tensión)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "114/70",
      "spo2": 98,
      "etco2": 40,
      "rr": 14,
      "temp": 36.5,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Normal tras desinsuflación peritoneal inmediata de CO2 y apertura de trócares",
      "pulsePresent": true,
      "consciousness": "Bajo sedación y relajación neuromuscular en pabellón"
    },
    "reversibleCause": "Compresión de vena cava inferior y disminución crítica de precarga por neumoperitoneo a tensión (Taponamiento / Obstructivo)",
    "hytCategory": "Taponamiento Cardíaco / Causa Obstructiva",
    "teachingNotes": "El neumoperitoneo hipertensivo actúa fisiopatológicamente igual a un taponamiento cardíaco al bloquear el retorno venoso de la VCI. La desinsuflación peritoneal inmediata es la medida salvadora.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular bilateral muy disminuido por elevación diafragmática extrema.",
        "cardiovascular": "Ruidos cardíacos casi inaudibles, ingurgitación yugular masiva.",
        "perfusion": "Abdomen en bóveda de madera extremadamente tenso timpánico a la percusión.",
        "temperature": "36.3 °C"
      },
      "pocus": {
        "cardiac": "Colapso diastólico de cavidades derechas por compresión extrínseca y falta de retorno venoso.",
        "lung": "Ausencia de neumotórax.",
        "vci": "VCI colapsada filiforme en su trayecto intraabdominal por debajo del diafragma."
      },
      "labs": {
        "gsa": "pH 7.14 | pCO2 62 | pO2 65 | HCO3 19 | Lactato 4.9 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 138 | Cl- 102",
        "glucose": "HGT: 120 mg/dL",
        "others": "Gases arteriales demuestran acidosis mixta severa"
      },
      "history": {
        "witness": "Anestesiólogo advierte al cirujano que la presión en el insuflador de CO2 se disparó por fallo en la válvula reguladora.",
        "medications": "Anestesia general balanceada.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-92",
    "title": "Caso 92: Hipertermia Maligna intraoperatoria con rigidez muscular, hiperkalemia y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Matías Zúñiga",
      "age": 23,
      "gender": "M",
      "location": "Pabellón Quirúrgico Central - Apendicectomía",
      "history": "Sin antecedentes anestésicos previos. Inducción con Sevoflurano y Succinilcolina.",
      "presentation": "Rigidez mandibular masiva irreductible ('trismus'), aumento exponencial de EtCO2 (> 85 mmHg), taquicardia galopante y fiebre súbita de 41.2 °C."
    },
    "initialVitals": {
      "hr": 182,
      "bp": "74/42",
      "spo2": 86,
      "etco2": 88,
      "rr": 32,
      "temp": 41.2,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular con Hiperkalemia Extrema (T picadas gigantes y QRS ancho)",
      "isStable": false,
      "stabilityReason": "Crisis hipermetabólica fulminante, hipertermia extrema (41.2°C), rabdomiólisis e hiperpotasemia.",
      "consciousness": "Bajo anestesia general",
      "airway": "Intubado orotraqueal",
      "ivAccess": "Dos vías periféricas 16G"
    },
    "degenerationMessage": "¡El trazado ventricular se torna caótico de alta frecuencia y amplitud, sobreviene Fibrilación Ventricular sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 14,
      "rr": 0,
      "temp": 41.2,
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "105/65",
      "spo2": 97,
      "etco2": 42,
      "rr": 16,
      "temp": 37.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal Regular tras Dantroleno sódico EV (2.5 mg/kg) y enfriamiento activo",
      "pulsePresent": true,
      "consciousness": "Comatoso, bajo sedación en UCI, monitoreo de rabdomiólisis"
    },
    "reversibleCause": "Hipertermia maligna genética por mutación del receptor de Ryanodina (RYR1) desencadenada por halogenados/succinilcolina (Tóxicos / Hipertermia)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "En hipertermia maligna el tratamiento urgente es suspender de inmediato los halogenados, hiperventilar con O2 al 100%, administrar Dantroleno EV precoz y tratar agresivamente la hiperkalemia.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular rudo bilateral con hiperinsuflación.",
        "cardiovascular": "Ruidos taquicárdicos violentos con tonos acentuados.",
        "perfusion": "Rigidez muscular generalizada en 'tabla', piel intensamente caliente y marmórea con sudoración profusa.",
        "temperature": "41.2 °C (Sonda esofágica)"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica deprimida difusamente por hipertermia y acidosis.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 6.94 | pCO2 88 | pO2 62 | HCO3 16 | Lactato 12.0 mmol/L (Acidosis mixta extrema)",
        "electrolytes": "K+: 8.2 mEq/L (Crítico) | Ca2+: 0.82 mmol/L | Na+: 136",
        "glucose": "HGT: 160 mg/dL",
        "others": "CPK: > 45.000 U/L | Mioglobinuria masiva (orina color coñac/coca-cola)"
      },
      "history": {
        "witness": "Anestesiólogo constata aumento inexplicable del EtCO2 a pesar de duplicar la ventilación minuto tras inducir con sevoflurano.",
        "medications": "Sevoflurano, Succinilcolina, Fentanilo.",
        "allergies": "Desconocidas."
      }
    }
  },
  {
    "id": "caso-93",
    "title": "Caso 93: Bloqueo Bifascicular crónico con progresión a Bloqueo AV Completo y Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Leopoldo Figueroa",
      "age": 77,
      "gender": "M",
      "location": "Servicio de Medicina Interna - Sala 8",
      "history": "Cardiopatía isquémica crónica con bloqueo de rama derecha (BCRD) y hemibloqueo anterior izquierdo (HBAI) en ECG basal.",
      "presentation": "Episodios de síncope brusco 'de Stokes-Adams' sin pródromos mientras caminaba por la sala."
    },
    "initialVitals": {
      "hr": 22,
      "bp": "62/34",
      "spo2": 89,
      "etco2": 20,
      "rr": 8,
      "temp": 36.1,
      "rhythm": "BLOQUEO_AV_3",
      "rhythmName": "Bloqueo AV Completo Trifascicular con Escape Ventricular Lento (QRS muy ancho aberrante)",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (62/34), bradicardia extrema refractaria y crisis de Stokes-Adams.",
      "consciousness": "Comatoso, rigidez de descerebración transitoria postictal (AVPU: P)",
      "airway": "Espontánea estertorosa",
      "ivAccess": "Vía periférica 18G en brazo derecho"
    },
    "degenerationMessage": "¡El escaso escape ventricular infra-Hisiano se agota por completo! Las ondas P continúan disociadas sin conducir hasta que desaparecen, quedando una línea isoeléctrica plana (Asistolia).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 36.1,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia por Bloqueo Trifascicular Completo",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
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
      "bp": "116/74",
      "spo2": 98,
      "etco2": 41,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "RITMO_MARCAPASOS",
      "rhythmName": "Ritmo de Marcapasos Transcutáneo con Captura Completa a 70 lpm",
      "pulsePresent": true,
      "consciousness": "Recupera la vigilia, orientado (Glasgow 14)"
    },
    "reversibleCause": "Falla degenerativa completa del sistema de conducción His-Purkinje (Bloqueo Trifascicular)",
    "hytCategory": "Causa Mecánica / Bloqueo de Conducción",
    "teachingNotes": "El bloqueo bifascicular (BCRD + HBAI) con síncope indica afectación del tercer fascículo. El bloqueo resultante es infra-Hisiano; no responde a atropina y requiere marcapasos inmediato.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos con 1er tono variable y latido venoso 'a' cañón en cuello.",
        "perfusion": "Palidez cérea, frialdad distal.",
        "temperature": "36.1 °C"
      },
      "pocus": {
        "cardiac": "Contracción ventricular extremadamente lenta disociada de la contracción auricular.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 18 mm con escaso colapso."
      },
      "labs": {
        "gsa": "pH 7.31 | pCO2 42 | pO2 78 | HCO3 20 | Lactato 2.8 mmol/L",
        "electrolytes": "K+ 4.2 | Na+ 139 | Cl- 102",
        "glucose": "HGT: 106 mg/dL",
        "others": "Troponina I: 0.05 ng/mL (descarta isquemia aguda)"
      },
      "history": {
        "witness": "TENS del servicio presenció cuando el paciente se desplomó como un fardo al suelo sin aviso.",
        "medications": "Aspirina, Atorvastatina.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-94",
    "title": "Caso 94: Golpe de Calor de Esfuerzo con rabdomiólisis, hiperkalemia y paro en AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Cristóbal Marín",
      "age": 22,
      "gender": "M",
      "location": "Escuela Militar - Asistencia SAMU de Emergencia",
      "history": "Conscripto militar en entrenamiento físico extenuante bajo 36 °C ambiental con equipo pesado.",
      "presentation": "Colapso con pérdida de conocimiento, anhidrosis (piel seca y ardiente), temperatura central de 41.8 °C y convulsiones."
    },
    "initialVitals": {
      "hr": 165,
      "bp": "64/36",
      "spo2": 87,
      "etco2": 20,
      "rr": 34,
      "temp": 41.8,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal Extrema con Ondas T Picadas Altas",
      "isStable": false,
      "stabilityReason": "Golpe de calor severo con disfunción del SNC (coma), shock distributivo térmico y rabdomiólisis.",
      "consciousness": "Coma profundo arrefléxico postconvulsivo (AVPU: U)",
      "airway": "Espontánea taquipneica superficial",
      "ivAccess": "Dos vías periféricas 16G en ambos brazos"
    },
    "degenerationMessage": "¡El paciente deja de respirar! Cae la mandíbula y se pierde el pulso carotídeo. El monitor ECG traza complejos regulares a 90 lpm sin pulso palpable (AESP por fallo multiorgánico e hiperkalemia).",
    "arrestVitals": {
      "hr": 90,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 8,
      "rr": 0,
      "temp": 41.8,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Golpe de Calor)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "102/62",
      "spo2": 97,
      "etco2": 39,
      "rr": 14,
      "temp": 38.2,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con enfriamiento activo rápido por inmersión y sueros fríos",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado prioritario a UCI"
    },
    "reversibleCause": "Hipertermia extrema ambiental por esfuerzo con rabdomiólisis e hipovolemia crítica (Hipotermia / Hipertermia / Hipovolemia)",
    "hytCategory": "Hipotermia / Hipertermia extrema",
    "teachingNotes": "En el golpe de calor la medida más urgente es el enfriamiento rápido inmediato (inmersión en agua fría o compresas de hielo y ventilación) para descender la temperatura a < 39°C en < 30 minutos.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular rudo bilateral.",
        "cardiovascular": "Taquicardia extrema con tonos secos.",
        "perfusion": "Piel completamente seca, caliente, eritematosa, ausencia total de sudor (anhidrosis térmica).",
        "temperature": "41.8 °C (Termómetro rectal)"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas hiperdinámicas con llenado disminuido por deshidratación masiva.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI colapsable filiforme (< 8 mm)."
      },
      "labs": {
        "gsa": "pH 7.12 | pCO2 32 | pO2 72 | HCO3 11 | Lactato 9.4 mmol/L",
        "electrolytes": "K+: 6.9 mEq/L (Hiperpotasemia por lisis muscular) | Na+: 152 | Cl-: 112",
        "glucose": "HGT: 82 mg/dL",
        "others": "CPK: > 60.000 U/L | Creatinina: 3.8 mg/dL | Orina oscura colúrica"
      },
      "history": {
        "witness": "Instructor militar informa que el joven marchó 15 km con mochila de 25 kg bajo el sol, comenzó a delirar y cayó desplomado convulsionando.",
        "medications": "Ninguno.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-95",
    "title": "Caso 95: IAM con Supradesnivel de Tronco Coronario Izquierdo y FV refractaria",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Eugenio Manríquez",
      "age": 65,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Diabetes Mellitus Tipo 2, Dislipidemia severa, Hipertensión arterial.",
      "presentation": "Dolor retroesternal opresivo catastrófico irradiado a ambos hombros y mandíbula, sensación de muerte inminente y diaforesis profusa."
    },
    "initialVitals": {
      "hr": 168,
      "bp": "72/46",
      "spo2": 89,
      "etco2": 28,
      "rr": 30,
      "temp": 36.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con Supradesnivel ST en aVR y V1, e Infradesnivel ST difuso en 8 derivaciones (Patrón de Tronco / Multivaso)",
      "isStable": false,
      "stabilityReason": "Shock cardiogénico isquémico crítico (72/46), patrón ECG de oclusión de tronco coronario izquierdo.",
      "consciousness": "Obnubilado, intensamente pálido (AVPU: V)",
      "airway": "Espontánea taquipneica con disnea de reposo",
      "ivAccess": "Dos vías periféricas 18G en extremidades superiores"
    },
    "degenerationMessage": "¡El paciente grita de dolor, pierde la visión y el conocimiento! Entra en apnea y el trazado ECG colapsa en una Fibrilación Ventricular gruesa catastrófica de alta amplitud sin pulso.",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 36.4,
      "rhythm": "FV",
      "rhythmName": "Fibrilación Ventricular (FV Isquémica Masiva)",
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "92/58",
      "spo2": 96,
      "etco2": 43,
      "rr": 14,
      "temp": 36.1,
      "rhythm": "SINUSAL_ST_ELEVATION",
      "rhythmName": "Ritmo Sinusal con lesión subepicárdica masiva e indicación de Angioplastia Inmediata",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, traslado directo a Pabellón de Hemodinamia"
    },
    "reversibleCause": "Oclusión trombótica aguda de tronco coronario izquierdo o equivalente multivaso (Trombosis coronaria)",
    "hytCategory": "Trombosis coronaria (Síndrome Coronario Agudo)",
    "teachingNotes": "El supradesnivel del ST en aVR superior al de V1 con infradesnivel difuso en cara anterior y lateral indica oclusión crítica del tronco coronario izquierdo. La angioplastia coronaria de emergencia (ICP) precoz es la única terapia curativa.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crépitos húmedos ascendentes hasta campos medios bilaterales (Killip III).",
        "cardiovascular": "Ruidos cardíacos taquicárdicos apagados, galope por 3er y 4to ruido.",
        "perfusion": "Piel marmórea grisácea gélida empapada en sudor, llenado capilar 4s.",
        "temperature": "36.4 °C"
      },
      "pocus": {
        "cardiac": "Acinesia extensa de pared anterior, septal y lateral con severa disfunción sistólica global (FEy < 20%).",
        "lung": "Líneas B confluentes en bases y campos medios.",
        "vci": "VCI 23 mm distendida con mínimo colapso."
      },
      "labs": {
        "gsa": "pH 7.24 | pCO2 38 | pO2 70 | HCO3 17 | Lactato 5.6 mmol/L",
        "electrolytes": "K+ 4.3 | Na+ 137 | Cl- 101",
        "glucose": "HGT: 178 mg/dL",
        "others": "Troponina I ultrasensible: > 25.000 ng/L (Positiva máxima)"
      },
      "history": {
        "witness": "Esposa señala que el dolor empezó hace 45 minutos mientras miraba televisión y se intensificó hasta hacerlo llorar.",
        "medications": "Metformina, Enalapril, Atorvastatina.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-96",
    "title": "Caso 96: Rotura de Várices Esofágicas con hematemesis masiva, broncoaspiración y AESP",
    "type": "taquicardia",
    "arrestType": "AESP",
    "isShockable": false,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Osvaldo Miranda",
      "age": 58,
      "gender": "M",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Cirrosis hepática por alcohol Child-Pugh C, antecedentes de várices esofágicas grado III.",
      "presentation": "Hematemesis exanguinante a chorro (más de 1500 ml de sangre fresca en batea), melena profusa y pérdida de conocimiento con broncoaspiración."
    },
    "initialVitals": {
      "hr": 156,
      "bp": "50/24",
      "spo2": 68,
      "etco2": 12,
      "rr": 32,
      "temp": 35.4,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal de Colapso Exanguinante con Microvoltaje",
      "isStable": false,
      "stabilityReason": "Shock hemorrágico exanguinante masivo (50/24), hipoxia por inundación hemática de vía aérea y coma.",
      "consciousness": "Comatoso, inconsciente (AVPU: U)",
      "airway": "Vía aérea completamente inundada con sangre rutilante activa",
      "ivAccess": "Dos vías periféricas 14G y catéter venoso central"
    },
    "degenerationMessage": "¡El paciente deja de respirar mientras brota sangre por boca y fosas nasales! Se pierde todo pulso palpable. El monitor ECG registra complejos a 125 lpm sin pulso (AESP por exanguinación y asfixia).",
    "arrestVitals": {
      "hr": 125,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 6,
      "rr": 0,
      "temp": 35.4,
      "rhythm": "AESP",
      "rhythmName": "Actividad Eléctrica Sin Pulso (AESP por Exanguinación)",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv"
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
      "bp": "90/54",
      "spo2": 95,
      "etco2": 37,
      "rr": 16,
      "temp": 35.6,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con intubación endotraqueal de rescate, Terlipresina y transfusión masiva",
      "pulsePresent": true,
      "consciousness": "Comatoso, intubado, balón de Sengstaken-Blakemore instalado hacia Endoscopía"
    },
    "reversibleCause": "Shock hipovolémico hemorrágico masivo por sangrado variceal y asfixia por broncoaspiración (Hipovolemia / Hipoxia)",
    "hytCategory": "Hipovolemia",
    "teachingNotes": "En hematemesis masiva con PCR, la prioridad es intubación inmediata con aspiración continua, restitución de volumen con glóbulos rojos y plasma, vasoconstrictores esplácnicos (Terlipresina) y taponamiento con balón.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Gorgoteo hemático continuo en orofaringe y tráquea, estertores húmedos bilaterales.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos casi inaudibles, pulsos periféricos impalpables.",
        "perfusion": "Palidez cadavérica extrema, ictericia escleral franca, estigmas de hepatopatía crónica (arañas vasculares y ascitis).",
        "temperature": "35.4 °C"
      },
      "pocus": {
        "cardiac": "Colapso biventricular sistólico severo ('kissing walls') por vaciamiento de volumen.",
        "lung": "Líneas B bilaterales por inundación hemática alveolar.",
        "vci": "VCI colapsada filiforme. Hígado cirrótico nodular pequeño con abundante líquido ascítico libre en abdomen."
      },
      "labs": {
        "gsa": "pH 7.04 | pCO2 40 | pO2 45 | HCO3 11 | Lactato 10.2 mmol/L",
        "electrolytes": "K+ 5.2 | Na+ 130 | Cl- 98",
        "glucose": "HGT: 90 mg/dL",
        "others": "Hematocrito: 15% | Hemoglobina: 4.8 g/dL | INR: 2.8 | Plaquetas: 38.000"
      },
      "history": {
        "witness": "Hijo refiere que el paciente vomitó 3 litros de sangre oscura y roja brillante de golpe en el baño.",
        "medications": "Espironolactona, Propranolol, Lactulosa.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-97",
    "title": "Caso 97: Cardiotoxicidad por Doxorrubicina con tormenta arrítmica de TV polimórfica y FV",
    "type": "taquicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Loreto Albornoz",
      "age": 48,
      "gender": "F",
      "location": "UCI Médica - Box 6",
      "history": "Cáncer de mama tratado con quimioterapia acumulativa de antraciclinas (Doxorrubicina). Miocardiopatía tóxica con FEy 22%.",
      "presentation": "Insuficiencia cardíaca congestiva descompensada, ortopnea, mareos constantes y extrasistolía ventricular frecuente en salvas."
    },
    "initialVitals": {
      "hr": 174,
      "bp": "76/48",
      "spo2": 90,
      "etco2": 28,
      "rr": 28,
      "temp": 36.6,
      "rhythm": "TV_MONOMORFA",
      "rhythmName": "Taquicardia Ventricular Polimorfa Inestable con bajo voltaje difuso",
      "isStable": false,
      "stabilityReason": "Hipotensión severa (76/48), miocardiopatía dilatada tóxica terminal e inestabilidad ventricular.",
      "consciousness": "Soporosa, confusa (AVPU: V)",
      "airway": "Espontánea taquipneica con disnea",
      "ivAccess": "Catéter Port-a-cath central y vía periférica 18G"
    },
    "degenerationMessage": "¡El trazado ventricular se fragmenta en ondas fibrilatorias rápidas desorganizadas y la paciente entra en paro cardíaco por Fibrilación Ventricular sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 36.6,
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
        "desfibrilar",
        "adrenalina",
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
      "bp": "96/60",
      "spo2": 97,
      "etco2": 41,
      "rr": 14,
      "temp": 36.3,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular con soporte inotrópico de Milrinona y candidato a asistencia ventricular",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado a UCI Cardiológica"
    },
    "reversibleCause": "Cardiomiopatía dilatada tóxica irreversible inducida por antraciclinas (Tóxicos)",
    "hytCategory": "Tóxicos / Cardiotoxicidad",
    "teachingNotes": "Las antraciclinas generan daño miocárdico directo mediado por radicales libres y fibrosis miocárdica extensa. El manejo de la tormenta arrítmica requiere desfibrilación y soporte inotrópico no catecolaminérgico.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Crépitos bibasales finos en tercio inferior de ambos hemitórax.",
        "cardiovascular": "Ruidos cardíacos apagados, galope por R3, desplazamiento del choque de la punta al 6° EIC línea axilar anterior.",
        "perfusion": "Palidez cérea, frialdad acral moderada.",
        "temperature": "36.6 °C"
      },
      "pocus": {
        "cardiac": "Ventrículo izquierdo severamente dilatado esférico con hipocinesia global difusa severa (FEy 20%). Insuficiencia mitral funcional moderada.",
        "lung": "Líneas B en bases pulmonares.",
        "vci": "VCI 22 mm distendida con mínimo colapso."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 40 | pO2 78 | HCO3 19 | Lactato 3.8 mmol/L",
        "electrolytes": "K+ 4.0 | Na+ 134 | Cl- 99",
        "glucose": "HGT: 110 mg/dL",
        "others": "BNP: 3.800 pg/mL | Troponina I: 0.24 ng/mL"
      },
      "history": {
        "witness": "Hermana refiere que la paciente completó su 6° ciclo de quimioterapia hace 1 mes y progresivamente toleraba menos caminar.",
        "medications": "Carvedilol 6.25 mg, Furosemida 40 mg, Espironolactona 25 mg.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-98",
    "title": "Caso 98: Tormenta Tiroidea con Fibrilación Auricular a 195 lpm y degeneración a TVSP",
    "type": "taquicardia",
    "arrestType": "TVSP",
    "isShockable": true,
    "difficulty": "Avanzado",
    "patient": {
      "name": "Daniela Urzúa",
      "age": 35,
      "gender": "F",
      "location": "Servicio de Urgencias - Box de Reanimación",
      "history": "Enfermedad de Graves-Basedow con abandono de tratamiento antitiroideo hace 3 meses.",
      "presentation": "Fiebre alta (40.2 °C), agitación psicomotora extrema, temblores generalizados, bocio difuso con soplo, exoftalmos y palpitaciones torrenciales."
    },
    "initialVitals": {
      "hr": 195,
      "bp": "84/40",
      "spo2": 91,
      "etco2": 28,
      "rr": 32,
      "temp": 40.2,
      "rhythm": "FIBRILACION_AURICULAR",
      "rhythmName": "Fibrilación Auricular con Respuesta Ventricular Rápida e Infradesnivel ST",
      "isStable": false,
      "stabilityReason": "Tormenta tiroidea descompensada (Score Burch-Wartofsky > 65), shock hiperdinámico e insuficiencia cardíaca de alto gasto.",
      "consciousness": "Delirium agitado, luego estuporosa (AVPU: V)",
      "airway": "Espontánea taquipneica profunda",
      "ivAccess": "Dos vías periféricas 18G en ambos antebrazos"
    },
    "degenerationMessage": "¡La paciente se desvanece por completo! Se apagan los pulsos periféricos y centrales. El trazo ECG degenera en complejos anchos regulares gigantes a 235 lpm sin pulso (TV sin pulso).",
    "arrestVitals": {
      "hr": 235,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 12,
      "rr": 0,
      "temp": 40.2,
      "rhythm": "TVSP",
      "rhythmName": "Taquicardia Ventricular Sin Pulso (TVSP)",
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
        "desfibrilar",
        "adrenalina",
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
      "hr": 104,
      "bp": "108/66",
      "spo2": 97,
      "etco2": 42,
      "rr": 16,
      "temp": 38.6,
      "rhythm": "TAQUICARDIA_SINUSAL",
      "rhythmName": "Taquicardia Sinusal con inicio de Propranolol EV, Propiltiouracilo/Metimazol e Hidrocortisona",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, enfriamiento activo en UCI"
    },
    "reversibleCause": "Crisis tirotóxica hiperdinámica con toxicidad miocárdica por exceso de hormonas tiroideas (Tóxicos)",
    "hytCategory": "Tóxicos / Trastorno Endocrino",
    "teachingNotes": "En la tormenta tiroidea el exceso de T3/T4 hipersensibiliza los receptores beta-adrenérgicos. Requiere betabloqueadores (Propranolol), antitiroideos de síntesis, yodo inorgánico (Lugol) y corticoides.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular conservado bilateralmente.",
        "cardiovascular": "Ruidos cardíacos taquicárdicos violentos, soplo sistólico sobre glándula tiroides aumentada de tamaño.",
        "perfusion": "Piel intensamente caliente, empapada en sudor, temblor fino de extremidades.",
        "temperature": "40.2 °C"
      },
      "pocus": {
        "cardiac": "Cámaras cardíacas sumamente hiperdinámicas con acortamiento sistólico extremo.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 14 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.30 | pCO2 34 | pO2 82 | HCO3 17 | Lactato 3.9 mmol/L",
        "electrolytes": "K+ 3.8 | Na+ 136 | Cl- 101",
        "glucose": "HGT: 148 mg/dL",
        "others": "TSH: < 0.01 uUI/mL | T4 Libre: > 7.7 ng/dL (Valores extremadamente elevados)"
      },
      "history": {
        "witness": "Madre relata que la paciente estaba muy ansiosa con insomnio de días, dejó el tiamazol hace meses y hoy comenzó con fiebre y delirio.",
        "medications": "Ninguno activo.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-99",
    "title": "Caso 99: Sobredosis accidental de Metadona con prolongación extrema del QTc y FV",
    "type": "bradicardia",
    "arrestType": "FV",
    "isShockable": true,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Mauricio San Martín",
      "age": 42,
      "gender": "M",
      "location": "Domicilio - Asistencia SAMU",
      "history": "Programa de mantención con Metadona para deshabituación de opioides. Uso concomitante de Ciprofloxacino por infección urinaria.",
      "presentation": "Encontrado en su cama con respiración agónica superficial, cianosis perioral y pérdida brusca de respuesta motora."
    },
    "initialVitals": {
      "hr": 36,
      "bp": "72/40",
      "spo2": 70,
      "etco2": 60,
      "rr": 6,
      "temp": 35.8,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Bradicardia Sinusal con Prolongación Severa del QTc (630 ms) y extrasístoles ventriculares en R sobre T",
      "isStable": false,
      "stabilityReason": "Depresión respiratoria por opioides, hipoxemia severa (70%) e intervalo QT críticamente prolongado.",
      "consciousness": "Coma profundo, miosis bilateral (AVPU: U)",
      "airway": "Obstrucción de vía aérea por lengua",
      "ivAccess": "Vía periférica 18G en flexura"
    },
    "degenerationMessage": "¡Un extrasístole ventricular cae directamente sobre el vértice de la onda T gigante y desencadena una Fibrilación Ventricular caótica sin pulso!",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 10,
      "rr": 0,
      "temp": 35.8,
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
        "atropina"
      ],
      "arrestExpected": [
        "iniciar_rcp",
        "desfibrilar",
        "adrenalina",
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
      "hr": 78,
      "bp": "112/70",
      "spo2": 98,
      "etco2": 41,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras Naloxona, Sulfato de Magnesio y desfibrilación precoz",
      "pulsePresent": true,
      "consciousness": "Comatoso, candidato a TTM y monitoreo de arritmias por vida media prolongada de metadona"
    },
    "reversibleCause": "Efecto cardiotóxico de Metadona (bloqueo hERG) potenciado por fluoroquinolona con hipoxia secundaria (Tóxicos)",
    "hytCategory": "Tóxicos / Sobredosis farmacológica",
    "teachingNotes": "La metadona bloquea los canales de potasio hERG prolongando significativamente el QT. Al combinarse con fármacos como ciprofloxacino o hipoxia, el riesgo de Torsades y FV aumenta drásticamente.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Hipoexpansión torácica severa, estridor y ronquidos respiratorios.",
        "cardiovascular": "Ruidos cardíacos muy lentos y espaciados.",
        "perfusion": "Miosis marcada, cianosis labial, piel fría.",
        "temperature": "35.8 °C"
      },
      "pocus": {
        "cardiac": "Contractilidad miocárdica deprimida bradicárdica previo al paro.",
        "lung": "Líneas A normales bilaterales.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.10 | pCO2 76 | pO2 48 | HCO3 22 | Lactato 4.2 mmol/L",
        "electrolytes": "K+ 3.6 | Mg2+ 1.4 | Ca2+ 1.16",
        "glucose": "HGT: 94 mg/dL",
        "others": "Screening toxicológico positivo para Metadona"
      },
      "history": {
        "witness": "Pareja refiere que el paciente tomó su jarabe de metadona habitual y agregó ciprofloxacino que le recetaron por cistitis.",
        "medications": "Metadona 80 mg/día, Ciprofloxacino 500 mg c/12h.",
        "allergies": "Sin alergias."
      }
    }
  },
  {
    "id": "caso-100",
    "title": "Caso 100: Intoxicación por Monóxido de Carbono (CO) en espacio cerrado con colapso en Asistolia",
    "type": "bradicardia",
    "arrestType": "ASISTOLIA",
    "isShockable": false,
    "difficulty": "Intermedio",
    "patient": {
      "name": "Gloria Troncoso",
      "age": 63,
      "gender": "F",
      "location": "Baño Domiciliario - Asistencia Médica SAMU",
      "history": "Hipertensión arterial. Encontrada inconsciente en baño cerrado con calefón de gas defectuoso encendido.",
      "presentation": "Coma profundo, relajación de esfínteres, coloración de piel sonrosada paradójica y respiración agónica casi imperceptible."
    },
    "initialVitals": {
      "hr": 26,
      "bp": "52/28",
      "spo2": 98,
      "etco2": 14,
      "rr": 4,
      "temp": 35.6,
      "rhythm": "BRADICARDIA_SINUSAL",
      "rhythmName": "Ritmo Agónico Terminal por Hipoxia Tisular Histotóxica Anémica",
      "isStable": false,
      "stabilityReason": "Bloqueo del transporte de oxígeno por Carboxihemoglobina (> 50%), anoxia miocárdica y cerebral fulminante.",
      "consciousness": "Coma profundo arrefléxico (AVPU: U)",
      "airway": "Apnea obstructiva terminal",
      "ivAccess": "Vía periférica 18G en dorso de mano derecha"
    },
    "degenerationMessage": "¡El escaso complejo nodal desaparece por completo del monitor! Se confirma línea recta isoeléctrica horizontal en dos derivaciones ortogonales (Asistolia total).",
    "arrestVitals": {
      "hr": 0,
      "bp": "0/0",
      "spo2": 0,
      "etco2": 7,
      "rr": 0,
      "temp": 35.6,
      "rhythm": "ASISTOLIA",
      "rhythmName": "Asistolia por Anoxia Tisular Grave",
      "pulsePresent": false,
      "consciousness": "Inconsciente en apnea"
    },
    "requiredInterventions": {
      "initialExpected": [
        "oxigeno",
        "monitor",
        "via_iv",
        "atropina"
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
      "bp": "114/70",
      "spo2": 100,
      "etco2": 41,
      "rr": 14,
      "temp": 36.2,
      "rhythm": "RITMO_SINUSAL",
      "rhythmName": "Ritmo Sinusal Regular tras ventilación mecánica con O2 al 100% hiperbárico programado",
      "pulsePresent": true,
      "consciousness": "Comatosa, intubada, traslado a Unidad de Medicina Hiperbárica / UCI"
    },
    "reversibleCause": "Intoxicación severa por monóxido de carbono con bloqueo del transporte y utilización de oxígeno celular (Hipoxia / Tóxicos)",
    "hytCategory": "Hipoxia",
    "teachingNotes": "El oxímetro de pulso estándar es engañoso: lee la carboxihemoglobina como si fuera oxihemoglobina reportando falsos SpO2 normales (98-100%). La administración de Oxígeno al 100% normobárico o hiperbárico acelera la eliminación del CO reduciendo su vida media de 320 min a < 80 min.",
    "clinicalExam": {
      "physical": {
        "pulmonary": "Murmullo vesicular casi inaudible por hipoventilación extrema bradipneica.",
        "cardiovascular": "Ruidos cardíacos inaudibles en paro.",
        "perfusion": "Coloración rosada 'rojo cereza' llamativa en labios y lechos ungueales a pesar del estado crítico agónico.",
        "temperature": "35.6 °C"
      },
      "pocus": {
        "cardiac": "Acinesia miocárdica completa en asistolia.",
        "lung": "Líneas A normales bilaterales, sin neumotórax.",
        "vci": "VCI 16 mm con colapso normal."
      },
      "labs": {
        "gsa": "pH 7.08 | pCO2 56 | pO2 88 | HCO3 15 | Lactato 8.2 mmol/L",
        "electrolytes": "K+ 4.6 | Na+ 138 | Cl- 101",
        "glucose": "HGT: 118 mg/dL",
        "others": "Carboxihemoglobina (CoHb): 54% (Nivel letal > 50%)"
      },
      "history": {
        "witness": "Familiar refiere que la madre entró a ducharse hace 40 minutos, no respondía y al forzar la puerta había fuerte olor a combustión de gas.",
        "medications": "Enalapril 20 mg.",
        "allergies": "Sin alergias."
      }
    }
  }
];

// Helper function to pick a completely random case
export function getRandomCase() {
  const randomIndex = Math.floor(Math.random() * ACLS_CASES.length);
  return ACLS_CASES[randomIndex];
}
