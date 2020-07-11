import { adicionarContato } from "./contatos.js";

// guardar as referências do HTML
const btnSalvar = document.querySelector('#btnSalvar');
const inputNome = document.querySelector('#inputNome');
const inputTelefone = document.querySelector('#inputTelefone');

btnSalvar.addEventListener('click', () => {
    let nome = inputNome.value.trim();
    let telefone = inputTelefone.value.trim();
    adicionarContato(nome, telefone);
});



