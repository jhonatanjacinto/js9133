import { adicionarContato } from "../controller/ContatosController.js";
import ContatoError from "../model/ContatoError.js";

// guardar as referências do HTML
const btnSalvar = document.querySelector('#btnSalvar');
const inputNome = document.querySelector('#inputNome');
const inputTelefone = document.querySelector('#inputTelefone');

btnSalvar.addEventListener('click', async () => {
    try 
    {
        let nome = inputNome.value.trim();
        let telefone = inputTelefone.value.trim();
        await adicionarContato(nome, telefone);
    }
    catch(erro) 
    {
        if (erro instanceof ContatoError) {
            alert(erro);
            console.warn('Contato que gerou o erro: ', erro.contato);
        }
        else {
            alert('Erro ao adicionar seu contato na agenda. Por favor, contate o administrador do sistema!');
        }

        console.error(erro);
    }
});



