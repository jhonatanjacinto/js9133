(function() {

    const listaProdutos = [
        { id: 1, nome: "Pizza de Calabresa", foto: 'pizza-calabresa.jpg', preco: 52.99 },
        { id: 2, nome: "Pizza 4 Queijos", foto: 'pizza-4-queijos.jpg', preco: 65.82 },
        { id: 3, nome: "Pizza de Frango Catupiry", foto: 'pizza-frango-catupiry.jpg', preco: 45.93 },
        { id: 4, nome: "Pizza Marguerita", foto: 'pizza-marguerita.jpg', preco: 32.75 },
        { id: 5, nome: "Pizza Portuguesa", foto: 'pizza-portuguesa.jpg', preco: 55.99 }
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
            moduloPedido.adicionarProduto(produtoSelecionado);
            moduloTabela.exibirProdutosDoPedido();
        }
    });

})();
