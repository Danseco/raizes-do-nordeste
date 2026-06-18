const payButton = document.querySelector("#btn-pay");
const pedidoValor = JSON.parse(localStorage.getItem("pedidoAtual"));

document.getElementById("valor_pagar").innerText =
    `Pagar R$:${pedidoValor.total.toFixed(2).replace(".", ",")}`;


payButton.addEventListener("click", () => {
    window.location.href = "status.html";
});