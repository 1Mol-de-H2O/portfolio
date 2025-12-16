// ===============================
// CONFIGURAÇÕES DO MAILERSEND
// ===============================

const MAILERSEND_API_KEY = "mlsn.c59a41b726bc7199b6b81687b8988d90a8031706cc0e774b4c11f325756f8149";
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";

const FROM_EMAIL = "no-reply@mailersend.com";

const TO_EMAIL = "samuelsa1918@gmail.com";

// ===============================
// Função de sanitização
// ===============================

function sanitize(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

// ===============================
// Função para enviar email via MailerSend
// ===============================

async function enviarEmail(formData) {

  const body = {
    from: { email: FROM_EMAIL },
    to: [{ email: TO_EMAIL }],
    subject: `Nova mensagem de contato: ${formData.assunto}`,
    html: `
      <h2>Nova mensagem do Portfólio</h2>
      <p><strong>Nome:</strong> ${sanitize(formData.nome)}</p>
      <p><strong>Email:</strong> ${sanitize(formData.email)}</p>
      <p><strong>Assunto:</strong> ${sanitize(formData.assunto)}</p>
      <p><strong>Subtópico:</strong> ${sanitize(formData.subtopico)}</p>
      <p><strong>Mensagem:</strong><br>${sanitize(formData.mensagem).replace(/\n/g, "<br>")}</p>
    `
  };

  const response = await fetch(MAILERSEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MAILERSEND_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  return response.ok;
}
