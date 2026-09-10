var lista = document.getElementById("lista-livros");
var form = document.getElementById("form-livro");
var idEditando = "";

function carregarLivros() {
    axios.get("/api/livros").then(function (response) {
        if (response.status == 200) {

            var livros = response.data;
            lista.innerHTML = "";

            for (var i = 0; i < livros.length; i++) {
                var livro = livros[i];
                var li = document.createElement("li");

                li.textContent = livro.nome + " - " + livro.autor + " - quantidade: " + livro.quantidade + " ";

                var botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.setAttribute("data-id", livro.id);
                botaoEditar.setAttribute("data-nome", livro.nome);
                botaoEditar.setAttribute("data-autor", livro.autor);
                botaoEditar.setAttribute("data-quantidade", livro.quantidade);

                botaoEditar.addEventListener("click", function (evento) {
                    idEditando = evento.target.getAttribute("data-id");
                    document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                    document.getElementById("autor").value = evento.target.getAttribute("data-autor");
                    document.getElementById("quantidade").value = evento.target.getAttribute("data-quantidade");
                });

                var botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.setAttribute("data-id", livro.id);

                botaoExcluir.addEventListener("click", function (evento) {
                    var id = evento.target.getAttribute("data-id");
                    axios.delete("/api/livros/" + id).then(function () {
                        carregarLivros();
                    });
                });

                li.appendChild(botaoEditar);
                li.appendChild(botaoExcluir);
                lista.appendChild(li);
            }

        } else {

            var li = document.createElement("li");
            li.textContent = "Ocorreu um erro.";
            lista.appendChild(li);

        }
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var autor = document.getElementById("autor").value;
    var quantidade = Number(document.getElementById("quantidade").value);

    if (idEditando === "") {
        axios.post("/api/livros", {
            nome: nome,
            autor: autor,
            quantidade: quantidade
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("autor").value = "";
            document.getElementById("quantidade").value = "";
            carregarLivros();
        });
    } else {
        axios.put("/api/livros/" + idEditando, {
            nome: nome,
            autor: autor,
            quantidade: quantidade
        }).then(function () {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("autor").value = "";
            document.getElementById("quantidade").value = "";
            carregarLivros();
        });
    }
});

carregarLivros();
