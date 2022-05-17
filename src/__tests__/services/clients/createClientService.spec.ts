// import { AppDataSource } from "../../../data-source";
// import CreateClientService from "../../../services/clients/createClient.service";

// describe('Client Services' , () => {
//   beforeAll(async() => {
//     await AppDataSource.initialize().catch(err => console.log(err))
//   })
//   afterAll(async() => {
//     await AppDataSource.destroy().catch(err => console.log(err))
//   })

//   it('Should be able to create a new client',async () => {
//     const client = {
//       name:'Gorimar',
//       email:'gorimar@mail.com',
//       phone_number:'1234567890122',
//       password:'$hashmaluco',
//       intention:'comprar'
//     }

//     const newClient = await CreateClientService.execute(client)

//     expect(newClient).toHaveProperty('id')
//   })
// })