const contatos = [];

btnSalvar.addEventListener('click', () => {
    let nome = inputNome.value.trim();
    let telefone = inputTelefone.value.trim();

    if (!nome || !isNaN(nome)) 
    {
        alert('Nome é obrigatório!');
    }
    else if (telefone.length < 13) 
    {
        alert('Telefone é obrigatório!');
    }
    else 
    {
        // ES6
        const infoContato = { nome, telefone };
        let contatoJaExiste = contatos.some(c => c.nome.toLowerCase() == nome.toLowerCase());

        if (contatoJaExiste) {
            alert('Contato já existe na sua agenda!');
        }
        else {
            contatos.push(infoContato);
            exibirContatos();
        }
    }
});

function exibirContatos()
{
    let linhas = '';

    contatos.forEach(c => {
        linhas += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.telefone}</td>
            </tr>
        `;
    });

    tabelaContatos.innerHTML = linhas;
}