const inputText = document.querySelector("#inputText");
const sectionLista = document.querySelector("#sectionLista ul");
const outLista =  document.querySelector("#sectionLista h2> output");

const lista = [];

function atualisar() {
  sectionLista.innerHTML = ``;

  lista.forEach((item, posicao) => {

    sectionLista.innerHTML += `
    <li>
        <input type="checkbox">
        <p>${lista[posicao].tarefa}</p>
        <span class="material-symbols-outlined" onclick="apagar(${posicao})">close</span>
    </li>
    `;
  });

  outLista.innerHTML = lista.length
}

function adicionar() {


  lista.unshift({
    tarefa: inputText.value,
    concluida: false,
  });

  inputText.value = "";

  atualisar()
}
function apagar(posicao){
    console.log(posicao)

    lista.splice(posicao,1);
    atualisar();
}