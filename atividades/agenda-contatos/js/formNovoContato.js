(function() {

    btnSalvar.addEventListener('click', () => {
        let nome = inputNome.value.trim();
        let telefone = inputTelefone.value.trim();
        moduloContatos.adicionarContato(nome, telefone);
    });

})();

