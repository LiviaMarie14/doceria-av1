

let carrinho = JSON.parse(localStorage.getItem("carrinhoLMarie")) || [];


function salvarCarrinho() {
    localStorage.setItem("carrinhoLMarie", JSON.stringify(carrinho));
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    if (mensagem) {
        mensagem.textContent = texto;
        mensagem.className = "alert alert-" + tipo;
        mensagem.style.display = "block";
    }
}

function adicionarProduto(nome, preco) {
    const produtoExistente = carrinho.find(produto => produto.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    salvarCarrinho();
    renderizarCarrinho();
    mostrarMensagem(nome + " foi adicionado ao pedido!", "success");
}


function alterarQuantidade(nome, mudanca) {
    const produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade += mudanca;

        if (produto.quantidade <= 0) {
            removerProduto(nome);
            return;
        }
    }

    salvarCarrinho();
    renderizarCarrinho();
}


function removerProduto(nome) {
    carrinho = carrinho.filter(produto => produto.nome !== nome);

    salvarCarrinho();
    renderizarCarrinho();
}


function calcularTotais() {
    let subtotal = 0;

    carrinho.forEach(produto => {
        subtotal += produto.preco * produto.quantidade;
    });

    document.getElementById("subtotal").textContent = formatarMoeda(subtotal);
    document.getElementById("total").textContent = formatarMoeda(subtotal);
}


function renderizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach(produto => {
        const item = document.createElement("div");

        item.className = "card p-3 mb-3";

        item.innerHTML = `
            <h5>${produto.nome}</h5>
            <p>Preço: ${formatarMoeda(produto.preco)}</p>
            <p>Quantidade: ${produto.quantidade}</p>

            <div>
                <button class="btn btn-sm btn-secondary"
                    onclick="alterarQuantidade('${produto.nome}', -1)">-</button>

                <button class="btn btn-sm btn-secondary"
                    onclick="alterarQuantidade('${produto.nome}', 1)">+</button>

                <button class="btn btn-sm btn-danger"
                    onclick="removerProduto('${produto.nome}')">Remover</button>
            </div>
        `;

        lista.appendChild(item);
    });

    calcularTotais();
}
const botaoLimpar = document.getElementById("limpar-carrinho");

if (botaoLimpar) {
    botaoLimpar.addEventListener("click", function() {
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        mostrarMensagem("Pedido limpo com sucesso!", "info");
    });
}

const formulario = document.getElementById("form-pedido");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        if (carrinho.length === 0) {
            mostrarMensagem("Adicione pelo menos um produto ao carrinho!", "warning");
            return;
        }

        const nome = document.getElementById("nome").value.trim();
        const telefone = document.getElementById("telefone").value.replace(/\D/g, "");
        const email = document.getElementById("email").value.trim();

        if (nome.length < 3) {
            mostrarMensagem("Digite seu nome completo corretamente.", "danger");
            return;
        }

        if (telefone.length < 10 || telefone.length > 11) {
            mostrarMensagem("Digite um telefone válido.", "danger");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            mostrarMensagem("Digite um e-mail válido.", "danger");
            return;
        }

        mostrarMensagem("Pedido realizado com sucesso! Obrigada pela preferência ♡", "success");

        formulario.reset();
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
    });
}

document.querySelectorAll(".btn-adicionar").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const nome = this.dataset.nome;
        const preco = Number(this.dataset.preco);

        adicionarProduto(nome, preco);

    });

});

renderizarCarrinho();

