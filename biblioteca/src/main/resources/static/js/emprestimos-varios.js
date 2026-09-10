var listaItens = document.getElementById("lista-itens");
var mensagem = document.getElementById("mensagem");
var itens = [];
var livros = [];

function mostrarMensagem(texto, tipo) {
    mensagem.className = tipo;
    mensagem.textContent = texto;
}

function nomeDoLivro(livroId) {
    for (var i = 0; i < livros.length; i++) {
        if (livros[i].id === Number(livroId)) {
            return livros[i].nome;
        }
    }
    return "Livro " + livroId;
}

function desenharItens() {
    listaItens.innerHTML = "";
    for (var i = 0; i < itens.length; i++) {
        var li = document.createElement("li");
        li.textContent = nomeDoLivro(itens[i].livroId) + " - qtd " + itens[i].quantidade + " ";

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

function carregarLeitores() {
    axios.get("/api/leitores").then(function (resposta) {
        var select = document.getElementById("leitorId");
        select.innerHTML = "";
        var leitores = resposta.data;
        for (var i = 0; i < leitores.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = leitores[i].id;
            opcao.textContent = leitores[i].nome;
            select.appendChild(opcao);
        }
    });
}

function carregarLivros() {
    axios.get("/api/livros").then(function (resposta) {
        livros = resposta.data;
        var select = document.getElementById("livroId");
        select.innerHTML = "";
        for (var i = 0; i < livros.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = livros[i].id;
            opcao.textContent = livros[i].nome + " - quantidade: " + livros[i].quantidade;
            select.appendChild(opcao);
        }
    });
}

document.getElementById("form-item").addEventListener("submit", function (evento) {
    evento.preventDefault();

    var livroId = Number(document.getElementById("livroId").value);
    var quantidade = Number(document.getElementById("quantidade").value);

    itens.push({
        livroId: livroId,
        quantidade: quantidade
    });

    document.getElementById("quantidade").value = 1;
    mostrarMensagem("", "");
    desenharItens();
});

document.getElementById("btn-confirmar").addEventListener("click", function () {
    if (itens.length === 0) {
        mostrarMensagem("Acrescente pelo menos um livro", "erro");
        return;
    }

    var dados = {
        leitorId: Number(document.getElementById("leitorId").value),
        itens: itens
    };

    axios.post("/api/emprestimos/itens", dados)
        .then(function () {
            mostrarMensagem("Emprestimo registrado", "ok");
            itens = [];
            desenharItens();
            carregarLivros();
        })
        .catch(function () {
            mostrarMensagem("Nao foi possivel registrar o emprestimo", "erro");
        });
});

carregarLeitores();
carregarLivros();
