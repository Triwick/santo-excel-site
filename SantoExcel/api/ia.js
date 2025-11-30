export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, mode } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada' });
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
              parts: [{ text: `${systemPrompt}\n\nPergunta: ${prompt}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Não foi possível gerar resposta.';

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consultar a IA' });
  }
}
