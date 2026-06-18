const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const itensElement = document.getElementById("order_itens");
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const ultimoPedido = pedidos[pedidos.length - 1];

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

document.getElementById("planoFidelidadeStatus").innerText =
    usuario.planoFidelidade
        ? "Plano fidelidade: Ativo"
        : "Plano fidelidade: Desativado";

if (ultimoPedido.cliente == usuario.nome) {

document.getElementById("order_title").textContent =
    `Último pedido:`;

document.getElementById("order_date").textContent =
    `Data: ${ultimoPedido.data}`;

document.getElementById("itens_title").textContent =
    `Itens comprados:`;
ultimoPedido.itens.forEach(item => {

    itensElement.innerHTML += `
        ${item.quantidade}x ${item.nome}<br>
    `;

});

document.getElementById("order_total").textContent =
    `Valor total: R$${ultimoPedido.total.toFixed(2).replace(".", ",")}`;

document.getElementById("order_delivery").innerText =
    ultimoPedido.tipoEntrega === "domicilio"
    ? " Entrega domiciliar"
    : " Retirada no balcão";

document.getElementById("order_address").textContent =
    `Endereço ${ultimoPedido.endereco}`;

document.getElementById("order_franquia").textContent =
    `Franquia: ${ultimoPedido.franquia}`;


};




function logout() {
    localStorage.removeItem("usuarioLogado");

    window.location.href = "login.html";
};

// Animações

ScrollReveal().reveal('#my_account',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});
