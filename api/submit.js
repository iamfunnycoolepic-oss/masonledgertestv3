module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { experience, portfolio, contact, handle } = req.body || {};

  // Basic validation
  if (
    !experience || typeof experience !== 'string' || experience.length > 50 ||
    !portfolio || typeof portfolio !== 'string' || portfolio.length > 50 ||
    !contact || typeof contact !== 'string' || contact.length > 50 ||
    !handle || typeof handle !== 'string' || handle.length > 100
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const message =
`📩 New Mason Ledger Application

🧠 Experience: ${experience}
💼 Portfolio: ${portfolio}
📞 Platform: ${contact}
👤 Contact: ${handle}
`;

  const telegramURL = `https://api.telegram.org/bot${process.env.8555305756:AAEUI4etbd3FbVh9LXHoFhItVmiDNZ8OexY}/sendMessage`;

  try {
    const tgRes = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.5086885847,
        text: message
      })
    });

    if (!tgRes.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram error:', err);
    return res.status(500).json({ error: 'Failed to send Telegram message' });
  }
};
