import React, { useRef, useEffect, useState } from 'react';
import { soundEngine } from '../audio/soundEngine';

/**
 * High-Fidelity Clinical Oscilloscope Monitor Canvas
 * Real-time sweeps for:
 * 1. ECG Lead II (D2) (Green)
 * 2. ECG Lead V5 (D5) (Cyan-Green)
 * 3. Plethysmography / SpO2 (Cyan)
 * 4. Capnography / EtCO2 (Yellow)
 */
export default function MonitorCanvas({
  rhythm = 'SINUSAL',
  hr = 80,
  spo2 = 98,
  etco2 = 38,
  isCprActive = false,
  isPacingActive = false,
  pacerRate = 70,
  isSync = false,
  isShockable = false,
  pulsePresent = true,
  isAirwaySecured = false,
  onQRSBeat = () => {}
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const [ecgGain, setEcgGain] = useState(1.0);

  // Internal persistent simulation state
  const stateRef = useRef({
    sweepX: 0,
    prevY: [0, 0, 0, 0],
    beatPhase: 0,
    cprPhase: 0,
    capnoPhase: 0,
    pacerPhase: 0,
    lastBeatTime: 0,
    currentBeatDuration: 0.40,
    wenckebachBeat: 0,
    lastQrsTriggered: 0,
    lastPacerTriggered: 0
  });

  // Keep latest props in a ref so the canvas render loop runs continuously without destroying the canvas
  const propsRef = useRef({
    rhythm,
    hr,
    spo2,
    etco2,
    isCprActive,
    isPacingActive,
    pacerRate,
    isSync,
    isShockable,
    pulsePresent,
    isAirwaySecured,
    onQRSBeat,
    ecgGain
  });

  useEffect(() => {
    propsRef.current = {
      rhythm,
      hr,
      spo2,
      etco2,
      isCprActive,
      isPacingActive,
      pacerRate,
      isSync,
      isShockable,
      pulsePresent,
      isAirwaySecured,
      onQRSBeat,
      ecgGain
    };
  }, [rhythm, hr, spo2, etco2, isCprActive, isPacingActive, pacerRate, isSync, isShockable, pulsePresent, isAirwaySecured, onQRSBeat, ecgGain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    let width = canvas.parentElement.clientWidth || 800;
    let height = canvas.parentElement.clientHeight || 420;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Initial background clear
    ctx.fillStyle = '#060B14';
    ctx.fillRect(0, 0, width, height);

    // Draw static medical grid once
    drawGrid(ctx, width, height);

    let lastTimestamp = performance.now();

    const render = (now) => {
      // Clamp dt: when tab becomes inactive and active again, avoid massive jumps
      let dt = (now - lastTimestamp) / 1000;
      if (dt > 0.05) dt = 0.05;
      if (dt <= 0) dt = 0.016;
      lastTimestamp = now;

      const p = propsRef.current;
      const sweepSpeed = 160; // 25 mm/s standard medical sweep speed
      const dx = sweepSpeed * dt;
      const s = stateRef.current;

      const oldX = s.sweepX;
      s.sweepX += dx;
      if (s.sweepX >= width) {
        s.sweepX = 0;
      }

      // Channels layout heights
      const channelHeight = height / 4;
      const eraseWidth = 24;

      // Erase beam ahead of current X
      ctx.fillStyle = '#060B14';
      ctx.fillRect(s.sweepX, 0, eraseWidth, height);

      // Re-draw grid in the erased slot
      drawGridSlot(ctx, s.sweepX, eraseWidth, height);

      // Determine effective electrical rate for oscilloscope animation
      let currentHr = p.isPacingActive ? p.pacerRate : p.hr;
      const isAesp = p.rhythm === 'AESP' || (typeof p.rhythm === 'string' && p.rhythm.includes('AESP'));
      const isAfib = p.rhythm === 'FA_RVR' || p.rhythm === 'FA';
      
      // When mechanical pulse is lost (cardiac arrest or arrhythmia), the heart still has electrical depolarization:
      if (!currentHr || currentHr <= 0) {
        if (['TV_MONOMORFA', 'TVSP'].includes(p.rhythm)) {
          currentHr = 175;
        } else if (isAesp) {
          currentHr = 48;
        } else if (p.rhythm === 'TORSADES') {
          currentHr = 220;
        } else if (p.rhythm === 'TSVP') {
          currentHr = 180;
        } else if (isAfib) {
          currentHr = 150;
        } else if (p.rhythm === 'FLUTTER') {
          currentHr = 150;
        }
      }

      // Initialize s.currentBeatDuration if not set
      if (!s.currentBeatDuration || s.currentBeatDuration <= 0) {
        s.currentBeatDuration = currentHr > 0 ? 60 / currentHr : 0.8;
      }

      const timeSinceLastBeat = (now - s.lastBeatTime) / 1000;

      if (currentHr > 0 && timeSinceLastBeat >= s.currentBeatDuration) {
        s.lastBeatTime = now;
        s.beatPhase = 0;

        // Choose NEXT beat duration:
        if (isAfib) {
          // Atrial Fibrillation with RVR:
          // "Irregularmente irregular" - varying RR intervals with physiological dispersion around mean HR (~140-160 lpm).
          // Intervals range between ~0.24s (~250 lpm) and ~0.65s (~92 lpm) with occasional compensatory pauses.
          const meanInterval = 60 / currentHr;
          // Random spread between 0.65 and 1.35
          const randomFactor = 0.65 + Math.random() * 0.70;
          // 15% probability of a diastolic pause (Ashman sequence)
          const pauseFactor = Math.random() < 0.15 ? 1.40 + Math.random() * 0.30 : 1.0;
          s.currentBeatDuration = Math.max(0.24, Math.min(0.75, meanInterval * randomFactor * pauseFactor));
        } else if (p.rhythm === 'BAV_2_WENCKEBACH' || p.rhythm === 'BAV_2_MOBITZ_1') {
          s.wenckebachBeat = ((s.wenckebachBeat || 0) + 1) % 4;
          const baseInt = 60 / currentHr;
          s.currentBeatDuration = s.wenckebachBeat === 3 ? baseInt * 1.85 : baseInt * 0.95;
        } else {
          s.currentBeatDuration = 60 / currentHr;
        }

        // Trigger audible QRS beep on beat onset (and sync blip if cardioversion sync is on)
        if (p.pulsePresent || ['TV_MONOMORFA', 'TSVP', 'FA_RVR', 'FLUTTER', 'SINUSAL', 'SINUSAL_BRADI', 'BRADICARDIA_SINUSAL', 'BAV_3', 'BAV_2_MOBITZ_2'].includes(p.rhythm)) {
          if (p.isSync) {
            soundEngine.playSyncBeep();
          }
          if (p.onQRSBeat) p.onQRSBeat(p.spo2);
        }
      }

      // Normalized beat progress 0.0 to 1.0 within the current RR cycle
      const cycleProgress = s.currentBeatDuration > 0 && s.currentBeatDuration < 9000
        ? Math.min(1.0, timeSinceLastBeat / s.currentBeatDuration)
        : 0;

      // Compute channel values
      const ecgVal = getECGValue(p.rhythm, cycleProgress, s, p.isCprActive, p.isPacingActive, p.ecgGain, timeSinceLastBeat, s.currentBeatDuration);
      const ecgValV5 = getECGV5Value(p.rhythm, cycleProgress, s, p.isCprActive, p.ecgGain, timeSinceLastBeat, s.currentBeatDuration);
      const plethVal = getPlethValue(p.pulsePresent, cycleProgress, p.spo2, p.isCprActive);
      const capnoVal = getCapnoValue(p.isAirwaySecured, p.isCprActive, p.etco2, cycleProgress, now);

      // Draw Channel 1: Lead II (D2) (Green)
      const y1Raw = channelHeight * 0.5 - ecgVal * (channelHeight * 0.38);
      const y1 = Math.max(channelHeight * 0.04, Math.min(channelHeight * 0.96, y1Raw));
      if (oldX <= s.sweepX) {
        drawLineSegment(ctx, oldX, s.prevY[0] || y1, s.sweepX, y1, '#22C55E', 2.0);
      }
      s.prevY[0] = y1;

      // Draw SYNC marker if in sync mode and on R peak
      if (p.isSync && cycleProgress > 0.16 && cycleProgress < 0.22 && !['FV', 'FV_FINA', 'FV_GRUESA', 'ASISTOLIA'].includes(p.rhythm)) {
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(s.sweepX, y1 - 10, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '9px Fira Code, monospace';
        ctx.fillText('S', s.sweepX - 3, y1 - 14);
      }

      // Draw Channel 2: Lead V5 (D5) (Cyan/Emerald)
      const y2Raw = channelHeight * 1.5 - ecgValV5 * (channelHeight * 0.36);
      const y2 = Math.max(channelHeight * 1.04, Math.min(channelHeight * 1.96, y2Raw));
      if (oldX <= s.sweepX) {
        drawLineSegment(ctx, oldX, s.prevY[1] || y2, s.sweepX, y2, '#14B8A6', 1.8);
      }
      s.prevY[1] = y2;

      // Draw Channel 3: Plethysmography (Cyan Blue)
      const y3Raw = channelHeight * 2.5 - plethVal * (channelHeight * 0.38);
      const y3 = Math.max(channelHeight * 2.04, Math.min(channelHeight * 2.96, y3Raw));
      if (oldX <= s.sweepX) {
        drawLineSegment(ctx, oldX, s.prevY[2] || y3, s.sweepX, y3, '#06B6D4', 2.2);
      }
      s.prevY[2] = y3;

      // Draw Channel 4: Capnography (Yellow / Amber)
      const y4Raw = channelHeight * 3.5 - capnoVal * (channelHeight * 0.40);
      const y4 = Math.max(channelHeight * 3.04, Math.min(channelHeight * 3.96, y4Raw));
      if (oldX <= s.sweepX) {
        drawLineSegment(ctx, oldX, s.prevY[3] || y4, s.sweepX, y4, '#EAB308', 2.0);
      }
      s.prevY[3] = y4;

      // Glowing cursor head of the beam
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#22C55E';
      ctx.shadowBlur = 8;
      ctx.fillRect(s.sweepX, y1 - 2, 2, 4);
      ctx.shadowBlur = 0;

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []); // Mounted once: continuous uninterrupted medical sweep!

  return (
    <div className="relative w-full h-full bg-[#060B14] rounded-lg overflow-hidden border border-slate-800 shadow-2xl select-none">
      {/* Selector de Ganancia ECG (x0.5, x1.0, x2.0) - Esencial en ACLS para descartar FV fina vs Asistolia */}
      <div className="absolute top-2 right-3 z-20 flex items-center gap-1.5 font-mono text-[10px] bg-slate-950/85 p-1 rounded-lg border border-slate-700/80 shadow">
        <span className="text-slate-400 font-semibold px-1">GANANCIA ECG:</span>
        {[0.5, 1.0, 2.0].map((g) => (
          <button
            key={g}
            onClick={() => setEcgGain(g)}
            className={`px-2 py-0.5 rounded font-bold transition border ${
              ecgGain === g
                ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 shadow-sm shadow-emerald-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={`Ajustar ganancia de deflexión del ECG a ${g.toFixed(1)}x (Esencial en ACLS para verificar si una línea plana es Asistolia o FV fina)`}
          >
            {g.toFixed(1)}x
          </button>
        ))}
      </div>

      {/* Waveform labels overlay with exact channel quarter anchoring */}
      {/* Channel 1: Lead II (D2) */}
      <div className="absolute top-2 left-3 z-10 pointer-events-none flex items-center gap-2 font-mono text-xs">
        <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
          II (D2)
        </span>
        <span className="text-emerald-500/70 text-[11px]">
          {(1.0 * ecgGain).toFixed(1)} mV/cm
        </span>
        {isSync && (
          <span className="bg-sky-500/20 text-sky-300 font-bold px-1.5 py-0.5 rounded border border-sky-400/50 text-[10px] animate-pulse">
            SYNC
          </span>
        )}
        {isPacingActive && (
          <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-400/50 text-[10px]">
            PACING
          </span>
        )}
        {isCprActive && (
          <span className="bg-rose-500/20 text-rose-300 font-bold px-1.5 py-0.5 rounded border border-rose-400/50 text-[10px] animate-pulse">
            ARTEFACTO RCP ACTIVO
          </span>
        )}
      </div>

      {/* Channel 2: Lead V5 (D5) */}
      <div className="absolute top-[26%] left-3 z-10 pointer-events-none flex items-center gap-2 font-mono text-xs">
        <span className="text-teal-400 font-bold bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-800/60">
          V5 (D5)
        </span>
        <span className="text-teal-500/70 text-[11px]">
          {(1.0 * ecgGain).toFixed(1)} mV/cm
        </span>
      </div>

      {/* Channel 3: Plethysmography (PLET) */}
      <div className="absolute top-[51%] left-3 z-10 pointer-events-none flex items-center gap-2 font-mono text-xs">
        <span className="text-cyan-400 font-bold bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60">
          PLET
        </span>
        <span className="text-cyan-500/70 text-[11px]">
          {pulsePresent ? 'Auto Gain (Pulso arterial)' : isCprActive ? 'Artefacto RCP (Sin pulso)' : 'Sin pulso arterial'}
        </span>
      </div>

      {/* Channel 4: Capnography (CO2) */}
      <div className="absolute top-[76%] left-3 z-10 pointer-events-none flex items-center gap-2 font-mono text-xs">
        <span className="text-amber-400 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60">
          CO2
        </span>
        <span className={`text-[11px] font-bold ${isAirwaySecured ? 'text-amber-400' : 'text-amber-500/80'}`}>
          {isAirwaySecured ? 'Capnografía continua cuantitativa' : 'Sensor desconectado (No intubado)'}
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// Helpers for oscilloscope grid
function drawGrid(ctx, width, height) {
  ctx.strokeStyle = '#0E1E2E';
  ctx.lineWidth = 0.5;

  const smallGrid = 16;
  ctx.beginPath();
  for (let x = 0; x < width; x += smallGrid) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += smallGrid) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Major grid lines
  ctx.strokeStyle = '#162F48';
  ctx.lineWidth = 1;
  const majorGrid = 80;
  ctx.beginPath();
  for (let x = 0; x < width; x += majorGrid) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += majorGrid) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

function drawGridSlot(ctx, startX, width, height) {
  ctx.strokeStyle = '#0E1E2E';
  ctx.lineWidth = 0.5;
  const smallGrid = 16;
  const x0 = Math.floor(startX / smallGrid) * smallGrid;
  const x1 = startX + width;

  ctx.beginPath();
  for (let x = x0; x <= x1; x += smallGrid) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += smallGrid) {
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + width, y);
  }
  ctx.stroke();
}

function drawLineSegment(ctx, x0, y0, x1, y1, color, lineWidth) {
  if (x1 < x0) return; // wrap around boundary
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
}

// Realistic ECG waveform calculation for Lead II (D2)
function getECGValue(rhythm, p, s, isCprActive, isPacingActive, ecgGain = 1.0, timeSinceLastBeat = 0, currentBeatDuration = 0.4) {
  let val = 0;

  switch (rhythm) {
    case 'FV':
    case 'FV_GRUESA': {
      // Fibrilación Ventricular Gruesa (Coarse VF):
      // Despolarización caótica continua multionda de alta amplitud (1.0 - 1.5 mV)
      const t = performance.now() * 0.001 * 4.8;
      val = Math.sin(t * 3.8 + Math.sin(t * 2.1)) * 0.65 +
            Math.cos(t * 5.2 + Math.cos(t * 3.7)) * 0.45 +
            Math.sin(t * 8.1) * 0.25 +
            (Math.random() - 0.5) * 0.08;
      break;
    }

    case 'FV_FINA': {
      // Fibrilación Ventricular Fina (Fine VF < 2mm):
      // Amplitud muy baja (<0.2 mV), ondas caóticas rápidas continuas de alta frecuencia
      const t = performance.now() * 0.001 * 6.5;
      val = (Math.sin(t * 5.5 + Math.sin(t * 3.2)) * 0.12 +
             Math.cos(t * 8.3) * 0.08 +
             (Math.random() - 0.5) * 0.035);
      break;
    }

    case 'ASISTOLIA': {
      // Asistolia Verdadera:
      // Ausencia total de actividad eléctrica miocárdica (Línea isoeléctrica plana)
      const nowSec = performance.now() * 0.001;
      const slowDrift = Math.sin(nowSec * 0.4) * 0.015;
      val = slowDrift + (Math.random() - 0.5) * 0.012;
      break;
    }

    case 'TV_MONOMORFA':
    case 'TVSP': {
      // Taquicardia Ventricular Monomorfa:
      // Complejos QRS anchos, regulares, monomórficos con signo de Josephson y T discordante a ~175 lpm
      val = getMonomorphicVtComplex(p, false);
      break;
    }

    case 'TORSADES': {
      // Torsades de Pointes (twisting of points: modulación sinusoidal de husos)
      const envelope = Math.sin(p * Math.PI * 0.8);
      val = (Math.sin(p * Math.PI * 3.5) * 0.8 + Math.sin(p * Math.PI * 7) * 0.3) * (0.4 + 0.6 * Math.abs(envelope));
      break;
    }

    case 'FA_RVR':
    case 'FA':
      // Fibrilación Auricular con RVR: irregularmente irregular, sin ondas P, f-waves caóticas
      val = getAfibComplex(timeSinceLastBeat, currentBeatDuration, performance.now() * 0.001);
      break;

    case 'FLUTTER': {
      // Atrial Flutter 2:1: ondas F negativas en serrucho a 300 lpm en D2 (2 ondas F por complejo)
      const fSaw = -((((p * 2) % 1.0) - 0.5) * 0.35);
      val = getStandardPQRST(p, false, true, false, 0.0) + fSaw;
      break;
    }

    case 'TSVP':
      // Narrow QRS, high rate, retro or hidden P wave
      val = getStandardPQRST(p, false, true, false, 0.0);
      break;

    case 'BAV_1':
      // 1st degree AV block: prolonged PR interval (>0.28)
      val = getFirstDegreeAvBlock(p);
      break;

    case 'BAV_2_WENCKEBACH':
    case 'BAV_2_MOBITZ_1':
      // 2nd degree Mobitz I: Wenckebach phenomenon (alargamiento progresivo de PR hasta caída de QRS)
      val = getWenckebachComplex(p, s ? s.wenckebachBeat : 0);
      break;

    case 'BAV_2_MOBITZ_2':
      // 2nd degree Mobitz II: fixed PR with periodically dropped QRS (2:1 conduction)
      val = getMobitz2Complex(p);
      break;

    case 'BAV_3':
      // 3rd degree AV block: independent marching P waves with slow wide ventricular escape
      val = getBroadPQRST(p, true);
      break;

    case 'SINE_WAVE':
      // Severe hyperkalemia: Sine wave rhythm (wide QRS merging into tall peaked T)
      val = Math.sin(p * Math.PI * 2) * 1.1 + Math.sin(p * Math.PI * 4) * 0.2;
      break;

    case 'DIGITALIS_TOXICITY':
      // Digitalis toxicity: regular slow junctional escape with sagging ST depression ("cuchara digitálica")
      val = getStandardPQRST(p, false, true, true, -0.25);
      break;

    case 'SINUSAL_ST_ELEVATION':
      // STEMI: P, narrow QRS, marked ST elevation!
      val = getStandardPQRST(p, true, true, true, 0.35);
      break;

    case 'PACED':
      // Transcutaneous or transvenous pacer: sharp pacer spike + wide QRS
      val = getPacedComplex(p);
      break;

    case 'AESP': {
      // Actividad Eléctrica Sin Pulso (AESP):
      // Complejos idioventriculares regulares y organizados a ~48 lpm
      val = getAespComplex(p);
      break;
    }

    default: // 'SINUSAL', 'BRADICARDIA_SINUSAL', etc.
      if (typeof rhythm === 'string' && rhythm.includes('AESP')) {
        val = getAespComplex(p);
      } else {
        val = getStandardPQRST(p, true, true, false, 0.0);
      }
      break;
  }

  // Apply monitor sensitivity gain with soft-knee limiter (evita achatamiento o corte plano)
  val = Math.tanh((val * ecgGain) / 1.15) * 1.15;

  // Superimpose CPR compressions artifact if CPR is actively happening
  // Preserves 75% of the underlying cardiac rhythm so QRS complexes peek through compressions!
  if (isCprActive) {
    const cprArt = getCprArtifact(performance.now() * 0.001);
    val = val * 0.75 + cprArt * 0.65;
  }

  // Transcutaneous pacing spike injection
  if (isPacingActive && p < 0.05) {
    val += 1.3; // tall narrow spike
  }

  return val;
}

// ECG Lead V5 (D5) vector
function getECGV5Value(rhythm, p, s, isCprActive, ecgGain = 1.0, timeSinceLastBeat = 0, currentBeatDuration = 0.4) {
  let val = 0;
  const isAesp = rhythm === 'AESP' || (typeof rhythm === 'string' && rhythm.includes('AESP'));

  if (rhythm === 'FV' || rhythm === 'FV_GRUESA') {
    // V5 vector: precordial anterolateral con ángulo vectorial continuo
    const tV5 = performance.now() * 0.001 * 4.8 + 0.3;
    val = (Math.cos(tV5 * 3.4 + Math.cos(tV5 * 2.5)) * 0.60 +
           Math.sin(tV5 * 5.0 + Math.sin(tV5 * 3.9)) * 0.40 +
           Math.cos(tV5 * 7.5) * 0.22 +
           (Math.random() - 0.5) * 0.08);
  } else if (rhythm === 'FV_FINA') {
    // V5 vector para FV fina: oscilación caótica de baja amplitud (< 0.2 mV)
    const tV5 = performance.now() * 0.001 * 6.5 + 0.4;
    val = (Math.cos(tV5 * 5.2 + Math.cos(tV5 * 3.0)) * 0.11 +
           Math.sin(tV5 * 7.8) * 0.07 +
           (Math.random() - 0.5) * 0.035);
  } else if (rhythm === 'ASISTOLIA') {
    // V5 en asistolia confirma línea isoeléctrica plana
    const nowSec = performance.now() * 0.001;
    const slowDrift = Math.sin(nowSec * 0.4 + 0.8) * 0.015;
    val = slowDrift + (Math.random() - 0.5) * 0.012;
  } else if (isAesp) {
    // AESP en V5: complejos organizados idioventriculares
    val = getAespComplex(p) * 0.85;
  } else if (rhythm === 'FA_RVR' || rhythm === 'FA') {
    // V5 vector para FA: complexes QRS estrechos con R prominente y f-waves desfasadas
    val = getAfibComplex(timeSinceLastBeat, currentBeatDuration, performance.now() * 0.001 + 0.25, 1.35);
  } else if (['TV_MONOMORFA', 'TVSP'].includes(rhythm)) {
    val = getMonomorphicVtComplex(p, true);
  } else {
    // Normal V5 has taller R wave and inverted or distinct T wave
    val = getStandardPQRST(p, true, true, false, 0.0, 1.2);
  }

  // Apply monitor sensitivity gain with soft-knee limiter (evita achatamiento o corte plano)
  val = Math.tanh((val * ecgGain) / 1.15) * 1.15;

  if (isCprActive) {
    val = val * 0.75 - getCprArtifact(performance.now() * 0.001 + 0.05) * 0.55;
  }
  return val;
}

// Realistic Chest Compression Artifact (110 cpm)
function getCprArtifact(timeSec) {
  const cprRateHz = 110 / 60; // ~110 compressions per minute
  const phase = (timeSec * cprRateHz) % 1.0;
  let w = 0;
  // Sternal compression downward thrust and rapid recoil
  if (phase < 0.35) {
    w = -Math.sin((phase / 0.35) * Math.PI) * 0.52;
  } else if (phase < 0.70) {
    w = Math.sin(((phase - 0.35) / 0.35) * Math.PI) * 0.32;
  }
  const jitter = (Math.random() - 0.5) * 0.05 + Math.sin(timeSec * 50) * 0.03;
  return w + jitter;
}

// Taquicardia Ventricular Monomorfa (TV / TVSP):
// Criterios diagnósticos Brugada / Vereckei:
// - QRS ancho (> 140 - 160 ms)
// - Ascenso ventricular lento (R-wave peak time prolongado > 50 ms)
// - Muesca en la rama descendente (signo de Josephson)
// - Segmento ST y onda T discordantemente opuesta al complejo QRS principal
// - Ritmo regular, monomórfico y sin ondas P
function getMonomorphicVtComplex(p, isV5 = false) {
  let y = 0;
  if (!isV5) {
    // Derivación D2: Complejo predominantemente positivo con QRS ancho y onda T discordante
    if (p < 0.48) {
      // QRS ancho (0.0 a 0.48):
      const qrsPhase = p / 0.48;
      // Rama ascendente ancha y slurred con muesca sutil de Josephson cerca del ápex
      const baseR = Math.sin(qrsPhase * Math.PI) * 0.72;
      const notch = Math.exp(-Math.pow((qrsPhase - 0.45) / 0.08, 2)) * 0.09;
      const sDip = qrsPhase > 0.75 ? -Math.sin(((qrsPhase - 0.75) / 0.25) * Math.PI) * 0.20 : 0;
      y = baseR - notch + sDip;
    } else {
      // Onda T discordante amplia e invertida (0.48 a 0.95)
      const tPhase = (p - 0.48) / 0.47;
      y = -Math.sin(tPhase * Math.PI) * 0.26;
    }
  } else {
    // Derivación V5: Complejo predominantemente negativo (patrón QS profundo con T positiva discordante)
    if (p < 0.48) {
      const qrsPhase = p / 0.48;
      y = -Math.sin(qrsPhase * Math.PI) * 0.68 + (qrsPhase > 0.35 ? 0.06 : 0);
    } else {
      const tPhase = (p - 0.48) / 0.47;
      y = Math.sin(tPhase * Math.PI) * 0.24;
    }
  }
  y += (Math.random() - 0.5) * 0.015;
  return y;
}

// AESP Complex — Actividad Eléctrica Sin Pulso
// Ritmo eléctrico ORGANIZADO pero SIN pulso mecánico palpable.
// Morfología: Complejo organizado a frecuencia lenta (~45-48 lpm), con onda P, QRS y onda T definidas,
// y una línea isoeléctrica limpia y nítida entre latidos.
function getAespComplex(p) {
  let y = 0;

  // 1. Onda P pequeña/disociada (0.06 - 0.14)
  if (p >= 0.06 && p < 0.14) {
    const pPhase = (p - 0.06) / 0.08;
    y += Math.sin(pPhase * Math.PI) * 0.14;
  }

  // 2. Intervalo PR isoeléctrico (0.14 - 0.20)

  // 3. Onda Q pequeña (0.20 - 0.22)
  if (p >= 0.20 && p < 0.22) {
    const qPhase = (p - 0.20) / 0.02;
    y -= Math.sin(qPhase * Math.PI) * 0.10;
  }

  // 4. Complejo QRS organizado (0.22 - 0.30) - Curva continua suave y definida
  if (p >= 0.22 && p < 0.30) {
    const rPhase = (p - 0.22) / 0.08;
    y += Math.sin(rPhase * Math.PI) * 1.15;
  }

  // 5. Onda S (0.30 - 0.34)
  if (p >= 0.30 && p < 0.34) {
    const sPhase = (p - 0.30) / 0.04;
    y -= Math.sin(sPhase * Math.PI) * 0.28;
  }

  // 6. Segmento ST y Onda T discordante suave (0.38 - 0.52)
  if (p >= 0.38 && p <= 0.52) {
    const tPhase = (p - 0.38) / 0.14;
    y += Math.sin(tPhase * Math.PI) * 0.26;
  }

  // 7. Línea isoeléctrica limpia entre latidos (0.52 - 1.0) con micro-ruido biológico mínimo
  y += (Math.random() - 0.5) * 0.012;
  return y;
}

// Standard P-Q-R-S-T parametric waveform
function getStandardPQRST(p, hasP = true, isNarrow = true, hasStElevation = false, stElevationAmt = 0.0, rScale = 1.0) {
  let y = 0;

  // P wave: ~0.08 - 0.16
  if (hasP && p >= 0.06 && p <= 0.14) {
    const pPhase = (p - 0.06) / 0.08;
    y += Math.sin(pPhase * Math.PI) * 0.18;
  }

  // PR segment: 0.14 - 0.18 (flat baseline)

  // Q wave: 0.18 - 0.20
  if (p >= 0.18 && p < 0.20) {
    const qPhase = (p - 0.18) / 0.02;
    y -= Math.sin(qPhase * Math.PI) * 0.15;
  }

  // R wave spike: 0.20 - 0.24 (sharp fast spike)
  if (p >= 0.20 && p < 0.24) {
    const rPhase = (p - 0.20) / 0.04;
    y += Math.sin(rPhase * Math.PI) * (1.1 * rScale);
  }

  // S wave: 0.24 - 0.27
  if (p >= 0.24 && p < 0.27) {
    const sPhase = (p - 0.24) / 0.03;
    y -= Math.sin(sPhase * Math.PI) * 0.35;
  }

  // ST segment: 0.27 - 0.38
  if (p >= 0.27 && p < 0.38) {
    if (hasStElevation) {
      y += stElevationAmt;
    }
  }

  // T wave: 0.38 - 0.54
  if (p >= 0.38 && p <= 0.54) {
    const tPhase = (p - 0.38) / 0.16;
    y += Math.sin(tPhase * Math.PI) * (0.32 + (hasStElevation ? 0.2 : 0));
  }

  // Baseline wander noise
  y += (Math.random() - 0.5) * 0.015;

  return y;
}

// 1st Degree AV Block (Prolonged PR interval > 0.28s)
function getFirstDegreeAvBlock(p) {
  let y = 0;
  // P wave shifted earlier (p: 0.02 to 0.10)
  if (p >= 0.02 && p <= 0.10) {
    y += Math.sin(((p - 0.02) / 0.08) * Math.PI) * 0.18;
  }
  // Long PR flat segment (0.10 to 0.22)
  // Sharp QRS at 0.22 - 0.28
  if (p >= 0.22 && p < 0.24) y -= 0.12;
  if (p >= 0.24 && p < 0.27) y += Math.sin(((p - 0.24) / 0.03) * Math.PI) * 1.15;
  if (p >= 0.27 && p < 0.30) y -= 0.3;
  // T wave at 0.40 - 0.56
  if (p >= 0.40 && p <= 0.56) {
    y += Math.sin(((p - 0.40) / 0.16) * Math.PI) * 0.32;
  }
  return y;
}

// 2nd Degree AV Block Mobitz I (Wenckebach 4:3 block)
function getWenckebachComplex(p, beatStep = 0) {
  let y = 0;

  if (beatStep === 3) {
    // 4to latido bloqueado: Onda P presente en 0.10, ¡QRS bloqueado! Pausa compensadora.
    if (p >= 0.08 && p <= 0.18) {
      y += Math.sin(((p - 0.08) / 0.10) * Math.PI) * 0.22;
    }
    return y + (Math.random() - 0.5) * 0.012;
  }

  // Alargamiento progresivo fisiológico del intervalo PR
  const prOffset = beatStep * 0.06;
  if (p >= 0.04 && p <= 0.12) {
    y += Math.sin(((p - 0.04) / 0.08) * Math.PI) * 0.18;
  }
  const qrsStart = 0.18 + prOffset;
  if (p >= qrsStart && p < qrsStart + 0.04) {
    y += Math.sin(((p - qrsStart) / 0.04) * Math.PI) * 1.15;
  }
  const tStart = qrsStart + 0.14;
  if (p >= tStart && p <= tStart + 0.16) {
    y += Math.sin(((p - tStart) / 0.16) * Math.PI) * 0.30;
  }
  return y + (Math.random() - 0.5) * 0.012;
}

// Atrial Fibrillation with Rapid Ventricular Response (FA con RVR)
// Criterios diagnósticos ECG estrictos:
// 1. Ritmo "Irregularmente Irregular" (cadencia RR caótica y asimétrica)
// 2. Ausencia completa de ondas P sinusales
// 3. Ondas f fibrilatorias caóticas continuas en la línea de base (400-600/min)
// 4. Complejo QRS estrecho fisiológico (~80 ms)
function getAfibComplex(timeSec, cycleDuration, nowSec, rScale = 1.0) {
  let y = 0;

  // 1. Ondas f fibrilatorias continuas de alta frecuencia en la línea de base
  const fWaves = Math.sin(nowSec * 50) * 0.045 +
                 Math.sin(nowSec * 78 + Math.cos(nowSec * 32)) * 0.038 +
                 Math.cos(nowSec * 95) * 0.025 +
                 (Math.random() - 0.5) * 0.020;
  y += fWaves;

  // 2. Complejo QRS angosto fisiológico (~80 ms)
  // Gatillado al inicio de cada ciclo de despolarización ventricular
  if (timeSec >= 0.02 && timeSec < 0.04) {
    const qPhase = (timeSec - 0.02) / 0.02;
    y -= Math.sin(qPhase * Math.PI) * 0.12;
  }
  if (timeSec >= 0.04 && timeSec < 0.08) {
    const rPhase = (timeSec - 0.04) / 0.04;
    y += Math.sin(rPhase * Math.PI) * (1.20 * rScale);
  }
  if (timeSec >= 0.08 && timeSec < 0.11) {
    const sPhase = (timeSec - 0.08) / 0.03;
    y -= Math.sin(sPhase * Math.PI) * 0.35;
  }

  // 3. Segmento ST y Onda T rápida de repolarización (~120 ms)
  if (timeSec >= 0.11 && timeSec <= 0.24) {
    const tPhase = (timeSec - 0.11) / 0.13;
    const stStrain = -0.06 * (1.0 - tPhase);
    const tWave = Math.sin(tPhase * Math.PI) * 0.22;
    y += stStrain + tWave;
  }

  return y;
}

// 2nd Degree AV Block Mobitz II (Fixed 2:1 conduction)
function getMobitz2Complex(p) {
  const isConducted = Math.floor((performance.now() / 2000) % 2) === 0;
  let y = 0;
  // P wave always appears at regular intervals
  if (p >= 0.06 && p <= 0.14) {
    y += Math.sin(((p - 0.06) / 0.08) * Math.PI) * 0.2;
  }

  // Only alternate beats conduct through with a wide infranodal QRS!
  if (isConducted) {
    if (p >= 0.22 && p <= 0.34) {
      y += Math.sin(((p - 0.22) / 0.12) * Math.PI) * 1.0;
    }
    if (p >= 0.40 && p <= 0.58) {
      y += Math.sin(((p - 0.40) / 0.18) * Math.PI) * 0.35;
    }
  }
  return y;
}

// Broad QRS for ventricular escape / 3rd degree AV block
function getBroadPQRST(p, hasMarchingP = true) {
  let y = 0;
  // Marching P wave
  if (hasMarchingP) {
    const marchingP = Math.sin(p * Math.PI * 4);
    if (marchingP > 0.7) y += 0.15;
  }
  // Broad slow QRS (LBBB/RBBB morphology)
  if (p >= 0.20 && p <= 0.36) {
    const qrsPhase = (p - 0.20) / 0.16;
    y += Math.sin(qrsPhase * Math.PI) * 0.95;
  }
  // Inverted T wave
  if (p >= 0.42 && p <= 0.60) {
    const tPhase = (p - 0.42) / 0.18;
    y -= Math.sin(tPhase * Math.PI) * 0.28;
  }
  return y;
}

// Paced rhythm complex
function getPacedComplex(p) {
  let y = 0;
  // Pacer spike
  if (p >= 0.19 && p <= 0.21) {
    y += 1.4;
  }
  // Wide LBBB-like QRS after spike
  if (p >= 0.21 && p <= 0.38) {
    const phase = (p - 0.21) / 0.17;
    y -= Math.sin(phase * Math.PI) * 0.9;
  }
  // Discordant T wave
  if (p >= 0.42 && p <= 0.62) {
    const tPhase = (p - 0.42) / 0.20;
    y += Math.sin(tPhase * Math.PI) * 0.35;
  }
  return y;
}

// Plethysmography (SpO2 pulsatile wave) - Curva fisiológica fotopletismográfica de alta fidelidad
function getPlethValue(pulsePresent, p, spo2, isCprActive = false) {
  // Caso A: Paro cardíaco / Sin pulso arterial espontáneo
  if (!pulsePresent) {
    if (isCprActive) {
      // Masaje cardíaco en curso: compresión externa genera ondas de perfusión pasiva amortiguadas
      const nowSec = performance.now() * 0.001;
      const cprRateHz = 110 / 60;
      const phase = (nowSec * cprRateHz) % 1.0;
      let y = 0;
      if (phase < 0.38) {
        y = Math.sin((phase / 0.38) * Math.PI) * 0.22;
      } else {
        y = 0.22 * Math.exp(-((phase - 0.38) / 0.35) * 3);
      }
      return y + (Math.random() - 0.5) * 0.012;
    }
    // Paro cardiorrespiratorio sin compresiones: sensor óptico inactivo (línea plana con mínimo ruido térmico)
    return (Math.random() - 0.5) * 0.008;
  }

  // Caso B: Pulso espontáneo presente (Onda arterial con incisura dícrota fidedigna)
  let y = 0;

  if (p >= 0.16 && p < 0.34) {
    // Rama anácrota sistólica rápida y empinada
    const upPhase = (p - 0.16) / 0.18;
    y = Math.sin(upPhase * (Math.PI / 2)) * 0.95;
  } else if (p >= 0.34 && p < 0.46) {
    // Caída catácrota hacia la incisura dícrota
    const down1 = (p - 0.34) / 0.12;
    y = 0.95 - down1 * 0.42;
  } else if (p >= 0.46 && p < 0.56) {
    // Muesca dícrota (cierre de válvula aórtica) y rebote de onda dícrota
    const notchPhase = (p - 0.46) / 0.10;
    y = 0.53 + Math.sin(notchPhase * Math.PI) * 0.14;
  } else if (p >= 0.56 && p < 0.92) {
    // Decaimiento exponencial diastólico hacia la línea de base
    const decayPhase = (p - 0.56) / 0.36;
    y = 0.53 * Math.exp(-decayPhase * 3.2);
  } else {
    y = 0.02;
  }

  // Modulación fisiológica por perfusión y saturación de oxígeno
  const perfusionFactor = Math.max(0.22, Math.min(1.0, (spo2 - 45) / 50));
  return y * perfusionFactor;
}

// Capnography (EtCO2 square respiratory wave with alveolar plateau)
function getCapnoValue(isAirwaySecured, isCprActive, etco2, cycleProgress, now) {
  // En evaluación ACLS clínica: NO mostrar onda si no se ha intubado al paciente (línea plana cero)
  if (!isAirwaySecured) {
    return (Math.random() - 0.5) * 0.003;
  }

  // Respiratory rate ~ 12-14 rpm -> 1 breath every 4.5 seconds
  const respPeriod = 4.5;
  const respProgress = ((now * 0.001) % respPeriod) / respPeriod;

  let y = 0;
  // Phase I: Inspiratory baseline (0 to 0.45) -> y = 0
  // Phase II: Rapid expiratory upslope (0.45 to 0.55)
  if (respProgress >= 0.45 && respProgress < 0.53) {
    const upPhase = (respProgress - 0.45) / 0.08;
    y = Math.sin(upPhase * (Math.PI / 2));
  }
  // Phase III: Alveolar plateau with slight upward slope (0.53 to 0.82)
  else if (respProgress >= 0.53 && respProgress < 0.82) {
    const plateauPhase = (respProgress - 0.53) / 0.29;
    y = 0.92 + plateauPhase * 0.08;
  }
  // Phase IV: Rapid inspiratory drop (0.82 to 0.88)
  else if (respProgress >= 0.82 && respProgress < 0.88) {
    const downPhase = (respProgress - 0.82) / 0.06;
    y = 1.0 - downPhase;
  }

  // Scale height proportionally to EtCO2 (normal ~ 38 mmHg -> full height ~ 0.85)
  const heightScale = Math.min(1.0, etco2 / 45);
  return Math.max(0, y * heightScale);
}
