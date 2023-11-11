const inputText = document.querySelector("#inputText");
const sectionLista = document.querySelector("#sectionLista ul");
const outLista = document.querySelector("#sectionLista h2> output");

let lista = [];

function recuperarLista() {
  const storageLista = localStorage.getItem("lista");

  if (storageLista) {
    lista = JSON.parse(storageLista);
  }

  atualisar();
}
recuperarLista();

function atualisar() {
  sectionLista.innerHTML = ``;

  lista.forEach((item, posicao) => {
    sectionLista.innerHTML += `
    <li class="${item.concluida && "done"}">
        <input type="checkbox" oninput="concluir(${posicao})" ${
      item.concluida && "checked"
    }>
        <p>${lista[posicao].tarefa}</p>
        <span class="material-symbols-outlined" onclick="apagar(${posicao})">close</span>
    </li>
    `;
  });

  outLista.innerHTML = lista.length;

  localStorage.setItem("lista", JSON.stringify(lista));
}

function adicionar() {
  if (inputText.value == "") return;
  lista.unshift({
    tarefa: inputText.value,
    concluida: false,
  });

  inputText.value = "";

  atualisar();
}

function concluir(posicao) {
  lista[posicao].concluida = !lista[posicao].concluida;
  atualisar();
}
function apagar(posicao) {
  console.log(posicao);

  lista.splice(posicao, 1);
  atualisar();
}
