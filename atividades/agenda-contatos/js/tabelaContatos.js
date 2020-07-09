const moduloTabela = (function() {

    function exibirContatos()
    {
        let linhas = '';

        moduloContatos.contatos.forEach(c => {
            linhas += `
                <tr>
                    <td>${c.nome}</td>
                    <td>${c.telefone}</td>
                </tr>
            `;
        });

        tabelaContatos.innerHTML = linhas;
    }

    return {
        exibirContatos
    }

})();