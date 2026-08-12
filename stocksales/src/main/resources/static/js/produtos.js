var lista = document.getElementById("lista-produtos");

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