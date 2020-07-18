import * as PedidoController from "../controller/PedidoController.js";
import * as Tabela from "./tabelaProdutosPedido.js";
import ProdutoError from "../model/ProdutoError.js";
import * as ProdutoController from "../controller/ProdutoController.js";

// guardar referências do HTML
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const seletor_produto = document.querySelector('#seletor_produto');
const input_quantidade = document.querySelector('#input_quantidade');

(async () => {

    const listaProdutos = await ProdutoController.getListaProdutos();
    let opcoes = '';
    for (let produto of listaProdutos) {
        opcoes += `
            <option value="${produto.id}">
                ${produto.nome}
            </option>
        `;
    }
    seletor_produto.innerHTML = opcoes;

})();

// ao clicar no botão, validamos os campos e criamos uma linha na tabela com o produto selecionado
btnAdicionarProduto.addEventListener('click', () => {
    try 
    {
        let id = seletor_produto.value;
        let qtd = input_quantidade.value;

        const produtoSelecionado = ProdutoController.getProdutoPorId(id);
        produtoSelecionado.quantidade = qtd;
        PedidoController.adicionarProduto(produtoSelecionado);
        Tabela.exibirProdutosDoPedido();
    }
    catch(erro) 
    {
        if (erro instanceof ProdutoError) {
            alert(erro);
            console.warn('Produto que gerou o erro: ', erro.produto);
        }
        else {
            alert('Um erro inesperado ocorreu ao adicionar um produto ao seu pedido. Por favor, contate o administrador!');
        }
        
        console.error(erro);
    }
});