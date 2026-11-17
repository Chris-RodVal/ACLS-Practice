# SIMCORE ACLS MASTER | Simulador Clínico de Arritmias, Paro Cardiorrespiratorio y Cuidados Posparo

Herramienta web interactiva e hiperrealista de simulación clínica diseñada específicamente para el entrenamiento y evaluación de exámenes prácticos de **Soporte Cardiovascular Avanzado (ACLS)** según los estándares de la American Heart Association (AHA) y las pautas docentes de evaluación de actuación crítica.

Inspirado en la interfaz y ergonomía de **SimCore** y monitores multiparamétricos de alta fidelidad (Philips IntelliVue, LIFEPAK 15, Zoll R Series).

---

## 🫀 Características Principales

### 1. Flujo Clínico en 4 Fases (Progresión Real de Examen)
*   **Fase 1: Arritmia Inicial (Taquicardia o Bradicardia):** Evaluación de estabilidad hemodinámica (dolor torácico, hipotensión, compromiso de conciencia, disnea), monitorización, vía venosa, oxígeno, cardioversión sincronizada inmediata (si inestable) o fármacos (si estable).
*   **Fase 2: Colapso y Paro Cardiorrespiratorio (PCR):** Degeneración súbita del paciente a ritmo de paro:
    *   **Ritmos Desfibrilables:** Fibrilación Ventricular (FV) y Taquicardia Ventricular sin pulso (TVSP).
    *   **Ritmos No Desfibrilables:** Actividad Eléctrica Sin Pulso (AESP) y Asistolia.
*   **Fase 3: Reanimación y Retorno de Circulación Espontánea (RCE / ROSC):** Conducción de ciclos de RCP de 2 minutos de alta calidad, administración de fármacos (Adrenalina cada 3-5 min, Amiodarona/Lidocaína tras 3er choque en FV/TVSP; búsqueda y tratamiento de las 5 H y 5 T en AESP/Asistolia), identificación oportuna del RCE con pulso y elevación súbita de EtCO2 (>35-40 mmHg).
*   **Fase 4: Algoritmo de Cuidados Posparo Cardíaco:**
    *   Vía aérea avanzada e intubación con capnografía cuantitativa continua.
    *   Optimización de ventilación y oxigenación (SaO2 92-98%).
    *   Manejo hemodinámico de hipotensión (fluidos y vasopresores para PAM > 65 mmHg).
    *   ECG de 12 derivaciones para identificar supradesnivel del ST (STEMI) y activación de hemodinamia/PCI.
    *   Manejo Específico de la Temperatura (TTM de 32 a 36°C) si el paciente no obedece órdenes.
    *   Solicitud de analítica (gases arteriales, troponinas, electrolitos, lactato).

---

### 2. Monitor Fisiológico Hiperrealista (Osciloscopio a 60 FPS)
*   **4 Canales de Trazado Continuo:**
    1.  **DII (Verde):** ECG Derivación II con complejos P-QRS-T paramétricos, morfologías de arritmias, espigas de marcapasos, artefacto de compresiones torácicas durante RCP y marcadores luminosos de modo SYNC en la onda R.
    2.  **V5 (Verde Cian):** ECG precordial secundario para comparación vectorial.
    3.  **PLET (Cian):** Onda pletismográfica de SpO2 con muesca dícrota pulsátil que se aplana en tiempo real ante la pérdida de pulso.
    4.  **CO2 (Amarillo):** Capnografía cuantitativa en tiempo real con meseta alveolar (baja durante RCP y con salto brusco >40 mmHg en RCE).
*   **Panel Numérico Lateral:** FC (con indicador LED de sístole), SpO2 %, PA / NIBP (con botón de inflado de manguito para toma manual), PAM calculada, EtCO2, FR y Temperatura.
*   **Audio Fisiológico y Efectos Sintetizados con Web Audio API (Cero archivos externos):**
    *   Beeps de QRS cuyo tono varía dinámicamente con la SpO2 (pitch acústico real).
    *   Sonido de carga progresiva del condensador del desfibrilador.
    *   Descarga eléctrica de alto voltaje y snap de relé.
    *   Tics de marcapasos transcutáneo.
    *   Inflado neumático del manguito de PA.
    *   Alarmas críticas de paro y fibrilación.

