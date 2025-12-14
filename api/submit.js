module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { experience, portfolio, contact, handle } = req.body || {};

  if (
    !experience || typeof experience !== 'string' ||
    !portfolio || typeof portfolio !== 'string' ||
    !contact || typeof contact !== 'string' ||
    !handle || typeof handle !== 'string'
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

  const telegramURL =
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;

  try {
    const tgRes = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: message
      })
    });

    if (!tgRes.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Telegram failed' });
  }
};
