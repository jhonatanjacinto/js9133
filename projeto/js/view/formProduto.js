import * as PedidoController from "../controller/PedidoController.js";
import * as Tabela from "./tabelaProdutosPedido.js";
import Produto from "../model/Produto.js";

// guardar referências do HTML
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const seletor_produto = document.querySelector('#seletor_produto');
const input_quantidade = document.querySelector('#input_quantidade');

const listaProdutos = [
    new Produto("Pizza de Calabresa", 'pizza-calabresa.jpg', 52.99, 0, 1),
    new Produto("Pizza 4 Queijos", 'pizza-4-queijos.jpg', 65.82, 0, 2),
    new Produto("Pizza de Frango Catupiry", 'pizza-frango-catupiry.jpg', 45.93, 0, 3),
    new Produto("Pizza Marguerita", 'pizza-marguerita.jpg', 32.75, 0, 4),
    new Produto("Pizza Portuguesa", 'pizza-portuguesa.jpg', 55.99, 0, 5)
];

let opcoes = '';

for (let produto of listaProdutos)
{
    // opcoes += '<option value="' + produto.id + '">' + produto.nome + '</option>';
    opcoes += `
        <option value="${produto.id}">
            ${produto.nome}
        </option>
    `;
}

seletor_produto.innerHTML = opcoes;


// ao clicar no botão, validamos os campos e criamos uma linha na tabela com o produto selecionado
btnAdicionarProduto.addEventListener('click', () => {
    let id = seletor_produto.value;
    let qtd = input_quantidade.value;

    const produtoSelecionado = listaProdutos.find(produto => produto.id == id);

    if (!produtoSelecionado) 
    {
        alert('ID do produto é inválido!');
    }
    else if (qtd < 1) 
    {
        alert('Quantidade inválida! Por favor, informe uma quantidade maior ou igual a 1.');
    }
    else 
    {
        produtoSelecionado.quantidade = qtd;
        PedidoController.adicionarProduto(produtoSelecionado);
        Tabela.exibirProdutosDoPedido();
    }
});