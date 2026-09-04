var lista = document.getElementById("lista-materiais");
var form = document.getElementById("form-material");
var selectCategoria = document.getElementById("select-categoria");
var idEditando = "";
var categorias = [];

// criar função que recebe um id de categoria e retorna o nome da categoria
function nomeCategoria(categoriaId) {
    for(var i = 0; i < categorias.length; i++) {
        if(categorias[i].id == categoriaId) {
            return categorias[i].nome;
        }
    }

    return "Categoria não encontrada";
}

function carregarCategorias() {
    axios.get("/api/categorias").then(function(resposta) {
        categorias = resposta.data;

        selectCategoria.innerHTML = "";

        for(var i = 0; i < categorias.length; i++) {
            var opcao = document.createElement("option");
            opcao.value = categorias[i].id;
            opcao.textContent = categorias[i].nome;
            selectCategoria.appendChild(opcao);
        }
    })
}

function carregarMateriais() {
    axios.get("/api/materiais").then(function (resposta) {
        var materiais = resposta.data;
        lista.innerHTML = "";

        for (var i = 0; i < materiais.length; i++) {
            console.log(materiais[i]);

            var material = materiais[i];
            var li = document.createElement("li");
            li.textContent = material.nome + 
                " - quantidade: " + material.quantidade + 
                " - categoria: " + nomeCategoria(material.categoriaId);
        
            var botao = document.createElement("button");
            botao.textContent = "Excluir";
            botao.setAttribute("data-id", material.id);

            botao.addEventListener("click", function (evento) {
                var id = evento.target.getAttribute("data-id");
                axios.delete("/api/materiais/" + id).then(function () {
                    carregarMateriais();
                });
            });

            var botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.setAttribute("data-id", material.id);
            botaoEditar.setAttribute("data-nome", material.nome);
            botaoEditar.setAttribute("data-quantidade", material.quantidade);
            botaoEditar.addEventListener("click", function(evento) {
                idEditando = evento.target.getAttribute("data-id");
                document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                document.getElementById("quantidade").value = evento.target.getAttribute("data-quantidade");
            })

            li.appendChild(botaoEditar);
            li.appendChild(botao);
            lista.appendChild(li);
        }
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var quantidade = Number(document.getElementById("quantidade").value);
    var categoriaId = Number(selectCategoria.value);

    if(nome === "" || quantidade <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if(idEditando === "") {
        axios.post("/api/materiais", {
            nome: nome,
            quantidade: quantidade,
            categoriaId: categoriaId
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("quantidade").value = "";
            carregarMateriais();
        });
    } else {
        axios.put("/api/materiais/" + idEditando, {
            nome: nome,
            quantidade: quantidade
        }).then(function() {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("quantidade").value = "";
            carregarMateriais();
        })
    }
});

carregarMateriais();
carregarCategorias();