---

### 3. Panel de Desfibrilador y Marcapasos Transcutáneo
*   Selector de energía bifásica: **50J, 100J, 150J, 200J, 300J y 360J**.
*   **Modo SYNC:** Sincronización en la onda R para cardioversión eléctrica.
*   **Botón CARGAR:** Simulación temporal del capacitor (2.5 segundos con tono acústico ascendente).
*   **Botón DESCARGA:** Alerta parpadeante y disparo eléctrico sobre el paciente.
*   **Marcapasos Transcutáneo (TCP):** Selector de Frecuencia (40-120 ppm), Selector de Corriente (10-180 mA) y captura electromecánica.
*   **Visor de ECG de 12 Derivaciones:** Modal emergente sobre papel milimetrado rosa estándar con tira de ritmo continua.

---

### 4. Consola de Actuación Médica en Lenguaje Natural y Accesos Rápidos
Permite escribir en español cualquier orden médica o acción del equipo:
*   `"iniciar rcp"`, `"administrar adrenalina 1mg iv en bolo"`, `"desfibrilar 200j"`
*   `"cardioversion sincronizada 100j"`, `"amiodarona 300mg"`, `"atropina 1mg iv"`
*   `"intubar paciente con tet 7.5 y capnografia"`, `"tomar pulso carotideo"`
*   `"tomar pa"`, `"ecg 12 derivaciones"`, `"buscar causas 5 h y 5 t"`
*   `"iniciar ttm a 36 grados"`, `"infusion de noradrenalina"`, etc.
*   Incluye botones de acción rápida organizados por categorías (Líder, RCP, Desfibrilador, Fármacos, Vía Aérea, Posparo).

---

### 5. Pauta de Evaluación Oficial ACLS (Basada en las Rúbricas Docentes)
Genera la nota final (escala 1.0 a 7.0 / porcentaje) y detalla paso a paso:
*   Desempeño del Líder del equipo.
*   Manejo de la taquicardia o bradicardia inicial.
*   Manejo del ritmo de paro (FV/TVSP vs AESP/Asistolia).
*   Cuidados posparo (RCE).
*   **Detección de Errores Críticos y Retroalimentación Pedagógica:**
    *   Descarga no sincronizada en paciente con pulso.
    *   Chequear pulso inmediatamente después de la descarga (interrupción innecesaria de RCP).
    *   Parar compresiones antes de completar los 2 minutos de ciclo.
    *   Administrar fármacos contraindicados (ej. adenosina en PCR).
    *   Descargar en ritmo no desfibrilable (asistolia/AESP).
    *   Omitir búsqueda activa de causas reversibles (5 H y 5 T).
    *   No indicar TTM en paciente en coma tras RCE.

---

## 🚀 Despliegue 100% Gratis en GitHub Pages

Este proyecto es una aplicación estática client-side (no requiere base de datos ni servidor backend).

### Opción A: Despliegue Automático con GitHub Actions (Recomendado)
El repositorio ya incluye el archivo `.github/workflows/deploy.yml`.
1. Sube tu código a GitHub:
   ```bash
   git add .
   git commit -m "feat: SimCore ACLS Simulator"
   git push origin main
   ```
2. En tu repositorio en GitHub, ve a **Settings** > **Pages**.
3. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! En 1 minuto tu simulador estará disponible públicamente en `https://<tu-usuario>.github.io/<tu-repo>/`.

### Opción B: Despliegue desde la carpeta `/docs`
La carpeta `/docs` contiene los archivos de producción listos para servir:
1. En tu repositorio en GitHub, ve a **Settings** > **Pages**.
2. En **Build and deployment** > **Source**, selecciona **Deploy from a branch**.
3. En **Branch**, selecciona `main` y en la carpeta elige `/docs`.
4. Haz clic en **Save**.

---

## 💻 Ejecución Local

Para correr el simulador en tu computadora:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Compilar para producción
npm run build
```
