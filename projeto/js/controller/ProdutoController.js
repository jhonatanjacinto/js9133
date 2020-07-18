import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";
import { getProdutosServer } from "../data/ProdutosApi.js";

let listaProdutos = [];

export async function getListaProdutos()
{  
    const produtosServidor = await getProdutosServer();
    listaProdutos = produtosServidor.map(p => Object.setPrototypeOf(p, Produto.prototype));
    return listaProdutos;
}

export function getProdutoPorId(id)
{
    const produto = listaProdutos.find(produto => produto.id == id);

    if (!produto) {
        throw new ProdutoError('Produto informado não foi encontrado!', produto);
    }

    return produto;
}