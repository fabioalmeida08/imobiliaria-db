import { AppDataSource } from '../../../data-source'
import {
  IAgency,
  IAgencyExtId,
  IAgencyLogin,
  IAgencyToken
} from '../../../interfaces/agency'
import LoginAgencyService from '../../../services/agency/agencyLogin.service'
import CreateAgencyService from '../../../services/agency/createAgency.service'
import ListAllAgencyService from '../../../services/agency/listAllAgency.service'

describe('agency Services', () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) =>
      console.log(err)
    )
  })
  afterAll(async () => {
    await AppDataSource.destroy().catch((err) =>
      console.log(err)
    )
  })
  const agency: IAgency = {
    name: 'Choles',
    email: 'choles@mail.com',
    phone_number: '123456789',
    password: '12345678'
  }

  const login: IAgencyLogin ={
    email: 'choles@mail.com',
    password: '12345678'
  }

  let agencyCreated: IAgencyExtId;

  let token: IAgencyToken;

  it('Should be able to create a new agency', async () => {
    const newagency = await CreateAgencyService.execute(
      agency
    )

    agencyCreated = newagency
    expect(newagency).toHaveProperty('id')
  })

  it('Should return a list of agencys', async () => {
    const allagencys = await ListAllAgencyService.execute()

    expect(allagencys).toHaveLength(1)
  })

  it("Should to login realtor", async () => {
    const logRealtor = await LoginAgencyService.execute(login);

    token = logRealtor
    expect(token).toHaveProperty("accessToken");
  });

  /* it("Should return a client by id", async () => {
    const realtor = await ListOneRealtorService.execute(realtorCreated.id);
    expect(realtor).toBeDefined();
    expect(realtor).toHaveProperty("id");
  }); */
})