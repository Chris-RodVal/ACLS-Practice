import json

cases = []

# Generator of 50 clinical cases
def add(num, title, ctype, arrest_type, shockable, diff,
        pname, page, pgender, ploc, phist, ppres,
        ihr, ibp, ispo2, ietco2, irr, itemp, irhythm, irhythm_name, istable, ireason, iconsc, iairway, iiv,
        deg_msg,
        ahr, abp, aspo2, aetco2, arr, atemp, arhythm, arhythm_name, aconsc,
        rhr, rbp, rspo2, retco2, rrr, rtemp, rrhythm, rrhythm_name, rconsc,
        rev_cause, hyt_cat, notes,
        pulm, cardio, perf, temp_exam, pocus_c, pocus_l, pocus_v, gsa, elp, hgt, others, witness, meds, allergies):
    cases.append({
        "id": f"caso-{num}",
        "title": f"Caso {num}: {title}",
        "type": ctype,
        "arrestType": arrest_type,
        "isShockable": shockable,
        "difficulty": diff,
        "patient": {
            "name": pname,
            "age": page,
            "gender": pgender,
            "location": ploc,
            "history": phist,
            "presentation": ppres
        },
        "initialVitals": {
            "hr": ihr,
            "bp": ibp,
            "spo2": ispo2,
            "etco2": ietco2,
            "rr": irr,
            "temp": itemp,
            "rhythm": irhythm,
            "rhythmName": irhythm_name,
            "isStable": istable,
            "stabilityReason": ireason,
            "consciousness": iconsc,
            "airway": iairway,
            "ivAccess": iiv
        },
        "degenerationMessage": deg_msg,
        "arrestVitals": {
            "hr": ahr,
            "bp": abp,
            "spo2": aspo2,
            "etco2": aetco2,
            "rr": arr,
            "temp": atemp,
            "rhythm": arhythm,
            "rhythmName": arhythm_name,
            "pulsePresent": False,
            "consciousness": aconsc
        },
        "requiredInterventions": {
            "initialExpected": ["oxigeno", "monitor", "via_iv"] + (["cardioversion_sincronizada"] if ctype == "taquicardia" and not istable else ["atropina", "marcapasos"]),
            "arrestExpected": ["iniciar_rcp", "adrenalina"] + (["desfibrilar", "amiodarona"] if shockable else ["buscar_hyt"]),
            "postRceExpected": ["identificar_rce", "tomar_pa", "ecg_12_derivaciones", "ttm"]
        },
        "rceVitals": {
            "hr": rhr,
            "bp": rbp,
            "spo2": rspo2,
            "etco2": retco2,
            "rr": rrr,
            "temp": rtemp,
            "rhythm": rrhythm,
            "rhythmName": rrhythm_name,
            "pulsePresent": True,
            "consciousness": rconsc
        },
        "reversibleCause": rev_cause,
        "hytCategory": hyt_cat,
        "teachingNotes": notes,
        "clinicalExam": {
            "physical": {
                "pulmonary": pulm,
                "cardiovascular": cardio,
                "perfusion": perf,
                "temperature": temp_exam
            },
            "pocus": {
                "cardiac": pocus_c,
                "lung": pocus_l,
                "vci": pocus_v
            },
            "labs": {
                "gsa": gsa,
                "electrolytes": elp,
                "glucose": hgt,
                "others": others
            },
            "history": {
                "witness": witness,
                "medications": meds,
                "allergies": allergies
            }
        }
    })

# --- CASES 1 TO 25: TAQUIARRITMIAS ---
# 1
add(1, "TV Monomorfa Sostenida con pulso que degenera a FV gruesa", "taquicardia", "FV", True, "Intermedio",
    "Jorge Morales", 62, "M", "Servicio de Urgencias Hospitalario", "IAM previo con FEy 35%. HTA.", "Palpitaciones intensas 'aleteo en el pecho', mareos y opresión torácica 6/10.",
    175, "84/50", 91, 32, 26, 36.4, "TV_MONOMORFA", "Taquicardia Ventricular Monomorfa Sostenida", False, "Hipotensión sintomática (84/50), dolor isquémico y palidez.", "Consciente pero confuso", "Espontánea", "Vía periférica 20G",
    "¡El paciente repentinamente pierde el conocimiento! Se desvanece en la camilla y el monitor muestra degeneración a Fibrilación Ventricular gruesa.",
    0, "0/0", 0, 12, 0, 36.4, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en apnea",
    98, "88/54", 95, 42, 12, 36.1, "SINUSAL_ST_ELEVATION", "Ritmo Sinusal con supradesnivel ST (STEMI)", "Comatoso, candidato a TTM",
    "Isquemia miocárdica aguda (Trombosis coronaria)", "Trombosis coronaria (Síndrome Coronario Agudo)",
    "TV inestable con pulso requiere cardioversión sincronizada. Al degenerar a FV, la prioridad es descarga precoz (200J) y REANUDAR RCP DE INMEDIATO.",
    "Murmullo vesicular conservado bilateralmente.", "Ruidos cardíacos taquicárdicos, sin soplos.", "Piel fría y sudorosa. Llenado capilar 3s.", "36.4 °C",
    "Acinesia de pared anterior. Sin derrame pericárdico.", "Líneas A normales bilaterales.", "VCI 18 mm con colapso normal.",
    "pH 7.31 | pCO2 36 | pO2 82 | HCO3 18 | Lactato 3.4 mmol/L", "K+ 4.3 | Na+ 139 | Ca2+ 1.20", "HGT: 142 mg/dL", "Troponina I: 2.4 ng/mL (Positiva)",
    "Hijo refiere dolor opresivo al subir escaleras hace 1 hora.", "Enalapril, Carvedilol, Aspirina.", "Sin alergias.")

# 2
add(2, "TSVP Inestable en Paciente Joven que colapsa en TV sin pulso", "taquicardia", "TVSP", True, "Intermedio",
    "Valentina Soto", 24, "F", "Box de Reanimación SAPU", "Sin antecedentes mórbidos. Episodios de taquicardia previa.", "Palpitaciones súbitas de 2 horas de evolución, disnea y marcada frialdad distal con mareo.",
    220, "78/46", 93, 30, 28, 36.6, "TSVP", "Taquicardia Supraventricular Paroxística", False, "Hipotensión severa (78/46 mmHg), mala perfusión periférica, disnea.", "Consciente, angustiada", "Espontánea", "Sin vía venosa",
    "La paciente cierra los ojos bruscamente, se torna cianótica y cae en colapso hemodinámico total con TV sin pulso.",
    0, "0/0", 0, 11, 0, 36.5, "TVSP", "Taquicardia Ventricular sin pulso (TVSP)", "Inconsciente en paro",
    105, "96/60", 97, 38, 14, 36.5, "SINUSAL", "Ritmo Sinusal Normal", "Recupera conciencia gradualmente",
    "Isquemia funcional secundaria a taquicardia extrema", "Hipoxia / Isquemia miocárdica",
    "TSVP inestable requiere cardioversión sincronizada inmediata. Al caer en TVSP, choque de 200J y reanudación de RCP sin pausas.",
    "Murmullo pulmonar limpio bilateral.", "Ruidos rápidos regulares.", "Piel fría distalmente.", "36.6 °C",
    "Ventrículos hiperdinámicos sin derrame.", "Deslizamiento pleural normal bilateral.", "VCI 12 mm colapsable.",
    "pH 7.36 | pCO2 32 | pO2 90 | HCO3 20", "K+ 4.0 | Na+ 140", "HGT: 98 mg/dL", "Dímero D normal",
    "Amiga refiere consumo de bebidas energéticas antes del cuadro.", "Anticonceptivos orales.", "Ninguna.")

# 3
add(3, "Fibrilación Auricular con RVR en Postoperado que cae en AESP por TEP", "taquicardia", "AESP", False, "Avanzado",
    "Hernán Castro", 74, "M", "Servicio de Cirugía General", "Postoperado día 3 de prótesis total de cadera.", "Disnea súbita, dolor torácico pleurítico y taquicardia irregular de inicio brusco.",
    168, "76/48", 87, 28, 32, 37.1, "FA_RVR", "Fibrilación Auricular con RVR", False, "Shock obstructivo, hipotensión y desaturación severa.", "Somnoliento y confuso", "Espontánea", "Vía venosa 18G",
    "El paciente emite un jadeo agónico y pierde el conocimiento. El monitor muestra ritmo organizado taquicárdico pero NO TIENE PULSO (AESP).",
    0, "0/0", 0, 14, 0, 37.0, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente, sin pulso",
    110, "92/56", 94, 36, 16, 36.8, "SINUSAL", "Taquicardia Sinusal con sobrecarga de VD", "Comatoso",
    "Tromboembolismo pulmonar masivo", "Trombosis pulmonar (TEP Masivo)",
    "En AESP por TEP masivo, la prioridad es RCP ininterrumpida, Adrenalina 1mg precoz y considerar trombolisis de emergencia.",
    "Discreta hipoventilación basal izquierda, sin sibilancias.", "R2 aumentado en foco pulmonar, ingurgitación yugular evidente.", "Cianosis central y periférica.", "37.1 °C",
    "Ventrículo derecho severamente dilatado (signo de McConnell). Desviación septal a izquierda.", "Líneas A normales, sin neumotórax.", "VCI pletórica de 26 mm sin colapso.",
    "pH 7.24 | pCO2 29 | pO2 55 | HCO3 14 | Lactato 5.8 mmol/L", "K+ 4.6 | Na+ 137", "HGT: 110 mg/dL", "Dímero D: > 10.000 ug/L (Muy elevado)",
    "Enfermera informa reposo absoluto en cama postcirugía de cadera.", "Enoxaparina omitida.", "Metoclopramida.")

# 4
add(4, "Flutter Auricular 2:1 Inestable en EPOC con Paro en Asistolia", "taquicardia", "ASISTOLIA", False, "Intermedio",
    "Raúl Navarrete", 68, "M", "Box de Reanimación SAR", "EPOC tabáquico severo y Cor Pulmonale.", "Disnea extrema, cianosis labial y palpitaciones rápidas en reposo.",
    150, "80/52", 84, 48, 30, 36.8, "FLUTTER", "Flutter Auricular con Conducción 2:1", False, "Insuficiencia respiratoria inestable e hipotensión.", "Obnubilado", "Agotamiento respiratorio", "Vía 20G",
    "El paciente agota su mecánica ventilatoria, entra en bradipnea terminal y la actividad eléctrica se extingue a Asistolia plana.",
    0, "0/0", 0, 8, 0, 36.7, "ASISTOLIA", "Asistolia (Línea Plana)", "Paro respiratorio y cardíaco",
    88, "94/60", 93, 35, 14, 36.4, "SINUSAL", "Ritmo Sinusal con P pulmonar", "Intubado conectado a ventilación",
    "Hipoxia y acidosis respiratoria severa (agotamiento ventilatorio)", "Hipoxia / Acidosis respiratoria",
    "La asistolia secundaria a hipoxia requiere intubación orotraqueal inmediata, oxigenación al 100%, adrenalina 1mg y RCP de alta calidad.",
    "Murmullo muy disminuido globalmente, tórax en tonel, espiración prolongada.", "Ruidos alejados, taquicárdicos.", "Cianosis ungueal y peribucal.", "36.8 °C",
    "Hipertrofia de VD sin derrame pericárdico.", "Deslizamiento pleural presente bilateralmente.", "VCI 20 mm con escasa variabilidad.",
    "pH 7.12 | pCO2 78 | pO2 48 | HCO3 26 | Lactato 4.2", "K+ 4.8 | Na+ 136", "HGT: 130 mg/dL", "GSA demuestran acidosis hipercápnica severa",
    "Hija refiere suspensión de inhaladores y cuadro bronquial de 4 días.", "Salbutamol, Ipratropio.", "Ninguna.")

# 5
add(5, "Torsades de Pointes por Prolongación del QT que cae a FV", "taquicardia", "FV", True, "Avanzado",
    "Camila Fuentes", 38, "F", "Servicio de Urgencias", "Uso reciente de Azitromicina + Haloperidol. Síncopes.", "Mareos súbitos y pérdida de conocimiento breve en su domicilio.",
    190, "70/40", 89, 26, 24, 36.3, "TORSADES", "Torsades de Pointes (TV Polimorfa)", False, "Inestabilidad hemodinámica crítica y sincope recurrente.", "Confusa, diaforética", "Espontánea", "Vía 20G",
    "La paciente presenta una convulsión tónica breve, pierde el pulso y el monitor registra Fibrilación Ventricular caótica.",
    0, "0/0", 0, 10, 0, 36.3, "FV", "Fibrilación Ventricular (FV)", "Paro en FV",
    92, "98/62", 96, 40, 12, 36.2, "SINUSAL", "Ritmo Sinusal con QT corregido prolongado", "Comatosa posparo",
    "Toxicidad por fármacos que prolongan el intervalo QT (Hipomagnesemia)", "Tóxicos / Hipomagnesemia",
    "Tratamiento clave: Desfibrilación en paro, Sulfato de Magnesio 2g IV en bolo y suspensión inmediata de fármacos proarrítmicos.",
    "Limpio bilateral.", "Ruidos arrítmicos caóticos.", "Pálida, sudorosa.", "36.3 °C",
    "Ventrículos hiperquinéticos sin patología estructural.", "Líneas A normales.", "VCI 14 mm.",
    "pH 7.38 | pCO2 36 | pO2 88 | HCO3 22", "K+ 3.2 (Bajo) | Mg2+ 1.1 mg/dL (Muy bajo)", "HGT: 104 mg/dL", "ECG previo mostraba QTc de 540 ms",
    "Madre refiere que estaba tomando antibióticos por neumonía y antipsicótico.", "Azitromicina, Haloperidol, Sertralina.", "Penicilina.")

