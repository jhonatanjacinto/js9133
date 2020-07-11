export default function Produto(nome = '', foto = '', preco = 0, quantidade = 1, id = 1)
{
    this.id = id;
    this.nome = nome;
    this.foto = foto;
    this.preco = preco;
    this.quantidade = quantidade;
}