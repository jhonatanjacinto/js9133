import { getProdutos, getTotal } from "./pedido.js";
import { formataMoeda } from "./utils/formataMoeda.js";

export function exibirProdutosDoPedido()
{
    console.log('Função chamada para exibir produtos do pedido!!!');

    let tr = '';
    const listaProdutos = getProdutos();
    let totalPedido = getTotal();

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
