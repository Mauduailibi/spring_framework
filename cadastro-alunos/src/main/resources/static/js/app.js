var lista = document.getElementById("lista-alunos");

function carregarAlunos() {
    axios.get("/api/alunos").then(function (resposta) {
        if(resposta.status == 200) {
            var alunos = resposta.data;
            lista.innerHTML = "";

            for(var i = 0; i < alunos.length; i++) {
                var li = document.createElement("li");
                li.textContent = alunos[i].nome + " - " + alunos[i].turma;

                var btnExcluir = document.createElement("button");
                btnExcluir.textContent = "Excluir";
                btnExcluir.setAttribute("data-id", alunos[i].id);

                btnExcluir.addEventListener("click", function (evento) {
                    var id = evento.target.getAttribute("data-id");

                    axios.delete("/api/alunos/" + id).then(function () {
                        carregarAlunos();
                    });
                })

                li.appendChild(btnExcluir);
                lista.appendChild(li);
            }   
        }
    });
}

carregarAlunos();

var form = document.getElementById("form-aluno");

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var turma = document.getElementById("turma").value;

    axios.post("/api/alunos", { nome: nome, turma: turma }).then(function () {
        carregarAlunos();
    })
})