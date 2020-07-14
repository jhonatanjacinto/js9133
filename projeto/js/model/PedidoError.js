export default class PedidoError extends Error {
    constructor(mensagem, pedido = null) {
        super(mensagem);
        this.pedido = pedido;
    }

    toString() {
        return this.message;
    }
}