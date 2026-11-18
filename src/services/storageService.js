import { SAMPLE_EXAMS } from './sampleExams.js';

const KEYS = {
  SAVED_EXAMS: 'medpulse_saved_exams',
  EXAM_HISTORY: 'medpulse_exam_history',
  USER_STATS: 'medpulse_user_stats',
  API_KEY: 'medpulse_claude_api_key',
  AI_MODEL: 'medpulse_ai_model',
  CUSTOM_PROMPT: 'medpulse_custom_prompt'
};

export const DEFAULT_GEMINI_KEY = 'AIzaSyDnALQuCp-KxRsiVpjyPReGXTwDNroh8Go';

export const storageService = {
  // API Key
  getApiKey: () => {
    return localStorage.getItem(KEYS.API_KEY) || DEFAULT_GEMINI_KEY;
  },
  setApiKey: (key) => {
    localStorage.setItem(KEYS.API_KEY, key.trim());
  },

  // AI Model
  getModel: () => {
    return 'claude-sonnet-4-6';
  },
  setModel: (model) => {
    localStorage.setItem(KEYS.AI_MODEL, model);
  },

  // Custom Prompt
  getCustomPrompt: () => {
    return localStorage.getItem(KEYS.CUSTOM_PROMPT) || '';
  },
  setCustomPrompt: (prompt) => {
    localStorage.setItem(KEYS.CUSTOM_PROMPT, prompt);
  },

  // Saved Exams
  getSavedExams: () => {
    const data = localStorage.getItem(KEYS.SAVED_EXAMS);
    if (!data) {
      localStorage.setItem(KEYS.SAVED_EXAMS, JSON.stringify(SAMPLE_EXAMS));
      return SAMPLE_EXAMS;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return SAMPLE_EXAMS;
    }
  },

  saveExam: (exam) => {
    const exams = storageService.getSavedExams();
    const updated = [exam, ...exams.filter(e => e.id !== exam.id)];
    localStorage.setItem(KEYS.SAVED_EXAMS, JSON.stringify(updated));
    return updated;
  },

  deleteExam: (examId) => {
    const exams = storageService.getSavedExams();
    const updated = exams.filter(e => e.id !== examId);
    localStorage.setItem(KEYS.SAVED_EXAMS, JSON.stringify(updated));
    return updated;
  },

  // History & Results
  getExamHistory: () => {
    const data = localStorage.getItem(KEYS.EXAM_HISTORY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  },

  saveExamResult: (result) => {
    const history = storageService.getExamHistory();
    const updated = [result, ...history];
    localStorage.setItem(KEYS.EXAM_HISTORY, JSON.stringify(updated));
    storageService.recalculateStats(updated);
    return updated;
  },

  // Stats calculation
  getStats: () => {
    const data = localStorage.getItem(KEYS.USER_STATS);
    if (!data) {
      return {
        totalExamsTaken: 0,
        totalQuestionsAnswered: 0,
        totalCorrect: 0,
        averagePercentage: 0,
        specialtyStats: {}
      };
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return {
        totalExamsTaken: 0,
        totalQuestionsAnswered: 0,
        totalCorrect: 0,
        averagePercentage: 0,
        specialtyStats: {}
      };
    }
  },

  recalculateStats: (historyList) => {
    if (!historyList || historyList.length === 0) return;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalPct = 0;
    const specialtyStats = {};

    historyList.forEach(item => {
      totalQuestions += item.totalQuestions || 0;
      totalCorrect += item.score || 0;
      totalPct += item.percentage || 0;

      const spec = item.specialty || 'General';
      if (!specialtyStats[spec]) {
        specialtyStats[spec] = { total: 0, correct: 0 };
      }
      specialtyStats[spec].total += item.totalQuestions || 0;
      specialtyStats[spec].correct += item.score || 0;
    });

    const stats = {
      totalExamsTaken: historyList.length,
      totalQuestionsAnswered: totalQuestions,
      totalCorrect: totalCorrect,
      averagePercentage: Math.round(totalPct / historyList.length),
      specialtyStats
    };

    localStorage.setItem(KEYS.USER_STATS, JSON.stringify(stats));
    return stats;
  }
};
