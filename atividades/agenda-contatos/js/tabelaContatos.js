import { contatos } from "./contatos.js";

// guardar as referências do HTML
const tabelaContatos = document.querySelector('#tabelaContatos');

export function exibirContatos()
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