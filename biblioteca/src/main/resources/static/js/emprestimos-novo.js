var mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
    mensagem.className = tipo;
    mensagem.textContent = texto;
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
        var select = document.getElementById("livroId");
        select.innerHTML = "";
        var livros = resposta.data;
        for (var i = 0; i < livros.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = livros[i].id;
            opcao.textContent = livros[i].nome + " - quantidade: " + livros[i].quantidade;
            select.appendChild(opcao);
        }
    });
}

document.getElementById("form-emprestimo").addEventListener("submit", function (evento) {
    evento.preventDefault();

    var dados = {
        leitorId: Number(document.getElementById("leitorId").value),
        livroId: Number(document.getElementById("livroId").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    console.log(dados);
    
    axios.post("/api/emprestimos", dados)
        .then(function () {
            mostrarMensagem("Emprestimo registrado", "ok");
            document.getElementById("quantidade").value = 1;
            carregarLivros();
        })
        .catch(function () {
            mostrarMensagem("Nao foi possivel registrar o emprestimo", "erro");
        });
});

carregarLeitores();
carregarLivros();
