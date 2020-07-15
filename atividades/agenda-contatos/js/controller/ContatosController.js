import { exibirContatos } from "../view/tabelaContatos.js";
import Contato from "../model/Contato.js";
import ContatoError from "../model/ContatoError.js";

export const contatos = JSON.parse(localStorage.getItem('contatos')) ?? [];

exibirContatos();

export function adicionarContato(nome, telefone)
{
    if (!nome || !isNaN(nome)) 
    {
        throw new ContatoError('Nome é obrigatório!');
    }
    else if (telefone.length < 13) 
    {
        throw new ContatoError('Telefone é obrigatório!');
    }
    else 
    {
        // ES6
        const infoContato = new Contato(nome, telefone);
        let contatoJaExiste = contatos.some(c => c.nome.toLowerCase() == nome.toLowerCase());

        if (contatoJaExiste) {
            throw new ContatoError('Contato já existe na sua agenda!', infoContato);
        }
        else {
            contatos.push(infoContato);
            exibirContatos();
        }

        // salva os contatos no localStorage
        localStorage.setItem('contatos', JSON.stringify(contatos));
    }
}
