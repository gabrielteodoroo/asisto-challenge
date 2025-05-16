# API Asisto

Essa API foi desenvolvida como parte de um desafio para uma vaga de desenvolvedor. Ela implementa um CRUD básico.

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- **Node.js**: Versão 18.x ou superior [Node.js Download](https://nodejs.org/)
- **npm**: Gerenciador de pacotes padrão do Node.js
- **Docker**: Para rodar o banco de dados em containers [Docker Download](https://www.docker.com/)


## Tecnologias Utilizadas

As principais tecnologias utilizadas para o desenvolvimento desta API são:

- **Node.js**: Runtime JavaScript
- **NestJS**: Framework de desenvolvimento de APIs
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática
- **Prisma**: ORM (Object-Relational Mapping)
- **PostgreSQL**: Banco de dados relacional (rodando em um container Docker)
- **Docker**: Containerização do banco de dados

## Instalação

1. Clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/gabrielteodoroo/asisto-challenge
   ```
2. Acesse o diretório do projeto:

   ```bash
   cd asisto-challenge
   ```
3. Instale as dependências:

   ```bash
   npm install 
   ```
4. Suba o container do banco de dados PostgreSQL com Docker:

      ```bash
      docker-compose up -d
      ```

5. Renomeie o arquivo `.env-example` para `.env`

6. Configure o banco de dados executando as migrações:

    ```base
    npx prisma migrate dev
    ```

7. Execute as seeds do projeto:

    ```base
    npm run seeds
    ```
## Como Usar

### Executando o servidor de desenvolvimento

Para iniciar a API em modo de desenvolvimento, utilize o comando:

   ```bash
   npm run start:dev
   ```

O servidor será iniciado em http://localhost:3000.

### Rotas disponíveis

#### User

+ **POST** /login: Autentica um usuário e retorna um token JWT.
+ **GET** /user: Retorna a lista de usuários.
+ **POST** /user: Cria um novo usuário.
+ **GET** /user/:id: Retorna os dados de um usuário específico.
+ **PUT** /user/:id: Atualiza as informações de um usuário específico.

#### Customer

+ **POST** /customer: Cria um cliente para o usuário logado.
+ **GET** /customer: Retorna a lista de clientes do usuário logado.
+ **GET** /customer/:id: Retorna os dados de um cliente específico.
+ **PUT** /customer/:id: Atualiza as informações de um cliente específico.

#### Product

+ **POST** /product/:id: Cria um produto para um cliente específico.
+ **GET** /product/:id: Retorna a lista de produtos de um cliente específico.

## Contribuindo

1. Faça fork do projeto
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas mudanças: `git commit -m 'Minha nova feature'`.
4. Envie para a branch principal: `git push origin minha-feature`.
5. Abra um Pull Request.
