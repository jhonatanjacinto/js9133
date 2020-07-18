const http = require('http');
const url = require('url');
const fs = require('fs');

const app = http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    let method = request.method;
    
    const responseConfig = {
        'Content-type' : 'application/json; charset=utf8',
        'Access-Control-Allow-Origin' : '*'
    };

    if (pathname.startsWith('/agenda/api'))
    {
        response.writeHead(200, responseConfig);

        if (pathname === '/agenda/api/lista-contatos') 
        {
            let listaContatos = fs.readFileSync('./db/agenda.json', 'utf8');
            response.end(listaContatos);
        }

        else if (pathname === '/agenda/api/salvar-contatos' && method === 'POST')
        {
            let stringListaProdutos = url.parse(request.url, true).query.lista;
            fs.writeFileSync('./db/agenda.json', stringListaProdutos, 'utf8');
            const resposta = { status: 1, message: 'Contatos cadastrados com sucesso!' };
            response.end(JSON.stringify(resposta));
        }
        
    }
    else 
    {
        response.writeHead(400, responseConfig);
        const data = { status: 0, message: "Bad Request" };
        response.end(JSON.stringify(data));
    }
});

app.listen(8888);
console.log('Servidor da api está rodando na url http://localhost:8888/');