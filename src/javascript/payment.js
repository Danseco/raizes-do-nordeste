const payButton = document.querySelector("#btn-pay");
const pedidoValor = JSON.parse(localStorage.getItem("pedidoAtual"));

//Mostra valor a pagar
document.getElementById("valor_pagar").innerText =
    `Pagar R$:${pedidoValor.total.toFixed(2).replace(".", ",")}`;

//Botão de pagar
payButton.addEventListener("click", () => {
    window.location.href = "status.html";
});