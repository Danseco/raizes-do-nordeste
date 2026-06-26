const pedido = JSON.parse(localStorage.getItem("pedidoAtual"));
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const subtotalElement = document.getElementById("subtotal");
const freteElement = document.getElementById("frete");
const descontoElement = document.getElementById("desconto");
const totalElement = document.getElementById("total");
const deliveryAddress = document.getElementById("delivery_address");
const franquiaSelect = document.getElementById("franquia_option");
const radiosEntrega = document.querySelectorAll('input[name="entrega"]');
const finishButton = document.querySelector("#btn-finish");
const cancelButton = document.querySelector("#btn-cancel");
const franquias = {
    belem: "Av. Nazaré, 1234 - Nazaré, Belém - PA",
    recife: "Av. Conde da Boa Vista, 567 - Boa Vista, Recife - PE",
    brasilia: "CLS 110, Bloco A - Asa Sul, Brasília - DF",
    saoPaulo: "Rua da Consolação, 890 - Consolação, São Paulo - SP",
    curitiba: "Av. República Argentina, 1500 - Água Verde, Curitiba - PR"
};

// Função que altera o endereço mostrado de acordo com o tipo de envio
function atualizarEndereco() {

    const tipoEntrega = document.querySelector(
        'input[name="entrega"]:checked'
    ).value;

    if (tipoEntrega === "domicilio") {

        deliveryAddress.textContent =
            ` para entrega: ${usuario.endereco}`;

    } else {

        deliveryAddress.textContent =
            ` para retirada: ${franquias[franquiaSelect.value]}`;

    }

    pedido.tipoEntrega = tipoEntrega;
    pedido.endereco = deliveryAddress.textContent;
    pedido.franquia = franquiaSelect.options[franquiaSelect.selectedIndex].text;
    localStorage.setItem( "pedidoAtual", JSON.stringify(pedido) );
}

radiosEntrega.forEach(radio => {

    radio.addEventListener(
        "change",
        atualizarEndereco
    );

});

franquiaSelect.addEventListener(
    "change",
    atualizarEndereco
);

atualizarEndereco();

// Função que altera o valor do frete de acordo com o tipo de envio e status do plano fidelidade
function atualizarPedido() {

    let frete = 0;
    let desconto = 0;

    const entrega = document.querySelector(
            'input[name="entrega"]:checked'
        ).value;

    if (entrega === "domicilio") {
        frete = 12.00;
    }

    if (usuario.planoFidelidade) {
        frete = 0.00;
    }

    if (usuario.planoFidelidade) {
        desconto = pedido.subtotal * 0.10;
    }

    const total = pedido.subtotal + frete - desconto;

    subtotalElement.textContent =
        `R$ ${pedido.subtotal.toFixed(2).replace(".", ",")}`;

    freteElement.textContent =
        `R$ ${frete.toFixed(2).replace(".", ",")}`;

    descontoElement.textContent =
        `R$ ${desconto.toFixed(2).replace(".", ",")}`;

    totalElement.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    pedido.frete = frete;
    pedido.desconto = desconto;
    pedido.total = total;

    
    localStorage.setItem(
        "pedidoAtual",
        JSON.stringify(pedido)
    );
}

document.querySelectorAll('input[name="entrega"]').forEach(radio => {
    radio.addEventListener(
        "change",
        atualizarPedido
    );

});

atualizarPedido();

//Botão de finalizar pedido
finishButton.addEventListener("click", () => {
    const pedido =
        JSON.parse(localStorage.getItem("pedidoAtual"));

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
        ...pedido,
        cliente: usuario.nome,
        data: new Date().toLocaleString()
    });

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    alert("Transferindo para site de pagamento externo!");

    window.location.href = "payment.html";
});

//Botão de cancelar pedido
cancelButton.addEventListener("click", () => {

    if (confirm("Deseja cancelar seu pedido?")) {

        localStorage.removeItem("pedidoAtual");

        window.location.href = "index.html";

    }

});

// Animações

ScrollReveal().reveal('#order_page',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});
