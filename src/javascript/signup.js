const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

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
        telefone,
        endereco
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";
});

ScrollReveal().reveal('#signup_page',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});