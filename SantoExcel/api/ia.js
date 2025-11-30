export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    const { prompt, mode } = body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt não enviado' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API Key não configurada' });
    }

    const systemPrompt =
      mode === 'formula'
        ? 'Você é um especialista em Excel. Responda com a fórmula correta e uma breve explicação.'
        : 'Explique o erro do Excel e forneça a correção.';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\nPergunta: ${prompt}` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: 'Erro da IA',
        details: data
      });
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Não foi possível gerar resposta.';

    return res.status(200).json({ result });

  } catch (err) {
    console.error('ERRO API:', err);
    return res.status(500).json({ error: 'Erro interno da API' });
  }
}
