import { exibirStatusPedido } from "./blocoStatusPedido.js";
import PedidoError from "../model/PedidoError.js";
import * as PedidoController from '../controller/PedidoController.js';

const btnVerificar = document.querySelector('#btnVerificarStatus');
const inputCodigo = document.querySelector('#input_codigo');

btnVerificar.addEventListener('click', async () => {
    try
    {
        let codigoPedido = inputCodigo.value.trim();
        // passar o código do pedido para o controller checar na base de dados
        // e obter a resposta do status do pedido no servidor
        const statusPedido = await PedidoController.getStatusPedido(codigoPedido);
        exibirStatusPedido(statusPedido);
    }
    catch(erro)
    {
        if (erro instanceof PedidoError) {
            alert(erro);
        }
        else {
            alert('Não foi possível verificar o status para o código informado!');
        }

        console.error(erro);
    }
});