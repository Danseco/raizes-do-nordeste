const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    window.location.href = "login.html";
}

document.getElementById("bemVindo").innerText =
    `Bem-vindo, ${usuario.nome}!`,

document.getElementById("nomeLogin").innerText =
    `Nome: ${usuario.nome}`;

document.getElementById("emailLogin").innerText =
    `Email: ${usuario.email}`;

document.getElementById("telefoneLogin").innerText =
    `Telefone: ${usuario.telefone}`;

document.getElementById("enderecoLogin").innerText =
    `Endereço: ${usuario.endereco}`;

function logout() {
    localStorage.removeItem("usuarioLogado");

    window.location.href = "login.html";
};

ScrollReveal().reveal('#my_account',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});
