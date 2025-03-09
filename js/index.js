const formLista = document.querySelector("#formLista");
const inputText = document.querySelector("#inputText");
const dateInput = document.querySelector("#dateInput");
const timeInput = document.querySelector("#timeInput");
const nivelInput = document.querySelector("#nivelInput");

const sectionLista = document.querySelector("#sectionLista ul");
const outLista = document.querySelector("#sectionLista h2> output");

const formEdit = document.querySelector("#formEdit");
const inputEdit = document.querySelector("#inputEdit");

resetInputs();

let lista = [];
let editElemnt;

function recuperarLista() {
  const storageLista = localStorage.getItem("lista");

  if (storageLista) {
    lista = JSON.parse(storageLista);
  }

  atualizar();
}
recuperarLista();

function atualizar() {
  formLista.style.display = "flex";
  formEdit.style.display = "none";

  sectionLista.innerHTML = ``;

  if (lista.length === 0) {
    sectionLista.innerHTML = `<li>Nenhuma tarefa encontrada</li>`;
  } else {
    lista.forEach((item, posicao) => {
      sectionLista.innerHTML += `
      <li class="${item.concluida && "done"} ${
        Validade(lista[posicao].fim.data, lista[posicao].fim.hora) &&
        !item.concluida &&
        "vencida"
      }">
        <div class="endTime">
          <p>${formatarData(lista[posicao].fim.data)} ${
        lista[posicao].fim.hora
      }</p>
          <div>${lista[posicao].nivel}</div>
        </div>
        <div class="tarefa">
          <input type="checkbox" oninput="concluir(${posicao})" ${
        item.concluida && "checked"
      }>
          <p>${lista[posicao].tarefa}</p>
          <div>
            <span class="material-symbols-outlined" onclick="editar(${posicao})">edit</span>
            <span class="material-symbols-outlined" onclick="apagar(${posicao})">close</span>
          <div>
        </div>
      </li>
    `;
    });
  }

  outLista.innerHTML = lista.length;

  localStorage.setItem("lista", JSON.stringify(lista));
}

formLista.addEventListener("submit", (event) => {
  event.preventDefault();

  // verifica se o input esta vazio e aplica o efeito shake
  if (inputText.value == "") {
    const form = document.querySelector(".taskInputContainer");
    form.style.animation = "";
    setTimeout(() => {
      form.style.animation = "shake .5s linear";
    }, 5);
    return;
  }

  // adiciona a tarefa no inicio da lista
  lista.unshift({
    tarefa: inputText.value,
    fim: { data: dateInput.value, hora: timeInput.value },
    nivel: nivelInput.value,
    concluida: false,
  });

  // esvazia os inputs
  resetInputs();

  atualizar();
});

function concluir(posicao) {
  lista[posicao].concluida = !lista[posicao].concluida;
  atualizar();
}

function apagar(posicao) {
  lista.splice(posicao, 1);
  atualizar();
}

function clearAll() {
  const confirmacao = window.confirm("Deseja apagar sua lista?");

  if (confirmacao) {
    lista.splice(0, lista.length);
    atualizar();
  }
}

function editar(posicao) {
  formEdit.style.display = "flex";
  formLista.style.display = "none";

  inputEdit.value = lista[posicao].tarefa;
  editElemnt = posicao;
}

formEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  lista[editElemnt].tarefa = inputEdit.value;
  atualizar();
});

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
function resetInputs() {
  const now = new Date();
  now.setHours(now.getHours() + 1); // Adiciona uma hora à data/hora atuais
  
  inputText.value = "";
  dateInput.value = now.toISOString().split("T")[0];
  timeInput.value = now.toTimeString().slice(0, 5);
}

function Validade(data, hora) {
  const agora = new Date();
  const dataHoraTarefa = new Date(`${data}T${hora}`);

  return dataHoraTarefa < agora;
}
