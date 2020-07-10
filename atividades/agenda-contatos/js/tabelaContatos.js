import { contatos } from "./contatos.js";

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
