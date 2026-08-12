var botao = document.getElementById("btn-mensagem");
var textoSaida = document.getElementById("saida");

botao.addEventListener("click", function() {
    axios.get("/api/mensagem").then(function(resposta) {
        textoSaida.textContent = resposta.data.texto;
        console.log(resposta);
    })
});

var lista = document.getElementById("lista-alunos");

axios.get("/api/alunos").then(function(response) {
    var alunos = response.data;
    lista.innerHtml = "";

    for(var i = 0; i < alunos.length; i++) {
        var aluno = alunos[i];
        var li = document.createElement("li");
        li.textContent = aluno.nome + " - " + aluno.turma;
        lista.appendChild(li);
    }
})