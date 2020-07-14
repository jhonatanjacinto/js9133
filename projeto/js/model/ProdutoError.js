export default class ProdutoError extends Error {
    constructor(mensagem, produto = null) {
        super(mensagem);
        this.produto = produto;
    }

    toString() {
        return this.message;
    }
}
