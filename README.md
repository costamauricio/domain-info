# Domain-Info

## Pré Requisitos

* NodeJS >= 7.6
* Redis

## Instalação

* git clone https://github.com/costamauricio/domain-info.git
* cd domain-info
* npm install

## Executando via Docker

* docker-compose up
* APP disponível em http://localhost:8081

## Executando Local

* Criar arquivo .env na raiz do repositório e configurar os dados de conexão
```
NODE_PORT=8081

# caso seja informada a url de conexão não é necessário informar o host e porta
# [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
REDIS_URL=

REDIS_HOST=
REDIS_PORT=
```
* npm start
* APP disponível em http://localhost:8081
