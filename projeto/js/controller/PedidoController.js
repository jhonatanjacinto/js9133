import Pedido from "../model/Pedido.js";
import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";
import CorreiosError from "../model/CorreiosError.js";
import { buscarEndereco } from "../data/CorreiosApi.js";

// objeto que presenta o pedido
/** @type {Pedido} */
const pedido = JSON.parse(sessionStorage.getItem('dadosPedido')) ?? new Pedido();
Object.setPrototypeOf(pedido, Pedido.prototype);

export function getProdutos()
{
    return pedido.produtos.map(produto => Object.setPrototypeOf(produto, Produto.prototype));
}

export function getTotal()
{
    return pedido.getTotal();
}

/**
 * Função que valida e adiciona/atualiza um produto no Pedido
 * @param {Produto} produtoSelecionado Produto a ser adicionado/atualizado no Pedido
 * @return {void}
 */
export function adicionarProduto(produtoSelecionado)
{
    if (produtoSelecionado.quantidade <= 0) {
        throw new ProdutoError('Quantidade inválida! Informe um valor maior ou igual a 1.', produtoSelecionado);
    }

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

export function removerProduto(id)
{
    let indiceProduto = pedido.produtos.findIndex(produto => produto.id == id);
    
    if (indiceProduto < 0) {
        throw new ProdutoError('Produto não encontrado no seu Pedido!');
    }

    pedido.produtos.splice(indiceProduto, 1);
    sessionStorage.setItem('dadosPedido', JSON.stringify(pedido));
}

export async function getDadosEndereco(cep)
{
    if (isNaN(cep) || cep.length < 8) {
        throw new CorreiosError('CEP inválido!', cep);
    }

    const dadosRetornados = await buscarEndereco(cep);
    return dadosRetornados;
}
