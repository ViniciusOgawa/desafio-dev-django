# Desafio dev Django - Frontend

## Pré-requisitos

Antes de começar, você precisa ter os seguintes softwares instalados na sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en)

### Dependência da API
Esta aplicação depende da API criada na pasta `back-end`. Certifique-se de que a API está rodando antes de iniciar a aplicação React. Siga as instruções na pasta `back-end` para iniciar a API, geralmente com o comando `docker-compose up` ou conforme documentado.

## Como Rodar o Projeto

1. Certifique-se de que o Docker está rodando na sua máquina.

2. Para iniciar o projeto, execute o seguinte comando na raiz do seu projeto:

    ```bash
    docker build -t react-vite-app .
    ```

3. Rodar o container

    Depois que a imagem for construída, você pode rodar o container com o comando:

     ```bash
     docker run -p 3000:3000 react-vite-app
     ```

4. Acessar a aplicação
   
    Agora, abra o navegador e acesse:

    `http://localhost:3000`

5. Para parar os containers, use os seguintes comando:

    - **Listar os containers em execução**: Se você não souber o `CONTAINER ID`, pode listar todos os containers em execução com o seguinte comando:

      ```bash
      docker ps
      ```

    - **Parar o container**: Uma vez que você tenha o `CONTAINER ID`, use o seguinte comando para parar o container:

      ```bash
      docker stop <CONTAINER ID>
      ```

## Principais Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router DOM**: Utilizado para o gerenciamento de rotas no React.
- **React Hook Form**: Biblioteca para gerenciamento de formulários no React.
- **React Toastify**: Biblioteca para exibir notificações toast no React.
- **Chakra UI**: Biblioteca de componentes para estilização e construção de interfaces acessíveis.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Vite**: Ferramenta de build e desenvolvimento rápido para projetos frontend.
- **Docker**: Plataforma para criar, distribuir e rodar containers.
  
## Links Úteis

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do Docker](https://docs.docker.com/get-started/)
