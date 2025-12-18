// ===============================
// CONFIGURAÇÕES DO MAILERSEND
// ===============================
const CONFIG = {
  EMAILJS_PUBLIC_KEY: "mpo8hV6RInhMbz8U4",
  EMAILJS_SERVICE_ID: "service_g641og7",
  EMAILJS_TEMPLATE_ID: "template_ihe5y6u",
};


form.addEventListener("submit", function(event) {
  if(form.dataset.submitted == "true") return;
  form.dataset.submitted = "true";

  event.preventDefault();
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  botao.disabled = true;
  spinner.classList.remove("d-none");
  botao.innerText = "Enviando..."

  const dados = {
    nome: nome.value,
    email: email.value,
    assunto: assunto.value,
    subtopico: subtopico.value || "Não informado",
    mensagem: mensagem.value,
  };
  
  emailjs
  .send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, dados)
  .then(() => {
    alert("Mensagem enviada com sucesso");
    form.rest();
    form.classList.remove("was-validated");
  })
  .catch((error) => {
    console.error("Erro EmailJS:", error);
    alert("Erro ao enviar mensagem. Verfique o console.")
  })
  .finally(() => {
    botao.disabled = false;
    form.dataset.submitted = "false";
    spinner.classList.add("d-none");
    botao.innerText = "Enviar Mensagem";
  })

});
