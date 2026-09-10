var lista = document.getElementById("lista-clientes");
var form = document.getElementById("form-cliente");
var idEditando = "";

function carregarClientes() {
    axios.get("/api/clientes").then(function (response) {
        if (response.status == 200) {

            var clientes = response.data;
            lista.innerHTML = "";

            for (var i = 0; i < clientes.length; i++) {
                var cliente = clientes[i];
                var li = document.createElement("li");

                li.textContent = cliente.nome + " - " + cliente.email + " - " + cliente.telefone + " ";

                var botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.setAttribute("data-id", cliente.id);
                botaoEditar.setAttribute("data-nome", cliente.nome);
                botaoEditar.setAttribute("data-email", cliente.email);
                botaoEditar.setAttribute("data-telefone", cliente.telefone);

                botaoEditar.addEventListener("click", function (evento) {
                    idEditando = evento.target.getAttribute("data-id");
                    document.getElementById("nome").value = evento.target.getAttribute("data-nome");
                    document.getElementById("email").value = evento.target.getAttribute("data-email");
                    document.getElementById("telefone").value = evento.target.getAttribute("data-telefone");
                });

                var botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.setAttribute("data-id", cliente.id);

                botaoExcluir.addEventListener("click", function (evento) {
                    var id = evento.target.getAttribute("data-id");
                    axios.delete("/api/clientes/" + id).then(function () {
                        carregarClientes();
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
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;

    if (idEditando === "") {
        axios.post("/api/clientes", {
            nome: nome,
            email: email,
            telefone: telefone
        }).then(function () {
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefone").value = "";
            carregarClientes();
        });
    } else {
        axios.put("/api/clientes/" + idEditando, {
            nome: nome,
            email: email,
            telefone: telefone
        }).then(function () {
            idEditando = "";
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefone").value = "";
            carregarClientes();
        });
    }
});

carregarClientes();
