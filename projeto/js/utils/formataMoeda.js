// formata valores numéricos num padrão de moeda (R$ real brasileiro)
function formataMoeda(valor)
{
    // return "R$ " + Number(valor).toFixed(2).replace('.', ',');
    return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}