var form = document.getElementById("form-tarefa");
var campoTexto = document.getElementById("texto");
var botao = document.getElementById("btn-salvar");
var lista = document.getElementById("lista-tarefas");
var mensagem = document.getElementById("mensagem");
var idEditando = "";

function mostrarMensagem(texto, ehErro) {
    mensagem.textContent = texto;
    if (ehErro) {
        mensagem.classList.add("erro");
    } else {
        mensagem.classList.remove("erro");
    }
}

function modoAdicionar() {
    idEditando = "";
    campoTexto.value = "";
    botao.textContent = "Adicionar";
    botao.classList.remove("editando");
}

function carregarTarefas() {
    // GET /api/tarefas
    axios.get("/api/tarefas").then(function (resposta) {
        var tarefas = resposta.data;
        lista.innerHTML = "";
        mensagem.textContent = "";

        for (var i = 0; i < tarefas.length; i++) {
            var tarefa = tarefas[i];
            var li = document.createElement("li");

            var span = document.createElement("span");
            span.textContent = tarefa.texto;
            li.appendChild(span);

            var btnEditar = document.createElement("button");
            btnEditar.type = "button";
            btnEditar.textContent = "Editar";
            btnEditar.className = "editar";
            btnEditar.setAttribute("data-id", tarefa.id);
            btnEditar.setAttribute("data-texto", tarefa.texto);
            btnEditar.addEventListener("click", function (evento) {
                idEditando = evento.target.getAttribute("data-id");
                campoTexto.value = evento.target.getAttribute("data-texto");
                botao.textContent = "Editar";
                botao.classList.add("editando");
                campoTexto.focus();
            });
            li.appendChild(btnEditar);

            var btnExcluir = document.createElement("button");
            btnExcluir.type = "button";
            btnExcluir.textContent = "Excluir";
            btnExcluir.className = "excluir";
            btnExcluir.setAttribute("data-id", tarefa.id);
            btnExcluir.addEventListener("click", function (evento) {
                var id = evento.target.getAttribute("data-id");

                // DELETE /api/tarefas/{id}
                axios.delete("/api/tarefas/" + id).then(function () {
                    if (idEditando == id) {
                        modoAdicionar();
                    }
                    carregarTarefas();
                }).catch(function () {
                    mostrarMensagem("A rota DELETE /api/tarefas/{id} ainda não está implementada no Java.", true);
                });
            });
            li.appendChild(btnExcluir);

            lista.appendChild(li);
        }
    }).catch(function () {
        mostrarMensagem("A rota GET /api/tarefas ainda não está implementada no Java.", true);
    });
}

carregarTarefas();

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var texto = campoTexto.value;

    if (idEditando) {
        // PUT /api/tarefas/{id}
        // body: { texto }
        axios.put("/api/tarefas/" + idEditando, { texto: texto }).then(function () {
            modoAdicionar();
            carregarTarefas();
        }).catch(function () {
            mostrarMensagem("A rota PUT /api/tarefas/{id} ainda não está implementada no Java.", true);
        });
        return;
    }

    // POST /api/tarefas
    // body: { texto }
    axios.post("/api/tarefas", { texto: texto }).then(function () {
        modoAdicionar();
        carregarTarefas();
    }).catch(function () {
        mostrarMensagem("A rota POST /api/tarefas ainda não está implementada no Java.", true);
    });
});
