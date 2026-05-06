export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const {
    name,
    phone,
    device,
    problem
  } = req.body;

  const message = `
🛠 Нова заявка

👤 Ім'я: ${name}
📞 Телефон: ${phone}
📱 Техніка: ${device}

❗️ Проблема:
${problem}
`;

  const token =
  process.env.BOT_TOKEN;

  const chatId =
  process.env.CHAT_ID;

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type':
        'application/json'
      },

      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    }
  );

  return res.status(200).json({
    success: true
  });

}
