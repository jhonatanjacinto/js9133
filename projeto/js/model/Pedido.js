export default function Pedido()
{
    this.id = 0; // gerar um ID de forma automática
    this.nomeCompleto = null;
    this.email = null;
    this.telefone = null;
    this.cep = null;
    this.endereco = null;
    this.bairro = null;
    this.cidade = null;
    this.estado = null;
    this.numero = 0;
    this.complemento = null;
    this.observacoes = null;
    this.status = 1; // 1 = EM ANDAMENTO | 2 = FINALIZADO
    this.produtos = []; // Lista de Produtos adicionados ao Pedido
}