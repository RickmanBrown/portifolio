import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: `"Portfólio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Nova mensagem do site",
            text: `
Nome: ${name}
Email: ${email}
Mensagem: ${message}
            `
        });

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: "Erro ao enviar" });
    }
}