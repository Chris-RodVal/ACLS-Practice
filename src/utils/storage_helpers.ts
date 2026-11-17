import { RNPlugin } from '@remnote/plugin-sdk';

export interface UserSettings {
  gender: 'male' | 'female';
  birthdate: string; // YYYY-MM-DD
  height: number; // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  deficit: number; // kcal
  openaiApiKey?: string;
}

export interface MealItem {
  name: string;
  estimatedKcal: number;
}

export interface MealInfo {
  text: string;
  kcal?: number;
  confidence?: 'low' | 'medium' | 'high';
  interpretation?: string;
  items?: MealItem[];
  lastModified?: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  weight?: number; // kg
  meals: {
    [key: string]: MealInfo;
  };
  goalKcal: number;
}

export const DEFAULT_SETTINGS: UserSettings = {
  gender: 'female',
  birthdate: '1995-01-01',
  height: 170,
  activityLevel: 'sedentary',
  deficit: 600,
};

export const MEAL_NAMES = [
  'Desayuno',
  'Almuerzo',
  'Cena',
  'Colación 1',
  'Colación 2',
  'Colación 3'
];

export const createDefaultDailyLog = (dateStr: string, goalKcal: number): DailyLog => {
  const meals: Record<string, MealInfo> = {};
  MEAL_NAMES.forEach(name => {
    meals[name] = { text: '' };
  });
  return {
    date: dateStr,
    meals,
    goalKcal,
  };
};

/**
 * Busca en los últimos 7 días el peso registrado del usuario para sugerirlo como valor inicial.
 */
export async function getPreviousWeight(plugin: RNPlugin, currentDate: Date): Promise<number | undefined> {
  try {
    for (let i = 1; i <= 7; i++) {
      const prevDate = new Date(currentDate.getTime());
      prevDate.setDate(currentDate.getDate() - i);
      const prevDoc = await plugin.date.getDailyDoc(prevDate);
      if (prevDoc) {
        const key = `nutrition_log_${prevDoc._id}`;
        const prevLog = await plugin.storage.getSynced<DailyLog>(key);
        if (prevLog && prevLog.weight) {
          return prevLog.weight;
        }
      }
    }
  } catch (error) {
    console.error('Error buscando peso del día anterior:', error);
  }
  return undefined;
}
