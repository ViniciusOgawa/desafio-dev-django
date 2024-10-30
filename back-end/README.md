# Desafio dev Django

## Pré-requisitos

Antes de começar, você precisa ter os seguintes softwares instalados na sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Python](https://www.python.org/downloads/)

## Configuração do Projeto

1. Após clonar o repositório, copie o arquivo `.env.example` e complete as seguintes variáveis de ambiente com seus dados:

    ```env
    ALLOWED_HOSTS=hosts/domínios
    POSTGRES_DB_NAME=db_api
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=sua_senha_aqui
    POSTGRES_HOST=db
    POSTGRES_PORT=5432
    ```

## Como Rodar o Projeto

1. Certifique-se de que o Docker está rodando na sua máquina.

2. Para iniciar o projeto, execute o seguinte comando na raiz do seu projeto:

    ```bash
    docker-compose up --build
    ```

    Este comando irá:
    - **Construir** o contêiner Docker para o projeto Django.
    - **Iniciar** os serviços `web` (Django) e `db` (PostgreSQL).
    - **Criar as migrações** e aplicar automaticamente ao banco de dados.
    - Rodar o servidor Django no endereço `http://127.0.0.1:8000`.

3. Para parar os containers, use o seguinte comando:

    ```bash
    docker-compose down
    ```

## Como Rodar os Testes com Pytest no Docker

Para garantir que sua aplicação está funcionando corretamente, você pode rodar os testes automatizados usando o **Pytest** dentro do ambiente Docker.

### Rodar Testes Unitários

1. Certifique-se de que os containers estão rodando:

    ```bash
    docker-compose up -d
    ```

    Isso vai iniciar os serviços `web` e `db` em segundo plano.

2. Execute os testes com o comando:

    ```bash
    docker-compose exec web pytest
    ```

    Esse comando irá:
    - Executar os testes definidos no projeto usando o `pytest`.
    - Exibir o resultado dos testes diretamente no terminal.

### Opções adicionais do Pytest

- Para ver mais detalhes sobre os testes (modo verboso), use o seguinte comando:

    ```bash
    docker-compose exec web pytest -v
    ```

- Para rodar apenas um arquivo de teste específico:

    ```bash
    docker-compose exec web pytest caminho/para/seu/teste.py
    ```

## Principais Tecnologias Utilizadas

- **Django**: Framework de desenvolvimento web em Python.
- **Django REST Framework**: Ferramenta poderosa e flexível para criar APIs com Django.
- **PostgreSQL**: Banco de dados relacional robusto e escalável.
- **Docker**: Plataforma para criar, distribuir e rodar containers.
- **Django REST Framework SimpleJWT**: Ferramenta para autenticação via JSON Web Tokens (JWT).
- **pytest**: Ferramenta de testes para Python.

## Especificações das Rotas da API

### Rotas de Autenticação

- **Login**
  - **POST** `/api/login/`
    - Descrição: Autenticação de usuários com credenciais (usuário e senha).
    - Corpo da requisição:
      ```json
      {
        "username": "normaluser",
        "password": "12345"
      }
      ```

### Rotas de Usuários

- **Listar usuários**
  - **GET** `/api/users/`
    - Descrição: Retorna uma lista de todos os usuários.

- **Criar usuário**
  - **POST** `/api/users/`
    - Descrição: Cria um novo usuário.
    - Corpo da requisição:
      ```json
      {
        "username": "normaluser",
        "first_name": "normal",
        "last_name": "user",
        "email": "normaluser@mail.com",
        "date_of_birth": "12/12/2012",
        "password": "12345",
        "is_superuser": false
      }
      ```

- **Atualizar usuário**
  - **PATCH** `/api/users/{id}/`
    - Descrição: Atualiza informações de um usuário.
    - Corpo da requisição:
      ```json
      {
        "username": "normaluser",
        "first_name": "normal",
        "last_name": "user",
        "email": "normaluser@mail.com",
        "date_of_birth": "12/12/2012",
        "password": "12345",
        "is_superuser": false
      }
      ```

- **Deletar usuário**
  - **DELETE** `/api/users/{id}/`
    - Descrição: Remove um usuário específico.

### Rotas de Contatos

- **Listar contatos**
  - **GET** `/api/contacts/`
    - Descrição: Retorna uma lista de todos os contatos.

- **Criar contato**
  - **POST** `/api/contacts/`
    - Descrição: Cria um novo contato.
    - Corpo da requisição:
      ```json
      {
        "phone_number": "(43)99154-3421",
        "city": "São Paulo",
        "state": "São Paulo",
        "street": "Avenida Paulista",
        "number": "123",
        "neighborhood": "Bela Vista",
        "postal_code": "01311-000"
      }
      ```

- **Atualizar contato**
  - **PATCH** `/api/contacts/{id}/`
    - Descrição: Atualiza informações de um contato.

- **Deletar contato**
  - **DELETE** `/api/contacts/{id}/`
    - Descrição: Remove um contato específico.

### Rotas de Experiências

- **Listar experiências**
  - **GET** `/api/experience/`
    - Descrição: Retorna uma lista de todas as experiências.

- **Criar experiência**
  - **POST** `/api/experience/`
    - Descrição: Cria uma nova experiência.
    - Corpo da requisição:
      ```json
      {
        "role": "Software Engineer",
        "company": "Tech Solutions Ltd.",
        "period": "Jan 2020 - Present",
        "description": "Responsible for designing, developing, and maintaining web applications."
      }
      ```

- **Atualizar experiência**
  - **PATCH** `/api/experience/{id}/`
    - Descrição: Atualiza informações de uma experiência.

- **Deletar experiência**
  - **DELETE** `/api/experience/{id}/`
    - Descrição: Remove uma experiência específica.

### Rotas de Educação

- **Listar educação**
  - **GET** `/api/education/`
    - Descrição: Retorna uma lista de todas as informações de educação.

- **Criar educação**
  - **POST** `/api/education/`
    - Descrição: Cria uma nova entrada de educação.
    - Corpo da requisição:
      ```json
      {
        "institution": "Harvard University",
        "course": "Computer Science",
        "ongoing": true,
        "period": "3"
      }
      ```

- **Atualizar educação**
  - **PATCH** `/api/education/{id}/`
    - Descrição: Atualiza informações de uma educação específica.

- **Deletar educação**
  - **DELETE** `/api/education/{id}/`
    - Descrição: Remove uma entrada de educação específica.
