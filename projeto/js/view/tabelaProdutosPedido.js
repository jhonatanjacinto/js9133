import * as PedidoController from "../controller/PedidoController.js";
import formataMoeda from "../utils/formataMoeda.js";
import ProdutoError from "../model/ProdutoError.js";

// Guardar as referências do HTML
const tbodyProdutos = document.querySelector('#tbodyProdutos');
const tdTotalPedido = document.querySelector('#tdTotalPedido');

exibirProdutosDoPedido();
export function exibirProdutosDoPedido()
{
    let tr = '';
    const listaProdutos = PedidoController.getProdutos();
    let totalPedido = PedidoController.getTotal();

    listaProdutos.forEach(produtoSelecionado => {
        tr += `
            <tr>
                <td width="10%">
                    <img src="imagens/pizzas/${produtoSelecionado.foto}" alt="" width="100%" />
                </td>
                <td>
                    ${produtoSelecionado.nome}<br>
                    <button data-pid="${produtoSelecionado.id}" class="btn btn-danger btn-sm">
                        Excluir
                    </button>
                </td>
                <td>${produtoSelecionado.quantidade}</td>
                <td>${formataMoeda(produtoSelecionado.preco)}</td>
                <td>${formataMoeda(produtoSelecionado.getSubtotal())}</td>
            </tr>
        `;
    });

    tbodyProdutos.innerHTML = tr;
    tdTotalPedido.innerHTML = formataMoeda(totalPedido);
}

tbodyProdutos.addEventListener('click', event => {
    try
    {
        if (event.target.dataset.pid != undefined) {
            let produto_id = event.target.dataset.pid;
            PedidoController.removerProduto(produto_id);
            exibirProdutosDoPedido();
        }
    }
    catch(erro) 
    {
        if (erro instanceof ProdutoError) {
            alert(erro);
            console.warn('Produto que gerou o erro: ', erro.produto);
        }
        else {
            alert('Não foi possível remover o produto do seu pedido. Por favor, contate o administrador!');
        }

        console.error(erro);
    }
});