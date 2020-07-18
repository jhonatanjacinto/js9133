const divStatus = document.querySelector('#divStatusPedido');

export function exibirStatusPedido(status)
{
    if (status.codigo == 1) {
        // em andamento
        divStatus.innerHTML = `
            <div class="alert alert-warning text-center">
                <span>status do seu pedido é:</span>
                <h4 class="alert-heading display-3">EM ANDAMENTO</h4>
            </div> 
        `;
    }
    else {
        // finalizado
        divStatus.innerHTML = `
            <div class="alert alert-success text-center">
                <span>status do seu pedido é:</span>
                <h4 class="alert-heading display-3">FINALIZADO</h4>
            </div> 
        `;
    }
}