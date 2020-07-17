import http from 'http';
import url from 'url';

const app = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-type' : 'text/html; charset=utf8'
    });

    let caminhoUrl = url.parse(request.url).pathname;
    let htmlResposta = '';

    if (caminhoUrl === '/') 
    {
        htmlResposta = `
            <h1>Tabuada</h1>
            <form method="GET" action="/resultado">
                Número: <br>
                <input type="number" name="numero" min="1" max="50" value="" />
                <button type="submit">
                    Ver resultados
                </button>
            </form>
        `;

    }
    else if (caminhoUrl === '/resultado')
    {
        let numero = url.parse(request.url, true).query.numero;
        let resultados = '';

        for (let m = 1; m <= 10; m++)
        {
            resultados += `${numero} x ${m} = ${m * numero} <br>`;
        }

        htmlResposta = `
            <h1>Resultados da Tabuada</h1>
            <a href="/">Voltar</a> <br><br>
            ${resultados}
        `;
    }
    else
    {
        htmlResposta = `<h1>Página inválida</h1>`;
    }   

    response.end(htmlResposta);
});

app.listen(8888);
console.log('Servidor node rodando na url http://localhost:8888/');
