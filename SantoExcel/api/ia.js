export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, mode } = req.body

  const systemPrompt =
    mode === 'formula'
      ? "Você é um especialista em Excel. Responda com a fórmula."
      : "Explique o erro de forma didática."

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      }
    )

    const data = await response.json()
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    res.status(200).json({ result: text })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar IA' })
  }
}
