const moduloContatos = (function() {

    const contatos = [];

    function adicionarContato(nome, telefone)
    {
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
                moduloTabela.exibirContatos();
            }
        }
    }

    return {
        contatos,
        adicionarContato
    }

})();