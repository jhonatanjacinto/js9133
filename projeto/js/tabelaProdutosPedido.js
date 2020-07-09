// IIFE = Immediately invoked function expression
const moduloTabela = (function() {

    exibirProdutosDoPedido();

    function exibirProdutosDoPedido()
    {
        console.log('Função chamada para exibir produtos do pedido!!!');

        let tr = '';
        const listaProdutos = moduloPedido.getProdutos();
        let totalPedido = moduloPedido.getTotal();

        listaProdutos.forEach(produtoSelecionado => {
            tr += `
                <tr>
                    <td width="10%">
                        <img src="imagens/pizzas/${produtoSelecionado.foto}" alt="" width="100%" />
                    </td>
                    <td>${produtoSelecionado.nome}</td>
                    <td>${produtoSelecionado.quantidade}</td>
                    <td>${formataMoeda(produtoSelecionado.preco)}</td>
                    <td>${formataMoeda(produtoSelecionado.preco * produtoSelecionado.quantidade)}</td>
                </tr>
            `;
        });
    
        tbodyProdutos.innerHTML = tr;
        tdTotalPedido.innerHTML = formataMoeda(totalPedido);
    }

    return {
        exibirProdutosDoPedido
    }

})();

