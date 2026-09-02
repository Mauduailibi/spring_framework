var lista = document.getElementById("lista-materiais");
var form = document.getElementById("form-material");

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

            li.appendChild(botao);
            lista.appendChild(li);
        }
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var quantidade = Number(document.getElementById("quantidade").value);

    axios.post("/api/materiais", {
        nome: nome,
        quantidade: quantidade
    }).then(function () {
        document.getElementById("nome").value = "";
        document.getElementById("quantidade").value = "";
        carregarMateriais();
    });
});

carregarMateriais();
