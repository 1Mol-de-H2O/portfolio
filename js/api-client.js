// ===============================
// CONFIGURAÇÕES DO EMAILJS
// ===============================
const CONFIG = {
  EMAILJS_PUBLIC_KEY: "mpo8hV6RInhMbz8U4",
  EMAILJS_SERVICE_ID: "service_g641og7",
  EMAILJS_TEMPLATE_ID: "template_ihe5y6u",
};

// ===============================
// FUNÇÃO DE ENVIO
// ===============================
async function enviarEmail(dados) {
  try {
    await emailjs.send(
      CONFIG.EMAILJS_SERVICE_ID,
      CONFIG.EMAILJS_TEMPLATE_ID,
      dados
    );
    return true;
  } catch (error) {
    console.error("Erro EmailJS:", error);
    return false;
  }
}
