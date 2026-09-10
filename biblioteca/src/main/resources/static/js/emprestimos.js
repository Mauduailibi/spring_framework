var lista = document.getElementById("lista-emprestimos");
var mensagem = document.getElementById("mensagem");
var leitores = [];
var livros = [];

function nomeDoLeitor(leitorId) {
    for (var i = 0; i < leitores.length; i++) {
        if (leitores[i].id === leitorId) {
            return leitores[i].nome;
        }
    }
    return "Leitor " + leitorId;
}

function nomeDoLivro(livroId) {
    for (var i = 0; i < livros.length; i++) {
        if (livros[i].id === livroId) {
            return livros[i].nome;
        }
    }
    return "Livro " + livroId;
}

function textoDosItens(itens) {
    var partes = [];
    for (var i = 0; i < itens.length; i++) {
        partes.push(nomeDoLivro(itens[i].livroId) + " x" + itens[i].quantidade);
    }
    return partes.join(", ");
}

function montarLista(emprestimos) {
    lista.innerHTML = "";
    for (var i = 0; i < emprestimos.length; i++) {
        var emp = emprestimos[i];
        var li = document.createElement("li");
        if (emp.itens && emp.itens.length) {
            li.textContent = nomeDoLeitor(emp.leitorId) + " - " + textoDosItens(emp.itens);
        } else {
            li.textContent = nomeDoLeitor(emp.leitorId)
                + " - " + nomeDoLivro(emp.livroId)
                + " - qtd " + emp.quantidade;
        }
        lista.appendChild(li);
    }
}

function carregarEmprestimos() {
    axios.get("/api/emprestimos").then(function (resposta) {
        montarLista(resposta.data);
    }).catch(function () {
        lista.innerHTML = "";
        mensagem.className = "erro";
        mensagem.textContent = "A API de emprestimos ainda nao esta pronta.";
    });
}

axios.get("/api/leitores").then(function (resposta) {
    leitores = resposta.data;
    return axios.get("/api/livros");
}).then(function (resposta) {
    livros = resposta.data;
    carregarEmprestimos();
});
