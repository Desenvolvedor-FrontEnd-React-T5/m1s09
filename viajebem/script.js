const formulario = document.querySelector("#form-orcamento");
const areaResumo = document.querySelector("#resumo");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const telefone = document.querySelector("#telefone").value.trim();
  const cidade = document.querySelector("#destino").value;

  const pacoteSelecionado = document.querySelector(
    'input[name="pacote"]:checked',
  );
  const pacote = pacoteSelecionado.value;

  const extras = [];
  const extrasSelecionados = document.querySelectorAll(
    'input[name="extras"]:checked',
  );

  extrasSelecionados.forEach((extra) => {
    extras.push(extra.value);
  });

  const dataIda = document.querySelector("#data-ida").value;
  const dataVolta = document.querySelector("#data-volta").value;
  const observacoes = document.querySelector("#observacoes").value.trim();

  areaResumo.replaceChildren();

  const titulo = document.createElement("h2");
  titulo.textContent = "Resumo do orçamento";
  areaResumo.appendChild(titulo);

  const lista = document.createElement("ul");

  adicionarItem(lista, "Nome", nome);
  adicionarItem(lista, "E-mail", email);
  adicionarItem(lista, "Telefone", telefone);
  adicionarItem(lista, "Destino", cidade);
  adicionarItem(lista, "Tipo de pacote", pacote);
  adicionarItem(
    lista,
    "Extras",
    extras.length > 0 ? extras.join(", ") : "Nenhum extra selecionado",
  );
  adicionarItem(lista, "Data de ida", dataIda);
  adicionarItem(lista, "Data de volta", dataVolta);
  adicionarItem(lista, "Observações", observacoes || "Nenhuma observação");

  areaResumo.appendChild(lista);
});

function adicionarItem(lista, rotulo, valor) {
  const item = document.createElement("li");
  item.textContent = `${rotulo}: ${valor}`;
  lista.appendChild(item);
}
