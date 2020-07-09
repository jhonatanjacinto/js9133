
// objeto que presenta o pedido
const pedido = {
    produtosSelecionados: []
};

export function getProdutos()
{
    return pedido.produtosSelecionados;
}

export function getTotal()
{
    return pedido.produtosSelecionados.reduce(function(totalPedido, produto) {
        return totalPedido + (produto.preco * produto.quantidade);
    }, 0);
}

export function adicionarProduto(produtoSelecionado)
{
    // verifica se o produtoSelecionado pelo usuário já está na lista de produtos do pedido
    let posicaoProduto = pedido.produtosSelecionados.findIndex(produto => produto.id == produtoSelecionado.id);

    // se estiver...
    if (posicaoProduto >= 0) 
    {
        // alteramos apenas a quantidade deste produto
        pedido.produtosSelecionados[posicaoProduto].quantidade = produtoSelecionado.quantidade;
    }
    else 
    {
        // como o produto não está na lista, o adicionamos ao pedido
        pedido.produtosSelecionados.push(produtoSelecionado);
    }
}

