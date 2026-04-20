# sussurros-do-futuro-api

This repository is part of the software [sussurros-do-futuro](https://github.com/JoaoVitorRamos7/sussurros-do-futuro/).

# Como subir aplicação API

1. Instalar pacotes de dependências

```bash
npm install
```

>Detalhe: É necessário subir uma instância dos postgress. Abaixo segue um exemplo para subir uma instância do postgress com docker compose

```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    container_name: postgres_container
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

```

ou

```bash
# 1. Crie um volume para persistir os dados do Postgres
docker volume create pg_data

# 2. Suba o container apontando para o volume criado
docker run -d \
  --name meu-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -v pg_data:/var/lib/postgresql \
  -p 5432:5432 \
  postgres:latest

```

2. Criar as tabelas no banco de dados pg client

```bash
npm run database:update
```

3. Iniciar a aplicação

```bash
npm start
```
