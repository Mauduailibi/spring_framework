var listaItens = document.getElementById("lista-itens");
var mensagem = document.getElementById("mensagem");
var itens = [];
var produtos = [];

function mostrarMensagem(texto, tipo) {
    mensagem.className = tipo;
    mensagem.textContent = texto;
}

function nomeDoProduto(produtoId) {
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].id === Number(produtoId)) {
            return produtos[i].nome;
        }
    }
    return "Produto " + produtoId;
}

function desenharItens() {
    listaItens.innerHTML = "";
    for (var i = 0; i < itens.length; i++) {
        var li = document.createElement("li");
        li.textContent = nomeDoProduto(itens[i].produtoId) + " - qtd " + itens[i].quantidade + " ";

        var botao = document.createElement("button");
        botao.textContent = "Tirar";
        botao.setAttribute("data-indice", i);
        botao.addEventListener("click", function (evento) {
            var indice = Number(evento.target.getAttribute("data-indice"));
            itens.splice(indice, 1);
            desenharItens();
        });

        li.appendChild(botao);
        listaItens.appendChild(li);
    }
}

function carregarClientes() {
    axios.get("/api/clientes").then(function (resposta) {
        var select = document.getElementById("clienteId");
        select.innerHTML = "";
        var clientes = resposta.data;
        for (var i = 0; i < clientes.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = clientes[i].id;
            opcao.textContent = clientes[i].nome;
            select.appendChild(opcao);
        }
    });
}

function carregarProdutos() {
    axios.get("/api/produtos").then(function (resposta) {
        produtos = resposta.data;
        var select = document.getElementById("produtoId");
        select.innerHTML = "";
        for (var i = 0; i < produtos.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = produtos[i].id;
            opcao.textContent = produtos[i].nome + " - estoque: " + produtos[i].estoque;
            select.appendChild(opcao);
        }
    });
}

document.getElementById("form-item").addEventListener("submit", function (evento) {
    evento.preventDefault();

    var produtoId = Number(document.getElementById("produtoId").value);
    var quantidade = Number(document.getElementById("quantidade").value);

    itens.push({
        produtoId: produtoId,
        quantidade: quantidade
    });

    document.getElementById("quantidade").value = 1;
    mostrarMensagem("", "");
    desenharItens();
});

document.getElementById("btn-confirmar").addEventListener("click", function () {
    if (itens.length === 0) {
        mostrarMensagem("Acrescente pelo menos um produto", "erro");
        return;
    }

    var dados = {
        clienteId: Number(document.getElementById("clienteId").value),
        itens: itens
    };

    axios.post("/api/vendas/itens", dados)
        .then(function () {
            mostrarMensagem("Venda registrada", "ok");
            itens = [];
            desenharItens();
            carregarProdutos();
        })
        .catch(function () {
            mostrarMensagem("Nao foi possivel registrar a venda", "erro");
        });
});

carregarClientes();
carregarProdutos();
