import CorreiosError from "../model/CorreiosError.js";
import PedidoError from "../model/PedidoError.js";
import * as PedidoController from "../controller/PedidoController.js";

// guardar referências da interface HTML
const btnEnviarPedido = document.querySelector('#btnEnviarPedido');
const todosOsCampos = document.querySelectorAll('#formPedido .form-control');
const camposObrigatorios = document.querySelectorAll('#formPedido [required]');
const formPedido = {};

// montamos um objeto que guarda todos os campos em propriedades
// que tem o mesmo nome do ID do campo
todosOsCampos.forEach(campo => {
    formPedido[campo.id] = campo;
});

/* Quando o usuário preencher o campo cep (ou alterar seu valor), buscamos 
   a informação do cep digitado... */
formPedido.input_cep.addEventListener('change', async () => {
    try
    {
        let cep = formPedido.input_cep.value;
        const infoEndereco = await PedidoController.getDadosEndereco(cep);
        console.log('infoEndereco: ', infoEndereco);

        formPedido.input_endereco.value = infoEndereco.logradouro;
        formPedido.input_bairro.value = infoEndereco.bairro;
        formPedido.input_cidade.value = infoEndereco.localidade;
        formPedido.seletor_estado.value = infoEndereco.uf;
    }
    catch(erro) 
    {
        if (erro instanceof CorreiosError) {
            alert(erro);
            console.warn('CEP que gerou o erro: ', erro.cep);
        }
        else {
            alert('Erro inesperado ao buscar informações do CEP!');
        }

        console.error(erro);
    }
    finally {
        todosOsCampos.forEach(campo => campo.disabled = false);
    }
});

/* Quando o usuário clicar no botão de envio do pedido, pegamos as informações dos campos obrigatórios e 
   validamos antes de inseri-las no Pedido final */
btnEnviarPedido.addEventListener('click', () => {
    try 
    {
        const validadorEmail = /[a-zA-Z\._-]+\@[a-zA-Z\._-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{2,}?/g;

        for (let campo of camposObrigatorios)
        {
            if (
                campo.value.trim() === '' ||
                campo.type === 'number' && isNaN(campo.value) ||
                campo.type === 'email' && !validadorEmail.test(campo.value)
            ) {
                campo.focus();
                throw new PedidoError(campo.dataset.mensagem);
            }
        }
    }
    catch(erro)
    {
        if (erro instanceof PedidoError) {
            alert(erro);
        }
        else {
            alert('Erro inesperado ao processar envio do pedido!');
        }

        console.error(erro);
    }
});