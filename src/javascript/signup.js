const form = document.getElementById("cadastroForm");
const fidelidadeSelecionada = document.querySelector(
    'input[name="planoFidelidade"]:checked');

const planoFidelidade = fidelidadeSelecionada
    ? fidelidadeSelecionada.value === "true"
    : false;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    const planoFidelidade =
        document.querySelector('input[name="planoFidelidade"]:checked').value === "true";

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuarios.find(user => user.email === email);

    if (usuarioExiste) {
        alert("Este email já está cadastrado!");
        return;
    }

    const novoUsuario = {
        nome,
        email,
        senha,
        cpf,
        telefone,
        endereco,
        planoFidelidade
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";
});