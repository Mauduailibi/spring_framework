var lista = document.getElementById("lista-produtos");
var form = document.getElementById("form-produto");

function carregarProdutos() {
    axios.get("/api/produtos").then(function(response) {
        if (response.status == 200) {

            var produtos = response.data;
            lista.innerHTML = "";

            for(var i = 0; i < produtos.length; i++) {
                var produto = produtos[i];
                var li = document.createElement("li");

                li.textContent = produto.nome + " - R$" + produto.preco + " - Em estoque: " + produto.estoque;
                lista.appendChild(li);
            }

        } else {

            var li = document.createElement("li");
            li.textContent = "Ocorreu um erro.";
            lista.appendChild(li);

        }
    })
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var preco = Number(document.getElementById("preco").value);
    var estoque = Number(document.getElementById("estoque").value);

    axios.post("/api/produtos", {
        nome: nome,
        preco: preco,
        estoque: estoque
    }).then(function () {
        document.getElementById("nome").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("estoque").value = "";
        carregarProdutos();
    })
})

carregarProdutos();