export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { type, product, name, phone, device, problem } = req.body;

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    let text = "";

    if (type === "order") {
      text =
`🛒 Нове замовлення

📦 Товар: ${product}`;
    }

    if (type === "repair") {
      text =
`🛠 Нова заявка на ремонт

👤 Ім'я: ${name}
📞 Телефон: ${phone}
📱 Техніка: ${device}

❗️ Проблема:
${problem}`;
    }

    const response = await fetch(
      https://api.telegram.org/bot${token}/sendMessage,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text
        })
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json({ error: data.description });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
