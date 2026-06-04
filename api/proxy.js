export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Informe ?url=' });
  }

  try {
    const response = await fetch(url);

    const buffer = await response.arrayBuffer();

    // Status original
    res.status(response.status);

    // Libera CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Copia headers (opcional, mas útil)
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao buscar URL',
      details: err.message,
    });
  }
}