# 6
add(6, "TV Polimorfa Isquémica en IAM que degenera a FV", "taquicardia", "FV", True, "Intermedio",
    "Manuel Sepúlveda", 59, "M", "Box de Reanimación Hospitalario", "Fumador, dislipidemia. Dolor torácico opresivo desde hace 2 horas.", "Dolor precordial irradiado a mandíbula y sudoración profusa.",
    185, "74/48", 90, 28, 28, 36.5, "TVSP", "Taquicardia Ventricular Polimorfa con pulso", False, "Shock cardiogénico e isquemia aguda en curso.", "Consciente, angustiado", "Espontánea", "Vía 18G",
    "El paciente pierde la postura, emite un quejido gutural y entra en Fibrilación Ventricular fina/gruesa.",
    0, "0/0", 0, 12, 0, 36.4, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en paro",
    86, "88/54", 95, 41, 14, 36.2, "SINUSAL_ST_ELEVATION", "STEMI Inferior (Supradesnivel DII, DIII, aVF)", "Comatoso posparo",
    "Oclusión coronaria aguda de la arteria coronaria derecha", "Trombosis coronaria (IAM agudo)",
    "Descarga precoz de 200J bifásica, reinicio inmediato de compresiones, Amiodarona 300mg y traslado urgente a pabellón de Hemodinamia (PCI).",
    "Crepitaciones en bases pulmonares.", "Ruidos taquicárdicos arrítmicos.", "Piel fría cérea.", "36.5 °C",
    "Acinesia de cara inferior y posterior de VI.", "Líneas B en bases.", "VCI 19 mm.",
    "pH 7.29 | pCO2 35 | pO2 78 | HCO3 17 | Lactato 4.1", "K+ 3.8 | Na+ 138", "HGT: 160 mg/dL", "Troponina ultrasensible: 450 ng/L",
    "Esposa confirma inicio súbito del dolor mientras miraba televisión.", "Atorvastatina.", "Ninguna.")

# 7
add(7, "Shock Hipovolémico por Hemorragia Digestiva Alta con AESP", "taquicardia", "AESP", False, "Intermedio",
    "José Oyarzún", 65, "M", "Box de Reanimación SAPU", "Cirrosis hepática OH. Hematemesis masiva hace 30 minutos.", "Colapso circulatorio con melena abundante, hematemesis activa y palidez extrema.",
    155, "60/35", 88, 22, 30, 35.8, "TSVP", "Taquicardia Sinusal / TSVP compensatoria", False, "Shock hemorrágico grado IV.", "Somnoliento, obnubilado", "Vía aérea en riesgo por vómito", "Vía periférica 18G",
    "El paciente vomita abundante sangre oscura, hace apnea y cae en AESP con complejos anchos sin pulso.",
    0, "0/0", 0, 9, 0, 35.6, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Paro en AESP por vaciamiento",
    112, "86/52", 94, 34, 16, 35.8, "SINUSAL", "Taquicardia Sinusal compensada con volumen", "Intubado protegido",
    "Shock hipovolémico hemorrágico masivo por várices esofágicas", "Hipovolemia (Pérdida sanguínea masiva)",
    "Prioridad absoluta: Expansión de volumen agresiva con suero salino y hemoderivados, intubación para proteger vía aérea y Adrenalina 1mg.",
    "Roncus por sangre en orofaringe.", "Ruidos filiformes apagados.", "Palidez de porcelana, frialdad generalizada.", "35.8 °C",
    "Cámaras cardíacas virtuales totalmente colapsadas (kissing papillary muscles).", "Sin neumotórax.", "VCI colapsada totalmente (flat cava < 5 mm).",
    "pH 7.15 | pCO2 28 | pO2 72 | HCO3 11 | Lactato 8.5 | EB -16", "K+ 3.5 | Na+ 134", "HGT: 82 mg/dL", "Hematocrito: 18% | Hemoglobina: 6.0 g/dL",
    "Hijo relata vómito de más de 1 litro de sangre fresca en la casa.", "Propranolol, Espironolactona.", "Ninguna.")

# 8
add(8, "Neumotórax a Tensión Post-Traumático con Taquicardia y AESP", "taquicardia", "AESP", False, "Intermedio",
    "Diego Valenzuela", 22, "M", "Servicio de Urgencias", "Víctima de accidente de tránsito en moto con golpe torácico derecho.", "Taquicárdico, taquipneico, quejándose de dolor torácico lancinante derecho y asfixia progresiva.",
    160, "72/40", 82, 20, 36, 36.6, "TSVP", "Taquicardia Sinusal extrema reactiva", False, "Shock obstructivo por neumotórax a tensión.", "Agitado, combativo por hipoxia", "Insuficiencia respiratoria", "Vía venosa 18G",
    "El paciente deja de respirar, la tráquea se desvía a izquierda y el pulso carotídeo desaparece bruscamente.",
    0, "0/0", 0, 10, 0, 36.5, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Paro en AESP obstructivo",
    108, "96/64", 97, 39, 14, 36.5, "SINUSAL", "Ritmo Sinusal Normal", "Respira con tubo torácico",
    "Neumotórax a tensión con colapso de retorno venoso", "Neumotórax a tensión",
    "La causa es mecánica: requiere descompresión torácica inmediata con aguja/catéter en 2° espacio intercostal línea medioclavicular o 5° EIC LAA.",
    "Abolición absoluta del murmullo pulmonar en hemitórax derecho con hipersonoridad a la percusión.", "Desviación marcada de la tráquea hacia la izquierda. Ingurgitación yugular.", "Cianosis facial.", "36.6 °C",
    "Colapso de cavidades derechas por compresión mediastínica.", "Ausencia de deslizamiento pleural en hemitórax derecho con punto pulmonar ausente.", "VCI pletórica > 24 mm.",
    "pH 7.20 | pCO2 56 | pO2 45 | HCO3 19", "Normales", "HGT: 115 mg/dL", "Trauma torácico evidente",
    "Paramédico del SAMU informa impacto de tórax contra manubrio de motocicleta.", "Ninguno.", "Ninguna.")

# 9
add(9, "Sepsis Grave Foco Urinario con FA con RVR y Colapso en AESP", "taquicardia", "AESP", False, "Intermedio",
    "Eliana Rivas", 81, "F", "Servicio de Urgencias Hospitalario", "Postrada, usuaria de sonda Foley a permanencia.", "Compromiso de conciencia, fiebre de 39°C y orinas francamente purulentas.",
    165, "74/42", 91, 26, 32, 38.9, "FA_RVR", "Fibrilación Auricular con RVR", False, "Shock séptico distributivo con hipoperfusión tisular.", "Estuporosa, mal perfundida", "Espontánea", "Vía 20G",
    "La paciente presenta un paro cardiorrespiratorio en AESP por colapso vasomotor y acidosis láctica.",
    0, "0/0", 0, 13, 0, 38.7, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Paro en AESP séptico",
    100, "90/58", 95, 37, 16, 38.2, "FA_RVR", "Fibrilación Auricular controlada con drogas vasoactivas", "Comatosa en UCI",
    "Shock séptico refractario con acidosis metabólica severa", "Hidrogeniones (Acidosis severa) / Hipovolemia relativa",
    "Tratamiento: Carga rápida de cristaloides (suero salino), Adrenalina 1mg, corrección de acidosis y soporte con noradrenalina posparo.",
    "Roncus basales bilaterales.", "Ruidos arrítmicos rápidos.", "Piel moteada (mottling score 3 en rodillas), frialdad periférica extrema.", "38.9 °C",
    "Fracción de eyección hiperdinámica (>70%) con ventrículos colapsables.", "Líneas B bilaterales escasas.", "VCI 11 mm colapsable >50%.",
    "pH 7.10 | pCO2 25 | pO2 78 | HCO3 9 | Lactato 9.2 mmol/L", "K+ 5.2 | Na+ 145", "HGT: 180 mg/dL", "Leucocitosis: 28.000 con 22% baciliformes",
    "Cuidadora relata 3 días de orina con mal olor y fiebre.", "Paracetamol, Ciprofloxacino.", "Ninguna.")

# 10
add(10, "FA Preexcitada (Síndrome de Wolff-Parkinson-White) que colapsa en FV", "taquicardia", "FV", True, "Avanzado",
    "Cristóbal Silva", 28, "M", "Box de Reanimación SAPU", "Antecedente de vía accesoria no ablacionada (WPW).", "Palpitaciones intolerables, mareo severo y sensación de muerte inminente.",
    240, "70/40", 92, 28, 28, 36.6, "FA_RVR", "FA Preexcitada con conducción por haz accesorio", False, "Inestabilidad hemodinámica extrema (QRS ancho irregular >220 lpm).", "Pálido, mareado, confuso", "Espontánea", "Vía 20G",
    "El trazado se desorganiza por completo y degenera súbitamente en Fibrilación Ventricular gruesa.",
    0, "0/0", 0, 11, 0, 36.5, "FV", "Fibrilación Ventricular (FV)", "Paro en FV",
    95, "102/68", 98, 40, 12, 36.5, "SINUSAL", "Ritmo Sinusal con onda delta (WPW)", "Consciente posparo",
    "Conducción anterógrada rápida por vía accesoria auriculoventricular", "Trombosis coronaria / Isquemia funcional",
    "En FA preexcitada, los bloqueadores del nodo AV (Adenosina, Verapamilo, Digoxina) están CONTRAINDICADOS porque inducen FV. Se debe cardiovertir precozmente.",
    "Murmullo pulmonar normal.", "Ruidos cardíacos extraordinariamente rápidos e irregulares.", "Piel fría, diaforesis profusa.", "36.6 °C",
    "Corazón anatómicamente normal con taquicardia extrema.", "Normal bilateral.", "VCI 15 mm.",
    "pH 7.34 | pCO2 34 | pO2 86 | HCO3 19", "K+ 4.1 | Na+ 139", "HGT: 102 mg/dL", "ECG muestra QRS ancho, polimorfo e irregular",
    "Paciente relata diagnóstico de WPW en la infancia.", "Ninguno habitual.", "Ninguna.")

# 11
add(11, "Tormenta Arritmogénica por Intoxicación con Cocaína que degenera en FV", "taquicardia", "FV", True, "Avanzado",
    "Ignacio Pavez", 29, "M", "Box de Reanimación Urgencias", "Consumo problemático de sustancias. Consumo masivo de clorhidrato de cocaína.", "Agitación psicomotora extrema, diaforesis, dolor precordial y midriasis bilateral.",
    195, "82/44", 89, 25, 34, 38.6, "TV_MONOMORFA", "Taquicardia Ventricular Monomorfa Hiperadrenérgica", False, "Hipotensión con vasoespasmo coronario e hipertermia por cocaína.", "Combatiendo, luego somnoliento", "Espontánea", "Vía 18G",
    "El paciente sufre una convulsión tónica generalizada y el monitor cae en Fibrilación Ventricular gruesa caótica.",
    0, "0/0", 0, 10, 0, 38.5, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en FV",
    98, "92/58", 96, 39, 14, 37.8, "SINUSAL", "Taquicardia Sinusal / Normalización", "Comatoso en observación",
    "Vasoespasmo coronario masivo y bloqueo de canales de sodio por cocaína", "Tóxicos (Cocaína) / Trombosis coronaria",
    "Descarga inmediata 200J. En toxicidad por cocaína evitar betabloqueadores puros (riesgo de estimulación alfa sin oposición). Considerar Bicarbonato y Benzodiacepinas.",
    "Murmullo pulmonar presente.", "Ruidos hiperdinámicos rápidos.", "Diaforesis profusa, piel caliente central pero vasoconstricción periférica.", "38.6 °C",
    "Ventrículo izquierdo hiperquinético con zonas de hipocinesia segmentaria.", "Sin neumotórax.", "VCI 14 mm.",
    "pH 7.22 | pCO2 30 | pO2 84 | HCO3 13 | Lactato 6.8 mmol/L", "K+ 3.6 | Na+ 141", "HGT: 112 mg/dL", "Tóxicos en orina: Cocaína fuertemente positiva",
    "Amigos admiten consumo de varios gramos de cocaína en fiesta.", "Ninguno crónico.", "Ninguna.")

# 12
add(12, "Taponamiento Cardíaco por Herida Penetrante con Taquicardia y AESP", "taquicardia", "AESP", False, "Intermedio",
    "Felipe Garrido", 26, "M", "Box de Reanimación Urgencias", "Agresión por terceros con arma blanca en precordio paraesternal izquierdo.", "Traído por SAMU con herida penetrante de 2 cm en 4° EIC paraesternal izquierdo. Muy hipotenso.",
    145, "68/48", 86, 22, 30, 36.4, "TSVP", "Taquicardia Sinusal compensatoria extrema", False, "Shock obstructivo grave (Tríada de Beck clásica).", "Estuporoso, responde con quejidos", "Espontánea", "Vía 16G",
    "El paciente palidece bruscamente, cesa la respiración y el pulso se extingue por completo quedando en AESP.",
    0, "0/0", 0, 11, 0, 36.3, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente en paro por taponamiento",
    104, "90/58", 96, 38, 14, 36.4, "SINUSAL", "Ritmo Sinusal con bajo voltaje", "Estable tras descompresión",
    "Taponamiento cardíaco hemorrágico por herida cardíaca", "Taponamiento cardíaco",
    "En AESP por taponamiento, la RCP y adrenalina no logran RCE sin evacuación mecánica: Pericardiocentesis subxifoidea de emergencia o toracotomía de reanimación.",
    "Murmullo pulmonar presente y simétrico bilateralmente (descarta neumotórax).", "Ruidos cardíacos francamente apagados / velados. Ingurgitación yugular hasta el ángulo mandibular.", "Piel fría y cérea.", "36.4 °C",
    "Derrame pericárdico anecoico masivo > 25 mm con colapso diastólico del ventrículo derecho.", "Deslizamiento pleural bilateral normal.", "Vena Cava Inferior pletórica de 28 mm fija sin colapso.",
    "pH 7.26 | pCO2 34 | pO2 78 | HCO3 16 | Lactato 5.2", "K+ 4.0 | Na+ 138", "HGT: 95 mg/dL", "Hematocrito: 26%",
    "Paramédico informa agresión con cuchillo hace 20 minutos.", "Ninguno.", "Ninguna.")

