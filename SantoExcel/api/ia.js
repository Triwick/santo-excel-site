export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, mode } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt vazio' });
  }

  const systemPrompt =
    mode === 'formula'
      ? 'Você é um especialista em Excel. Gere apenas a fórmula e uma explicação curta.'
      : 'Explique erros de fórmulas do Excel de forma simples e didática.';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(500).json({ error: 'Erro ao consultar a IA' });
    }

    res.status(200).json({
      result: data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
