import Pedido from "../model/Pedido.js";

// objeto que presenta o pedido
const pedido = JSON.parse(sessionStorage.getItem('dadosPedido')) ?? new Pedido();

export function getProdutos()
{
    return pedido.produtos;
}

export function getTotal()
{
    return pedido.produtos.reduce(function(totalPedido, produto) {
        return totalPedido + (produto.preco * produto.quantidade);
    }, 0);
}

export function adicionarProduto(produtoSelecionado)
{
    // verifica se o produtoSelecionado pelo usuário já está na lista de produtos do pedido
    let posicaoProduto = pedido.produtos.findIndex(produto => produto.id == produtoSelecionado.id);

    // se estiver...
    if (posicaoProduto >= 0) 
    {
        // alteramos apenas a quantidade deste produto
        pedido.produtos[posicaoProduto].quantidade = produtoSelecionado.quantidade;
    }
    else 
    {
        // como o produto não está na lista, o adicionamos ao pedido
        pedido.produtos.push(produtoSelecionado);
    }

    // salvar o pedido no sessionStorage
    sessionStorage.setItem('dadosPedido', JSON.stringify(pedido));
}