# 13
add(13, "Cetoacidosis Diabética Grave con Taquicardia y Paro en AESP", "taquicardia", "AESP", False, "Intermedio",
    "Bastián Rojas", 19, "M", "Servicio de Urgencias", "Diabetes Mellitus tipo 1 diagnosticada hace 2 años. Abandono de insulina.", "Respiración de Kussmaul profunda, aliento cetónico, deshidratación extrema y dolor abdominal.",
    150, "70/42", 90, 16, 38, 36.0, "TSVP", "Taquicardia Sinusal de compensación", False, "Shock hipovolémico y acidosis metabólica extrema.", "Soporoso profundo", "Respiración acidótica", "Vía 18G",
    "El paciente entra en apnea por fatiga de músculos respiratorios y cae en AESP con complejos lentos sin pulso.",
    0, "0/0", 0, 9, 0, 35.9, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente en paro",
    96, "94/62", 97, 36, 16, 36.2, "SINUSAL", "Ritmo Sinusal con onda T acuminada", "Comatoso en recuperación",
    "Acidosis metabólica extrema e hipovolemia severa por diuresis osmótica", "Hidrogeniones (Acidosis severa) / Hipovolemia",
    "Tratamiento clave: Fluidoterapia intensiva con Suero Fisiológico, Bicarbonato de Sodio IV por pH < 7.0, manejo ventilatorio y soporte de reanimación.",
    "Hiperventilación de Kussmaul profunda previa al colapso. Murmullo pulmonar limpio bilateral.", "Ruidos taquicárdicos deshidratados.", "Signo del pliegue cutáneo francamente positivo, mucosas secas.", "36.0 °C",
    "Ventrículos hiperquinéticos colapsables sin derrame.", "Pulmones secos.", "VCI colapsada < 6 mm.",
    "pH 6.88 | pCO2 16 | pO2 96 | HCO3 4 mEq/L | Lactato 4.8 | EB -24", "K+ 6.1 (Pseudohiperkalemia) | Na+ 128", "HGT: 580 mg/dL (Cetonemia ++++)", "Glucosuria y cetonuria masiva",
    "Madre refiere suspensión de Insulina Glargina por falta de dinero hace 5 días.", "Insulina NPH y Cristalina.", "Ninguna.")

# 14
add(14, "Deshidratación Extrema por Gastroenteritis del Anciano con AESP", "taquicardia", "AESP", False, "Principiante",
    "María Teresa Baeza", 83, "F", "Box de Reanimación SAPU", "Hipertensa, usuaria de Enalapril e Hidroclorotiazida.", "Traída por familiares tras 3 días de diarrea acuosa profusa (10 deposiciones/día) y vómitos incoercibles.",
    140, "64/38", 89, 24, 26, 35.7, "TSVP", "Taquicardia Sinusal compensatoria de bajo gasto", False, "Shock hipovolémico deshidratativo severo.", "Estuporosa, ojos hundidos", "Espontánea", "Vía difícil 22G",
    "La paciente no responde a la llamada, el pulso radial y carotídeo se pierden y queda en AESP de bajo voltaje.",
    0, "0/0", 0, 10, 0, 35.6, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Paro en AESP hipovolémico",
    90, "92/58", 95, 36, 14, 36.1, "SINUSAL", "Ritmo Sinusal con volemia repuesta", "Responde a estímulos",
    "Hipovolemia severa por pérdidas gastrointestinales", "Hipovolemia (Deshidratación crítica)",
    "En AESP por hipovolemia pura, el tratamiento curativo es INFUSIÓN RÁPIDA DE SUERO FISIOLÓGICO a chorro (1000 a 2000 ml).",
    "Murmullo pulmonar conservado sin ruidos agregados.", "Ruidos cardíacos rápidos de tono muy bajo.", "Piel apergaminada con signo del pliegue persistente. Ojos enoftálmicos.", "35.7 °C",
    "Cavidades ventriculares virtuales que chocan en cada latido.", "Sin patología pleural.", "VCI colapsada filiforme < 4 mm.",
    "pH 7.30 | pCO2 32 | pO2 86 | HCO3 16 | Lactato 3.9", "K+ 3.1 | Na+ 152 (Hipernatremia por deshidratación)", "HGT: 105 mg/dL", "Urea: 140 mg/dL | Creatinina: 3.1 mg/dL (Falla prerrenal)",
    "Hija confirma 3 días sin poder comer ni retener líquidos por vómitos.", "Hidroclorotiazida, Enalapril.", "Ninguna.")

# 15
add(15, "Trombosis Aguda del Stent Coronario con TV Monomorfa y FV", "taquicardia", "FV", True, "Avanzado",
    "Gonzalo Pinochet", 56, "M", "Urgencia Hospitalaria", "Angioplastía coronaria con Stent medicado hace 5 días.", "Dolor torácico opresivo 10/10 terebrante, diaforesis y náuseas. Suspendió Clopidogrel por cuenta propia.",
    180, "80/46", 90, 29, 28, 36.4, "TV_MONOMORFA", "Taquicardia Ventricular Monomorfa Rápida", False, "Shock cardiogénico por trombosis del stent.", "Confuso, pálido", "Espontánea", "Vía 18G",
    "El paciente se desvanece con mirada fija hacia arriba y el monitor se transforma en Fibrilación Ventricular gruesa.",
    0, "0/0", 0, 12, 0, 36.3, "FV", "Fibrilación Ventricular (FV)", "Paro en FV",
    94, "88/54", 95, 42, 12, 36.2, "SINUSAL_ST_ELEVATION", "STEMI Anterolateral extenso (V1-V6, DI, aVL)", "Comatoso posparo",
    "Trombosis aguda de stent en arteria descendente anterior", "Trombosis coronaria (Oclusión total aguda)",
    "Desfibrilación inmediata 200J bifásica, compresiones de alta calidad, Adrenalina + Amiodarona y contacto urgente con Hemodinamista.",
    "Crepitaciones bilaterales en tercio medio.", "Ruidos cardíacos taquicárdicos.", "Piel sudorosa, pálida y fría.", "36.4 °C",
    "Acinesia apical y de pared anterior masiva.", "Líneas B bilaterales.", "VCI 20 mm con escaso colapso.",
    "pH 7.28 | pCO2 37 | pO2 80 | HCO3 17 | Lactato 4.5", "K+ 4.2 | Na+ 138", "HGT: 135 mg/dL", "Troponina I: 8.9 ng/mL",
    "Paciente admite haber suspendido la doble antiagregación plaquetaria por gastritis.", "Aspirina, Clopidogrel (suspendido).", "Ninguna.")

# 16
add(16, "TEP Submasivo que degenera en TV sin pulso por Isquemia de VD", "taquicardia", "TVSP", True, "Avanzado",
    "Patricia Leighton", 61, "F", "Servicio de Urgencias", "Cáncer de ovario en quimioterapia. Trombosis venosa profunda previa.", "Llega con disnea intensa súbita, sincope al ponerse de pie y dolor torácico.",
    170, "72/44", 85, 24, 34, 37.0, "TSVP", "Taquicardia Sinusal con sobrecarga aguda de VD", False, "Shock obstructivo severo e hipoxemia refractaria.", "Somnolienta", "Agotamiento", "Vía 18G",
    "La paciente emite un quejido, pierde la consciencia y el monitor muestra Taquicardia Ventricular sin pulso.",
    0, "0/0", 0, 11, 0, 36.8, "TVSP", "Taquicardia Ventricular sin pulso (TVSP)", "Inconsciente en TVSP",
    108, "90/56", 93, 37, 16, 36.6, "SINUSAL", "Taquicardia Sinusal con patrón S1Q3T3", "Comatosa",
    "Tromboembolismo pulmonar masivo con falla e isquemia aguda de VD", "Trombosis pulmonar (TEP Masivo)",
    "Manejo de ritmo desfibrilable con descarga 200J, reanudación inmediata de RCP, oxígeno al 100% y evaluación de trombolisis sistémica.",
    "Murmullo conservado, estertores escasos.", "R2 pulmonar muy acentuado, ingurgitación yugular marcada.", "Cianosis periférica.", "37.0 °C",
    "Dilatación masiva de VD con aplanamiento del tabique interventricular (D-shape del VI).", "Pleuras libres.", "VCI dilatada > 25 mm fija.",
    "pH 7.25 | pCO2 28 | pO2 52 | HCO3 13 | Lactato 6.1", "K+ 4.4 | Na+ 137", "HGT: 110 mg/dL", "Dímero D: > 15.000 ug/L",
    "Hermana informa hinchazón asimétrica de pierna izquierda desde hace 5 días.", "Carboplatino, Paclitaxel.", "Ninguna.")

# 17
add(17, "Miocarditis Viral Aguda con TV Sostenida y FV", "taquicardia", "FV", True, "Intermedio",
    "Lucas Montero", 21, "M", "Box de Reanimación SAR", "Cuadro gripal febril hace 7 días. Sin antecedentes cardiovasculares.", "Dolor torácico opresivo punzante, palpitaciones rápidas y disnea progresiva en reposo.",
    190, "80/48", 92, 27, 28, 37.8, "TV_MONOMORFA", "Taquicardia Ventricular Monomorfa", False, "Miocarditis con compromiso hemodinámico y arritmia ventricular.", "Pálido, mareado", "Espontánea", "Vía 20G",
    "El paciente sufre un colapso súbito en la camilla y el trazado se convierte en Fibrilación Ventricular.",
    0, "0/0", 0, 11, 0, 37.7, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en FV",
    96, "94/60", 97, 40, 14, 37.4, "SINUSAL", "Ritmo Sinusal con alteraciones difusas de repolarización", "Comatoso posparo",
    "Inflamación miocárdica aguda e inestabilidad eléctrica ventricular", "Trombosis coronaria / Isquemia miocárdica",
    "Desfibrilación 200J, compresiones continuas, soporte inotrópico y antiviral/antiinflamatorio en UCI.",
    "Frote pericárdico sutil audible previamente, murmullo conservado.", "Ruidos taquicárdicos con galope R3.", "Piel tibia pero pálida.", "37.8 °C",
    "Hipocinesia global difusa de VI con derrame pericárdico leve de 6 mm.", "Normales.", "VCI 17 mm.",
    "pH 7.32 | pCO2 34 | pO2 84 | HCO3 18", "K+ 4.1 | Na+ 139", "HGT: 99 mg/dL", "Troponina I: 5.2 ng/mL | PCR: 120 mg/L",
    "Madre refiere que estuvo con faringoamigdalitis viral y fiebre la semana pasada.", "Ibuprofeno.", "Ninguna.")

# 18
add(18, "Taquicardia Auricular Ectópica con Hiperkalemia en ERC que colapsa en AESP", "taquicardia", "AESP", False, "Intermedio",
    "Bernardo Medina", 69, "M", "Servicio de Urgencias Hospitalario", "Enfermedad Renal Crónica etapa 5 en hemodiálisis trisemanal.", "Faltó a sus últimas 2 sesiones de diálisis por problemas de transporte. Palpitaciones y marcada debilidad muscular.",
    160, "76/44", 90, 26, 26, 36.3, "TSVP", "Taquicardia Auricular de QRS ensanchado por hiperkalemia", False, "Hipotensión y toxicidad de membrana miocárdica por potasio.", "Soporoso", "Espontánea", "Fístula AV en brazo izq",
    "Los complejos QRS se ensanchan progresivamente hasta perder el pulso carotídeo, quedando en AESP lenta.",
    0, "0/0", 0, 10, 0, 36.2, "AESP", "Actividad Eléctrica Sin Pulso (AESP con QRS ancho)", "Inconsciente en paro",
    82, "92/60", 96, 38, 12, 36.4, "SINUSAL", "Ritmo Sinusal con T picudas tratadas", "Comatoso",
    "Hiperkalemia severa con toxicidad de membrana miocárdica", "Hiperkalemia",
    "¡ANTÍDOTO DE EMERGENCIA! Gluconato de Calcio al 10% 10-20 ml IV para estabilizar membrana, seguido de Insulina + Glucosa y Bicarbonato de Sodio.",
    "Crepitaciones basales leves por sobrecarga.", "Ruidos apagados rítmicos.", "Piel cetrina, palidez terrosa.", "36.3 °C",
    "Sin derrame pericárdico. Contractilidad conservada.", "Líneas B basales.", "VCI 22 mm con poco colapso.",
    "pH 7.21 | pCO2 30 | pO2 82 | HCO3 12", "K+ 7.6 mEq/L (Hiperkalemia crítica) | Na+ 135", "HGT: 120 mg/dL", "Creatinina: 8.4 mg/dL | BUN: 92 mg/dL",
    "Hijo confirma que no se dializa desde hace 5 días.", "Carbonato de calcio, Furosemida (omitida).", "Ninguna.")

# 19
add(19, "Intoxicación por Antidepresivos Tricíclicos (Amitriptilina) con TV y Colapso", "taquicardia", "TVSP", True, "Avanzado",
    "Constanza Parra", 27, "F", "Box de Reanimación Urgencias", "Depresión mayor en tratamiento. Intento de suicidio con fármacos.", "Ingresa somnolienta con midriasis bilateral, piel seca, taquicardia con QRS ancho (>160 ms) y convulsiones.",
    175, "70/40", 91, 25, 22, 37.4, "TVSP", "Taquicardia de QRS Ancho por Bloqueo de Canales de Na+", False, "Toxicidad cardiovascular grave por tricíclicos.", "Estuporosa, post-ictal", "En riesgo", "Vía 18G",
    "La paciente presenta paro cardiorrespiratorio en TV sin pulso.",
    0, "0/0", 0, 10, 0, 37.3, "TVSP", "Taquicardia Ventricular sin pulso (TVSP)", "Inconsciente en TVSP",
    90, "98/64", 97, 39, 14, 37.0, "SINUSAL", "Ritmo Sinusal con estrechamiento del QRS", "Comatosa intubada",
    "Bloqueo de canales de sodio cardíacos dependientes de voltaje por Amitriptilina", "Tóxicos (Antidepresivos Tricíclicos)",
    "Tratamiento específico: Desfibrilación en paro y BICARBONATO DE SODIO IV 1-2 mEq/kg en bolos repetidos para alcalinizar el plasma (meta pH 7.50-7.55).",
    "Murmullo conservado sin ruidos.", "Ruidos cardíacos taquicárdicos.", "Piel caliente y seca, mucosas resecas, midriasis arreactiva.", "37.4 °C",
    "Corazón anatómicamente normal con mala contractilidad global.", "Normal.", "VCI 16 mm.",
    "pH 7.18 | pCO2 48 | pO2 85 | HCO3 17", "K+ 4.0 | Na+ 138", "HGT: 108 mg/dL", "ECG muestra onda R > 3mm en aVR y QRS de 180 ms",
    "Pareja encontró 3 cajas vacías de Amitriptilina 25mg al lado de su cama.", "Amitriptilina, Clonazepam.", "Ninguna.")

