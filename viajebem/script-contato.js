const formulario = document.getElementById("form-contato");
const confirmacao = document.getElementById("confirmacao");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const idsDosCampos = ["nome", "telefone", "email", "mensagem"];
  const valores = {};
  let haCamposVazios = false;

  confirmacao.textContent = "";
  confirmacao.classList.remove("erro", "sucesso");

  idsDosCampos.forEach((id) => {
    const campo = document.getElementById(id);
    valores[id] = campo.value.trim();

    if (valores[id] === "") {
      campo.classList.add("campo-vazio");
      haCamposVazios = true;
    } else {
      campo.classList.remove("campo-vazio");
    }
  });

  if (haCamposVazios) {
    confirmacao.textContent = "Preencha todos os campos antes de enviar.";
    confirmacao.classList.add("erro");
    return;
  }

  confirmacao.textContent =
    `Recebemos seu contato, ${valores.nome}! ` +
    `Retornaremos no e-mail ${valores.email}.`;
  confirmacao.classList.add("sucesso");

  formulario.reset();
});
