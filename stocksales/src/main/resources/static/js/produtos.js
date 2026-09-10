var lista = document.getElementById("lista-produtos");
var form = document.getElementById("form-produto");
var idEditando = "";

function carregarProdutos() {
    axios.get("/api/produtos").then(function (response) {
        if (response.status == 200) {

            var produtos = response.data;
            lista.innerHTML = "";

            for (var i = 0; i < produtos.length; i++) {
                var produto = produtos[i];
                var li = document.createElement("li");

                li.textContent = produto.nome + " - R$" + produto.preco + " - Em estoque: " + produto.estoque + " ";

                var botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.setAttribute("data-id", produto.id);
                botaoEditar.setAttribute("data-nome", produto.nome);
                botaoEditar.setAttribute("data-preco", produto.preco);
                botaoEditar.setAttribute("data-estoque", produto.estoque);

                botaoEditar.addEventListener("click", function (evento) {
                    idEditando = evento.target.getAttribute("data-id");
                    document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                    document.getElementById("preco").value = evento.target.getAttribute("data-preco");
                    document.getElementById("estoque").value = evento.target.getAttribute("data-estoque");
                });

                var botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.setAttribute("data-id", produto.id);

                botaoExcluir.addEventListener("click", function (evento) {
                    var id = evento.target.getAttribute("data-id");
                    axios.delete("/api/produtos/" + id).then(function () {
                        carregarProdutos();
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
    var preco = Number(document.getElementById("preco").value);
    var estoque = Number(document.getElementById("estoque").value);

    if (idEditando === "") {
        axios.post("/api/produtos", {
            nome: nome,
            preco: preco,
            estoque: estoque
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("preco").value = "";
            document.getElementById("estoque").value = "";
            carregarProdutos();
        });
    } else {
        axios.put("/api/produtos/" + idEditando, {
            nome: nome,
            preco: preco,
            estoque: estoque
        }).then(function () {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("preco").value = "";
            document.getElementById("estoque").value = "";
            carregarProdutos();
        });
    }
});

carregarProdutos();