# 20
add(20, "Shock Anafiláctico Severo por Antibiótico con Taquicardia y AESP", "taquicardia", "AESP", False, "Intermedio",
    "Andrés Cárdenas", 45, "M", "Box de Urgencias", "Sin antecedentes alérgicos reportados. Recibió Ceftriaxona IV hace 5 minutos.", "Presenta estridor laríngeo súbito, broncoespasmo severo, eritema generalizado, angioedema labial y colapso circulatorio.",
    160, "55/30", 82, 18, 36, 36.5, "TSVP", "Taquicardia Sinusal refleja extrema por vasodilatación", False, "Shock anafiláctico fulminante.", "Cianótico, combativo, luego pierde consciencia", "Estridor laríngeo inminente", "Vía 18G permeable",
    "El paciente cierra la vía aérea por angioedema masivo, se torna cianótico negruzco y pierde el pulso carotídeo en AESP.",
    0, "0/0", 0, 8, 0, 36.4, "AESP", "Actividad Eléctrica Sin Pulso (AESP anafiláctica)", "Inconsciente en paro",
    100, "92/60", 96, 38, 14, 36.5, "SINUSAL", "Taquicardia Sinusal en recuperación", "Intubado protegido",
    "Vasodilatación sistémica masiva, fuga capilar y colapso de vía aérea por anafilaxia", "Tóxicos / Hipoxia (Anafilaxia severa)",
    "Tratamiento salvador: Adrenalina precoz (IM o IV), Intubación endotraqueal precoz antes del cierre glótico completo y cargas rápidas de suero salino.",
    "Sibilancias audibles a distancia, estridor inspiratorio marcado previo al paro.", "Ruidos apagados rápidos.", "Habones urticariformes confluentes en tórax, angioedema de labios y lengua.", "36.5 °C",
    "Cámaras cardíacas colapsadas por vasodilatación distributiva extrema.", "Broncoespasmo sin neumotórax.", "VCI totalmente colapsada < 5 mm.",
    "pH 7.21 | pCO2 50 | pO2 52 | HCO3 19 | Lactato 5.9", "K+ 4.2 | Na+ 139", "HGT: 110 mg/dL", "Triptasa sérica muy elevada",
    "Enfermera administraba primera dosis de Ceftriaxona por celulitis cuando comenzó con prurito y disnea.", "Ceftriaxona.", "Ninguna declarada.")

# 21
add(21, "Neumotórax a Tensión Espontáneo con TSV que degenera a AESP", "taquicardia", "AESP", False, "Principiante",
    "Tomás Echeverría", 18, "M", "Box SAPU", "Hábito marfanoide, alto y delgado. Fumador ocasional.", "Dolor punzante súbito en hemitórax izquierdo mientras estaba sentado, tos seca y disnea progresiva angustiante.",
    155, "74/42", 84, 21, 34, 36.6, "TSVP", "Taquicardia Sinusal refleja", False, "Shock obstructivo por neumotórax hipertensivo.", "Agitado por hipoxia", "Insuficiencia ventilatoria", "Vía 20G",
    "El paciente se torna cianótico, su tráquea se desvía visiblemente a la derecha y cesa el pulso carotídeo en AESP.",
    0, "0/0", 0, 9, 0, 36.5, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente sin pulso",
    96, "100/66", 98, 40, 14, 36.5, "SINUSAL", "Ritmo Sinusal Normal", "Respira aliviado tras toracocentesis",
    "Rotura de bulas apicales con neumotórax a tensión izquierdo", "Neumotórax a tensión",
    "Descompresión inmediata con aguja/catéter en tórax izquierdo. ¡El retraso para tomar una radiografía es un error fatal!",
    "Silencio auscultatorio completo en hemitórax izquierdo, timpanismo resonante a la percusión.", "Ruidos cardíacos desplazados a la derecha. Ingurgitación yugular.", "Cianosis central.", "36.6 °C",
    "Ventrículo derecho comprimido.", "Ausencia total de deslizamiento pleural izquierdo (bar-code sign en modo M).", "VCI pletórica fija 25 mm.",
    "pH 7.22 | pCO2 54 | pO2 48 | HCO3 20", "Normales", "HGT: 104 mg/dL", "Sin antecedentes traumáticos",
    "Amigo relata que sintió un 'chasquido' en el pecho jugando videojuegos y no podía respirar.", "Ninguno.", "Ninguna.")

# 22
add(22, "Hemotórax Masivo por Trauma Torácico Penetrante con AESP", "taquicardia", "AESP", False, "Intermedio",
    "Rodrigo Tapia", 33, "M", "Box de Reanimación Urgencias", "Herida por arma de fuego en región axilar derecha.", "Shock hemorrágico severo, palidez terrosa y disnea aguda con gran taquicardia.",
    165, "62/34", 86, 19, 32, 35.8, "TSVP", "Taquicardia Sinusal compensatoria de shock hemorrágico", False, "Shock hipovolémico grado IV.", "Somnoliento, hipotenso", "En riesgo", "Vía venosa 16G",
    "El paciente cae en apnea y paro cardiorrespiratorio en AESP por desangramiento intratorácico.",
    0, "0/0", 0, 8, 0, 35.7, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente en AESP",
    102, "88/54", 94, 35, 16, 36.0, "SINUSAL", "Taquicardia Sinusal con resucitación de volumen", "Intubado para pabellón",
    "Shock hipovolémico hemorrágico masivo por lesión vascular intratorácica", "Hipovolemia (Hemotórax masivo)",
    "Tratamiento: Carga rápida masiva de suero fisiológico y transfusión MTP, tubo de drenaje pleural y toracotomía de urgencia.",
    "Matidez intensa a la percusión en hemitórax derecho con abolición del murmullo pulmonar.", "Ruidos cardíacos taquicárdicos filiformes. Yugulares colapsadas.", "Palidez extrema, frialdad distal.", "35.8 °C",
    "Cámaras cardíacas hipovolémicas vacías.", "Gran colección líquida anecoica intratorácica derecha (>1500 ml).", "VCI colapsada filiforme < 4 mm.",
    "pH 7.18 | pCO2 32 | pO2 70 | HCO3 12 | Lactato 7.8", "K+ 3.8 | Na+ 137", "HGT: 90 mg/dL", "Hemoglobina: 6.2 g/dL | Hematocrito: 19%",
    "Paramédicos informan impacto de bala único en tórax hace 15 minutos.", "Ninguno.", "Ninguna.")

# 23
add(23, "Rotura de Aneurisma de Aorta Abdominal con Taquicardia y Paro en AESP", "taquicardia", "AESP", False, "Avanzado",
    "Renato Carrasco", 72, "M", "Box de Reanimación Hospitalario", "HTA severa, tabaquismo activo. Masa pulsátil abdominal conocida.", "Dolor lumbar y abdominal desgarrante súbito, síncope y lipotimia en el baño.",
    150, "60/30", 87, 20, 28, 35.5, "TSVP", "Taquicardia refleja extrema por colapso circulatorio", False, "Shock hemorrágico cataclísmico por rotura vascular.", "Obnubilado, pálido como el papel", "Espontánea", "Dos vías 16G",
    "El abdomen se distiende visiblemente, el pulso carotídeo se desvanece y el monitor queda en AESP bradicárdica agónica.",
    0, "0/0", 0, 9, 0, 35.4, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", "Inconsciente en paro por exanguinación",
    98, "86/50", 94, 34, 16, 35.8, "SINUSAL", "Ritmo Sinusal con volemia de rescate", "En camino a pabellón vascular",
    "Exanguinación retroperitoneal e intraperitoneal masiva por rotura de AAA", "Hipovolemia (Rotura de AAA)",
    "Prioridad: Carga rápida masiva de cristaloides (suero salino), protocolo de transfusión masiva 1:1:1 y aviso urgente a Cirugía Vascular.",
    "Murmullo pulmonar simétrico bilateral.", "Ruidos cardíacos lejanos. Masa abdominal pulsátil dolorosa.", "Palidez de porcelana extrema.", "35.5 °C",
    "Ventrículo izquierdo casi vacío en sístole.", "Sin neumotórax.", "Aorta abdominal dilatada a 7.5 cm con hematoma retroperitoneal evidente. VCI colapsada.",
    "pH 7.12 | pCO2 28 | pO2 76 | HCO3 9 | Lactato 10.2 mmol/L", "K+ 4.0 | Na+ 138", "HGT: 110 mg/dL", "Hematocrito: 17% | Hemoglobina: 5.5 g/dL",
    "Esposa relata que gritó de dolor en la cintura y se desmayó en el suelo.", "Atenolol, Losartán.", "Ninguna.")

# 24
add(24, "Síndrome de Brugada Tipo 1 Desencadenado por Fiebre con TV Polimorfa y FV", "taquicardia", "FV", True, "Avanzado",
    "Álvaro Cisternas", 34, "M", "Servicio de Urgencias", "Hermano fallecido de muerte súbita a los 29 años.", "Cuadro febril de 39.5°C por influenza. Presenta palpitaciones rápidas, mareo severo y síncope en la sala de espera.",
    205, "76/45", 91, 26, 30, 39.4, "TVSP", "TV Polimorfa / Taquicardia Ventricular Brugada", False, "Inestabilidad hemodinámica y riesgo inminente de muerte súbita arrítmica.", "Confuso, sudoroso", "Espontánea", "Vía 20G",
    "El paciente entra en pérdida de consciencia súbita y el monitor registra Fibrilación Ventricular caótica.",
    0, "0/0", 0, 10, 0, 39.3, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en paro en FV",
    88, "104/68", 97, 41, 14, 38.6, "SINUSAL", "Ritmo Sinusal con patrón de Brugada en aleta de tiburón en V1-V2", "Recupera conciencia",
    "Canalopatía cardíaca (mutación SCN5A) desenmascarada por fiebre alta", "Trombosis coronaria / Arritmia canalopática",
    "Desfibrilación 200J inmediata, antipiréticos agresivos (Paracetamol IV) para bajar la temperatura y evitar fármacos bloqueadores de sodio.",
    "Murmullo vesicular normal.", "Ruidos cardíacos arrítmicos caóticos.", "Piel intensamente caliente por fiebre, pero extremidades frías.", "39.4 °C",
    "Corazón estructuralmente sano con FEy normal.", "Pleuras normales.", "VCI 15 mm.",
    "pH 7.34 | pCO2 35 | pO2 88 | HCO3 19", "K+ 4.1 | Na+ 140", "HGT: 104 mg/dL", "ECG basal muestra elevación del ST cóncava >2mm en V1-V2 (Patrón Brugada Tipo 1)",
    "Madre refiere antecedentes familiares de muerte súbita durante el sueño.", "Paracetamol casero.", "Ninguna.")

# 25
add(25, "Crisis Tirotóxica (Tormenta Tiroidea) con FA rápida y Colapso en AESP", "taquicardia", "AESP", False, "Avanzado",
    "Camila Donoso", 31, "F", "Box de Urgencias", "Enfermedad de Graves-Basedow con mal apego al tratamiento.", "Hipertermia de 40.1°C, delirio agitado, diarrea, temblor fino, bocio difuso y taquicardia extrema incontrolable.",
    190, "80/42", 90, 24, 34, 40.1, "FA_RVR", "Fibrilación Auricular con RVR extrema", False, "Falla circulatoria de alto gasto descompensada e hipertermia maligna.", "Delirante, desorientada", "Espontánea", "Vía 18G",
    "La paciente presenta un colapso cardiovascular abrupto, hace apnea y el monitor registra AESP taquicárdica sin pulso.",
    0, "0/0", 0, 12, 0, 40.0, "AESP", "Actividad Eléctrica Sin Pulso (AESP tirotóxica)", "Inconsciente en paro",
    110, "92/58", 95, 38, 16, 39.0, "FA_RVR", "FA con frecuencia controlada con Propranolol posparo", "Comatosa en UCI",
    "Insuficiencia cardíaca aguda de alto gasto por tormenta tiroidea", "Tóxicos (Hormona tiroidea endógena) / Hipertermia",
    "Reanimación cardiopulmonar de alta calidad, Adrenalina 1mg, enfriamiento activo agresivo y tratamiento antitiroideo (Propiltiouracilo/Metimazol, Yodo, Corticoides y Betabloqueo).",
    "Murmullo conservado, crepitaciones bilaterales basales.", "Ruidos cardíacos hiperdinámicos muy rápidos. Bocio palpable con soplo.", "Piel enrojecida, caliente y muy sudorosa.", "40.1 °C",
    "Gasto cardíaco masivamente elevado (>10 L/min) con cavidades derechas sobrecargadas.", "Líneas B escasas.", "VCI 20 mm.",
    "pH 7.24 | pCO2 30 | pO2 82 | HCO3 13 | Lactato 5.4", "K+ 3.4 | Na+ 136", "HGT: 125 mg/dL", "T4 libre: > 7.7 ng/dL (Elevadísima) | TSH: < 0.01",
    "Hermana informa que dejó de tomar el Metimazol hace 1 mes y estaba muy estresada.", "Metimazol (abandonado).", "Ninguna.")

print(f"Generated {len(cases)} tachy cases.")

