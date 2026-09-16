var form = document.getElementById("form-atm");
var campoValor = document.getElementById("valor");
var textoSaldo = document.getElementById("saldo");
var mensagem = document.getElementById("mensagem");
var tela = document.querySelector(".tela");
var botaoDeposito = document.getElementById("btn-deposito");
var botaoSaque = document.getElementById("btn-saque");
var operacaoEscolhida = "deposito";

function formatarReal(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarSaldo(saldo) {
    textoSaldo.textContent = formatarReal(saldo);
}

function mostrarMensagem(texto, ehErro) {
    mensagem.textContent = texto;
    if (ehErro) {
        tela.classList.add("erro");
    } else {
        tela.classList.remove("erro");
    }
}

function travarBotoes(travado) {
    botaoDeposito.disabled = travado;
    botaoSaque.disabled = travado;
}

function carregarSaldo() {
    // GET /api/conta  →  { saldo }
    axios.get("/api/conta").then(function (resposta) {
        mostrarSaldo(resposta.data.saldo);
        mostrarMensagem("Insira o valor e escolha a operação", false);
    }).catch(function () {
        mostrarMensagem("A rota GET /api/conta ainda não está implementada no Java.", true);
    });
}

carregarSaldo();

botaoDeposito.addEventListener("click", function () {
    operacaoEscolhida = "deposito";
});

botaoSaque.addEventListener("click", function () {
    operacaoEscolhida = "saque";
});

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var valor = Number(campoValor.value);
    var operacao = operacaoEscolhida;

    travarBotoes(true);

    // POST /api/conta
    // body: { valor, operacao }   operacao: "deposito" | "saque"
    // resposta: o mesmo objeto, com saldo atualizado
    // extra: erro (ex.: saque maior que o saldo)
    axios.post("/api/conta", {
        valor: valor,
        operacao: operacao
    }).then(function (resposta) {
        var dados = resposta.data;

        if (dados.erro) {
            mostrarMensagem(dados.erro, true);
            if (dados.saldo !== undefined && dados.saldo !== null) {
                mostrarSaldo(dados.saldo);
            }
            return;
        }

        mostrarSaldo(dados.saldo);
        if (operacao === "deposito") {
            mostrarMensagem("Depósito realizado com sucesso.", false);
        } else {
            mostrarMensagem("Saque realizado com sucesso.", false);
        }
        campoValor.value = "";
    }).catch(function () {
        mostrarMensagem("A rota POST /api/conta ainda não está implementada no Java.", true);
    }).then(function () {
        travarBotoes(false);
    });
});
