var lista = document.getElementById("lista-materiais");
var form = document.getElementById("form-material");
var idEditando = "";

function carregarMateriais() {
    axios.get("/api/materiais").then(function (resposta) {
        var materiais = resposta.data;
        lista.innerHTML = "";

        for (var i = 0; i < materiais.length; i++) {
            var material = materiais[i];
            var li = document.createElement("li");
            li.textContent = material.nome + " - quantidade: " + material.quantidade + " ";

            var botao = document.createElement("button");
            botao.textContent = "Excluir";
            botao.setAttribute("data-id", material.id);

            botao.addEventListener("click", function (evento) {
                var id = evento.target.getAttribute("data-id");
                axios.delete("/api/materiais/" + id).then(function () {
                    carregarMateriais();
                });
            });

            var botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.setAttribute("data-id", material.id);
            botaoEditar.setAttribute("data-nome", material.nome);
            botaoEditar.setAttribute("data-quantidade", material.quantidade);
            botaoEditar.addEventListener("click", function(evento) {
                idEditando = evento.target.getAttribute("data-id");
                document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                document.getElementById("quantidade").value = evento.target.getAttribute("data-quantidade");
            })

            li.appendChild(botaoEditar);
            li.appendChild(botao);
            lista.appendChild(li);
        }
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var quantidade = Number(document.getElementById("quantidade").value);

    if(nome === "" || quantidade <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if(idEditando === "") {
        axios.post("/api/materiais", {
            nome: nome,
            quantidade: quantidade
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("quantidade").value = "";
            carregarMateriais();
        });
    } else {
        axios.put("/api/materiais/" + idEditando, {
            nome: nome,
            quantidade: quantidade
        }).then(function() {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("quantidade").value = "";
            carregarMateriais();
        })
    }
});

carregarMateriais();
