import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";

const listaProdutos = [
    new Produto("Pizza de Calabresa", 'pizza-calabresa.jpg', 52.99, 0, 1),
    new Produto("Pizza 4 Queijos", 'pizza-4-queijos.jpg', 65.82, 0, 2),
    new Produto("Pizza de Frango Catupiry", 'pizza-frango-catupiry.jpg', 45.93, 0, 3),
    new Produto("Pizza Marguerita", 'pizza-marguerita.jpg', 32.75, 0, 4),
    new Produto("Pizza Portuguesa", 'pizza-portuguesa.jpg', 55.99, 0, 5)
];

export function getListaProdutos()
{
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