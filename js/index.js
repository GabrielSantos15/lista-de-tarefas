const formLista = document.querySelector("#form");
const inputText = document.querySelector("#inputText");
const sectionLista = document.querySelector("#sectionLista ul");
const outLista = document.querySelector("#sectionLista h2> output");

const formEdit = document.querySelector("#formEdit");
const inputEdit = document.querySelector("#inputEdit");

let lista = [];
let editElemnt;

function recuperarLista() {
  const storageLista = localStorage.getItem("lista");

  if (storageLista) {
    lista = JSON.parse(storageLista);
  }

  atualisar();
}
recuperarLista();

function atualisar() {
  formLista.style.display = "flex";
  formEdit.style.display = "none";

  sectionLista.innerHTML = ``;

  lista.forEach((item, posicao) => {
    sectionLista.innerHTML += `
    <li class="${item.concluida && "done"}">
        <input type="checkbox" oninput="concluir(${posicao})" ${
      item.concluida && "checked"
    }>
        <p>${lista[posicao].tarefa}</p>
        <div>
          <span class="material-symbols-outlined" onclick="editar(${posicao})">edit</span>
          <span class="material-symbols-outlined" onclick="apagar(${posicao})">close</span>
        <div>
    </li>
    `;
  });

  outLista.innerHTML = lista.length;

  localStorage.setItem("lista", JSON.stringify(lista));
}

function adicionar() {
  if (inputText.value == "") {
    const form = document.querySelector("#form");

    form.style.animation = "";
    setTimeout(() => {
      form.style.animation = "shake .5s linear";
    }, 5);
    return;
  }
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

function clearAll() {
  const confirmacao = window.confirm("Deseja apagar sua lista?");

  if (confirmacao) {
    lista.splice(0, lista.length);
    atualisar();
  }
}

function editar(posicao) {
  formEdit.style.display = "flex";
  formLista.style.display = "none";

  inputEdit.value = lista[posicao].tarefa;
  editElemnt = posicao;
}
function alterar() {
  lista[editElemnt].tarefa = inputEdit.value;
  atualisar();
}

inputText.addEventListener("keydown", (event) => {
  if (event.key == "Enter") adicionar();
});