# --- CASES 26 TO 50: BRADIARRITMIAS ---
# 26
add(26, "Bradicardia Sinusal Severa por Intoxicación con Betabloqueadores y Asistolia", "bradicardia", "ASISTOLIA", False, "Intermedio",
    "Esteban Morales", 55, "M", "Box de Reanimación SAPU", "Hipertensión arterial. Ingesta masiva de Propranolol con fines suicidas.", "Bradilálico, mareado, extremidades heladas con sudoración profusa tras ingerir 40 comprimidos de Propranolol 40mg.",
    32, "68/38", 91, 33, 14, 35.8, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Severa Tóxica", False, "Shock cardiogénico por intoxicación con betabloqueadores.", "Somnoliento profundo", "Espontánea", "Vía 18G",
    "La frecuencia cardíaca cae a 20 lpm y finalmente la actividad eléctrica se aplana en Asistolia completa.",
    0, "0/0", 0, 9, 0, 35.7, "ASISTOLIA", "Asistolia (Línea Plana)", "Paro en Asistolia por betabloqueador",
    65, "92/60", 96, 38, 14, 36.2, "SINUSAL", "Ritmo de escape sinusal tras infusión de Glucagón", "Comatoso intubado",
    "Bloqueo masivo de receptores beta-1 y beta-2 miocárdicos", "Tóxicos (Betabloqueadores)",
    "Tratamiento antídoto específico: GLUCAGÓN 5-10 mg IV en bolo (actúa vía adenilato ciclasa independiente del receptor beta), Calcio IV e infusión de insulina en altas dosis (HIET).",
    "Murmullo pulmonar limpio bilateral.", "Ruidos cardíacos extremadamente lentos.", "Piel fría y sudorosa, relleno capilar > 4 segundos.", "35.8 °C",
    "Bradiquinesia severa con fracción de eyección deprimida (FEy 25%). Sin derrame.", "Pleuras limpias.", "VCI 18 mm.",
    "pH 7.22 | pCO2 44 | pO2 80 | HCO3 17", "K+ 4.8 | Na+ 138", "HGT: 68 mg/dL (Hipoglicemia inducida por betabloqueo)", "Toxicológico positivo para Propranolol",
    "Esposa encontró las cajas vacías de Propranolol en el baño.", "Propranolol, Hidroclorotiazida.", "Ninguna.")

# 27
add(27, "Bloqueo AV Completo (3er Grado) por Hiperkalemia Crítica (8.1 mEq/L) con Asistolia", "bradicardia", "ASISTOLIA", False, "Avanzado",
    "Guillermo Palma", 71, "M", "Servicio de Urgencias", "ERC etapa 5 en diálisis peritoneal. Ingesta de sustitutos de sal con cloruro de potasio.", "Compromiso de consciencia, tetraparesia flácida arrefléctica y disnea.",
    26, "62/34", 88, 28, 12, 36.1, "BAV_3", "Bloqueo AV de 3er Grado (Completo) con escape idioventricular", False, "Disociación AV completa y shock por hiperkalemia extrema.", "Soporoso no reactivo", "Bradipneico", "Vía venosa 18G",
    "El ritmo idioventricular de escape se enlentece, se transforma en onda sinusoidal y se apaga en Asistolia plana.",
    0, "0/0", 0, 8, 0, 36.0, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en paro por potasio",
    68, "96/62", 96, 39, 14, 36.3, "SINUSAL", "Ritmo Sinusal con conducción AV restaurada", "Intubado para hemodiálisis urgente",
    "Inactivación de canales de sodio por hiperkalemia crítica", "Hiperkalemia",
    "¡EMERGENCIA MÉDICA MÁXIMA! GLUCONATO DE CALCIO AL 10% 20-30 ml IV en bolo para revertir el paro, Bicarbonato de Sodio 50-100 mEq y Solución Polarizante.",
    "Hipoventilación difusa, murmullo disminuido.", "Ruidos cardíacos agónicos aislados sin sincronía auricular.", "Piel pálida cérea, hipotonía muscular absoluta.", "36.1 °C",
    "Miocardio aturdido con contracciones muy lentas inefectivas.", "Líneas A normales.", "VCI 20 mm.",
    "pH 7.10 | pCO2 30 | pO2 80 | HCO3 11", "K+ 8.1 mEq/L (Nivel letal de potasio) | Na+ 132 | Ca2+ iónico 0.95 mmol/L", "HGT: 110 mg/dL", "ECG previo mostraba ausencia de ondas P y complejos sine-wave",
    "Hija refiere que estuvo tomando sales dietéticas de potasio y no se dializó.", "Enalapril, Espironolactona (combinación mortal).", "Ninguna.")

# 28
add(28, "Bloqueo AV de 2° Grado Mobitz II en IAM Anteroseptal que degenera en TVSP", "bradicardia", "TVSP", True, "Intermedio",
    "Carlos Alarcón", 64, "M", "Box de Reanimación Urgencias", "Dolor precordial opresivo de 3 horas de evolución irradiado a cuello.", "Dolor precordial persistente, sudoración fría y mareo intenso al sentarse.",
    38, "72/42", 92, 31, 22, 36.5, "BAV_2_MOBITZ_2", "Bloqueo AV 2° Grado Mobitz II con conducción 2:1", False, "Inestabilidad hemodinámica e isquemia del sistema de conducción infrageniculado.", "Consciente angustiado", "Espontánea", "Vía 18G",
    "El paciente sufre un síncope brusco y el monitor degenera súbitamente a Taquicardia Ventricular sin pulso.",
    0, "0/0", 0, 11, 0, 36.4, "TVSP", "Taquicardia Ventricular sin pulso (TVSP)", "Inconsciente en paro",
    80, "90/58", 95, 41, 14, 36.3, "SINUSAL_ST_ELEVATION", "STEMI Anterior con QRS angosto y marcapasos en standby", "Comatoso posparo",
    "Necrosis isquémica aguda del haz de His y ramas bundle por oclusión de DA", "Trombosis coronaria (IAM Anteroseptal)",
    "Mobitz II no responde bien a atropina (requiere Marcapasos transcutáneo). En paro por TVSP: Desfibrilación 200J y RCP inmediata.",
    "Crepitaciones pulmonares bibasales.", "Ruidos bradicárdicos con pausas regulares 2:1.", "Piel pálida y sudorosa.", "36.5 °C",
    "Acinesia septal anterior extensa.", "Líneas B escasas.", "VCI 18 mm.",
    "pH 7.30 | pCO2 36 | pO2 82 | HCO3 18 | Lactato 3.8", "K+ 4.1 | Na+ 139", "HGT: 140 mg/dL", "Troponina I: 3.8 ng/mL | ECG confirma supradesnivel ST en V1-V4",
    "Esposa relata que el dolor comenzó paleando tierra en el jardín.", "Aspirina.", "Ninguna.")

# 29
add(29, "Intoxicación por Calcioantagonistas (Verapamilo) con Bradicardia Nodal y AESP", "bradicardia", "AESP", False, "Avanzado",
    "Patricia Mella", 49, "F", "Box de Reanimación SAPU", "Hipertensa en tratamiento con Verapamilo. Ingesta tóxica de 30 tabletas de 120mg.", "Soporosa, extremadamente hipotensa, bradicárdica y con náuseas incoercibles.",
    28, "58/32", 90, 29, 14, 36.0, "BRADICARDIA_SINUSAL", "Ritmo de Escape de la Unión Lento (28 lpm)", False, "Shock cardiogénico por sobredosis de calcioantagonistas.", "Sopor profundo", "Espontánea", "Vía 18G",
    "La paciente entra en apnea, el pulso carotídeo se pierde por completo y queda en AESP con complejos lentos.",
    0, "0/0", 0, 10, 0, 35.9, "AESP", "Actividad Eléctrica Sin Pulso (AESP por Verapamilo)", "Inconsciente en AESP",
    60, "90/56", 96, 38, 12, 36.2, "SINUSAL", "Ritmo Sinusal con Marcapasos transcutáneo de captura", "Intubada en UCI",
    "Bloqueo masivo de canales de calcio tipo L miocárdicos y vasculares", "Tóxicos (Calcioantagonistas)",
    "Tratamiento salvador: Gluconato de Calcio IV en dosis altas (10-30 ml al 10%), Terapia de Insulina a altas dosis con Dextrosa (HIET) y Vasopresores.",
    "Murmullo conservado bilateralmente.", "Ruidos cardíacos muy apagados y lentos.", "Piel fría y cérea, hipotensión extrema refractaria.", "36.0 °C",
    "Contractilidad miocárdica severamente deprimida difusa (FEy < 20%).", "Normal.", "VCI 17 mm.",
    "pH 7.20 | pCO2 38 | pO2 84 | HCO3 15 | Lactato 5.1", "K+ 4.2 | Na+ 138 | Ca2+ normal en sangre pero canales bloqueados", "HGT: 240 mg/dL (Hiperglicemia típica de toxicidad por Verapamilo)", "Toxicológico confirma Verapamilo",
    "Hija encontró blisters vacíos de Verapamilo 120 mg.", "Verapamilo retard.", "Ninguna.")

# 30
add(30, "Hipotermia Severa Accidental (27.5 °C) con Bradicardia Extrema que cae en FV", "bradicardia", "FV", True, "Avanzado",
    "Víctor Mardones", 58, "M", "Box de Reanimación Urgencias", "Persona en situación de calle. Encontrado a la intemperie en noche helada (-2°C).", "Comatoso, rigidez muscular, bradipnea severa de 4 rpm, piel helada como mármol y bradicardia de 22 lpm.",
    22, "50/28", 80, 20, 6, 27.5, "BRADICARDIA_SINUSAL", "Bradicardia Extrema por Hipotermia con ondas de Osborn", False, "Hipotermia severa grado III con inestabilidad eléctrica miocárdica.", "Coma hipotérmico", "Bradipnea crítica", "Vía central femoral",
    "Al movilizar al paciente para instalar apósitos térmicos, el miocardio irritable fibrila y cae en FV por hipotermia.",
    0, "0/0", 0, 8, 0, 27.4, "FV", "Fibrilación Ventricular por Hipotermia", "Inconsciente en FV",
    75, "92/60", 94, 38, 12, 34.0, "SINUSAL", "Ritmo Sinusal con onda J de Osborn en retroceso", "Comatoso en recalentamiento activo",
    "Hipotermia severa accidental con miocardio hiperexcitable a estímulos mecánicos", "Hipotermia",
    "Axioma ACLS: 'Nadie está muerto hasta que está caliente y muerto' (recalentar hasta > 32-35°C). Limitar descargas a máximo 3 hasta recalentar.",
    "Bradipnea superficial extrema (4 rpm), murmullo vesicular apenas audible.", "Ruidos cardíacos casi imperceptibles a 22 lpm.", "Rigidez fría marmórea, piel helada al tacto.", "27.5 °C (Termómetro esofágico)",
    "Contracción cardíaca sumamente lenta y perezosa.", "Normal.", "VCI 14 mm.",
    "pH 7.15 (corregido por T°) | pCO2 48 | pO2 65 | HCO3 16", "K+ 3.8 | Na+ 136", "HGT: 62 mg/dL", "ECG muestra clásicas Ondas J de Osborn en cara inferior y precordiales",
    "Carabineros lo encontró inconsciente en la ribera del río.", "Ninguno conocido.", "Ninguna.")

# 31
add(31, "IAM Inferior Agudo con Reflejo de Bezold-Jarisch y Colapso en AESP", "bradicardia", "AESP", False, "Intermedio",
    "Héctor Valenzuela", 67, "M", "Box de Reanimación SAPU", "Diabético e hipertenso. Dolor epigástrico opresivo y náuseas intensas.", "Llega con náuseas, vómitos, diaforesis fría, bradicardia extrema y sensación de desmayo.",
    34, "66/38", 91, 30, 20, 36.4, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal con supradesnivel ST en DII, DIII y aVF", False, "Shock cardiogénico con hipertonía vagal refleja por isquemia de pared inferior.", "Obnubilado, nauseoso", "Espontánea", "Vía 18G",
    "El paciente emite un quejido, vomita, pierde el tono postural y cae en AESP sin pulso carotídeo.",
    0, "0/0", 0, 11, 0, 36.3, "AESP", "Actividad Eléctrica Sin Pulso (AESP isquémica)", "Inconsciente en AESP",
    76, "90/58", 96, 40, 14, 36.3, "SINUSAL_ST_ELEVATION", "STEMI Inferior posparo para Hemodinamia", "Comatoso posparo",
    "Isquemia aguda de arteria coronaria derecha con reflejo vagal inhibitorio (Bezold-Jarisch)", "Trombosis coronaria (IAM de cara inferior)",
    "Atropina 1mg IV en bradicardia inicial. En paro en AESP: RCP de alta calidad, Adrenalina 1mg y activación inmediata de Angioplastía primaria.",
    "Murmullo pulmonar limpio bilateral.", "Bradicardia profunda rítmica.", "Palidez, sudoración fría profusa y piloerección.", "36.4 °C",
    "Acinesia segmentaria de cara inferior y pared de ventrículo derecho.", "Normal bilateral.", "VCI 19 mm.",
    "pH 7.31 | pCO2 36 | pO2 84 | HCO3 18 | Lactato 3.6", "K+ 4.0 | Na+ 139", "HGT: 155 mg/dL", "Troponina ultrasensible: 680 ng/L | ECG muestra supradesnivel ST en cara inferior",
    "Esposa confirma que el dolor comenzó después de almorzar, confundiéndolo con acidez.", "Metformina, Losartán.", "Ninguna.")

# 32
add(32, "Taponamiento Cardíaco por Pericarditis Urémica con Bradicardia Terminal y AESP", "bradicardia", "AESP", False, "Avanzado",
    "Margarita Godoy", 63, "F", "Servicio de Urgencias Hospitalario", "ERC no dializada por rechazo de la paciente. Síndrome urémico crónico.", "Disnea de reposo ortopneica, ingurgitación yugular marcada, pulso paradójico y ruidos velados.",
    38, "64/46", 88, 24, 28, 36.3, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal de bajo voltaje con alternancia eléctrica", False, "Shock obstructivo pericárdico terminal.", "Soporosa profunda", "Ortopneica", "Vía 20G",
    "La presión de pulso se estrecha a cero, la paciente pierde la consciencia y queda en AESP bradicárdica.",
    0, "0/0", 0, 10, 0, 36.2, "AESP", "Actividad Eléctrica Sin Pulso (AESP por Taponamiento)", "Inconsciente en paro",
    84, "96/64", 95, 38, 14, 36.5, "SINUSAL", "Ritmo Sinusal tras Pericardiocentesis evacuadora", "Consciente aliviada",
    "Taponamiento cardíaco por derrame pericárdico urémico hemático a tensión", "Taponamiento cardíaco",
    "La AESP no se resuelve sin descompresión: PERICARDIOCENTESIS SUBXIFOIDEA urgente guiada por ecografía para extraer líquido a tensión.",
    "Murmullo vesicular conservado bilateralmente sin neumotórax.", "Ruidos cardíacos apagados lejanos. Ingurgitación yugular visible hasta la mandíbula.", "Piel pálida cetrina con escarcha urémica.", "36.3 °C",
    "Derrame pericárdico severo anecoico con fibrina que comprime y colapsa la aurícula y ventrículo derecho en diástole.", "Líneas A normales.", "VCI pletórica dilatada > 28 mm sin colapso respiratorio.",
    "pH 7.18 | pCO2 32 | pO2 80 | HCO3 13 | Urea: 210 mg/dL | Creatinina: 9.8 mg/dL", "K+ 5.4 | Na+ 136", "HGT: 102 mg/dL", "ECG muestra bajo voltaje generalizado y alternancia eléctrica",
    "Hijo confirma diagnóstico de uremia terminal no dializada.", "Ninguno habitual.", "Ninguna.")

