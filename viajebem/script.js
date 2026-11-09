const formulario = document.querySelector("#form-orcamento");
const areaResumo = document.querySelector("#resumo");
const mensagemResultado = document.querySelector("#mensagem-resultado");
const erroPacote = document.querySelector("#erro-pacote");
const erroTelefone = document.querySelector("#erro-telefone");
const campoTelefone = document.querySelector("#telefone");
const campoObservacoes = document.querySelector("#observacoes");
const contador = document.querySelector("#contador");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  limparMensagens();

  const telefone = campoTelefone.value.trim();
  const digitosTelefone = telefone.replace(/\D/g, "");
  const pacoteSelecionado = document.querySelector(
    'input[name="pacote"]:checked',
  );

  let formularioValido = true;

  if (!pacoteSelecionado) {
    mostrarErro(erroPacote, "Selecione um tipo de pacote.");
    formularioValido = false;
  }

  if (digitosTelefone.length < 10) {
    mostrarErro(erroTelefone, "O telefone precisa ter pelo menos 10 dígitos.");
    formularioValido = false;
  }

  if (!formularioValido) {
    return;
  }

  mostrarSucesso("Solicitação válida! Confira o resumo do pacote.");

  const extras = [];
  const extrasSelecionados = document.querySelectorAll(
    'input[name="extras"]:checked',
  );

  extrasSelecionados.forEach((extra) => {
    extras.push(extra.value);
  });

  const dados = {
    nome: document.querySelector("#nome").value.trim(),
    email: document.querySelector("#email").value.trim(),
    telefone: telefone,
    destino: document.querySelector("#destino").value,
    pacote: pacoteSelecionado.value,
    extras: extras,
    dataIda: document.querySelector("#data-ida").value,
    dataVolta: document.querySelector("#data-volta").value,
    observacoes: campoObservacoes.value.trim(),
  };

  exibirResumo(dados);
});

campoObservacoes.addEventListener("input", () => {
  const quantidade = campoObservacoes.value.length;
  contador.textContent = `${quantidade} caracteres`;
});

function limparMensagens() {
  erroPacote.textContent = "";
  erroTelefone.textContent = "";
  mensagemResultado.textContent = "";

  erroPacote.classList.remove("erro");
  erroTelefone.classList.remove("erro");

  mensagemResultado.classList.remove("erro");
  mensagemResultado.classList.remove("sucesso");

  areaResumo.replaceChildren();
}

function mostrarErro(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.classList.add("erro");
  elemento.classList.remove("sucesso");
}

function mostrarSucesso(mensagem) {
  mensagemResultado.textContent = mensagem;
  mensagemResultado.classList.add("sucesso");
  mensagemResultado.classList.remove("erro");
}

function exibirResumo(dados) {
  const titulo = document.createElement("h2");
  titulo.textContent = "Resumo do orçamento";
  areaResumo.appendChild(titulo);

  const lista = document.createElement("ul");

  adicionarItem(lista, "Nome", dados.nome);
  adicionarItem(lista, "E-mail", dados.email);
  adicionarItem(lista, "Telefone", dados.telefone);
  adicionarItem(lista, "Destino", dados.destino);
  adicionarItem(lista, "Tipo de pacote", dados.pacote);
  adicionarItem(
    lista,
    "Extras",
    dados.extras.length > 0
      ? dados.extras.join(", ")
      : "Nenhum extra selecionado",
  );
  adicionarItem(lista, "Data de ida", dados.dataIda);
  adicionarItem(lista, "Data de volta", dados.dataVolta);
  adicionarItem(
    lista,
    "Observações",
    dados.observacoes || "Nenhuma observação",
  );

  areaResumo.appendChild(lista);
}

function adicionarItem(lista, rotulo, valor) {
  const item = document.createElement("li");
  item.textContent = `${rotulo}: ${valor}`;
  lista.appendChild(item);
}
