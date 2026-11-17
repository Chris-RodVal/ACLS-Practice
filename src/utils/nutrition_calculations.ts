export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export function calculateAge(birthdateStr: string): number {
  if (!birthdateStr) return 30; // Valor por defecto en caso de error
  const birthDate = new Date(birthdateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
  // Hombres: BMR = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) + 5
  // Mujeres: BMR = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) - 161
  const base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') {
    return base + 5;
  } else {
    return base - 161;
  }
}

export function getActivityMultiplier(level: ActivityLevel): number {
  switch (level) {
    case 'sedentary':
      return 1.2;
    case 'light':
      return 1.375;
    case 'moderate':
      return 1.55;
    case 'active':
      return 1.725;
    case 'very_active':
      return 1.9;
    default:
      return 1.2;
  }
}

export function calculateTDEE(bmr: number, level: ActivityLevel): number {
  return bmr * getActivityMultiplier(level);
}

export function calculateDailyGoal(
  gender: Gender,
  weight: number,
  height: number,
  age: number,
  level: ActivityLevel,
  deficit: number
): number {
  const bmr = calculateBMR(gender, weight, height, age);
  const tdee = calculateTDEE(bmr, level);
  const goal = tdee - deficit;
  return Math.round(Math.max(1200, goal)); // Asegurar una meta calórica saludable mínima de 1200 kcal
}

export interface MockEstimationResult {
  kcal: number;
  confidence: 'low' | 'medium' | 'high';
  interpretation: string;
  items: { name: string; estimatedKcal: number }[];
}

/**
 * Estimación local simulada basada en palabras clave para la fase sin API de IA.
 * Comprende expresiones naturales y alimentos comunes en Chile.
 */
export function mockEstimateCalories(text: string): MockEstimationResult {
  if (!text || text.trim() === '') {
    return { kcal: 0, confidence: 'high', interpretation: '', items: [] };
  }

  // Separamos por comas o " y " para identificar los diferentes ingredientes
  const parts = text.split(/,|y\s+/i).map(p => p.trim()).filter(Boolean);
  const items: { name: string; estimatedKcal: number }[] = [];
  let totalKcal = 0;

  const library: Record<string, number> = {
    huevo: 80,
    huevos: 160,
    pan: 150,
    hallulla: 250,
    marraqueta: 280,
    jamon: 60,
    queso: 100,
    palta: 150,
    aguacate: 150,
    cafe: 40,
    leche: 120,
    te: 5,
    arroz: 200,
    pollo: 250,
    carne: 300,
    ensalada: 60,
    manzana: 80,
    platano: 100,
    banana: 100,
    yogurt: 120,
    completo: 450,
    empanada: 350,
    avena: 150,
    nuez: 100,
    nueces: 150,
    almendra: 100,
    almendras: 150,
    atun: 150,
    fideos: 250,
    pasta: 250,
    pescado: 180,
    pure: 200,
    sopa: 120,
  };

  parts.forEach(part => {
    let kcal = 150; // Fallback por defecto si no coincide
    const lower = part.toLowerCase();
    
    // Si contiene un número directo, asumimos que el usuario especificó las calorías
    const numMatch = part.match(/\b(\d+)\s*(kcal|calorias)?\b/);
    let found = false;
    
    if (numMatch) {
      kcal = parseInt(numMatch[1], 10);
      found = true;
    } else {
      // Buscar coincidencia en la biblioteca
      for (const key in library) {
        if (lower.includes(key)) {
          kcal = library[key];
          found = true;
          break;
        }
      }
    }

    // Capitalizar nombre
    const name = part.charAt(0).toUpperCase() + part.slice(1);
    items.push({ name, estimatedKcal: kcal });
    totalKcal += kcal;
  });

  return {
    kcal: totalKcal,
    confidence: 'medium',
    interpretation: items.map(item => `${item.name} (${item.estimatedKcal} kcal)`).join(', '),
    items
  };
}
