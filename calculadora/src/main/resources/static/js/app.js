var form = document.getElementById("form-calculo");
var campoNumero1 = document.getElementById("numero1");
var campoNumero2 = document.getElementById("numero2");
var campoOperacao = document.getElementById("operacao");
var botao = document.getElementById("btn-calcular");
var visor = document.querySelector(".visor");
var textoExpressao = document.getElementById("expressao");
var textoResultado = document.getElementById("resultado");
var mensagem = document.getElementById("mensagem");
var listaHistorico = document.getElementById("lista-historico");

var simbolos = {
    soma: "+",
    subtracao: "−",
    multiplicacao: "×",
    divisao: "÷"
};

function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        maximumFractionDigits: 8
    });
}

function limparMensagem() {
    mensagem.textContent = "";
    visor.classList.remove("erro");
}

function mostrarErro(texto) {
    visor.classList.add("erro");
    textoExpressao.textContent = "Não foi possível calcular";
    textoResultado.textContent = "—";
    mensagem.textContent = texto;
}

function mostrarResultado(numero1, numero2, operacao, resultado) {
    var simbolo = simbolos[operacao] || operacao;
    var expressao = formatarNumero(numero1) + " " + simbolo + " " + formatarNumero(numero2);

    visor.classList.remove("erro");
    textoExpressao.textContent = expressao;
    textoResultado.textContent = formatarNumero(resultado);
    mensagem.textContent = "";

    var item = document.createElement("li");
    item.textContent = expressao + " = ";

    var span = document.createElement("span");
    span.textContent = formatarNumero(resultado);
    item.appendChild(span);

    listaHistorico.insertBefore(item, listaHistorico.firstChild);
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparMensagem();

    var numero1 = Number(campoNumero1.value);
    var numero2 = Number(campoNumero2.value);
    var operacao = campoOperacao.value;

    botao.disabled = true;
    botao.textContent = "Calculando...";

    // Rota que o Java precisa implementar:
    // POST /api/calcular
    // body: { numero1, numero2, operacao }
    // resposta: o mesmo objeto, com resultado preenchido
    // (opcional: erro, se der problema, ex.: divisão por zero)
    axios.post("/api/calcular", {
        numero1: numero1,
        numero2: numero2,
        operacao: operacao
    }).then(function (resposta) {
        var dados = resposta.data;

        if (dados.erro) {
            mostrarErro(dados.erro);
            return;
        }

        mostrarResultado(numero1, numero2, operacao, dados.resultado);
    }).catch(function () {
        mostrarErro("A rota POST /api/calcular ainda não está implementada no Java.");
    }).then(function () {
        botao.disabled = false;
        botao.textContent = "Calcular";
    });
});
