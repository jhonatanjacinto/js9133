import Pedido from "../model/Pedido.js";
import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";
import CorreiosError from "../model/CorreiosError.js";
import { buscarEndereco } from "../data/CorreiosApi.js";
import PedidoError from "../model/PedidoError.js";
import { salvarPedidoServer, getStatusPedidoServer } from "../data/PedidosApi.js";
import { exibirCodigoPedido } from "../view/blocoFinalizacaoPedido.js";

// objeto que presenta o pedido
/** @type {Pedido} */
let pedido = JSON.parse(sessionStorage.getItem('dadosPedido')) ?? new Pedido();
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

export async function enviarPedido(formularioPedido)
{
    // passa os valores dos campos presentes no objeto formularioPedido
    // para as propriedades correspondentes no objeto pedido
    for (let propriedade in formularioPedido) {
        let propReferencia = propriedade.replace(/(input_|seletor_)/g, '');
        pedido[propReferencia] = formularioPedido[propriedade].value;
    }

    if (pedido.produtos.length < 1) {
        throw new PedidoError('Seu pedido precisa pelo menos ter 1 produto adicionado!', pedido);
    }

    // salva os dados na base de dados da API
    await salvarPedidoServer(pedido);

    // exibe o código do pedido para o usuário
    exibirCodigoPedido(pedido.id);

    // excluir os dados do pedido no sessionStorage e da memória
    pedido = new Pedido();
    sessionStorage.clear();
}

export async function getStatusPedido(codigoPedido)
{
    if (!codigoPedido) {
        throw new PedidoError('Código do Pedido é inválido!');
    }

    // passar para a API verificar no servidor e retornar seu resultado
    const statusPedido = await getStatusPedidoServer(codigoPedido);
    if (statusPedido.codigo == 0) {
        throw new PedidoError('Pedido não encontrado em nossa base de dados!');
    }

    return statusPedido;
}