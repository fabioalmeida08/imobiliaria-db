<h1  align="center">API - Imobiliaria-DB</h1>

<h2 align="center">Introdução</h2>
   
   Essa aplicação é com intuito educativo, uma forma de efetiva o conhecimento adiquirido, na estapa do modulo 4 na Kenzie Academy Brasil. Projeto modulado para       desenvolver o Back-end de uma corretora de imóveis, visando implementar as ferramentas normalmente utilizadas e acrescentar um espaço de coleção de dados do cliente.
   Existem diversos aplicativos de imobiliárias com bom funcionamento, mas sempre há problemas por falta de uma interface mais amigável que possa melhorar as relações entre imobiliária, corretores e cliente.
   Por isso, o objetivo deste projeto é disponibilizar uma API segura e assertiva que melhore a administração de imobiliárias.
    
##

<h2 align="center"> Desenvolvido com:</h2>
<div align="center" style="display: inline_block">
  <img align="center" alt="Typescript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Node" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="postgresql" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg">
  <img align="center" alt="docker" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original-wordmark.svg">
  <img align="center" alt="firebase" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" />
 </div>
 
   ##

<div align="center" style="display: inline_block" height="100">Desenvolvedores:</div>
      <div align="center">
      <h6> Christian Brandolini Chequetto Resende - DEV</h6>
      <h6>Daniele Calixto Barros - DEV</h6>
      <h6>Fábio Almeida - TL</h6>
      <h6>Guilherme Lopreti Silva - PO</h6>
      <h6>Igo Santana de Lima - SM</h6>
      <h6>João Henrique Pereira Neto - DEV</h6></div>
</div>

<div align="center" style="display: inline_block">
 <h2  align="center">Rotas</h2>
</div>

<div align="center" style="display: inline_block"> 
<h3>Agency</h3>

Rota pela imobiliaria, nela poderá atualizar, ler a lista de clientes, ler a listas de corretores, atribuir os corretores aos clientes. ADM

`POST /agency - Criar Agencia - FORMATO DA REQUISIÇÃO - STATUS 201`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "password": "asd132"
> }
> ```

`POST /agency - Criar Agencia - FORMATO DA RESPOSTA - STATUS 200`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d",
>   "createdAt": "2022-05-25T23:30:44.844Z",
>	 "updatedAt": "2022-05-25T23:31:31.243Z",
> }
> ```

`POST /agency/login - acessar conta - FORMATO DA REQUISIÇÃO - STATUS 200`

> ```json
> {
>   "email": "example@gmail.com",
>   "password": "asd132"
> }
> ```

`POST /agency/login - acessar conta - FORMATO DA RESPOSTA - STATUS 200`

