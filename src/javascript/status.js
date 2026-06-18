const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const pedido = JSON.parse(localStorage.getItem("pedidoAtual"));
const itensElement = document.getElementById("itens");
const finishOrderButton = document.querySelector("#btn-finish-order");

pedido.itens.forEach(item => {

    itensElement.innerHTML += `
        ${item.quantidade}x ${item.nome}<br>
    `;

});

document.getElementById("totalPago").innerText =
    `R$${pedido.total.toFixed(2).replace(".", ",")}`;

document.getElementById("delivery_type").innerText =
    pedido.tipoEntrega === "domicilio"
    ? " Entrega domiciliar"
    : " Retirada no balcão";

document.getElementById("delivery_address").innerText =
    pedido.endereco;

finishOrderButton.addEventListener("click", () => {

    alert("Finalizando pedido!");

    localStorage.removeItem("pedidoAtual");

    window.location.href = "index.html";
});

// Animações

ScrollReveal().reveal('#order_page',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});

