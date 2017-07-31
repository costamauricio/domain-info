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

* Criar arquivo .env na raiz do repositório e configurar os dados de conexão
```
NODE_PORT=8081

REDIS_HOST=
REDIS_PORT=
```
* npm start
* APP disponível em http://localhost:8081
