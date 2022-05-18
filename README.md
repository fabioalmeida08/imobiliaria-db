<h1  align="center">API - Imobiliaria-DB</h1>

<h2 align="center">Introdução</h2>
   
   Essa aplicação é com intuito educativo, uma forma de efetiva o conhecimento adiquirido, na estapa do modulo 4 na Kenzie Academy Brasil. Projeto modulado para       desenvolver o Back-end de uma corretora de imóveis, visando implementar as ferramentas normalmente utilizadas e acrescentar um espaço de coleção de dados do cliente.
   Existem diversos aplicativos de imobiliárias com bom funcionamento, mas sempre há problemas por falta de uma interface mais amigável que possa melhorar as relações entre imobiliária, corretores e cliente.
   Por isso, o objetivo deste projeto é disponibilizar uma API segura e assertiva que melhore a administração de imobiliárias.
    
## 

 <h2  align="center">Rotas</h2>
 
<h3>Agency</h3>

  Rota pela imobiliaria, nela poderá atualizar, ler a lista de clientes, ler a listas de corretores, atribuir os corretores aos clientes. ADM
 
<h3>Realtor</h3>
 Rota para o corretor, nela poderá, ler a lista de seus clientes, ler a lista de vendas efetivadas por ele.
 
 `POST /realtor - Criar corretor - FORMATO DA REQUISIÇÃO - STATUS 201`
> ```json
>  {
>    "name": "John",
>    "email": "example@gmail.com",
>    "phone_number": 125463348,
>    "password" : "asd132"
>  }
> ```

`POST /realtor - Criar corretor - FORMATO DA RESPOSTA - STATUS 200`
> ```json
>  {
>    "name": "John",
>    "email": "example@gmail.com",
>    "phone_number": 125463348,
>    "id" : "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
>  }
> ```

 `POST /realtor/login - acessar conta - FORMATO DA REQUISIÇÃO - STATUS 200`
> ```json
>  {
>    "email": "example@gmail.com",
>    "password" : "asd132"
>  }
> ```

 `POST /realtor/login - acessar conta - FORMATO DA RESPOSTA - STATUS 200`
> ```json
>  {
>    "accessToken": "d14w56q1w56q1dq7-wqd4d4s1adsa-dwq4dqw44w4dqqw4dqw54",
>    "password" : "asd132"
>  }
> ```


 `GET /realtor/:id - visualizar corretor - FORMATO DA REPOSTA - STATUS 200`
> ```json
>  {
>    "name": "John",
>    "email": "example@gmail.com",
>    "phone_number": 125463348,
>    "id" : "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
>  }
> ```

..... em progresso ....


---
<h3>Client</h3>

 ---
<h3>Property</h3>

 ---

<h3>Sales</h3>

 ---

<h2 align="center"> Desenvolvido com:</h2>
<div align="center" style="display: inline_block">
  <img align="center" alt="Typescript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Node" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="postgresql" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg">
  <img align="center" alt="docker" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original-wordmark.svg">
 </div>
 
   -------

<div align="center" style="display: inline_block" height="100">Desenvolvedores:</div>
      <div align="center">
      <h6> Christian Brandolini Chequetto Resende - DEV</h6>
      <h6>Daniele Calixto Barros - DEV</h6>
      <h6>Fábio Almeida - TL</h6>
      <h6>Guilherme Lopreti Silva - PO</h6>
      <h6>Igo Santana de Lima - SM</h6>
      <h6>João Henrique Pereira Neto - DEV</h6></div>
</div>
   
