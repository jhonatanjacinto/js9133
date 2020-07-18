import { getContatos } from "../controller/ContatosController.js";

// guardar as referências do HTML
const tabelaContatos = document.querySelector('#tabelaContatos');

export async function exibirContatos()
{
    let linhas = '';
    let contatos = await getContatos();
    contatos.forEach(c => {
        linhas += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.telefone}</td>
                <td>
                    <button class="btn btn-danger">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    tabelaContatos.innerHTML = linhas;
}
