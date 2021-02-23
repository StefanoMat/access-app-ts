# access-app-ts
This repository is created to develop a integration between Pipedrive and Bling! with NodeJS

## Rotas
Documentação swagger e link para a PostmanCollection
```
/docs
```


## Como iniciar?

## Variáveis de ambiente 
configure o arquivo .ENV do root para apontar a porta do servidor Node, chave JWT e servidor do banco

## Crie o banco de dados
Crie uma base PostegreSQL ou utilize a base do .env.example
#Sql files na pasta migrations

## Inicie o servidor
###  Para o back-end
Rode os comando na raiz do projeto
```
npm install
npm start
```

## Testes
Rode os testes
```
npm test
```

## Design Patterns utilizados
### #Factory
### #Dependency Injection
### #Adapter
### #Decorator

##Melhorias para realizar
Implementar caching, ampliar cobertura de testes, testes em pasta única, DTOs
