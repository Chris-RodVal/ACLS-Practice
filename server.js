import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Anthropic Claude Proxy Endpoints (Zero CORS issues, safe server-side routing)
app.post('/api/claude/generate', async (req, res) => {
  try {
    const { apiKey, prompt, model } = req.body;
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return res.status(400).json({ error: { message: 'Falta la API Key de Anthropic Claude.' } });
    }

    const selectedModel = model || 'claude-3-7-sonnet-20250219';

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: selectedModel,
        max_tokens: 4096,
        temperature: 0.2,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await anthropicRes.json();
    if (!anthropicRes.ok) {
      return res.status(anthropicRes.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Claude Proxy Error:', error);
    res.status(500).json({ error: { message: error.message } });
  }
});

app.post('/api/claude/tutor', async (req, res) => {
  try {
    const { apiKey, prompt, model } = req.body;
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return res.status(400).json({ error: { message: 'Falta la API Key de Anthropic Claude.' } });
    }

    const selectedModel = model || 'claude-3-7-sonnet-20250219';

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: selectedModel,
        max_tokens: 2048,
        temperature: 0.3,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await anthropicRes.json();
    if (!anthropicRes.ok) {
      return res.status(anthropicRes.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Claude Tutor Proxy Error:', error);
    res.status(500).json({ error: { message: error.message } });
  }
});

// Serve static assets from built dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏥 MedPulse EUNACOM AI Server running on port ${PORT}`);
});
