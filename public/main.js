const lista = document.getElementById("task-list");
const form = document.getElementById("form");
const inputTexto = document.getElementById("texto");

async function getTarefas() {
  let resposta = await fetch("/tarefas");

  let tarefas = await resposta.json();

  showTarefas(tarefas);
}

function showTarefas(tarefas) {
  for (const t of tarefas) {
    showTarefa(t);
  }
}

function showTarefa(tarefa) {
  let stringLi = `<li id="li_${tarefa.id}">
        <input type="checkbox" id="check_${tarefa.id}" onclick="alterarTarefa(${tarefa.id})">
        <label for="check_${tarefa.id}">${tarefa.texto}</label>
        <i class="material-icons" onclick="removerTarefa(${tarefa.id})">delete</i>
    </li>`;

  lista.innerHTML += stringLi;
}

async function onFormSubmit(evt) {
  evt.preventDefault();

  let tarefa = await createTarefa(inputTexto.value);
  showTarefa(tarefa);
}

async function createTarefa(texto) {
  let resposta = await fetch("/tarefas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      texto: texto,
    }),
  });

  let tarefa = await resposta.json();

  return tarefa;
}

async function removerTarefa(id) {
  let resposta = await fetch(`/tarefas/${id}`, {
    method: "DELETE",
  });

  let tarefaLi = document.getElementById(`li_${id}`);

  tarefaLi.remove();
}

form.addEventListener("submit", onFormSubmit);

getTarefas();
