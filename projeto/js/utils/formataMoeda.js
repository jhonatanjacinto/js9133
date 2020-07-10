// formata valores numéricos num padrão de moeda (R$ real brasileiro)
export default function formataMoeda(valor)
{
    // return "R$ " + Number(valor).toFixed(2).replace('.', ',');
    return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}