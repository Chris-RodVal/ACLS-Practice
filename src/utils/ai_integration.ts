export interface AIResult {
  kcal: number;
  confidence: 'low' | 'medium' | 'high';
  interpretation: string;
  items: { name: string; estimatedKcal: number }[];
}

/**
 * Llama a la API de IA correspondiente (OpenAI o Anthropic) según el formato de la clave
 * e interpreta la descripción de la comida para devolver un desglose nutricional.
 */
export async function estimateMealCaloriesWithAI(mealText: string, apiKey: string): Promise<AIResult> {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Falta la clave API. Por favor agrégala en la configuración (⚙️).');
  }

  const prompt = `Interpreta la siguiente descripción de comida en español y estima las calorías correspondientes.
Comida: "${mealText}"

Debes responder ÚNICAMENTE con un objeto JSON válido con la siguiente estructura:
{
  "kcal": number, // Calorías totales estimadas
  "confidence": "low" | "medium" | "high", // Nivel de confianza
  "interpretation": "string", // Resumen corto (ej: "2 huevos revueltos, 1 marraqueta")
  "items": [
    {
      "name": "string", // Nombre del alimento individual
      "estimatedKcal": number // Calorías estimadas para este alimento
    }
  ]
}

Reglas:
1. Sé realista con las porciones habituales.
2. Reconoce modismos y comidas hispanas/chilenas (marraqueta, hallulla, palta, empanada, cazuela, completo, etc.).
3. Devuelve SOLO el objeto JSON limpio. Sin bloques de código markdown, ni texto introductorio.`;

  const cleanKey = apiKey.trim();
  const isAnthropic = cleanKey.startsWith('sk-ant-');

  if (isAnthropic) {
    // LLAMADA A ANTHROPIC CLAUDE con acceso directo desde navegador
    const modelsToTry = ['claude-3-5-haiku-20241022', 'claude-3-5-haiku-latest', 'claude-3-haiku-20240307'];
    let lastErr = '';

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': cleanKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model,
            max_tokens: 1000,
            system: 'Eres un nutricionista experto. Responde únicamente en formato JSON estricto sin explicaciones ni markdown.',
            messages: [
              { role: 'user', content: prompt }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const jsonText = data.content?.[0]?.text || '';
          return parseAIResponse(jsonText);
        } else {
          const errText = await response.text();
          try {
            const errJson = JSON.parse(errText);
            lastErr = errJson.error?.message || errText;
          } catch (_) {
            lastErr = errText;
          }
        }
      } catch (e: any) {
        lastErr = e?.message || 'Error de conexión';
      }
    }

    throw new Error(`Error API Anthropic: ${lastErr}`);
  } else {
    // LLAMADA A OPENAI GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres un nutricionista experto que responde exclusivamente con JSON estructurado.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let msg = `Error OpenAI (${response.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error?.message) msg = `Error API OpenAI: ${errJson.error.message}`;
      } catch (_) {}
      throw new Error(msg);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || '';
    return parseAIResponse(jsonText);
  }
}

/**
 * Limpia y parsea la respuesta de la IA
 */
function parseAIResponse(text: string): AIResult {
  let cleanText = text.trim();
  
  if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
  }

  try {
    const parsed = JSON.parse(cleanText);
    const kcal = typeof parsed.kcal === 'number' ? parsed.kcal : 0;
    const confidence = ['low', 'medium', 'high'].includes(parsed.confidence) ? parsed.confidence : 'medium';
    const interpretation = typeof parsed.interpretation === 'string' ? parsed.interpretation : '';
    const items = Array.isArray(parsed.items) ? parsed.items.map((item: any) => ({
      name: typeof item.name === 'string' ? item.name : 'Alimento',
      estimatedKcal: typeof item.estimatedKcal === 'number' ? item.estimatedKcal : 0
    })) : [];

    return { kcal, confidence, interpretation, items };
  } catch (error) {
    console.error('Error parseando JSON de la IA:', cleanText);
    throw new Error('La IA respondió en un formato no reconocido.');
  }
}