# 33
add(33, "Status Asmático Crítico con Bradicardia Hipóxica Terminal y Asistolia", "bradicardia", "ASISTOLIA", False, "Intermedio",
    "Matías Albornoz", 17, "M", "Box de Reanimación SAPU", "Asma bronquial severa de difícil control. Múltiples hospitalizaciones en UCI.", "Crisis asmática de 6 horas sin respuesta a inhaladores. Silencio auscultatorio torácico y agotamiento.",
    36, "62/35", 68, 55, 8, 36.7, "BRADICARDIA_SINUSAL", "Bradicardia Extrema por Hipoxia Terminal (36 lpm)", False, "Paro respiratorio inminente por fatiga de musculatura ventilatoria.", "Comatoso por hipercapnia e hipoxia", "Silencio auscultatorio", "Vía 20G",
    "El paciente entra en apnea definitiva, se torna cianótico negruzco y el monitor cae en Asistolia plana.",
    0, "0/0", 0, 7, 0, 36.6, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en apnea y asistolia",
    88, "96/60", 97, 36, 12, 36.5, "SINUSAL", "Ritmo Sinusal tras ventilación invasiva efectiva", "Intubado conectado a VM",
    "Asfixia e hipoxia cerebral y miocárdica crítica por obstrucción bronquial masiva", "Hipoxia / Acidosis respiratoria severa",
    "Prioridad de supervivencia: INTUBACIÓN OROTRAQUEAL inmediata, ventilación con O2 al 100%, Adrenalina 1mg IV y broncodilatadores por TET.",
    "Tórax silente (ausencia de murmullo pulmonar y sibilancias por falta de flujo aéreo).", "Ruidos cardíacos apenas perceptibles muy bradicárdicos.", "Cianosis central profunda facial y ungueal.", "36.7 °C",
    "Sobrecarga aguda de cavidades derechas por vasoconstricción hipóxica pulmonar.", "Signos ecográficos de hiperinsuflación pulmonar.", "VCI pletórica 22 mm.",
    "pH 7.02 | pCO2 92 mmHg (Hipercapnia crítica) | pO2 38 mmHg | HCO3 22 | Lactato 6.5", "K+ 4.5 | Na+ 138", "HGT: 118 mg/dL", "GSA muestran acidosis mixta letal",
    "Amigo relata que estuvo usando el inhalador cada 10 minutos sin alivio.", "Salbutamol, Fluticasona.", "Ninguna.")

# 34
add(34, "Shock Neurogénico por Trauma Raquimedular Cervical con Bradicardia y AESP", "bradicardia", "AESP", False, "Intermedio",
    "Sebastián Vera", 25, "M", "Box de Reanimación Urgencias", "Accidente por piquero en piscina poco profunda con traumatismo cervical.", "Tetraplejía flácida inmediata, hipotensión severa y bradicardia paradójica sin taquicardia compensatoria.",
    35, "58/30", 93, 26, 10, 35.2, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal por Pérdida de Tono Simpático", False, "Shock neurogénico por sección medular cervical alta.", "Consciente pero tetrapléjico y somnoliento", "Respiración diafragmática débil", "Vía 18G",
    "El paciente presenta apnea por compromiso de músculos intercostales y cae en AESP bradicárdica.",
    0, "0/0", 0, 10, 0, 35.1, "AESP", "Actividad Eléctrica Sin Pulso (AESP neurogénica)", "Inconsciente en paro",
    72, "94/62", 98, 38, 12, 35.8, "SINUSAL", "Ritmo Sinusal estable con soporte de Noradrenalina", "Intubado con collar cervical rígido",
    "Pérdida del tono simpático vascular y cardíaco por shock neurogénico cervical", "Shock neurogénico / Hipovolemia relativa",
    "Tratamiento: Cargas de cristaloides (suero salino), Vasopresores tempranos (Noradrenalina/Dopamina), Adrenalina 1mg y protección estricta de columna cervical.",
    "Respiración exclusivamente diafragmática, murmullo pulmonar simétrico.", "Ruidos cardíacos rítmicos muy bradicárdicos.", "Piel caliente y seca por debajo del nivel de la lesión (vasodilatación simpática). Priapismo.", "35.2 °C",
    "Corazón anatómicamente normal con fracción de eyección conservada pero bradicárdico.", "Normal bilateral.", "VCI colapsable por venodilatación masiva.",
    "pH 7.30 | pCO2 46 | pO2 82 | HCO3 21", "Normales", "HGT: 102 mg/dL", "Radiografía y TAC confirman luxofractura C5-C6",
    "Amigos relatan que se lanzó un piquero y golpeó su cabeza contra el fondo de la piscina.", "Ninguno.", "Ninguna.")

# 35
add(35, "Intoxicación por Organofosforados (Insecticida) con Síndrome Colinérgico y Asistolia", "bradicardia", "ASISTOLIA", False, "Avanzado",
    "Luis Alberto Sanhueza", 52, "M", "Box de Reanimación SAR", "Trabajador agrícola. Fumigación sin equipo de protección personal con Clorpirifos.", "Sialorrea masiva, broncorrea abundante, miosis puntiforme bilateral, fasciculaciones musculares y bradicardia.",
    28, "65/35", 78, 40, 28, 36.2, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Extrema por Hiperestimulación Colinérgica", False, "Crisis colinérgica grave con broncorrea e insuficiencia respiratoria.", "Estuporoso, babeando copiosamente", "Inundación por secreciones bronquiales", "Vía 18G",
    "El paciente se broncoaspira masivamente con sus propias secreciones, entra en apnea y la actividad eléctrica se extingue en Asistolia.",
    0, "0/0", 0, 8, 0, 36.1, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por organofosforados",
    78, "96/62", 95, 37, 14, 36.4, "SINUSAL", "Ritmo Sinusal con pupilas midriáticas tras Atropinización masiva", "Intubado en observación",
    "Inhibición irreversible de la acetilcolinesterasa con crisis colinérgica masiva", "Tóxicos (Organofosforados / Colinérgicos)",
    "¡ANTÍDOTO DE ELECCIÓN! ATROPINA EN DOSIS MASIVAS (2 a 5 mg IV en bolo cada 3-5 minutos hasta secar secreciones bronquiales) y Pralidoxima.",
    "Auscultación pulmonar inundada de roncus, estertores crepitantes húmedos difusos (broncorrea masiva).", "Ruidos cardíacos lentos amortiguados.", "Diaforesis profusa, salivación líquida abundante, miosis bilateral en cabeza de alfiler.", "36.2 °C",
    "Corazón estructuralmente normal con ritmo bradicárdico.", "Patrón de 'pulmón húmedo' con líneas B confluentes por broncorrea.", "VCI 16 mm.",
    "pH 7.18 | pCO2 58 | pO2 46 | HCO3 20", "Normales", "HGT: 110 mg/dL", "Actividad de colinesterasa plasmática: < 10% del valor normal",
    "Compañero de faena agrícola informa que estuvo fumigando huerto de manzanos sin máscara.", "Ninguno.", "Ninguna.")

# 36
add(36, "Intoxicación Digitálica (Digoxina) con Ritmo de la Unión y FV", "bradicardia", "FV", True, "Avanzado",
    "Carmen Gloria Valdés", 79, "F", "Box de Reanimación Urgencias", "FA crónica e insuficiencia cardíaca tratada con Digoxina. Insuficiencia renal reciente.", "Náuseas, vómitos, visión amarilla (xantopsia), mareos y confusión mental progresiva.",
    34, "70/40", 92, 28, 16, 36.4, "DIGITALIS_TOXICITY", "Ritmo de la Unión Lento con Cubeta Digitálica", False, "Intoxicación digitálica sintomática con compromiso hemodinámico.", "Confusa, quejumbrosa", "Espontánea", "Vía 20G",
    "La paciente presenta extrasístoles ventriculares frecuentes que degeneran en Fibrilación Ventricular caótica.",
    0, "0/0", 0, 10, 0, 36.3, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en paro en FV",
    72, "98/64", 96, 39, 14, 36.5, "SINUSAL", "Ritmo Sinusal con anticuerpos antidigoxina administrados", "Comatosa posparo",
    "Inhibición de la bomba Na+/K+ ATPasa miocárdica con sobrecarga de calcio intracelular", "Tóxicos (Intoxicación Digitálica)",
    "En FV: Desfibrilación 200J. Antídoto definitivo: Fragmentos de anticuerpos específicos antidigoxina (Fab / DigiFab) y corregir hipokalemia si existe.",
    "Murmullo pulmonar normal.", "Ruidos cardíacos lentos regulares con cubeta digitálica en ECG.", "Pálida, sudorosa.", "36.4 °C",
    "Fracción de eyección conservada con hipercontractilidad pero arritmias ventriculares.", "Normal.", "VCI 15 mm.",
    "pH 7.33 | pCO2 36 | pO2 86 | HCO3 19", "K+ 5.6 mEq/L (Hiperkalemia por intoxicación digitálica) | Na+ 138", "HGT: 105 mg/dL", "Nivel sérico de Digoxina: 4.8 ng/mL (Rango tóxico > 2.0)",
    "Hija confirma que por error se tomó el doble de dosis de Digoxina durante la última semana.", "Digoxina 0.25 mg, Furosemida.", "Ninguna.")

# 37
add(37, "Bloqueo AV de 2° Grado Mobitz I (Wenckebach) con Deshidratación Severa y AESP", "bradicardia", "AESP", False, "Principiante",
    "Pedro Naranjo", 77, "M", "Box de Reanimación SAPU", "Hipertrofia prostática. Cuadro gastrointestinal de vómitos y diarrea de 3 días.", "Llega muy decaído, mareado, con sequedad de boca extrema, oliguria y pulso irregularmente lento.",
    38, "68/38", 89, 23, 20, 35.9, "BAV_2_WENCKEBACH", "Bloqueo AV 2° Grado Mobitz I (Fenómeno de Wenckebach)", False, "Shock hipovolémico deshidratativo con bloqueo nodal AV.", "Somnoliento, responde débilmente", "Espontánea", "Vía 20G",
    "El paciente no responde al estímulo doloroso, el pulso carotídeo se extingue y queda en AESP con complejos anchos.",
    0, "0/0", 0, 9, 0, 35.8, "AESP", "Actividad Eléctrica Sin Pulso (AESP por hipovolemia)", "Inconsciente en AESP",
    75, "94/62", 96, 37, 14, 36.2, "SINUSAL", "Ritmo Sinusal con conducción AV 1:1 restablecida tras volumen", "Alerta y orientado",
    "Hipovolemia severa que empeora la perfusión del nodo AV", "Hipovolemia (Deshidratación crítica)",
    "En este caso la causa primaria del colapso es la HIPOVOLEMIA: La infusión rápida de suero fisiológico restablece el retorno venoso, la perfusión nodal y el pulso.",
    "Murmullo vesicular limpio bilateral sin crépitos.", "Ruidos cardíacos con alargamiento progresivo y pausa típica de Wenckebach.", "Piel seca, signo del pliegue positivo, lengua tostada.", "35.9 °C",
    "Cámaras cardíacas colapsables de paredes hiperdinámicas sin derrame.", "Normal.", "VCI colapsada totalmente < 5 mm.",
    "pH 7.32 | pCO2 33 | pO2 88 | HCO3 17", "K+ 3.4 | Na+ 148", "HGT: 92 mg/dL", "BUN: 68 mg/dL | Creatinina: 2.4 mg/dL",
    "Esposa confirma que no orina desde hace 24 horas y no ha podido comer nada.", "Tamsulosina.", "Ninguna.")

# 38
add(38, "Hipoglicemia Severa (16 mg/dL) por Sobredosis de Sulfonilureas con Bradicardia y Asistolia", "bradicardia", "ASISTOLIA", False, "Principiante",
    "Rosa María Troncoso", 73, "F", "Servicio de Urgencias", "Diabetes Mellitus 2 tratada con Glibenclamida. ERC no diagnosticada.", "Encontrada inconsciente por su esposo en la cama, empapada en sudor frío profuso, en coma no reactivo.",
    30, "65/35", 92, 28, 12, 35.6, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Profunda Neuroglucopénica", False, "Coma hipoglicémico con depresión de centros autonómicos cerebrales.", "Comatosa no reactiva", "Espontánea", "Vía 20G",
    "La paciente presenta un paro respiratorio seguido de asistolia eléctrica completa en el osciloscopio.",
    0, "0/0", 0, 8, 0, 35.5, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por neuroglucopenia",
    72, "100/66", 97, 39, 14, 36.2, "SINUSAL", "Ritmo Sinusal normal tras infusión de Glucosa al 30%", "Despierta y orientada",
    "Deprivación crítica de glucosa a nivel del sistema nervioso central y marcapasos cardíaco", "Hipoglicemia / Fármacos (Sulfonilureas)",
    "¡TRATAMIENTO INMEDIATO! SUERO GLUCOSADO AL 30% O 50% 50-100 ml IV en bolo rápido. La hipoglicemia es causa reversible primaria de colapso.",
    "Murmullo pulmonar simétrico bilateral.", "Ruidos cardíacos muy lentos pero audibles.", "Sudoración fría profusa (diaforesis 'en cubeta'), palidez extrema.", "35.6 °C",
    "Ecocardiograma normal sin alteraciones estructurales.", "Normal.", "VCI 15 mm.",
    "pH 7.35 | pCO2 36 | pO2 88 | HCO3 20", "Normales", "HGT: 16 mg/dL (Hipoglicemia letal)", "Orina con restos de sulfonilureas",
    "Esposo relata que se tomó la Glibenclamida pero no cenó anoche.", "Glibenclamida 5 mg dos veces al día.", "Ninguna.")

