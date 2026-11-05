const formulario = document.querySelector("#form");
const mensagem = document.querySelector("#msg");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const senha = document.querySelector("#senha");

  if (senha.value.length < 6) {
    mensagem.textContent = "A senha precisa de 6 caracteres ou mais!";
    mensagem.classList.add("text-red");
    mensagem.classList.remove("text-green");
  } else {
    mensagem.textContent = "Cadastro realizado com sucesso!";
    mensagem.classList.remove("text-red");
    mensagem.classList.add("text-green");
  }
});
