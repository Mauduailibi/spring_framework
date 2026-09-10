var lista = document.getElementById("lista-vendas");
var mensagem = document.getElementById("mensagem");
var clientes = [];
var produtos = [];

function nomeDoCliente(clienteId) {
    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i].id === clienteId) {
            return clientes[i].nome;
        }
    }
    return "Cliente " + clienteId;
}

function nomeDoProduto(produtoId) {
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].id === produtoId) {
            return produtos[i].nome;
        }
    }
    return "Produto " + produtoId;
}

function textoDosItens(itens) {
    var partes = [];
    for (var i = 0; i < itens.length; i++) {
        partes.push(nomeDoProduto(itens[i].produtoId) + " x" + itens[i].quantidade);
    }
    return partes.join(", ");
}

function montarLista(vendas) {
    lista.innerHTML = "";
    for (var i = 0; i < vendas.length; i++) {
        var venda = vendas[i];
        var li = document.createElement("li");
        if (venda.itens && venda.itens.length) {
            li.textContent = nomeDoCliente(venda.clienteId)
                + " - " + textoDosItens(venda.itens)
                + " - total R$ " + venda.total;
        } else {
            li.textContent = nomeDoCliente(venda.clienteId)
                + " - " + nomeDoProduto(venda.produtoId)
                + " - qtd " + venda.quantidade
                + " - total R$ " + venda.total;
        }
        lista.appendChild(li);
    }
}

function carregarVendas() {
    axios.get("/api/vendas").then(function (resposta) {
        montarLista(resposta.data);
    }).catch(function () {
        lista.innerHTML = "";
        mensagem.className = "erro";
        mensagem.textContent = "A API de vendas ainda nao esta pronta.";
    });
}

axios.get("/api/clientes").then(function (resposta) {
    clientes = resposta.data;
    return axios.get("/api/produtos");
}).then(function (resposta) {
    produtos = resposta.data;
    carregarVendas();
});
