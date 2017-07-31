# Domain-Info

## Pré Requisitos

* NodeJS >= 7.6
* Redis

## Instalação

* git clone https://github.com/costamauricio/domain-info.git
* cd domain-info
* npm install
* npm run build-prod

## Executando via Docker

* docker-compose up
* APP disponível em http://localhost:8081

## Executando Local

* Configurar os dados de conexão com o banco no arquivo .env
```
REDIS_HOST=
REDIS_PORT=
```
* npm start
* APP disponível em http://localhost:8081
