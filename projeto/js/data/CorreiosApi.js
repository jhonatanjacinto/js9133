import CorreiosError from "../model/CorreiosError.js";

/**
 * Busca as informações de endereço no CEP informado
 * @param {string} cep  CEP a ser consultado nos correios
 * @return {Promise<Object>}
 */
export async function buscarEndereco(cep)
{
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const dadosCep = await resposta.json();

    if (dadosCep.erro) {
        throw new CorreiosError('Informações do CEP não foram encontradas!', cep);
    }    

    return dadosCep;
}