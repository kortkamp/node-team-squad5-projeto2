import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();

  const usersRepository = new UsersRepository();

  const admin: ICreateUserDTO = {
    email: 'admin@company.com',
    name: 'Admin',
    segment: 'administration',
    company: 'Default Company',
    CNPJ: '64.182.592/0001-92',
    password: await hash('123456', 8),
  };

  await usersRepository.create(admin);
  await AppDataSource.destroy();
}

create().then(() => console.log('User admin Created!'));
