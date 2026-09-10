var lista = document.getElementById("lista-leitores");
var form = document.getElementById("form-leitor");
var idEditando = "";

function carregarLeitores() {
    axios.get("/api/leitores").then(function (response) {
        if (response.status == 200) {

            var leitores = response.data;
            lista.innerHTML = "";

            for (var i = 0; i < leitores.length; i++) {
                var leitor = leitores[i];
                var li = document.createElement("li");

                li.textContent = leitor.nome + " - " + leitor.email + " - " + leitor.telefone + " ";

                var botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.setAttribute("data-id", leitor.id);
                botaoEditar.setAttribute("data-nome", leitor.nome);
                botaoEditar.setAttribute("data-email", leitor.email);
                botaoEditar.setAttribute("data-telefone", leitor.telefone);

                botaoEditar.addEventListener("click", function (evento) {
                    idEditando = evento.target.getAttribute("data-id");
                    document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                    document.getElementById("email").value = evento.target.getAttribute("data-email");
                    document.getElementById("telefone").value = evento.target.getAttribute("data-telefone");
                });

                var botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.setAttribute("data-id", leitor.id);

                botaoExcluir.addEventListener("click", function (evento) {
                    var id = evento.target.getAttribute("data-id");
                    axios.delete("/api/leitores/" + id).then(function () {
                        carregarLeitores();
                    });
                });

                li.appendChild(botaoEditar);
                li.appendChild(botaoExcluir);
                lista.appendChild(li);
            }

        } else {

            var li = document.createElement("li");
            li.textContent = "Ocorreu um erro.";
            lista.appendChild(li);

        }
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;

    if (idEditando === "") {
        axios.post("/api/leitores", {
            nome: nome,
            email: email,
            telefone: telefone
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefone").value = "";
            carregarLeitores();
        });
    } else {
        axios.put("/api/leitores/" + idEditando, {
            nome: nome,
            email: email,
            telefone: telefone
        }).then(function () {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefone").value = "";
            carregarLeitores();
        });
    }
});

carregarLeitores();
