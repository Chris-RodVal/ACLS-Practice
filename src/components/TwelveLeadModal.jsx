import React, { useRef, useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Image as ImageIcon, Grid, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const REAL_ECG_MAP = {
  TSVP: [
    { src: './ecg/TSV 1.png', label: 'TSV Tira 1' },
    { src: './ecg/TSV 2.jpeg', label: 'TSV Tira 2' },
    { src: './ecg/TSV 3.jpeg', label: 'TSV Tira 3' },
    { src: './ecg/TSV 4.jpeg', label: 'TSV Tira 4' },
    { src: './ecg/TSV 5.png', label: 'TSV Tira 5' }
  ],
  TV_MONOMORFA: [
    { src: './ecg/TV M 1.png', label: 'TV Monomorfa 1' },
    { src: './ecg/TV M 2.png', label: 'TV Monomorfa 2' },
    { src: './ecg/TV M 3.png', label: 'TV Monomorfa 3' },
    { src: './ecg/TV M 4.png', label: 'TV Monomorfa 4' },
    { src: './ecg/TV M 5.png', label: 'TV Monomorfa 5' }
  ],
  TVSP: [
    { src: './ecg/TV P 1.png', label: 'TV Polimorfa 1' },
    { src: './ecg/TV P 2.png', label: 'TV Polimorfa 2' },
    { src: './ecg/TV P 3.png', label: 'TV Polimorfa 3' },
    { src: './ecg/TV M 1.png', label: 'TV Monomorfa' }
  ],
  TORSADES: [
    { src: './ecg/Torsade de Points 1.png', label: 'Torsades de Pointes 1' },
    { src: './ecg/Torsade de Points 2.png', label: 'Torsades de Pointes 2' },
    { src: './ecg/Torsade de Points 3.png', label: 'Torsades de Pointes 3' }
  ],
  FV: [
    { src: './ecg/FV.png', label: 'Fibrilación Ventricular (Gruesa)' },
    { src: './ecg/FV fina.png', label: 'Fibrilación Ventricular (Fina)' }
  ],
  FV_FINA: [
    { src: './ecg/FV fina.png', label: 'Fibrilación Ventricular Fina (<2mm)' },
    { src: './ecg/FV.png', label: 'Fibrilación Ventricular Gruesa' }
  ],
  ASISTOLIA: [
    { src: './ecg/AESP.png', label: 'Asistolia / Registro Plano Comprobado en 2 Derivaciones' }
  ],
  FLUTTER: [
    { src: './ecg/Flutter_1.png', label: 'Flutter Auricular (Dientes de Sierra) 1' },
    { src: './ecg/Flutter_2.png', label: 'Flutter Auricular 2' }
  ],
  FA_RVR: [
    { src: './ecg/FA_rapida_1.jpg', label: 'Fibrilación Auricular Rápida (RVR) 1' },
    { src: './ecg/FA_rapida_2.jpeg', label: 'Fibrilación Auricular Rápida 2' },
    { src: './ecg/FA_rapida_3.jpeg', label: 'Fibrilación Auricular Rápida 3' }
  ],
  BRADICARDIA_SINUSAL: [
    { src: './ecg/Bradicardia sinusal.png', label: 'Bradicardia Sinusal' }
  ],
  BAV_1: [
    { src: './ecg/BAV1 1.png', label: 'Bloqueo AV 1° Grado - Tira 1' },
    { src: './ecg/BAV1 2.png', label: 'Bloqueo AV 1° Grado - Tira 2' },
    { src: './ecg/BAV1 3.png', label: 'Bloqueo AV 1° Grado - Tira 3' }
  ],
  BAV_2_WENCKEBACH: [
    { src: './ecg/BAV2 Monitz I.png', label: 'Bloqueo AV 2° Mobitz I (Wenckebach)' }
  ],
  BAV_2_MOBITZ_1: [
    { src: './ecg/BAV2 Monitz I.png', label: 'Bloqueo AV 2° Mobitz I (Wenckebach)' }
  ],
  BAV_2_MOBITZ_2: [
    { src: './ecg/BAV2 Mobitz II.png', label: 'Bloqueo AV 2° Mobitz II (Típico)' },
    { src: './ecg/BAV2 Mobitz II 3 es a 1.png', label: 'Bloqueo AV 2° Mobitz II (Conducción 3:1)' }
  ],
  STEMI_INFERIOR: [
    { src: './ecg/STEMI inferior 1.png', label: 'STEMI Inferior (DII, DIII, aVF con espejo en DI, aVL) 1' },
    { src: './ecg/STEMI inferior 2.png', label: 'STEMI Inferior (DII, DIII, aVF) 2' },
    { src: './ecg/STEMI inferior 3.png', label: 'STEMI Inferior (DII, DIII, aVF) 3' }
  ],
  STEMI_ANTEROLATERAL: [
    { src: './ecg/STEMI anterolateral 1.png', label: 'STEMI Anterolateral Extenso (V1-V6, DI, aVL) 1' },
    { src: './ecg/STEMI anterolateral 2.png', label: 'STEMI Anterolateral Extenso 2' }
  ],
  SINUSAL_ST_ELEVATION: [
    { src: './ecg/STEMI inferior 1.png', label: 'STEMI Inferior (DII, DIII, aVF) 1' },
    { src: './ecg/STEMI inferior 2.png', label: 'STEMI Inferior 2' },
    { src: './ecg/STEMI inferior 3.png', label: 'STEMI Inferior 3' },
    { src: './ecg/STEMI anterolateral 1.png', label: 'STEMI Anterolateral 1' },
    { src: './ecg/STEMI anterolateral 2.png', label: 'STEMI Anterolateral 2' }
  ],
  AESP: [
    { src: './ecg/AESP.png', label: 'Actividad Eléctrica Sin Pulso (AESP)' }
  ],
  NSTEMI: [
    { src: './ecg/NSTMI 1.png', label: 'NSTEMI (Infradesnivel ST) 1' },
    { src: './ecg/NSTEMI 2.png', label: 'NSTEMI 2' }
  ]
};

// Helper to accurately classify STEMI territory from case data and rhythm
export function detectStemiType(currentCase, rhythm, phase) {
  const text = [
    currentCase?.title || '',
    currentCase?.hytCategory || '',
    currentCase?.reversibleCause || '',
    currentCase?.rceVitals?.rhythmName || '',
    currentCase?.rceVitals?.rhythm || '',
    currentCase?.initialVitals?.rhythmName || '',
    currentCase?.initialVitals?.rhythm || '',
    rhythm || '',
    currentCase?.patient?.presentation || '',
    currentCase?.physicalExam?.cardiac || '',
    currentCase?.physicalExam?.others || ''
  ].join(' ').toLowerCase();

  const isInferior = text.includes('inferior') || text.includes('dii, diii') || text.includes('d2, d3') || text.includes('diafragm');
  const isAnterolateral = text.includes('anterolateral') || text.includes('anterior') || text.includes('v1-v6') || text.includes('v2-v4');

  if (isInferior) return 'INFERIOR';
  if (isAnterolateral) return 'ANTEROLATERAL';
  return 'INFERIOR'; // Default fallback
}

export default function TwelveLeadModal({ isOpen, onClose, currentCase, phase, rhythm }) {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('real'); // 'real' | 'canvas'
  const [currentStripIdx, setCurrentStripIdx] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Determine active diagnosis & strip mapping based on current phase and rhythm
  const getActiveDiagnosis = () => {
    if (phase === 'arrest') {
      return currentCase?.arrestVitals?.rhythmName || 'Paro Cardiorrespiratorio';
    }
    if (phase === 'post_rce') {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      return stemiType === 'INFERIOR'
        ? 'RCE Posparo: STEMI Inferior (Supradesnivel DII, DIII, aVF) ➔ Hemodinamia'
        : 'RCE Posparo: STEMI Anterolateral (Supradesnivel V1-V6, DI, aVL) ➔ Hemodinamia';
    }
    return currentCase?.initialVitals?.rhythmName || rhythm || 'Arritmia Inicial';
  };

  const getActiveKey = () => {
    if (phase === 'arrest') {
      return currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP');
    }
    if (phase === 'post_rce') {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      return stemiType === 'INFERIOR' ? 'STEMI_INFERIOR' : 'STEMI_ANTEROLATERAL';
    }
    const baseRhythm = rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA';
    if (baseRhythm === 'SINUSAL_ST_ELEVATION' || baseRhythm.includes('STEMI')) {
      const stemiType = detectStemiType(currentCase, rhythm, phase);
      return stemiType === 'INFERIOR' ? 'STEMI_INFERIOR' : 'STEMI_ANTEROLATERAL';
    }
    return baseRhythm;
  };

  const currentKey = getActiveKey();
  const availableStrips = REAL_ECG_MAP[currentKey] || REAL_ECG_MAP[rhythm] || REAL_ECG_MAP['TSVP'];
  const activeStrip = availableStrips[currentStripIdx % availableStrips.length];

  useEffect(() => {
    if (!isOpen) return;
    setCurrentStripIdx(0);
    setZoomLevel(1);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const width = 860;
    const height = 480;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Pink / Red ECG paper background
    ctx.fillStyle = '#FFF5F5';
    ctx.fillRect(0, 0, width, height);

    // Draw ECG paper grid (1mm and 5mm squares)
    drawEcgPaperGrid(ctx, width, height);

    // Draw calibration pulses and 12 lead waveforms
    drawTwelveLeads(ctx, width, height, currentCase, rhythm, phase);

  }, [isOpen, currentCase, rhythm, phase, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#121A2A] border border-slate-700 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-[#0E1524]">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              ECG 12 DERIVACIONES CLÍNICO
            </div>
            <div className="text-slate-200 text-xs sm:text-sm font-semibold truncate">
              {currentCase?.patient?.name} ({currentCase?.patient?.age}a) — Calibración: 25 mm/s | 10 mm/mV
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('real')}
                className={`px-3 py-1 rounded flex items-center gap-1.5 font-bold transition ${
                  activeTab === 'real'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Registro Clínico Real
              </button>
              <button
                onClick={() => setActiveTab('canvas')}
                className={`px-3 py-1 rounded flex items-center gap-1.5 font-bold transition ${
                  activeTab === 'canvas'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Matriz 12 Derivaciones
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clinical diagnosis banner & controls */}
        <div className="bg-[#192438] px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Diagnóstico Clínico Actual:</span>
            <span className="text-white font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
              {getActiveDiagnosis()}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
              phase === 'arrest'
                ? 'bg-rose-950/80 border-rose-700 text-rose-300 animate-pulse'
                : phase === 'post_rce'
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-amber-950/80 border-amber-700 text-amber-300'
            }`}>
              {phase === 'arrest' ? 'PARO (PCR)' : phase === 'post_rce' ? 'CUIDADOS POSPARO (RCE)' : 'FASE INICIAL'}
            </span>
          </div>

          {activeTab === 'real' && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">
                Tira {currentStripIdx + 1} de {availableStrips.length}:
              </span>
              <span className="text-cyan-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                {activeStrip?.label}
              </span>
              {availableStrips.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentStripIdx(prev => (prev > 0 ? prev - 1 : availableStrips.length - 1))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                    title="Tira anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentStripIdx(prev => (prev + 1) % availableStrips.length)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                    title="Siguiente tira"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              {/* Zoom controls */}
              <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                  title="Alejar"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-300 w-9 text-center font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                  title="Acercar"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ECG Viewer Area */}
        <div className="p-4 overflow-auto flex-1 flex justify-center items-center bg-[#070B14] min-h-[380px]">
          {activeTab === 'real' ? (
            <div className="w-full flex flex-col items-center justify-center overflow-auto">
              {activeStrip ? (
                <div 
                  className="transition-transform duration-200 border-2 border-rose-900/60 rounded-xl shadow-2xl bg-white p-2"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                >
                  <img
                    src={activeStrip.src}
                    alt={activeStrip.label}
                    className="max-h-[500px] object-contain rounded"
                  />
                </div>
              ) : (
                <div className="text-slate-400 font-mono text-center py-12">
                  No hay tira clínica digitalizada disponible para este ritmo.
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-rose-900/40 rounded-xl shadow-lg overflow-hidden">
              <canvas ref={canvasRef} className="block" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0E1524] flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              ACLS Clave: Identificar ritmo, frecuencia, ancho del QRS (&lt;0.12s vs &gt;0.12s), regularidad y elevación del ST para conducta inmediata.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-xs"
          >
            Cerrar Visor
          </button>
        </div>

      </div>
    </div>
  );
}

function drawEcgPaperGrid(ctx, width, height) {
  // Minor grid (small squares ~ 4px)
  ctx.strokeStyle = '#FCA5A5';
  ctx.lineWidth = 0.4;
  const small = 4;
  ctx.beginPath();
  for (let x = 0; x < width; x += small) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += small) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Major grid (large squares ~ 20px = 0.20 sec)
  ctx.strokeStyle = '#F87171';
  ctx.lineWidth = 0.9;
  const major = 20;
  ctx.beginPath();
  for (let x = 0; x < width; x += major) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += major) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

// Pre-computed irregular RR sequence for Atrial Fibrillation (pixels per beat)
const AFIB_RR_PATTERN = [34, 52, 28, 62, 40, 32, 56, 44, 30, 68, 38, 50, 32, 58, 42, 34, 60];

function getSampleProgress(distX, isAfib, defaultCycle = 55) {
  if (!isAfib) {
    return (distX % defaultCycle) / defaultCycle;
  }
  let accumulated = 0;
  for (let i = 0; i < 200; i++) {
    const cycleLen = AFIB_RR_PATTERN[i % AFIB_RR_PATTERN.length];
    if (distX < accumulated + cycleLen) {
      return (distX - accumulated) / cycleLen;
    }
    accumulated += cycleLen;
  }
  return (distX % defaultCycle) / defaultCycle;
}

function drawTwelveLeads(ctx, width, height, currentCase, rhythm, phase) {
  const activeRhythm = phase === 'arrest'
    ? (currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP'))
    : phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythm || 'SINUSAL_ST_ELEVATION')
    : (rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA');

  const isAfib = activeRhythm === 'FA_RVR' || activeRhythm === 'FA';

  const leads = [
    { name: 'I', col: 0, row: 0 },
    { name: 'II', col: 0, row: 1 },
    { name: 'III', col: 0, row: 2 },
    { name: 'aVR', col: 1, row: 0 },
    { name: 'aVL', col: 1, row: 1 },
    { name: 'aVF', col: 1, row: 2 },
    { name: 'V1', col: 2, row: 0 },
    { name: 'V2', col: 2, row: 1 },
    { name: 'V3', col: 2, row: 2 },
    { name: 'V4', col: 3, row: 0 },
    { name: 'V5', col: 3, row: 1 },
    { name: 'V6', col: 3, row: 2 },
  ];

  const colWidth = width / 4;
  const rowHeight = (height - 90) / 3;

  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 1.3;
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 11px Fira Code, monospace';

  leads.forEach((lead) => {
    const x0 = lead.col * colWidth;
    const y0 = lead.row * rowHeight;
    const baselineY = y0 + rowHeight * 0.55;

    // Lead Label
    ctx.fillText(lead.name, x0 + 10, y0 + 16);

    // Draw calibration mark at start of each lead
    ctx.beginPath();
    ctx.moveTo(x0 + 8, baselineY);
    ctx.lineTo(x0 + 12, baselineY);
    ctx.lineTo(x0 + 12, baselineY - 20);
    ctx.lineTo(x0 + 18, baselineY - 20);
    ctx.lineTo(x0 + 18, baselineY);
    ctx.lineTo(x0 + 24, baselineY);
    ctx.stroke();

    // Draw lead wave segments
    ctx.beginPath();
    const waveStart = x0 + 24;
    const waveEnd = x0 + colWidth - 4;
    for (let x = waveStart; x < waveEnd; x++) {
      const p = getSampleProgress(x - waveStart, isAfib, 55);
      const val = calculateLeadSample(lead.name, p, rhythm, phase, currentCase);
      const y = baselineY - val * 18;
      if (x === waveStart) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  });

  // Rhythm strip at the bottom (Lead II largo)
  const stripY = height - 50;
  ctx.fillText('II (Tira de Ritmo Continua)', 10, stripY - 24);
  ctx.beginPath();
  for (let x = 10; x < width - 10; x++) {
    const p = getSampleProgress(x - 10, isAfib, 55);
    const val = calculateLeadSample('II', p, rhythm, phase, currentCase);
    const y = stripY - val * 18;
    if (x === 10) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function calculateLeadSample(leadName, p, rhythm, phase, currentCase) {
  const activeRhythm = phase === 'arrest'
    ? (currentCase?.arrestType || (currentCase?.isShockable ? 'FV' : 'AESP'))
    : phase === 'post_rce'
    ? (currentCase?.rceVitals?.rhythm || 'SINUSAL_ST_ELEVATION')
    : (rhythm || currentCase?.initialVitals?.rhythm || 'TV_MONOMORFA');

  // ASISTOLIA: Línea plana rigurosa en las 12 derivaciones
  if (activeRhythm === 'ASISTOLIA') {
    return (Math.random() - 0.5) * 0.02;
  }

  // AESP: Actividad eléctrica organizada de escape idioventricular (~48 lpm)
  if (activeRhythm === 'AESP' || (typeof activeRhythm === 'string' && activeRhythm.includes('AESP'))) {
    let y = 0;
    if (p >= 0.06 && p < 0.14) {
      y += Math.sin(((p - 0.06) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.1 : 0.14);
    }
    if (p >= 0.20 && p < 0.22) {
      y -= Math.sin(((p - 0.20) / 0.02) * Math.PI) * 0.10;
    }
    if (p >= 0.22 && p < 0.30) {
      y += Math.sin(((p - 0.22) / 0.08) * Math.PI) * 1.15;
    }
    if (p >= 0.30 && p < 0.34) {
      y -= Math.sin(((p - 0.30) / 0.04) * Math.PI) * 0.28;
    }
    if (p >= 0.38 && p <= 0.52) {
      y += Math.sin(((p - 0.38) / 0.14) * Math.PI) * 0.26;
    }
    const isNegativeVector = ['aVR', 'V1'].includes(leadName);
    return (isNegativeVector ? -y * 0.85 : y) + (Math.random() - 0.5) * 0.012;
  }

  // Fibrilación Ventricular
  if (activeRhythm === 'FV' || activeRhythm === 'FV_GRUESA') {
    return (Math.sin(p * 26) + Math.cos(p * 39)) * 0.75 + (Math.random() - 0.5) * 0.08;
  }
  if (activeRhythm === 'FV_FINA') {
    return (Math.sin(p * 36) + Math.cos(p * 55)) * 0.12 + (Math.random() - 0.5) * 0.03;
  }
  if (activeRhythm === 'TVSP') {
    return Math.sin(p * Math.PI * 2) * 1.1;
  }

  // TV Monomorfa: complejos QRS anchos (>0.12s), regulares y rápidos
  if (activeRhythm === 'TV_MONOMORFA') {
    const isNegativeLead = ['aVR', 'V1'].includes(leadName);
    const wave = Math.sin(p * Math.PI * 2);
    const shape = wave > 0 ? Math.pow(wave, 0.8) * 1.3 : -Math.pow(Math.abs(wave), 1.2) * 1.1;
    return (isNegativeLead ? -shape : shape) + (Math.random() - 0.5) * 0.03;
  }

  // Torsades de Pointes
  if (activeRhythm === 'TORSADES') {
    const spindle = Math.sin(p * Math.PI * 4) * Math.sin(p * Math.PI);
    return spindle * 1.2;
  }

  // Flutter Auricular: ondas F en dientes de sierra a 300 lpm
  if (activeRhythm === 'FLUTTER') {
    const isInferior = ['II', 'III', 'aVF'].includes(leadName);
    const sawTooth = ((p * 4) % 1) - 0.5;
    let y = isInferior ? -sawTooth * 0.4 : sawTooth * 0.2;
    if (p >= 0.22 && p < 0.28) {
      y += 1.2;
    }
    return y;
  }

  // Fibrilación Auricular con RVR: irregular, ausencia de ondas P, ondas f caóticas y QRS angosto
  if (activeRhythm === 'FA_RVR' || activeRhythm === 'FA') {
    let y = 0;
    // Ondas f fibrilatorias en la línea de base
    const fWave = Math.sin(p * 48) * 0.05 + Math.cos(p * 76) * 0.038 + (Math.random() - 0.5) * 0.025;
    y += fWave;

    const isNegative = leadName === 'aVR';
    if (p >= 0.18 && p < 0.20) {
      y -= 0.12;
    } else if (p >= 0.20 && p < 0.24) {
      y += isNegative ? -1.0 : (leadName.startsWith('V') ? 1.45 : 1.15);
    } else if (p >= 0.24 && p < 0.27) {
      y -= isNegative ? -0.2 : 0.35;
    } else if (p >= 0.36 && p <= 0.52) {
      y += Math.sin(((p - 0.36) / 0.16) * Math.PI) * (isNegative ? -0.18 : 0.26);
    }
    return y;
  }

  // TSVP: QRS angosto a alta frecuencia
  if (activeRhythm === 'TSVP') {
    let y = 0;
    if (p >= 0.16 && p < 0.22) {
      y += leadName === 'aVR' ? -1.0 : 1.3;
    } else if (p >= 0.22 && p < 0.26) {
      y -= 0.3;
    } else if (p >= 0.32 && p < 0.44) {
      y += 0.25;
    }
    return y;
  }

  // STEMI (Infarto con supradesnivel del ST)
  const isStemi = activeRhythm === 'SINUSAL_ST_ELEVATION' || activeRhythm.includes('STEMI') || phase === 'post_rce';
  if (isStemi) {
    const stemiType = detectStemiType(currentCase, rhythm, phase);
    let y = 0;

    // Onda P normal
    if (p >= 0.08 && p <= 0.16) {
      y += Math.sin(((p - 0.08) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
    }

    if (stemiType === 'INFERIOR') {
      // ========================================================
      // STEMI DE CARA INFERIOR (Oclusión de Coronaria Derecha / CD o CX):
      // - DII, DIII, aVF: Supradesnivel marcado del ST (+4 a +5 mm) y T hiperaguda
      // - DI, aVL: Infradesnivel especular/recíproco (-2 a -3 mm) y T negativa
      // - V1-V6: ESTRICTAMENTE ISOELÉCTRICO (¡SIN elevación del ST!)
      // ========================================================
      if (['II', 'III', 'aVF'].includes(leadName)) {
        if (p >= 0.18 && p < 0.20) y -= 0.25; // Onda Q patológica en cara inferior
        if (p >= 0.20 && p < 0.24) y += 1.1;  // Onda R
        // J-point y ST supradesnivel masivo
        if (p >= 0.24 && p < 0.42) {
          const stPhase = (p - 0.24) / 0.18;
          y += 0.75 + Math.sin(stPhase * Math.PI) * 0.25;
        }
        // Onda T monofásica fusionada con ST
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.85;
        }
        return y;
      }

      if (['I', 'aVL'].includes(leadName)) {
        // Espejo recíproco en cara lateral alta
        if (p >= 0.20 && p < 0.24) y += 1.0;
        if (p >= 0.24 && p < 0.28) y -= 0.35;
        // Infradesnivel ST
        if (p >= 0.28 && p < 0.42) y -= 0.35;
        // Onda T invertida
        if (p >= 0.42 && p <= 0.58) {
          y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }

      if (leadName === 'aVR') {
        if (p >= 0.20 && p < 0.24) y -= 1.1;
        if (p >= 0.42 && p <= 0.58) y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.25;
        return y;
      }

      // Precordiales V1 a V6: ISOELÉCTRICAS (Sin elevación anterior)
      if (leadName.startsWith('V')) {
        const leadNum = parseInt(leadName.slice(1), 10) || 1;
        const rHeight = 0.3 + (leadNum * 0.22);
        const sDepth = 1.4 - (leadNum * 0.20);
        if (p >= 0.20 && p < 0.23) y += rHeight;
        if (p >= 0.23 && p < 0.27) y -= sDepth;
        // ST isoeléctrico (0.0)
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }
    } else {
      // ========================================================
      // STEMI ANTEROLATERAL EXTENSO (Oclusión de Arteria Descendente Anterior / DA):
      // - V1 a V6, DI, aVL: Supradesnivel masivo en lápida de tumba (+4 a +6 mm)
      // - DII, DIII, aVF: Infradesnivel especular/recíproco (-2 a -3 mm)
      // ========================================================
      if (['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'I', 'aVL'].includes(leadName)) {
        if (p >= 0.18 && p < 0.20) y -= 0.2;
        if (p >= 0.20 && p < 0.24) y += leadName.startsWith('V') ? 1.5 : 1.1;
        // Supradesnivel tombstone masivo
        if (p >= 0.24 && p < 0.42) {
          const stPhase = (p - 0.24) / 0.18;
          y += 0.80 + Math.sin(stPhase * Math.PI) * 0.25;
        }
        if (p >= 0.42 && p <= 0.58) {
          y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.85;
        }
        return y;
      }

      if (['II', 'III', 'aVF'].includes(leadName)) {
        // Espejo recíproco inferior
        if (p >= 0.20 && p < 0.24) y += 0.9;
        if (p >= 0.24 && p < 0.28) y -= 0.35;
        if (p >= 0.28 && p < 0.42) y -= 0.35;
        if (p >= 0.42 && p <= 0.58) {
          y -= Math.sin(((p - 0.42) / 0.16) * Math.PI) * 0.35;
        }
        return y;
      }

      if (leadName === 'aVR') {
        if (p >= 0.20 && p < 0.24) y -= 1.0;
        if (p >= 0.28 && p < 0.42) y += 0.25;
        return y;
      }
    }
  }

  // Ritmo Sinusal / Bradicardia Sinusal estándar
  let y = 0;
  if (p >= 0.08 && p <= 0.16) {
    y += Math.sin(((p - 0.08) / 0.08) * Math.PI) * (leadName === 'aVR' ? -0.15 : 0.2);
  }
  if (p >= 0.18 && p < 0.20) y -= 0.1;
  if (p >= 0.20 && p < 0.24) y += leadName === 'aVR' ? -1.0 : (leadName.startsWith('V') ? 1.4 : 1.1);
  if (p >= 0.24 && p < 0.28) y -= leadName === 'aVR' ? -0.2 : 0.4;
  if (p >= 0.42 && p <= 0.58) {
    y += Math.sin(((p - 0.42) / 0.16) * Math.PI) * (leadName === 'aVR' ? -0.25 : 0.35);
  }
  return y;
}
