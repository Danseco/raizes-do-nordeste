// Caso o usuário esteja logado, o nome cadastrado irá aparecer no botão de login/perfil
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

//Dispositivos maiores
if (!usuario) {
    document.getElementById("login").innerText = "Login";

} else {
    document.getElementById("login").innerText = usuario.nome;
}

//Dispositivos menores
if (!usuario) {
    document.getElementById("loginMobile").innerText = "Login";
    
} else {
    document.getElementById("loginMobile").innerText = usuario.nome;
};