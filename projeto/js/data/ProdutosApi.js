
export async function getProdutosServer()
{
    const resposta = await fetch('http://localhost:8888/api/lista-produtos');
    const listaProdutos = await resposta.json();
    return listaProdutos;
}