import * as Pedido from "./pedido.js";
import formataMoeda from "./utils/formataMoeda.js";

// Guardar as referências do HTML
const tbodyProdutos = document.querySelector('#tbodyProdutos');
const tdTotalPedido = document.querySelector('#tdTotalPedido');

exibirProdutosDoPedido();
export function exibirProdutosDoPedido()
{
    console.log('Função chamada para exibir produtos do pedido!!!');

    let tr = '';
    const listaProdutos = Pedido.getProdutos();
    let totalPedido = Pedido.getTotal();

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
