

## Available Scripts

In the project directory,you will need two command windows, you can run:

### `npm run start:backend`
put the way of directory to: clientes_lista/backend
You need to start the database first to use the project

### `npm start`
directory: clientes_lista

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

1.0.3
Arquivo CustomerCatalog.js:
Adicionamos um interceptor global do Axios para incluir o token JWT no cabeçalho Authorization em todas as requisições.
Arquivo server.js:
Ajustamos o middleware authenticateToken para verificar corretamente o cabeçalho Authorization e o token JWT