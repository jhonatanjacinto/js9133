import { adicionarContato } from "./contatos.js";

btnSalvar.addEventListener('click', () => {
    let nome = inputNome.value.trim();
    let telefone = inputTelefone.value.trim();
    adicionarContato(nome, telefone);
});



