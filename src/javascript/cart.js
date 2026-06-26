const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cartClose= document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Botão de adcionar no carrinho
const addCartButtons = document.querySelectorAll(".add_cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const dish = event.target.closest(".dish");
        addToCart(dish);
    });
})

// Produto selecionado aparece no carrinho
const cartContent = document.querySelector(".cart-content");
const addToCart = dish => {
    const productImgSrc = dish.querySelector("img").src;
    const productTitle = dish.querySelector(".dish_title").textContent;
    const productPrice = dish.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Este item já está no carrinho!");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash-can cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Remove item do carrinho
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    // botões de quantidade
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

// Preco total dos produtos
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    let subtotal = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

        const price = parseFloat(
            priceElement.textContent
                .replace("R$", "")
                .replace(",", ".")
        );

        const quantity = parseInt(quantityElement.textContent);

        subtotal += price * quantity;
    });

    totalPriceElement.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

    return subtotal;
};

// Mostra quantos items tem no ícone do carrinho
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0){
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

// Botão de continuar
const buyButton = document.querySelector(".btn-buy");
buyButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    // Se o carrinho estiver vazio
    if (cartBoxes.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    //Só continua se houver usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        alert("Você precisa realizar o login.");
        window.location.href = "login.html";
        return;
    }

    //Armazena os itens pedidos em um array
    const itens = [];

    cartBoxes.forEach(cartBox => {

        itens.push({
            nome: cartBox.querySelector(".cart-product-title").textContent,

            preco: parseFloat(
                cartBox.querySelector(".cart-price")
                    .textContent
                    .replace("R$", "")
                    .replace(",", ".")
            ),

            quantidade: parseInt(
                cartBox.querySelector(".number").textContent
            )
        });

    });

    const subtotal = updateTotalPrice();
    const pedido = {
        itens,
        subtotal,
        frete: 0,
        desconto: 0,
        total: subtotal
    };
    // Salva pedido atual
    localStorage.setItem(
        "pedidoAtual",
        JSON.stringify(pedido)
    );

    window.location.href = "order.html";
});