import Pedido from '../model/Pedido.js';
import PedidoError from '../model/PedidoError.js';

let urlBase = 'http://localhost:8888/api';

export async function salvarPedidoServer(pedido)
{
    const parametros = new URLSearchParams();
    parametros.append('pedido', JSON.stringify(pedido));

    let urlPost = urlBase + '/salvar-pedido?' + parametros;
    const resposta = await fetch(urlPost, { method: 'POST' });
    const statusServidor = await resposta.json();
    console.log(statusServidor);
}

