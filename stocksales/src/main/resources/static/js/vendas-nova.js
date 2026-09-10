var mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
    mensagem.className = tipo;
    mensagem.textContent = texto;
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
        var select = document.getElementById("produtoId");
        select.innerHTML = "";
        var produtos = resposta.data;
        for (var i = 0; i < produtos.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = produtos[i].id;
            opcao.textContent = produtos[i].nome + " - estoque: " + produtos[i].estoque;
            select.appendChild(opcao);
        }
    });
}

document.getElementById("form-venda").addEventListener("submit", function (evento) {
    evento.preventDefault();

    var dados = {
        clienteId: Number(document.getElementById("clienteId").value),
        produtoId: Number(document.getElementById("produtoId").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    axios.post("/api/vendas", dados)
        .then(function () {
            mostrarMensagem("Venda registrada", "ok");
            document.getElementById("quantidade").value = 1;
            carregarProdutos();
        })
        .catch(function () {
            mostrarMensagem("Nao foi possivel registrar a venda", "erro");
        });
});

carregarClientes();
carregarProdutos();
