# Desafio dev Django

## Pré-requisitos

Antes de começar, você precisa ter os seguintes softwares instalados na sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Python](https://www.python.org/downloads/)

## Configuração do Projeto

1. Clone o repositório para a sua máquina local:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Copie o arquivo `.env.example` e complete as seguintes variáveis de ambiente com seus dados:

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


