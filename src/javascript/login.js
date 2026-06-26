const loginForm = document.getElementById("loginForm");

//Dados do formulário de login
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    //verifica se o email e senha são iguais aos cadastrados
    const usuario = usuarios.find(user =>
        user.email === email && user.senha === senha
    );

    if (!usuario) {
        alert("Email ou senha inválidos!");
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    alert("Login realizado!");

    window.location.href = "profile.html";
});

// Animações

ScrollReveal().reveal('#login_page',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});