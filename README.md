# Minions-webapp-orders-api

API REST desenvolvida com o intuito de receber e listar pedidos de uma [loja de minions ficticia](https://github.com/Alex-Jr/minions-webapp-client).

### Requisitos
* [NodeJS](https://nodejs.org/en/)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) com uma conta AWS [configurada](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) 
* [Serverless](https://www.npmjs.com/package/serverless)

### Instalação

``` bash
$ npm install
```

### Testes Locais

É possivel testar cada função individualmente.

``` bash
$ serverless invoke local --function get --path mocks/get-event.json
```

Onde "get" é o nome da função a ser executada e o "get-event.json" é o arquivo com os parâmetros para o teste

### Deploy para AWS

``` bash
$ serverless deploy
```

### Tecnologias Usadas

* Serverless Framework
* Amazon Web Services
  * API Gateway
  * Lambda
  * DynamoDB

### Mais informações

Não é possível deletar, atualizar pedidos já realizados através dessa API, pois ainda não foi desenvolvido um cliente para utilizar essa funcões que no contexto de uma loja seriam administrativas.
