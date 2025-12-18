document.addEventListener("DOMContentLoaded", function () {

  const subtopicos = {
    proposta: [
      { value: 'freelance', text: 'Projeto Freelance' },
      { value: 'clt', text: 'Vaga CLT' },
      { value: 'pj', text: 'Vaga PJ' },
    ],
    duvida: [
      { value: 'tecnica', text: 'Dúvida Técnica' },
      { value: 'carreira', text: 'Carreira' },
      { value: 'curso', text: 'Curso/Formação' },
    ],
    outro: [
      { value: 'geral', text: 'Assunto Geral' }
    ]
  };

  // ===============================
  // SUBTÓPICOS DINÂMICOS
  // ===============================
  
  document.getElementById('assunto').addEventListener('change', function () {
    const assunto = this.value;
    const container = document.getElementById('subtopicoContainer');
    const select = document.getElementById('subtopico');

    select.innerHTML = '';

    if (assunto && subtopicos[assunto]) {
      container.style.display = 'block';
      select.required = true;

      select.innerHTML = `<option value="">Selecione um subtópico</option>`;

      subtopicos[assunto].forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.value;
        opt.textContent = s.text;
        select.appendChild(opt);
      });

    } else {
      container.style.display = 'none';
      select.required = false;
    }
  });


  // ===============================
  // CONTADOR DE CARACTERES
  // ===============================

  document.getElementById('mensagem').addEventListener('input', function () {
    const count = document.getElementById('charCount');
    const len = this.value.length;
    const max = this.getAttribute('maxlength');

    count.textContent = len;

    if (len > max * 0.9) {
      count.className = "text-danger";
    } else if (len > max * 0.7) {
      count.className = "text-warning";
    } else {
      count.className = "text-muted";
    }
  });


  // ===============================
  // VALIDAÇÃO + O ENVIO
  // ===============================

  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const submitBtn = document.getElementById("submitBtn");
    const spinner = document.getElementById("loadingSpinner");

    spinner.classList.remove("d-none");
    submitBtn.disabled = true;

    const sucesso = await enviarEmail({
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      assunto: document.getElementById("assunto").value,
      subtopico: document.getElementById("subtopico").value,
      mensagem: document.getElementById("mensagem").value
    });

    spinner.classList.add("d-none");
    submitBtn.disabled = false;

    if (sucesso) {
      alert("Mensagem enviada com sucesso! 🎉");
      form.reset();
      document.getElementById("charCount").textContent = 0;
      document.getElementById("subtopicoContainer").style.display = "none";
    } else {
      alert("Erro ao enviar. Verifique sua API key e tente novamente.");
    }

  });

});
