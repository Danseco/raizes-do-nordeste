const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const itensElement = document.getElementById("order_itens");
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const ultimoPedido = pedidos[pedidos.length - 1];
const btnEdit = document.getElementById("btn-edit");
const btnSave = document.getElementById("btn-save");
const btnDelete = document.getElementById("btn-delete-account");
const btnStatus = document.getElementById("check_status")
const pedidoAtual = JSON.parse(localStorage.getItem("pedidoAtual"));

// Se não houver usuário logado é enviado para a página de login
if (!usuario) {
    window.location.href = "login.html";
}

//informações do cliente
document.getElementById("bemVindo").innerText =
    `Bem-vindo, ${usuario.nome}!`,

document.getElementById("nomeLogin").value =
    usuario.nome;

document.getElementById("emailLogin").value =
    usuario.email;

document.getElementById("cpfLogin").value =
    usuario.cpf;

document.getElementById("telefoneLogin").value =
    usuario.telefone;

document.getElementById("enderecoLogin").value =
    usuario.endereco;

document.getElementById("planoFidelidadeStatus").innerText =
    usuario.planoFidelidade
        ? "Status plano fidelidade: Ativo"
        : "Status plano fidelidade: Desativado";

//último pedido feito

if (ultimoPedido && ultimoPedido.cliente === usuario.nome) {

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
document.getElementById("order_status").textContent =
    `Status: Pedido finalizado!`;

});
//Mostra o botão de verificar status, se o pedido ainda não foi finalizado
btnStatus.addEventListener("click", () => {
    window.location.href = "status.html";
});

if (pedidoAtual) {
    btnStatus.style.display = "block";
    document.getElementById("order_status").textContent =
    ``;
};

//Mostra informações do último pedido
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

// editar dados
btnEdit.addEventListener("click", () => {
    document.getElementById("nomeLogin").disabled = false;
    document.getElementById("telefoneLogin").disabled = false;
    document.getElementById("enderecoLogin").disabled = false;
    document.getElementById("emailLogin").disabled = false;

    //Não deixa editar o CPF
    document.getElementById("cpfLogin").disabled = true;

    btnSave.style.display = "block";
    btnDelete.style.display = "block";
    btnEdit.style.display = "none";
});

// Salva edições feitas
btnSave.addEventListener("click", () => {
    const novoNome = document.getElementById("nomeLogin").value;
    const novoTelefone = document.getElementById("telefoneLogin").value;
    const novoEndereco = document.getElementById("enderecoLogin").value;
    const novoEmail = document.getElementById("emailLogin").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const index = usuarios.findIndex(
        user => user.email === usuario.email
    );

    if (index !== -1) {

        usuarios[index].nome = novoNome;
        usuarios[index].telefone = novoTelefone;
        usuarios[index].endereco = novoEndereco;
        usuarios[index].email = novoEmail;

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        usuario.nome = novoNome;
        usuario.telefone = novoTelefone;
        usuario.endereco = novoEndereco;
        usuario.email = novoEmail;

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        alert("Dados atualizados com sucesso!");

        location.reload();
    }

});

// Botão excluir conta
btnDelete.addEventListener("click", () => {

    const confirmacao = confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita."
    );

    if (!confirmacao) {
        return;
    }

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios = usuarios.filter(
        user => user.email !== usuario.email
    );

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.removeItem("usuarioLogado");

    alert("Sua conta foi excluída com sucesso.");

    window.location.href = "index.html";
});

//Botão de deslogar
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
