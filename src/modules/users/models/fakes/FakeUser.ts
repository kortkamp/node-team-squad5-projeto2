import { faker } from '@faker-js/faker';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../IUser';

class FakeUser implements IUser {
  id: string;
  name: string;
  segment: string;
  company: string;
  CNPJ: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(data?: Partial<ICreateUserDTO>) {
    this.id = faker.datatype.uuid();
    this.name = faker.name.findName('Thomas');
    this.segment = faker.company.bs();
    this.company = faker.company.companyName();
    this.CNPJ = '61077440000131';
    this.email = faker.internet.exampleEmail();
    this.password = faker.internet.password(20);
    this.created_at = new Date();
    this.updated_at = new Date();

    Object.assign(this, data);
  }
}

export { FakeUser };
