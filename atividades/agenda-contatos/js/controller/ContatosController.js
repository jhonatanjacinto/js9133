import { exibirContatos } from "../view/tabelaContatos.js";
import Contato from "../model/Contato.js";

export const contatos = JSON.parse(localStorage.getItem('contatos')) ?? [];

exibirContatos();

export function adicionarContato(nome, telefone)
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
        const infoContato = new Contato(nome, telefone);
        let contatoJaExiste = contatos.some(c => c.nome.toLowerCase() == nome.toLowerCase());

        if (contatoJaExiste) {
            alert('Contato já existe na sua agenda!');
        }
        else {
            contatos.push(infoContato);
            exibirContatos();
        }

        // salva os contatos no localStorage
        localStorage.setItem('contatos', JSON.stringify(contatos));
    }
}