# 39
add(39, "Hipokalemia Severa (1.8 mEq/L) por Abuso de Diuréticos con Bradicardia y FV", "bradicardia", "FV", True, "Avanzado",
    "Lorena Sepúlveda", 42, "F", "Box de Reanimación SAR", "Uso indiscriminado de Furosemida para bajar de peso. Debilidad muscular ascendente.", "Calambres intensos, parálisis muscular de extremidades, mareo ortostático y sensación de latidos lentos irregulares.",
    36, "70/40", 90, 26, 18, 36.2, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal con Ondas U Prominentes y QT largo", False, "Inestabilidad eléctrica miocárdica crítica por déficit de potasio.", "Confusa, hipotónica", "Espontánea", "Vía 18G",
    "La paciente presenta un síncope convulsivo y el monitor cae en Torsades de Pointes que degenera a Fibrilación Ventricular.",
    0, "0/0", 0, 10, 0, 36.1, "FV", "Fibrilación Ventricular (FV)", "Inconsciente en paro",
    80, "94/62", 96, 39, 14, 36.4, "SINUSAL", "Ritmo Sinusal tras reposición agresiva de Potasio y Magnesio", "Comatosa posparo",
    "Hipokalemia e hipomagnesemia crítica por pérdida renal de electrolitos", "Hipokalemia",
    "Desfibrilación 200J inmediata, compresiones continuas y REPOSICIÓN URGENTE DE CLORURO DE POTASIO + SULFATO DE MAGNESIO por vía venosa.",
    "Murmullo pulmonar limpio bilateral.", "Ruidos arrítmicos con pausas.", "Flacidez muscular generalizada, reflejos osteotendíneos abolidos.", "36.2 °C",
    "Sin anomalías estructurales.", "Normal.", "VCI 13 mm.",
    "pH 7.48 (Alcalosis metabólica) | pCO2 42 | pO2 88 | HCO3 32", "K+ 1.8 mEq/L (Hipokalemia crítica) | Mg2+ 1.2 mg/dL | Na+ 135", "HGT: 104 mg/dL", "ECG muestra aplanamiento de onda T y onda U gigante",
    "Amiga admite que compraban Furosemida sin receta en la feria para adelgazar.", "Furosemida 40 mg 3 veces al día.", "Ninguna.")

# 40
add(40, "Síndrome del Nódulo Sinusal Enfermo con Pausas de 8s y Paro en Asistolia", "bradicardia", "ASISTOLIA", False, "Principiante",
    "Domingo Contreras", 85, "M", "Box de Reanimación SAPU", "Hipertenso. Mareos recurrentes y caídas frecuentes no explicadas.", "Traído tras síncope con traumatismo facial leve. Monitor muestra bradicardia sinusal y pausas sinusales prolongadas de 6 a 8 segundos.",
    26, "68/36", 91, 30, 14, 36.2, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Extrema con Paro Sinusal", False, "Síncopes de repetición y bajo gasto por disfunción del nódulo sinusal.", "Soporoso, mareado", "Espontánea", "Vía 20G",
    "El nódulo sinusal cesa totalmente su actividad marcapasos y el trazado ECG se aplana en Asistolia sin ritmo de escape.",
    0, "0/0", 0, 9, 0, 36.1, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia",
    70, "102/66", 97, 39, 12, 36.4, "PACED", "Ritmo de Marcapasos Transcutáneo con Captura 100%", "Consciente posparo",
    "Degeneración fibrocalcárea senil del nódulo sinusal (Enfermedad del nódulo sinusal)", "Bradicardia extrema / Disfunción marcapasos",
    "Tratamiento de elección: MARCAPASOS TRANSCUTÁNEO inmediato (setear a 70 lpm y subir miliamperios hasta captura eléctrica y mecánica confirmada).",
    "Murmullo pulmonar normal para la edad.", "Ruidos cardíacos con pausas de silencio prolongadas de más de 6 segundos.", "Pálido, equimosis frontal por caída.", "36.2 °C",
    "Corazón senil con esclerosis aórtica leve sin derrame.", "Normal.", "VCI 16 mm.",
    "pH 7.34 | pCO2 38 | pO2 85 | HCO3 20", "Normales (descarta causa electrolítica)", "HGT: 108 mg/dL", "Troponinas negativas",
    "Hijo refiere que en los últimos dos meses se desmayaba de la nada al levantarse.", "Amlodipino.", "Ninguna.")

# 41
add(41, "Crisis Addisoniana (Insuficiencia Suprarrenal Aguda) con Bradicardia y AESP", "bradicardia", "AESP", False, "Intermedio",
    "Paulina Gacitúa", 36, "F", "Box de Reanimación Urgencias", "Enfermedad de Addison diagnosticada. Suspensión de Hidrocortisona por cuadro de gastroenteritis.", "Llega en colapso circulatorio extremo con hiperpigmentación cutánea, vómitos, hipotensión severa y bradicardia.",
    38, "56/30", 91, 26, 16, 36.3, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal de Bajo Voltaje con Onda T picuda", False, "Shock distributivo e hipovolémico refractario por déficit de cortisol y aldosterona.", "Estuporosa", "Espontánea", "Vía 18G",
    "La paciente deja de responder al dolor, pierde el pulso carotídeo y entra en paro cardiorrespiratorio en AESP.",
    0, "0/0", 0, 10, 0, 36.2, "AESP", "Actividad Eléctrica Sin Pulso (AESP addisoniana)", "Inconsciente en paro",
    78, "92/60", 96, 38, 14, 36.5, "SINUSAL", "Ritmo Sinusal tras Hidrocortisona y Suero Salino", "Comatosa posparo",
    "Déficit absoluto de glucocorticoides y mineralocorticoides (Crisis suprarrenal)", "Hidrogeniones / Hiperkalemia / Hipovolemia",
    "Tratamiento salvador: Expansión agresiva con Suero Fisiológico al 0.9%, HIDROCORTISONA 100-200 mg IV en bolo de emergencia y Adrenalina 1mg.",
    "Murmullo pulmonar limpio bilateral.", "Ruidos apagados muy bradicárdicos.", "Hiperpigmentación cutánea bronceada en pliegues y encías.", "36.3 °C",
    "Ventrículo izquierdo colapsable por hipovolemia relativa.", "Normal.", "VCI colapsada < 6 mm.",
    "pH 7.23 | pCO2 30 | pO2 84 | HCO3 14", "K+ 6.4 mEq/L (Hiperkalemia) | Na+ 122 mEq/L (Hiponatremia severa)", "HGT: 52 mg/dL (Hipoglicemia)", "Cortisol sérico: < 1.0 ug/dL (Indetectable)",
    "Pareja refiere que vomitó todos los medicamentos durante los últimos dos días.", "Hidrocortisona, Fludrocortisona.", "Ninguna.")

# 42
add(42, "Hipotermia Moderada por Inmersión en Agua Helada con AESP", "bradicardia", "AESP", False, "Principiante",
    "Mauricio Henríquez", 29, "M", "Servicio de Urgencias", "Pescador artesanal que cayó a aguas del Estrecho de Magallanes (4°C) durante 30 minutos.", "Comatoso, tiritona ausente, pupilas midriáticas arreactivas y bradicardia extrema de 24 lpm.",
    24, "54/30", 82, 18, 6, 29.8, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal con Onda J de Osborn", False, "Hipotermia severa accidental grado III.", "Coma hipotérmico", "Bradipnea severa", "Vía 18G",
    "El pulso carotídeo desaparece mientras se retira la ropa mojada y queda en AESP bradicárdica.",
    0, "0/0", 0, 8, 0, 29.7, "AESP", "Actividad Eléctrica Sin Pulso (AESP por Hipotermia)", "Inconsciente en AESP",
    70, "90/58", 95, 37, 12, 33.5, "SINUSAL", "Ritmo Sinusal con recalentamiento activo", "Comatoso en observación",
    "Hipotermia accidental con depresión metabólica extrema", "Hipotermia",
    "Reanimación cardiopulmonar con RECALENTAMIENTO ACTIVO (suero salino tibio a 42°C, mantas térmicas de aire forzado).",
    "Bradipnea crítica, murmullo pulmonar presente sin ruidos agregados.", "Ruidos cardíacos sumamente lentos y alejados.", "Piel pálida, helada al tacto, rigidez fría.", "29.8 °C (Termómetro timpánico/esofágico)",
    "Contractilidad miocárdica deprimida difusa por frío.", "Sin neumotórax.", "VCI 15 mm.",
    "pH 7.22 | pCO2 42 | pO2 75 | HCO3 17", "K+ 4.0 | Na+ 137", "HGT: 88 mg/dL", "Ondas de Osborn de 4mm en DII, DIII, aVF",
    "Compañeros de faena lograron sacarlo del agua tras media hora de búsqueda.", "Ninguno.", "Ninguna.")

# 43
add(43, "Bloqueo AV de 1° Grado que progresa a Bloqueo Completo por Isquemia Nodal y Asistolia", "bradicardia", "ASISTOLIA", False, "Principiante",
    "Osvaldo Morales", 78, "M", "Box de Reanimación SAPU", "Hipertensión de larga data. Consulta por astenia y sensación de 'pausas' en el pecho.", "Llega con mareo intenso al ponerse de pie, palidez y bradicardia progresiva.",
    35, "72/40", 92, 30, 16, 36.4, "BAV_1", "Bloqueo AV de 1° Grado Severo (PR 380 ms) que progresa a BAV 3", False, "Falla intrínseca del sistema de conducción nodal.", "Somnoliento", "Espontánea", "Vía 20G",
    "El intervalo PR se alarga indefinidamente hasta disociación auriculoventricular completa y parada en Asistolia.",
    0, "0/0", 0, 9, 0, 36.3, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia",
    70, "98/64", 97, 40, 14, 36.4, "PACED", "Ritmo Estimulado con Marcapasos Transcutáneo (70 lpm)", "Consciente orientado",
    "Isquemia y necrosis del nodo AV por ateromatosis", "Trombosis coronaria / Falla de conducción",
    "Marcapasos transcutáneo de rescate inmediato, Adrenalina en infusión y preparación para marcapasos definitivo.",
    "Murmullo pulmonar normal bilateral.", "Ruidos cardíacos lentos regulares.", "Piel pálida, sudorosa.", "36.4 °C",
    "Sin derrame pericárdico.", "Normal.", "VCI 16 mm.",
    "pH 7.33 | pCO2 37 | pO2 85 | HCO3 19", "Normales", "HGT: 115 mg/dL", "Troponina levemente elevada",
    "Hija refiere que el cuadro de cansancio y mareo venía progresando desde hace 1 semana.", "Losartán, Hidroclorotiazida.", "Ninguna.")

# 44
add(44, "Rotura Miocárdica de Pared Libre Post-IAM con Bradicardia Extrema y AESP", "bradicardia", "AESP", False, "Avanzado",
    "Arturo Barahona", 70, "M", "Servicio de Urgencias Hospitalario", "IAM anterior no reperfundido hace 4 días por consulta tardía.", "Presenta dolor torácico desgarrante súbito, bradicardia extrema, pérdida súbita de pulso y disociación electromecánica.",
    30, "50/20", 82, 18, 12, 36.2, "BRADICARDIA_SINUSAL", "Bradicardia Extrema Agónica por Taponamiento Catastrófico", False, "Rotura de pared libre ventricular con hemopericardio agudo a tensión.", "Comatoso inmediato", "En apnea", "Vía 18G",
    "El paciente entra en apnea, el pulso desaparece de forma instantánea y el monitor registra AESP con complejos lentos de bajo voltaje.",
    0, "0/0", 0, 7, 0, 36.1, "AESP", "Actividad Eléctrica Sin Pulso (AESP por Hemopericardio)", "Inconsciente en paro",
    75, "88/52", 94, 35, 14, 36.3, "SINUSAL", "Ritmo Sinusal con descompresión pericárdica de emergencia", "Pasa de urgencia a cirugía cardíaca",
    "Hemopericardio masivo a tensión por rotura transmural del ventrículo izquierdo", "Taponamiento cardíaco (Rotura miocárdica)",
    "POCUS inmediato para confirmar hemopericardio, pericardiocentesis evacuadora heroica y toracotomía de salvataje.",
    "Murmullo pulmonar conservado bilateralmente.", "Ruidos cardíacos completamente inaudibles (Tríada de Beck fulminante). Ingurgitación yugular hasta el ángulo mandibular.", "Cianosis severa cérvico-facial.", "36.2 °C",
    "Hemopericardio masivo con coágulos y colapso total de cavidades derechas e izquierdas.", "Normal.", "VCI dilatada > 30 mm.",
    "pH 7.15 | pCO2 40 | pO2 65 | HCO3 15 | Lactato 8.2", "Normales", "HGT: 120 mg/dL", "Hematocrito en caída libre",
    "Enfermera presenció el colapso mientras el paciente tomaba agua en la cama de hospitalización.", "Aspirina, Clopidogrel.", "Ninguna.")

