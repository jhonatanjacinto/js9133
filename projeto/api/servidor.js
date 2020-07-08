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

    if (pathname.startsWith('/api'))
    {
        response.writeHead(200, responseConfig);

        if (pathname === '/api/lista-produtos') 
        {
            let listaDeProdutosJson = fs.readFileSync('./db/produtos.json', 'utf8');
            response.end(listaDeProdutosJson);
        }

        else if (pathname === '/api/lista-pedidos') 
        {
            let listaDePedidosJson = fs.readFileSync('./db/pedidos.json', 'utf8');
            response.end(listaDePedidosJson);
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