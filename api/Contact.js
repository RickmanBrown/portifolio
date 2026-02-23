import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Garante que apenas requisições POST sejam aceitas
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  const { name, email, message } = req.body;

  // Validação básica dos campos
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Lembre-se: Senha de App de 16 dígitos
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Você receberá o e-mail em sua própria conta
      replyTo: email, // Permite que você responda diretamente ao e-mail do cliente
      subject: `Portfólio: Mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nova mensagem do Portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="border-left: 4px solid #ccc; padding-left: 10px;">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro no Nodemailer:", err);
    return res.status(500).json({ error: "Erro ao enviar e-mail. Verifique os logs do servidor." });
  }
}