# 45
add(45, "Inhalación de Monóxido de Carbono en Incendio con Bradicardia Hipóxica y Asistolia", "bradicardia", "ASISTOLIA", False, "Intermedio",
    "Francisco Meza", 48, "M", "Box de Reanimación Urgencias", "Rescatado de incendio en habitación cerrada por Bomberos.", "Comatoso, quemaduras en rostro, hollín en fosas nasales y esputo carbonáceo. Bradipneico y bradicárdico.",
    32, "64/36", 80, 48, 8, 36.5, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Hipóxica por Carboxihemoglobina", False, "Intoxicación grave por monóxido de carbono e hipoxia celular tisular.", "Coma carboxihemoglobínico", "Inhalación de humo", "Vía 18G",
    "El paciente entra en paro respiratorio total y el monitor muestra asistolia completa.",
    0, "0/0", 0, 8, 0, 36.4, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por CO",
    80, "98/64", 98, 40, 14, 36.5, "SINUSAL", "Ritmo Sinusal tras Intubación y Oxígeno 100% de alto flujo", "Comatoso intubado en UCI",
    "Anoxia histotóxica por bloqueo de transporte de oxígeno por Carboxihemoglobina (COHb)", "Hipoxia / Tóxicos (Monóxido de Carbono)",
    "¡Oxígeno al 100% en normobaria inmediato (reduce la vida media de COHb de 320 min a 80 min)! Considerar cámara hiperbárica.",
    "Roncus y estertores difusos por quemadura inhalatoria, esputo con hollín abundante.", "Ruidos cardíacos lentos apagados.", "Piel de coloración 'rojo cereza' característica, mucosa oral quemada.", "36.5 °C",
    "Disfunción sistólica global por isquemia celular difusa.", "Normal.", "VCI 16 mm.",
    "pH 7.12 | pCO2 48 | pO2 85 | HCO3 14 | Lactato 9.8 mmol/L", "Normales", "HGT: 110 mg/dL", "Nivel de Carboxihemoglobina (COHb): 48% (Nivel letal)",
    "Bomberos confirman que estuvo atrapado 20 minutos en habitación con fuego y humo denso.", "Ninguno.", "Ninguna.")

# 46
add(46, "Síndrome Post-RTU de Próstata por Hiponatremia Dilucional Aguda con AESP", "bradicardia", "ASISTOLIA", False, "Avanzado",
    "Hernando Zúñiga", 76, "M", "Servicio de Urología Hospitalario", "Postoperado inmediato (2 horas) de Resección Transuretral de Próstata (RTU).", "Cefalea intensa, náuseas, confusión, convulsión tónica y bradicardia extrema con hipertensión previa.",
    32, "70/40", 91, 30, 12, 35.8, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal de QRS Ensanchado por Hiponatremia Aguda", False, "Síndrome de absorción de líquido de irrigación hipoosmolar (Síndrome RTU).", "Comatoso post-ictal", "Bradipnea", "Vía 18G",
    "El paciente presenta una nueva convulsión con paro respiratorio y el monitor cae en Asistolia plana.",
    0, "0/0", 0, 8, 0, 35.7, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en paro por síndrome RTU",
    68, "96/60", 96, 38, 14, 36.2, "SINUSAL", "Ritmo Sinusal tras administración de Solución Salina Hipertónica al 3%", "Intubado protegido",
    "Edema cerebral agudo y toxicidad miocárdica por hiponatremia dilucional severa (Na+ 108 mEq/L)", "Hidrogeniones (Hipo-osmolaridad / Trastorno electrolítico)",
    "Tratamiento curativo de emergencia: SOLUCIÓN SALINA HIPERTÓNICA AL 3% (100 a 150 ml IV en 10-20 minutos) para revertir el edema cerebral y la sobrecarga hídrica.",
    "Crepitaciones basales por sobrecarga de volumen circulante.", "Ruidos cardíacos lentos regulares.", "Piel edematosa, palidez fría.", "35.8 °C",
    "Sobrecarga de volumen con contractilidad conservada.", "Líneas B bilaterales.", "VCI pletórica 24 mm.",
    "pH 7.28 | pCO2 36 | pO2 84 | HCO3 17", "Na+ 108 mEq/L (Hiponatremia dilucional extrema) | K+ 3.8 | Cl- 82", "HGT: 115 mg/dL", "Osmolaridad plasmática: 228 mOsm/kg (Hipo-osmolaridad crítica)",
    "Urólogo informa que la cirugía demoró 90 minutos y se abrieron senos venosos prostáticos con absorción de más de 3 litros de glicina.", "Tamsulosina, Finasteride.", "Ninguna.")

# 47
add(47, "Asfixia por Cuerpo Extraño en Vía Aérea con Bradicardia y Asistolia", "bradicardia", "ASISTOLIA", False, "Principiante",
    "Javier Ulloa", 44, "M", "Box de Reanimación SAPU", "Comiendo asado en restaurante con ingesta alcohólica moderada.", "Episodio de asfixia súbita al tragar trozo de carne (Signo universal de atragantamiento), cianosis progresiva y colapso.",
    26, "55/30", 55, 60, 0, 36.6, "BRADICARDIA_SINUSAL", "Bradicardia Agónica por Asfixia Hipóxica Total", False, "Obstrucción completa de la vía aérea por cuerpo extraño ('Café Coronario').", "Inconsciente en apnea", "Obstrucción completa", "Vía periférica 20G",
    "El paciente entra en apnea completa con tórax inmóvil y el monitor cae en Asistolia plana.",
    0, "0/0", 0, 6, 0, 36.5, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por asfixia",
    84, "104/68", 98, 40, 14, 36.6, "SINUSAL", "Ritmo Sinusal normal tras extracción de cuerpo extraño con pinza Magill", "Recupera conciencia gradualmente",
    "Hipoxia miocárdica y cerebral crítica por obstrucción mecánica de la vía aérea", "Hipoxia / Obstrucción de vía aérea",
    "Axioma ACLS: En paciente inconsciente con atragantamiento, INICIAR RCP INMEDIATAMENTE (las compresiones ayudan a expulsar el cuerpo extraño). Visualizar orofaringe y extraer con pinza Magill.",
    "Ausencia total de ruidos respiratorios a pesar de intentos ventilatorios (obstrucción glótica total).", "Ruidos cardíacos agónicos casi inaudibles.", "Cianosis violácea cervicofacial intensa.", "36.6 °C",
    "Ventrículo derecho con signos de sobrecarga aguda por hipoxia.", "Sin neumotórax.", "VCI pletórica 22 mm.",
    "pH 7.08 | pCO2 86 | pO2 32 | HCO3 22", "Normales", "HGT: 105 mg/dL", "GSA muestran asfixia aguda letal",
    "Garzón relata que se atragantó con un trozo de carne vacuna mientras reía y se desplomó.", "Ninguno.", "Ninguna.")

# 48
add(48, "Coma Mixedematoso por Hipotiroidismo Severo con Bradicardia Extrema y AESP", "bradicardia", "AESP", False, "Intermedio",
    "Irma Salgado", 75, "F", "Servicio de Urgencias Hospitalario", "Hipotiroidismo de 15 años de evolución. Abandono de Levotiroxina hace 6 meses.", "Comatosa, bradipnea severa, facies abotagada con macroglosia, mixedema periférico sin fóvea e hipotermia de 32.5°C.",
    28, "62/34", 85, 42, 6, 32.5, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Extrema Mixedematosa (28 lpm)", False, "Crisis hipotiroidea descompensada (Coma mixedematoso).", "Comatosa profunda", "Macroglosia que compromete vía aérea", "Vía 18G",
    "La paciente presenta un paro respiratorio definitivo y el monitor entra en AESP de bajo voltaje.",
    0, "0/0", 0, 9, 0, 32.4, "AESP", "Actividad Eléctrica Sin Pulso (AESP mixedematosa)", "Inconsciente en paro",
    64, "92/58", 95, 37, 12, 35.0, "SINUSAL", "Ritmo Sinusal con Levotiroxina IV e Hidrocortisona", "Comatosa intubada en UCI",
    "Déficit tiroideo crítico con falla multiorgánica e hipotermia", "Hipotermia / Tóxicos (Déficit endocrino severo)",
    "Tratamiento salvador: Intubación orotraqueal, LEVOTIROXINA IV (300-500 ug bolo), HIDROCORTISONA IV (100 mg cada 8h para evitar crisis suprarrenal) y recalentamiento pasivo.",
    "Hipoventilación difusa, murmullo muy disminuido.", "Ruidos cardíacos muy apagados y lentos. Derrame pericárdico típico.", "Facies abotagada, piel seca, pálida y fría con edema duro sin fóvea en EEII.", "32.5 °C (Termómetro esofágico)",
    "Derrame pericárdico concéntrico moderado (12 mm) sin taponamiento franco. Contractilidad miocárdica deprimida.", "Líneas A normales.", "VCI 18 mm.",
    "pH 7.21 | pCO2 52 | pO2 68 | HCO3 19", "K+ 4.0 | Na+ 124 (Hiponatremia dilucional)", "HGT: 62 mg/dL", "TSH: > 100 uUI/mL | T4 libre: Indetectable (< 0.1 ng/dL)",
    "Hija confirma que dejó de tomar el Eutirox porque se le terminó la receta.", "Levotiroxina 100 ug (abandonada).", "Ninguna.")

# 49
add(49, "Intoxicación Aguda por Clonidina con Bradicardia Profunda y Asistolia", "bradicardia", "ASISTOLIA", False, "Intermedio",
    "Nicolás Riquelme", 35, "M", "Box de Reanimación SAR", "HTA resistente. Ingesta intencional de 30 comprimidos de Clonidina 0.150 mg.", "Soporoso profundo, bradicardia extrema de 26 lpm, hipotensión marcada, boca seca y miosis puntiforme bilateral.",
    26, "60/32", 89, 31, 10, 35.9, "BRADICARDIA_SINUSAL", "Bradicardia Sinusal Profunda por Estimulación Alfa-2 Central", False, "Shock vasopléjico y bradicardia por agonista alfa-2 adrenérgico central.", "Comatoso", "Bradipneico", "Vía 18G",
    "El paciente entra en apnea respiratoria y el ritmo sinusal se extingue por completo en Asistolia plana.",
    0, "0/0", 0, 8, 0, 35.8, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por clonidina",
    66, "94/60", 96, 38, 14, 36.3, "SINUSAL", "Ritmo Sinusal normal tras Naloxona a altas dosis y Atropina", "Comatoso intubado",
    "Inhibición simpática central masiva por agonista alfa-2 presináptico", "Tóxicos (Clonidina / Simpatolíticos)",
    "Tratamiento específico: Atropina 1mg para bradicardia, considerar NALOXONA a altas dosis (revierte efectos hipotensores y bradicardizantes de clonidina) y fluidos.",
    "Murmullo vesicular disminuido por hipoventilación central.", "Ruidos cardíacos muy lentos pero sin soplos.", "Piel fría, sequedad de mucosas, miosis bilateral bilateral que simula sobredosis de opioides.", "35.9 °C",
    "Corazón anatómicamente normal con bradicardia severa sin derrame.", "Normal.", "VCI 14 mm.",
    "pH 7.26 | pCO2 46 | pO2 80 | HCO3 19", "Normales", "HGT: 98 mg/dL", "Toxicológico en orina positivo para Clonidina",
    "Hermano encontró blisters vacíos de Clonidina y carta de despedida.", "Clonidina 0.150 mg.", "Ninguna.")

# 50
add(50, "Falla de Marcapasos Definitivo por Agotamiento de Batería con Asistolia", "bradicardia", "ASISTOLIA", False, "Principiante",
    "Ernesto Bustamante", 88, "M", "Box de Reanimación SAPU", "Portador de Marcapasos definitivo VVI instalado hace 12 años sin controles recientes.", "Traído en brazos de sus hijos tras síncope presenciado en su hogar. Monitor muestra espigas aisladas que no capturan el miocardio.",
    22, "52/28", 86, 20, 8, 36.1, "PACED", "Falla Catastrófica de Captura y Sensado de Marcapasos", False, "Shock cardiogénico por fallo terminal de generador de marcapasos.", "Estuporoso profundo", "Bradipnea agónica", "Vía 20G",
    "Las espigas inefectivas desaparecen por completo y el osciloscopio muestra Asistolia plana sin pulso carotídeo.",
    0, "0/0", 0, 7, 0, 36.0, "ASISTOLIA", "Asistolia (Línea Plana)", "Inconsciente en asistolia por fallo de marcapasos",
    70, "104/66", 97, 40, 14, 36.4, "PACED", "Ritmo Estimulado con Marcapasos Transcutáneo Externo (70 lpm)", "Recupera consciencia y habla con el equipo",
    "Fallo terminal de captura eléctrica por agotamiento de batería de generador de marcapasos", "Disfunción de marcapasos / Asistolia",
    "¡ACCIÓN DE RESCATE CRÍTICA! INSTALACIÓN INMEDIATA DE MARCAPASOS TRANSCUTÁNEO EXTERNO con parches anteroposteriores a 70 lpm hasta lograr captura mecánica confirmada con pulso femoral palpable.",
    "Murmullo pulmonar simétrico bilateral.", "Ruidos cardíacos agónicos sumamente lentos. Cicatriz de marcapasos infraclavicular izquierda visible.", "Palidez cérea, piel sudorosa y fría.", "36.1 °C",
    "Cámaras cardíacas con cable de marcapasos visible en ápex de VD sin contracción efectiva.", "Normal.", "VCI 18 mm.",
    "pH 7.24 | pCO2 42 | pO2 78 | HCO3 17", "K+ 4.2 | Na+ 139 (descarta causa electrolítica)", "HGT: 110 mg/dL", "Interrogador de marcapasos confirma 'End of Life (EOL)' de batería",
    "Hijo mayor informa que el marcapasos se lo pusieron el año 2012 y nunca volvió a control.", "Aspirina, Enalapril.", "Ninguna.")

print(f"Total cases generated: {len(cases)}")

# Write to src/data/cases.js
cases_json = json.dumps(cases, ensure_ascii=False, indent=2)

file_content = f"""// Banco exhaustivo de 50 casos clínicos ACLS con aleatorización y diagnósticos etiológicos (5 H y 5 T)
// Patrón: Arritmia Inicial (Taqui/Bradi) -> Descompensación y PCR -> Reanimación -> RCE -> Cuidados Posparo

export const ACLS_CASES = {cases_json};

// Helper function to pick a completely random case
export function getRandomCase() {{
  const randomIndex = Math.floor(Math.random() * ACLS_CASES.length);
  return ACLS_CASES[randomIndex];
}}
"""

with open("/Users/christopherrodriguez/Documents/antigravity/lively-meitner/src/data/cases.js", "w", encoding="utf-8") as f:
    f.write(file_content)

print("Successfully written to src/data/cases.js")
