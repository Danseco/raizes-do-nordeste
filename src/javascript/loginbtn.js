const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    document.getElementById("login").innerText = "Login";

} else {
    document.getElementById("login").innerText = usuario.nome;
}

if (!usuario) {
    document.getElementById("loginMobile").innerText = "Login";
    
} else {
    document.getElementById("loginMobile").innerText = usuario.nome;
}