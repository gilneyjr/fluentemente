# FluenteMente
Para uma mente mais fluente

# Configurações iniciais

## Node modules
Caso queira executar o programa no modo de produção, onde o sistema estará pronto para o uso, execute:

```$ npm install --production```

Assim, não serão instalados os pacotes de desenvolvimento.

Porém, se quiser instalar esses pacotes, basta rodar o seguinte comando: 

```$ npm install```

## Database

Primeiro, crie o banco de dados: 

```$ npm run knex:migrate```

Depois, inicialize os valores padrão: 

```$ npm run knex:seed```

# Execução
Caso queira executar o sistema em modo de produção, execute: 

```$ npm run prod```

Todavia, se for executar o sistema em modo de desenvolvimento, use o seguinte comando:

```$ npm run dev```