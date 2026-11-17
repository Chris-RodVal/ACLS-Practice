import json

cases = []

# List of 25 Tachyarrhythmias
tachy_specs = [
    # 1
    ("caso-1", "Caso 1: TV Monomorfa Sostenida con pulso que degenera a FV gruesa", "taquicardia", "FV", True, "Intermedio",
     ("Jorge Morales", 62, "M", "Servicio de Urgencias Hospitalario", "Antecedente de IAM previo con FEy 35%. HTA en tratamiento.", "Ingresa pálido y diaforético, refiriendo palpitaciones intensas 'aleteo en el pecho', mareos y dolor precordial 6/10."),
     (175, "84/50", 91, 32, 26, 36.4, "TV_MONOMORFA", "Taquicardia Ventricular Monomorfa Sostenida", False, "Hipotensión sintomática (84/50), dolor isquémico y palidez.", "Consciente pero confuso", "Espontánea", "Vía venosa 20G"),
     "¡El paciente repentinamente pierde el conocimiento! Se desvanece en la camilla y el monitor muestra degeneración a Fibrilación Ventricular gruesa.",
     (0, "0/0", 0, 12, 0, 36.4, "FV", "Fibrilación Ventricular (FV)", False, "Inconsciente en apnea"),
     (98, "88/54", 95, 42, 12, 36.1, "SINUSAL_ST_ELEVATION", "Ritmo Sinusal con supradesnivel ST (STEMI)", True, "Comatoso, candidato a TTM"),
     "Isquemia miocárdica aguda (Trombosis coronaria)", "Trombosis coronaria (Síndrome Coronario Agudo)",
     "TV inestable con pulso requiere cardioversión sincronizada. Al degenerar a FV, la prioridad es descarga precoz (200J) y REANUDAR RCP DE INMEDIATO.",
     {"physical": {"pulmonary": "Murmullo vesicular conservado bilateralmente.", "cardiovascular": "Ruidos cardíacos taquicárdicos, sin soplos.", "perfusion": "Piel fría y sudorosa. Llenado capilar 3s.", "temperature": "36.4 °C"},
      "pocus": {"cardiac": "Acinesia de pared anterior. Sin derrame pericárdico.", "lung": "Líneas A normales bilaterales.", "vci": "VCI 18 mm con colapso normal."},
      "labs": {"gsa": "pH 7.31 | pCO2 36 | pO2 82 | HCO3 18 | Lactato 3.4 mmol/L", "electrolytes": "K+ 4.3 | Na+ 139 | Ca2+ 1.20", "glucose": "HGT: 142 mg/dL", "others": "Troponina I: 2.4 ng/mL (Positiva)"},
      "history": {"witness": "Hijo refiere dolor opresivo al subir escaleras hace 1 hora.", "medications": "Enalapril, Carvedilol, Aspirina.", "allergies": "Sin alergias."}}
    ),
    # 2
    ("caso-2", "Caso 2: TSVP Inestable en Paciente Joven que colapsa en TV sin pulso", "taquicardia", "TVSP", True, "Intermedio",
     ("Valentina Soto", 24, "F", "Box de Reanimación SAPU", "Sin antecedentes mórbidos. Episodios autolimitados de taquicardia.", "Llega con palpitaciones súbitas de 2 horas de evolución, disnea y marcada frialdad distal con mareo."),
     (220, "78/46", 93, 30, 28, 36.6, "TSVP", "Taquicardia Supraventricular Paroxística", False, "Hipotensión severa (78/46 mmHg), mala perfusión periférica, disnea.", "Consciente, angustiada", "Espontánea", "Sin vía venosa"),
     "La paciente cierra los ojos bruscamente, se torna cianótica y cae en colapso hemodinámico total con TV sin pulso.",
     (0, "0/0", 0, 11, 0, 36.5, "TVSP", "Taquicardia Ventricular sin pulso (TVSP)", False, "Inconsciente en paro"),
     (105, "96/60", 97, 38, 14, 36.5, "SINUSAL", "Ritmo Sinusal Normal", True, "Recupera conciencia gradualmente"),
     "Isquemia funcional secundaria a taquicardia extrema", "Hipoxia / Isquemia miocárdica",
     "TSVP inestable requiere cardioversión sincronizada inmediata. Al caer en TVSP, choque de 200J y reanudación de RCP sin pausas.",
     {"physical": {"pulmonary": "Murmullo pulmonar limpio bilateral.", "cardiovascular": "Ruidos rápidos regulares.", "perfusion": "Piel fría distalmente.", "temperature": "36.6 °C"},
      "pocus": {"cardiac": "Ventrículos hiperdinámicos sin derrame.", "lung": "Deslizamiento pleural normal bilateral.", "vci": "VCI 12 mm colapsable."},
      "labs": {"gsa": "pH 7.36 | pCO2 32 | pO2 90 | HCO3 20", "electrolytes": "K+ 4.0 | Na+ 140", "glucose": "HGT: 98 mg/dL", "others": "Dímero D normal"},
      "history": {"witness": "Amiga refiere consumo de bebidas energéticas antes del cuadro.", "medications": "Anticonceptivos orales.", "allergies": "Ninguna."}}
    ),
    # 3
    ("caso-3", "Caso 3: Fibrilación Auricular con RVR en Postoperado que cae en AESP por TEP", "taquicardia", "AESP", False, "Avanzado",
     ("Hernán Castro", 74, "M", "Servicio de Cirugía General", "Postoperado día 3 de prótesis total de cadera.", "Presenta disnea súbita, dolor torácico pleurítico y taquicardia irregular de inicio brusco."),
     (168, "76/48", 87, 28, 32, 37.1, "FA_RVR", "Fibrilación Auricular con RVR", False, "Shock obstructivo, hipotensión y desaturación severa.", "Somnoliento y confuso", "Espontánea", "Vía venosa 18G"),
     "El paciente emite un jadeo agónico y pierde el conocimiento. El monitor muestra ritmo organizado taquicárdico pero NO TIENE PULSO (AESP).",
     (0, "0/0", 0, 14, 0, 37.0, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", False, "Inconsciente, sin pulso"),
     (110, "92/56", 94, 36, 16, 36.8, "SINUSAL", "Taquicardia Sinusal con sobrecarga de VD", True, "Comatoso"),
     "Tromboembolismo pulmonar masivo", "Trombosis pulmonar (TEP Masivo)",
     "En AESP por TEP masivo, la prioridad es RCP ininterrumpida, Adrenalina 1mg precoz y considerar trombolisis de emergencia (Alteplasa 50mg bolo).",
     {"physical": {"pulmonary": "Discreta hipoventilación basal izquierda, sin sibilancias.", "cardiovascular": "R2 aumentado en foco pulmonar, ingurgitación yugular evidente.", "perfusion": "Cianosis central y periférica.", "temperature": "37.1 °C"},
      "pocus": {"cardiac": "Ventrículo derecho severamente dilatado (signo de McConnell). Desviación septal a izquierda.", "lung": "Líneas A normales, sin neumotórax.", "vci": "VCI pletórica de 26 mm sin colapso."},
      "labs": {"gsa": "pH 7.24 | pCO2 29 | pO2 55 | HCO3 14 | Lactato 5.8 mmol/L", "electrolytes": "K+ 4.6 | Na+ 137", "glucose": "HGT: 110 mg/dL", "others": "Dímero D: > 10.000 ug/L (Muy elevado)"},
      "history": {"witness": "Enfermera informa reposo absoluto en cama postcirugía de cadera.", "medications": "Enoxaparina profiláctica profiláctica omitida.", "allergies": "Metoclopramida."}}
    ),
    # 4
    ("caso-4", "Caso 4: Flutter Auricular 2:1 Inestable en EPOC con Paro en Asistolia", "taquicardia", "ASISTOLIA", False, "Intermedio",
     ("Raúl Navarrete", 68, "M", "Box de Reanimación SAR", "EPOC tabáquico severo y Cor Pulmonale.", "Llega con disnea extrema, cianosis labial y palpitaciones rápidas en reposo."),
     (150, "80/52", 84, 48, 30, 36.8, "FLUTTER", "Flutter Auricular con Conducción 2:1", False, "Insuficiencia respiratoria inestable e hipotensión.", "Obnubilado", "Agotamiento respiratorio", "Vía 20G"),
     "El paciente agota su mecánica ventilatoria, entra en bradipnea terminal y la actividad eléctrica se extingue a Asistolia plana.",
     (0, "0/0", 0, 8, 0, 36.7, "ASISTOLIA", "Asistolia (Línea Plana)", False, "Paro respiratorio y cardíaco"),
     (88, "94/60", 93, 35, 14, 36.4, "SINUSAL", "Ritmo Sinusal con P pulmonar", True, "Intubado conectado a ventilación"),
     "Hipoxia y acidosis respiratoria severa (agotamiento ventilatorio)", "Hipoxia / Acidosis respiratoria",
     "La asistolia secundaria a hipoxia requiere intubación orotraqueal inmediata, oxigenación al 100%, adrenalina 1mg y RCP de alta calidad.",
     {"physical": {"pulmonary": "Murmullo muy disminuido globalmente, tórax en tonel, espiración prolongada.", "cardiovascular": "Ruidos alejados, taquicárdicos.", "perfusion": "Cianosis ungueal y peribucal.", "temperature": "36.8 °C"},
      "pocus": {"cardiac": "Hipertrofia de VD sin derrame pericárdico.", "lung": "Deslizamiento pleural presente bilateralmente.", "vci": "VCI 20 mm con escasa variabilidad."},
      "labs": {"gsa": "pH 7.12 | pCO2 78 | pO2 48 | HCO3 26 | Lactato 4.2", "electrolytes": "K+ 4.8 | Na+ 136", "glucose": "HGT: 130 mg/dL", "others": "GSA demuestran acidosis hipercápnica severa"},
      "history": {"witness": "Hija refiere suspensión de inhaladores y cuadro bronquial de 4 días.", "medications": "Salbutamol, Ipratropio, Bromuro de tiotropio.", "allergies": "Ninguna."}}
    ),
    # 5
    ("caso-5", "Caso 5: Torsades de Pointes por Prolongación del QT que cae a FV", "taquicardia", "FV", True, "Avanzado",
     ("Camila Fuentes", 38, "F", "Servicio de Urgencias", "Uso reciente de Azitromicina + Haloperidol. Episodios sincopales.", "Es traída tras presentar mareos súbitos y pérdida de conocimiento breve en su domicilio."),
     (190, "70/40", 89, 26, 24, 36.3, "TORSADES", "Torsades de Pointes (TV Polimorfa)", False, "Inestabilidad hemodinámica crítica y sincope recurrente.", "Confusa, diaforética", "Espontánea", "Vía 20G"),
     "La paciente presenta una convulsión tónica breve, pierde el pulso y el monitor registra Fibrilación Ventricular caótica.",
     (0, "0/0", 0, 10, 0, 36.3, "FV", "Fibrilación Ventricular (FV)", False, "Paro en FV"),
     (92, "98/62", 96, 40, 12, 36.2, "SINUSAL", "Ritmo Sinusal con QT corregido prolongado", True, "Comatosa posparo"),
     "Toxicidad por fármacos que prolongan el intervalo QT (Hipomagnesemia)", "Tóxicos / Hipomagnesemia",
     "Tratamiento clave: Desfibrilación en paro, Sulfato de Magnesio 2g IV en bolo y suspensión inmediata de fármacos proarrítmicos.",
     {"physical": {"pulmonary": "Limpio bilateral.", "cardiovascular": "Ruidos arrítmicos caóticos.", "perfusion": "Pálida, sudorosa.", "temperature": "36.3 °C"},
      "pocus": {"cardiac": "Ventrículos hiperquinéticos sin patología estructural.", "lung": "Líneas A normales.", "vci": "VCI 14 mm."},
      "labs": {"gsa": "pH 7.38 | pCO2 36 | pO2 88 | HCO3 22", "electrolytes": "K+ 3.2 (Bajo) | Mg2+ 1.1 mg/dL (Muy bajo)", "glucose": "HGT: 104 mg/dL", "others": "ECG previo mostraba QTc de 540 ms"},
      "history": {"witness": "Madre refiere que estaba tomando antibióticos por neumonía y antipsicótico.", "medications": "Azitromicina, Haloperidol, Sertralina.", "allergies": "Penicilina."}}
    ),
    # 6
    ("caso-6", "Caso 6: Taquicardia Ventricular Polimorfa Isquémica que degenera a FV", "taquicardia", "FV", True, "Intermedio",
     ("Manuel Sepúlveda", 59, "M", "Box de Reanimación Hospitalario", "Fumador, dislipidemia. Dolor torácico opresivo desde hace 2 horas.", "Ingresa quejándose de dolor precordial irradiado a mandíbula y sudoración profusa."),
     (185, "74/48", 90, 28, 28, 36.5, "TVSP", "Taquicardia Ventricular Polimorfa con pulso", False, "Shock cardiogénico e isquemia aguda en curso.", "Consciente, angustiado", "Espontánea", "Vía 18G"),
     "El paciente pierde la postura, emite un quejido gutural y entra en Fibrilación Ventricular fina/gruesa.",
     (0, "0/0", 0, 12, 0, 36.4, "FV", "Fibrilación Ventricular (FV)", False, "Inconsciente en paro"),
     (86, "88/54", 95, 41, 14, 36.2, "SINUSAL_ST_ELEVATION", "STEMI Inferior (Supradesnivel DII, DIII, aVF)", True, "Comatoso posparo"),
     "Oclusión coronaria aguda de la arteria coronaria derecha", "Trombosis coronaria (IAM agudo)",
     "Descarga precoz de 200J bifásica, reinicio inmediato de compresiones, Amiodarona 300mg y traslado urgente a pabellón de Hemodinamia (PCI).",
     {"physical": {"pulmonary": "Crepitaciones en bases pulmonares.", "cardiovascular": "Ruidos taquicárdicos arrítmicos.", "perfusion": "Piel fría cérea.", "temperature": "36.5 °C"},
      "pocus": {"cardiac": "Acinesia de cara inferior y posterior de VI.", "lung": "Líneas B en bases.", "vci": "VCI 19 mm."},
      "labs": {"gsa": "pH 7.29 | pCO2 35 | pO2 78 | HCO3 17 | Lactato 4.1", "electrolytes": "K+ 3.8 | Na+ 138", "glucose": "HGT: 160 mg/dL", "others": "Troponina ultrasensible: 450 ng/L"},
      "history": {"witness": "Esposa confirma inicio súbito del dolor mientras miraba televisión.", "medications": "Atorvastatina.", "allergies": "Ninguna."}}
    ),
    # 7
    ("caso-7", "Caso 7: Shock Hipovolémico por Hemorragia Digestiva Alta con AESP", "taquicardia", "AESP", False, "Intermedio",
     ("José Oyarzún", 65, "M", "Box de Reanimación SAPU", "Cirrosis hepática OH. Hematemesis masiva hace 30 minutos.", "Llega en colapso circulatorio con melena abundante, hematemesis activa y palidez extrema."),
     (155, "60/35", 88, 22, 30, 35.8, "TSVP", "Taquicardia Sinusal / TSVP compensatoria", False, "Shock hemorrágico grado IV.", "Somnoliento, obnubilado", "Vía aérea en riesgo por vómito", "Vía periférica 18G"),
     "El paciente vomita abundante sangre oscura, hace apnea y cae en AESP con complejos anchos sin pulso.",
     (0, "0/0", 0, 9, 0, 35.6, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", False, "Paro en AESP por vaciamiento"),
     (112, "86/52", 94, 34, 16, 35.8, "SINUSAL", "Taquicardia Sinusal compensada con volumen", True, "Intubado protegido"),
     "Shock hipovolémico hemorrágico masivo por várices esofágicas", "Hipovolemia (Pérdida sanguínea masiva)",
     "Prioridad absoluta: Expansión de volumen agresiva con suero salino y hemoderivados, intubación para proteger vía aérea y Adrenalina 1mg.",
     {"physical": {"pulmonary": "Roncus por sangre en orofaringe.", "cardiovascular": "Ruidos filiformes apagados.", "perfusion": "Palidez de porcelana, frialdad generalizada.", "temperature": "35.8 °C"},
      "pocus": {"cardiac": "Cámaras cardíacas virtuales totalmente colapsadas (kissing papillary muscles).", "lung": "Sin neumotórax.", "vci": "VCI colapsada totalmente (flat cava < 5 mm)."},
      "labs": {"gsa": "pH 7.15 | pCO2 28 | pO2 72 | HCO3 11 | Lactato 8.5 | EB -16", "electrolytes": "K+ 3.5 | Na+ 134", "glucose": "HGT: 82 mg/dL", "others": "Hematocrito: 18% | Hemoglobina: 6.0 g/dL"},
      "history": {"witness": "Hijo relata vómito de más de 1 litro de sangre fresca en la casa.", "medications": "Propranolol, Espironolactona.", "allergies": "Ninguna."}}
    ),
    # 8
    ("caso-8", "Caso 8: Neumotórax a Tensión Post-Traumático con Taquicardia y AESP", "taquicardia", "AESP", False, "Intermedio",
     ("Diego Valenzuela", 22, "M", "Servicio de Urgencias", "Víctima de accidente de tránsito en moto con golpe torácico derecho.", "Llega taquicárdico, taquipneico, quejándose de dolor torácico lancinante derecho y asfixia progresiva."),
     (160, "72/40", 82, 20, 36, 36.6, "TSVP", "Taquicardia Sinusal extrema reactiva", False, "Shock obstructivo por neumotórax a tensión.", "Agitado, combativo por hipoxia", "Insuficiencia respiratoria", "Vía venosa 18G"),
     "El paciente deja de respirar, la tráquea se desvía a izquierda y el pulso carotídeo desaparece bruscamente.",
     (0, "0/0", 0, 10, 0, 36.5, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", False, "Paro en AESP obstructivo"),
     (108, "96/64", 97, 39, 14, 36.5, "SINUSAL", "Ritmo Sinusal Normal", True, "Respira con tubo torácico"),
     "Neumotórax a tensión con colapso de retorno venoso", "Neumotórax a tensión",
     "La causa es mecánica: requiere descompresión torácica inmediata con aguja/catéter en 2° espacio intercostal línea medioclavicular o 5° EIC LAA.",
     {"physical": {"pulmonary": "Abolición absoluta del murmullo pulmonar en hemitórax derecho con hipersonoridad a la percusión.", "cardiovascular": "Desviación marcada de la tráquea hacia la izquierda. Ingurgitación yugular.", "perfusion": "Cianosis facial.", "temperature": "36.6 °C"},
      "pocus": {"cardiac": "Colapso de cavidades derechas por compresión mediastínica.", "lung": "Ausencia de deslizamiento pleural en hemitórax derecho con punto pulmonar ausente (neumotórax masivo).", "vci": "VCI pletórica > 24 mm."},
      "labs": {"gsa": "pH 7.20 | pCO2 56 | pO2 45 | HCO3 19", "electrolytes": "Normales", "glucose": "HGT: 115 mg/dL", "others": "Trauma torácico evidente"},
      "history": {"witness": "Paramédico del SAMU informa impacto de tórax contra manubrio de motocicleta.", "medications": "Ninguno.", "allergies": "Ninguna."}}
    ),
    # 9
    ("caso-9", "Caso 9: Sepsis Grave Foco Urinario con FA con RVR y Colapso en AESP", "taquicardia", "AESP", False, "Intermedio",
     ("Eliana Rivas", 81, "F", "Servicio de Urgencias Hospitalario", "Postrada, usuaria de sonda Foley a permanencia.", "Traída por compromiso de conciencia, fiebre de 39°C y orinas francamente purulentas."),
     (165, "74/42", 91, 26, 32, 38.9, "FA_RVR", "Fibrilación Auricular con RVR", False, "Shock séptico distributivo con hipoperfusión tisular.", "Estuporosa, mal perfundida", "Espontánea", "Vía 20G"),
     "La paciente presenta un paro cardiorrespiratorio en AESP por colapso vasomotor y acidosis láctica.",
     (0, "0/0", 0, 13, 0, 38.7, "AESP", "Actividad Eléctrica Sin Pulso (AESP)", False, "Paro en AESP séptico"),
     (100, "90/58", 95, 37, 16, 38.2, "FA_RVR", "Fibrilación Auricular controlada con drogas vasoactivas", True, "Comatosa en UCI"),
     "Shock séptico refractario con acidosis metabólica severa", "Hidrogeniones (Acidosis severa) / Hipovolemia relativa",
     "Tratamiento: Carga rápida de cristaloides (suero salino), Adrenalina 1mg, corrección de acidosis y soporte con noradrenalina posparo.",
     {"physical": {"pulmonary": "Roncus basales bilaterales.", "cardiovascular": "Ruidos arrítmicos rápidos.", "perfusion": "Piel moteada (mottling score 3 en rodillas), frialdad periférica extrema.", "temperature": "38.9 °C"},
      "pocus": {"cardiac": "Fracción de eyección hiperdinámica (>70%) con ventrículos colapsables.", "lung": "Líneas B bilaterales escasas.", "vci": "VCI 11 mm colapsable >50%."},
      "labs": {"gsa": "pH 7.10 | pCO2 25 | pO2 78 | HCO3 9 | Lactato 9.2 mmol/L", "electrolytes": "K+ 5.2 | Na+ 145", "glucose": "HGT: 180 mg/dL", "others": "Leucocitosis: 28.000 con 22% baciliformes"},
      "history": {"witness": "Cuidadora relata 3 días de orina con mal olor y fiebre.", "medications": "Paracetamol, Ciprofloxacino.", "allergies": "Ninguna."}}
    ),
    # 10
    ("caso-10", "Caso 10: FA Preexcitada (Síndrome de Wolff-Parkinson-White) que colapsa en FV", "taquicardia", "FV", True, "Avanzado",
     ("Cristóbal Silva", 28, "M", "Box de Reanimación SAPU", "Antecedente de vía accesoria no ablacionada (WPW).", "Consulta por palpitaciones intolerables, mareo severo y sensación de muerte inminente."),
     (240, "70/40", 92, 28, 28, 36.6, "FA_RVR", "FA Preexcitada con conducción por haz accesorio", False, "Inestabilidad hemodinámica extrema (QRS ancho irregular >220 lpm).", "Pálido, mareado, confuso", "Espontánea", "Vía 20G"),
     "El trazado se desorganiza por completo y degenera súbitamente en Fibrilación Ventricular gruesa.",
     (0, "0/0", 0, 11, 0, 36.5, "FV", "Fibrilación Ventricular (FV)", False, "Paro en FV"),
     (95, "102/68", 98, 40, 12, 36.5, "SINUSAL", "Ritmo Sinusal con onda delta (WPW)", True, "Consciente posparo"),
     "Conducción anterógrada rápida por vía accesoria auriculoventricular", "Trombosis coronaria / Isquemia funcional",
     "En FA preexcitada, los bloqueadores del nodo AV (Adenosina, Verapamilo, Digoxina) están CONTRAINDICADOS porque inducen FV. Se debe cardiovertir precozmente.",
     {"physical": {"pulmonary": "Murmullo pulmonar normal.", "cardiovascular": "Ruidos cardíacos extraordinariamente rápidos e irregulares.", "perfusion": "Piel fría, diaforesis profusa.", "temperature": "36.6 °C"},
      "pocus": {"cardiac": "Corazón anatómicamente normal con taquicardia extrema.", "lung": "Normal bilateral.", "vci": "VCI 15 mm."},
      "labs": {"gsa": "pH 7.34 | pCO2 34 | pO2 86 | HCO3 19", "electrolytes": "K+ 4.1 | Na+ 139", "glucose": "HGT: 102 mg/dL", "others": "ECG muestra QRS ancho, polimorfo e irregular"},
      "history": {"witness": "Paciente relata diagnóstico de WPW en la infancia.", "medications": "Ninguno habitual.", "allergies": "Ninguna."}}
    )
]

# Write python script to build 50 complete cases
with open("/Users/christopherrodriguez/Documents/antigravity/lively-meitner/scratch/build_cases.py", "w") as f:
    f.write('''# Generator for 50 ACLS cases
import json
import os

cases = []
''')
print("Helper ready")
