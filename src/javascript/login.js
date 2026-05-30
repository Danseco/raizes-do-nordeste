const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(user =>
        user.email === email && user.senha === senha
    );

    if (!usuario) {
        alert("Email ou senha inválidos!");
        return;
    }

    // Salva sessão
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    alert("Login realizado!");

    window.location.href = "profile.html";
});

ScrollReveal().reveal('#login_page',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});