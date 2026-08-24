// Lista onde serão armazenados os produtos
let pedido = JSON.parse(localStorage.getItem("pedido")) || [];


// Adicionar produto ao pedido
function adicionarPedido(nome, preco) {

    pedido.push({
        nome: nome,
        preco: preco
    });

    localStorage.setItem("pedido", JSON.stringify(pedido));

    alert(nome + " foi adicionado ao seu pedido! ♡");
}


// Mostrar o pedido
function mostrarPedido() {

    const lista = document.getElementById("lista-pedido");
    const totalElemento = document.getElementById("total");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (pedido.length === 0) {

        lista.innerHTML = `
            <p class="pedido-vazio">
                Seu pedido ainda está vazio.
            </p>
        `;

        totalElemento.innerText = "R$ 0,00";

        return;
    }


    let total = 0;


    pedido.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("div");

        item.classList.add("item-pedido");

        item.innerHTML = `
            <span>
                ${produto.nome}
            </span>

            <strong>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </strong>
        `;

        lista.appendChild(item);

    });


    totalElemento.innerText =
        "R$ " + total.toFixed(2).replace(".", ",");

}


// Finalizar pedido
function finalizarPedido() {

    if (pedido.length === 0) {

        alert("Seu pedido está vazio! Escolha alguma delícia primeiro ♡");

        return;
    }

    alert(
        "Pedido realizado com sucesso! ♡\n\n" +
        "Obrigada por escolher nossa doceria!"
    );

}


// Executar quando a página carregar
document.addEventListener("DOMContentLoaded", mostrarPedido);