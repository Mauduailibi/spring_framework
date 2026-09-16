var form = document.getElementById("form-imc");
var campoPeso = document.getElementById("peso");
var campoAltura = document.getElementById("altura");
var botao = document.getElementById("btn-calcular");
var caixaResultado = document.querySelector(".resultado");
var textoImc = document.getElementById("valor-imc");
var textoClassificacao = document.getElementById("classificacao");
var mensagem = document.getElementById("mensagem");
var itensFaixa = document.querySelectorAll("#faixa li");

function limparEstado() {
    mensagem.textContent = "";
    caixaResultado.classList.remove("abaixo", "normal", "sobrepeso", "obesidade", "erro-estado");

    for (var i = 0; i < itensFaixa.length; i++) {
        itensFaixa[i].classList.remove("ativo");
    }
}

function classeDaClassificacao(texto) {
    if (texto === "Abaixo do peso") {
        return "abaixo";
    }
    if (texto === "Peso normal") {
        return "normal";
    }
    if (texto === "Sobrepeso") {
        return "sobrepeso";
    }
    if (texto === "Obesidade") {
        return "obesidade";
    }
    return "";
}

function marcarFaixa(classificacao) {
    for (var i = 0; i < itensFaixa.length; i++) {
        if (itensFaixa[i].getAttribute("data-classe") === classificacao) {
            itensFaixa[i].classList.add("ativo");
        }
    }
}

function mostrarErro(texto) {
    caixaResultado.classList.add("erro-estado");
    textoImc.textContent = "—";
    textoClassificacao.textContent = "Não foi possível calcular";
    mensagem.textContent = texto;
}

function mostrarResultado(imc, classificacao) {
    var classe = classeDaClassificacao(classificacao);

    if (classe) {
        caixaResultado.classList.add(classe);
    }

    textoImc.textContent = Number(imc).toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });
    textoClassificacao.textContent = classificacao;
    mensagem.textContent = "";
    marcarFaixa(classificacao);
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparEstado();

    var peso = Number(campoPeso.value);
    var altura = Number(campoAltura.value);

    botao.disabled = true;
    botao.textContent = "Calculando...";

    // Rota que o Java precisa implementar:
    // POST /api/imc
    // body: { peso, altura }
    // resposta: o mesmo objeto, com imc e classificacao preenchidos
    // classificacao: "Abaixo do peso" | "Peso normal" | "Sobrepeso" | "Obesidade"
    // extra: erro, se peso ou altura forem inválidos
    axios.post("/api/imc", {
        peso: peso,
        altura: altura
    }).then(function (resposta) {
        var dados = resposta.data;

        if (dados.erro) {
            mostrarErro(dados.erro);
            return;
        }

        mostrarResultado(dados.imc, dados.classificacao);
    }).catch(function () {
        mostrarErro("A rota POST /api/imc ainda não está implementada no Java.");
    }).then(function () {
        botao.disabled = false;
        botao.textContent = "Calcular IMC";
    });
});