> ```json
> {
>   "accessToken": "d14w56q1w56q1dq7-wqd4d4s1adsa-dwq4dqw44w4dqqw4dqw54",
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

`GET /agency - visualizar Agencia - FORMATO DA REPOSTA - STATUS 200`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

`PATCH /agency/:id - update Agencia - FORMATO DA REQUISIÇÃO - STATUS 200`

> ```json
> {
>   "name": "Gil",
> }
> ```

`PATCH /agency/:id - update Agencia - FORMATO DA REPOSTA - STATUS 200`

> ```json
> {
>   "name": "Gil",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

</div>
<div align="center" style="display: inline_block">

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
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

`POST /realtor/login - acessar conta - FORMATO DA REQUISIÇÃO - STATUS 200`

> ```json
> {
>   "email": "example@gmail.com",
>   "password": "asd132"
> }
> ```

`POST /realtor/login - acessar conta - FORMATO DA RESPOSTA - STATUS 200`

> ```json
> {
>   "accessToken": "d14w56q1w56q1dq7-wqd4d4s1adsa-dwq4dqw44w4dqqw4dqw54"
> }
> ```

`GET /realtor/:id - visualizar corretor - FORMATO DA REPOSTA - STATUS 200`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348,
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

`PATCH /realtor/:id - atualizar corretor - FORMATO DA REQUISIÇÃO - STATUS 202`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348
> }
> ```

`DELETE /realtor/:id - deletar corretor - FORMATO DA REQUISIÇÂO - STATUS 202`

</div>
<div align="center" style="display: inline_block">

<h3>Client</h3>

`POST /clients - Criar um Client - FORMATO DA REQUISIÇÃO`

> ```json
> {
>   "name": "John",
>   "email": "example@gmail.com",
>   "phone_number": 125463348
> }
> ```

`POST /clients - Criar Client - FORMATO DA RESPOSTA - STATUS 201`

> ```json
> {
>   "name": "Ivan Ilitch",
>   "email": "ivan@mail.com",
>   "phone_number": "1234578901",
>   "intention": "comprar"
> }
> ```

`GET /clients/:id - visulalisar o Client pelo id - FORMATO DA REPOSTA - STATUS 200`

> ```json
> {
>   "id": "38aaa48e-24da-45f4-a9a6-2aa7ceb84546",
>   "name": "Ivan Ilitch",
>   "phone_number": "1234578901",
>   "email": "ivan@mail.com",
>   "intention": "comprar",
>   "createdAt": "2022-05-23T13:00:48.780Z",
>   "updatedAt": "2022-05-23T13:00:48.780Z",
>   "properties": [],
>   "buyers": []
> }
> ```

`GET /clients - retorna uma lista com os clients cadastrados - FORMATO DA REPOSTA - STATUS 200`

> ```json
> [
>   {
>     "id": "daa2282f-a5b2-4ffc-bb47-2d7ebb440413",
>     "name": "jhonny",
>     "phone_number": "1234578901",
>     "email": "jhonny@mail.com",
>     "intention": "comprar",
>     "createdAt": "2022-05-19T21:39:19.681Z",
>     "updatedAt": "2022-05-19T21:39:19.681Z",
>     "properties": [],
>     "buyers": []
>   },
>   {
>     "id": "9dd23373-84b4-4e96-ae30-dd29020189b2",
>     "name": "Ivan Ilitch",
>     "phone_number": "1234578901",
>     "email": "ivan@mail.com",
>     "intention": "comprar",
>     "createdAt": "2022-05-23T13:00:48.780Z",
>     "updatedAt": "2022-05-23T13:00:48.780Z",
>     "properties": [],
>     "buyers": []
>   }
> ]
> ```

`PATCH /clients/:id - Edita qualquer campo do Client pelo id - FORMATO DA REQUESIÇÃO`

> ```json
> {
>   "name": "Dostoiévski",
>   "intention": "comprar"
> }
> ```
>
> `PATCH /clients/:id - Edita qualquer campo do Client pelo id - FORMATO DA RESPOSTA - STATUS 200`

> ```json
> {
>   "id": "38aaa48e-24da-45f4-a9a6-2aa7ceb84546",
>   "name": "Dostoiévski",
>   "phone_number": "1234578901",
>   "email": "ivan@mail.com",
>   "intention": "vender",
>   "createdAt": "2022-05-23T13:53:38.510Z",
>   "updatedAt": "2022-05-23T13:56:48.932Z",
>   "properties": [],
>   "buyers": []
> }
> ```

</div>
<div align="center" style="display: inline_block">

<h3>Properties</h3>

Rota para a criação, listagem, atualização e deleção de propriedades.

`POST /properties - Criar propriedade - FORMATO DA REQUISIÇÃO CASO IMOBILIÁRIA`

<h4>Necessário token de autorização</h4>

> ```json
> {
>   "street": "Rua Exemplo",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "postal_code": "00011122",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "type": "Apartamento",
>   "acquisition_type": "Venda",
>   "price": 420000,
>   "description": "Apartamento novo, em otima localidade!",
>   "id_client": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee",
>   "id_realtor": "cc947d60-e04a-4a22-ab27-9df8f32f92e7"
> }
> ```

`POST /properties - Criar propriedade - FORMATO DA REQUISIÇÃO CASO CORRETOR`

<h4>Necessário token de autorização</h4>

> ```json
> {
>   "street": "Rua Exemplo",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "postal_code": "00011122",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "type": "Apartamento",
>   "acquisition_type": "Venda",
>   "price": 420000,
>   "description": "Apartamento novo, em otima localidade!",
>   "id_client": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee"
> }
> ```

`POST /properties - Criar propriedade - FORMATO DA RESPOSTA - STATUS 201`

> ```json
> {
>   "street": "Rua Exemplo",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "postal_code": "00011122",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "type": "Apartamento",
>   "acquisition_type": "Venda",
>   "price": 420000,
>   "description": "Apartamento novo, em otima localidade!",
>   "client_seller": {
>     "id": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee",
>     "name": "Carlos Santos"
>   },
>   "realtor_creator": {
>     "id": "cc947d60-e04a-4a22-ab27-9df8f32f92e7",
>     "name": "Andrey Silva"
>   },
>   "bathroom_number": null,
>   "bedroom_number": null,
>   "parking_spaces": null,
>   "elevator": null,
>   "party_hall": false,
>   "party_area": false,
>   "grill": false,
>   "swimming_pool": false,
>   "gym": false,
>   "playground": false,
>   "sports_court": false,
>   "id": "841f59d0-d39a-4fe7-8191-ffbb50538647",
>   "availability": true,
>   "createdAt": "2022-05-20T16:25:57.537Z",
>   "updatedAt": "2022-05-20T16:25:57.537Z"
> }
> ```

`GET /properties - listar propriedades - FORMATO DA RESPOSTA COM AUTORIZAÇÃO - STATUS 200`

<h4>É possivel utilizar querys na requisição para filtragem</h4>

<h5>Querys especiais</h5>

> ```json
> {
>   "price_menor": "Busca por preços iguais ou menores que o indicado",
>   "price_maior": "Busca por preços iguais ou maiores que o indicado",
>   "area_menor": "Busca por areas iguais ou menores que o indicado",
>   "area_maior": "Busca por areas iguais ou maiores que o indicado",
>   "bathroom_menor": "Busca por quantidade de banheiros iguais ou menores que o indicado",
>   "bathroom_maior": "Busca por quantidade de banheiros iguais ou maiores que o indicado",
>   "bedroom_menor": "Busca por quantidade de quartos iguais ou menores que o indicado",
>   "bedroom_maior": "Busca por quantidade de quartos iguais ou maiores que o indicado",
>   "parking_spaces_menor": "Busca por quantidade de vagas de estacionamento iguais ou menores que o indicado",
>   "parking_spaces_maior": "Busca por quantidade de vagas de estacionamento iguais ou maiores que o indicado",
>   "elevator_menor": "Busca por quantidade de elevadores iguais ou menores que o indicado",
>   "elevator_maior": "Busca por quantidade de elevadores iguais ou maiores que o indicado"
> }
> ```

> ```json
> [
>   {
>     "id": "841f59d0-d39a-4fe7-8191-ffbb50538647",
>     "type": "Apartamento",
>     "street": "Rua Exemplo",
>     "city": "Cidade Exemplo",
>     "state": "Estado Exemplo",
>     "postal_code": "00011122",
>     "country": "País Exemplo",
>     "area": 75,
>     "complement": "Andar 2, numero 5",
>     "availability": true,
>     "acquisition_type": "Venda",
>     "price": "420000.00",
>     "bathroom_number": null,
>     "bedroom_number": null,
>     "parking_spaces": null,
>     "elevator": null,
>     "party_hall": false,
>     "party_area": false,
>     "grill": false,
>     "swimming_pool": false,
>     "gym": false,
>     "playground": false,
>     "sports_court": false,
>     "description": "Apartamento novo, em otima localidade!",
>     "createdAt": "2022-05-20T16:25:57.537Z",
>     "updatedAt": "2022-05-20T16:25:57.537Z",
>     "image": [],
>     "client_seller": {
>       "id": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee",
>       "name": "Carlos Santos"
>     },
>     "realtor_creator": {
>       "id": "cc947d60-e04a-4a22-ab27-9df8f32f92e7",
>       "name": "Andrey Silva"
>     }
>   }
> ]
> ```

`GET /properties - listar propriedades - FORMATO DA RESPOSTA SEM AUTORIZAÇÃO - STATUS 200`

> ```json
> [
>   {
>     "type": "Apartamento",
>     "city": "Cidade Exemplo",
>     "state": "Estado Exemplo",
>     "country": "País Exemplo",
>     "area": 75,
>     "complement": "Andar 2, numero 5",
>     "acquisition_type": "Venda",
>     "price": "420000.00",
>     "bathroom_number": null,
>     "bedroom_number": null,
>     "parking_spaces": null,
>     "elevator": null,
>     "party_hall": false,
>     "party_area": false,
>     "grill": false,
>     "swimming_pool": false,
>     "gym": false,
>     "playground": false,
>     "sports_court": false,
>     "description": "Apartamento novo, em otima localidade!",
>     "image": []
>   }
> ]
> ```

`GET /properties/:id_property - visualizar propiedade - FORMATO DA REPOSTA COM AUTORIZAÇÂO- STATUS 200`

> ```json
> {
>   "id": "841f59d0-d39a-4fe7-8191-ffbb50538647",
>   "type": "Apartamento",
>   "street": "Rua Exemplo",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "postal_code": "00011122",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "availability": true,
>   "acquisition_type": "Venda",
>   "price": "420000.00",
>   "bathroom_number": null,
>   "bedroom_number": null,
>   "parking_spaces": null,
>   "elevator": null,
>   "party_hall": false,
>   "party_area": false,
>   "grill": false,
>   "swimming_pool": false,
>   "gym": false,
>   "playground": false,
>   "sports_court": false,
>   "description": "Apartamento novo, em otima localidade!",
>   "createdAt": "2022-05-20T16:25:57.537Z",
>   "updatedAt": "2022-05-20T16:25:57.537Z",
>   "image": [],
>   "client_seller": {
>     "id": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee",
>     "name": "Carlos Santos"
>   },
>   "realtor_creator": {
>     "id": "cc947d60-e04a-4a22-ab27-9df8f32f92e7",
>     "name": "Andrey Silva"
>   }
> }
> ```

`GET /properties/:id_property - visualizar propiedade - FORMATO DA REPOSTA SEM AUTORIZAÇÂO- STATUS 200`

> ```json
> {
>   "type": "Apartamento",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "acquisition_type": "Venda",
>   "price": "420000.00",
>   "bathroom_number": null,
>   "bedroom_number": null,
>   "parking_spaces": null,
>   "elevator": null,
>   "party_hall": false,
>   "party_area": false,
>   "gtill": false,
>   "swimming_pool": false,
>   "gym": false,
>   "playground": false,
>   "sports_court": false,
>   "description": "Apartamento novo, em otima localidade!",
>   "image": []
> }
> ```

`PATCH /properties/:id_property - atualiza propiedade - FORMATO DA REQUISIÇÃO`

<h4>Necessário token de autorização da imobiliária ou corretor responsavel</h4>

> ```json
> {
>   "bathroom_number": 2,
>   "bedroom_number": 2,
>   "parking_spaces": 2,
>   "elevator": 2,
>   "party_hall": true,
>   "swimming_pool": true
> }
> ```

`PATCH /properties/:id_property - atualiza propiedade - FORMATO DA REPOSTA- STATUS 200`

> ```json
> {
>   "id": "841f59d0-d39a-4fe7-8191-ffbb50538647",
>   "type": "Apartamento",
>   "street": "Rua Exemplo",
>   "city": "Cidade Exemplo",
>   "state": "Estado Exemplo",
>   "postal_code": "00011122",
>   "country": "País Exemplo",
>   "area": 75,
>   "complement": "Andar 2, numero 5",
>   "availability": true,
>   "acquisition_type": "Venda",
>   "price": "420000.00",
>   "bathroom_number": 2,
>   "bedroom_number": 2,
>   "parking_spaces": 2,
>   "elevator": 2,
>   "party_hall": true,
>   "party_area": false,
>   "grill": false,
>   "swimming_pool": true,
>   "gym": false,
>   "playground": false,
>   "sports_court": false,
>   "description": "Apartamento novo, em otima localidade!",
>   "createdAt": "2022-05-20T16:25:57.537Z",
>   "updatedAt": "2022-05-25T04:34:22.672Z",
>   "image": [],
>   "client_seller": {
>     "id": "9fa879ba-19e2-4ac8-bfa8-2b1f8e6cc5ee",
>     "name": "Carlos Santos"
>   },
>   "realtor_creator": {
>     "id": "cc947d60-e04a-4a22-ab27-9df8f32f92e7",
>     "name": "Andrey Silva"
>   }
> }
> ```

`DELETE /properties/:id_property - deleta propiedade - REPOSTA STATUS 204`

<h4>Necessário token de autorização da imobiliária</h4>

</div>
<div align="center" style="display: inline_block">

<h3>Sales</h3>

</div>
