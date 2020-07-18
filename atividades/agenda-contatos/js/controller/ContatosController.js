import { exibirContatos } from "../view/tabelaContatos.js";
import Contato from "../model/Contato.js";
import ContatoError from "../model/ContatoError.js";

let contatos = [];

exibirContatos();

export async function getContatos()
{
    // buscar os dados no servidor NODE e guardar esse dados na variável contatos
    // http://localhost:8888/agenda/api/lista-contatos
    const resposta = await fetch('http://localhost:8888/agenda/api/lista-contatos');
    contatos = await resposta.json();
    return contatos;
}

export async function salvarContatos()
{
    // pegar a lista de contatos em memória e enviar via POST para o servidor
    // http://localhost:8888/agenda/api/salvar-contatos?lista=[LISTA DE CONTATOS EM JSON]
    // exibir o resultado retornado pelo servidor
    const parametros = new URLSearchParams();
    parametros.append('lista', JSON.stringify(contatos));

    let urlPost = 'http://localhost:8888/agenda/api/salvar-contatos?' + parametros;
    const resposta = await fetch(urlPost, { method: 'POST' });
    const statusServer = await resposta.json();
    console.log(statusServer);
}

export async function adicionarContato(nome, telefone)
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
            await salvarContatos(); // chama a função que salva os dados no servidor
            exibirContatos();
        }
    }
}
