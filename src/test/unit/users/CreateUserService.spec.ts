import 'reflect-metadata';
import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { CreateUserService } from '@modules/users/services/CreateUserService';

let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: IUserTokensRepository;

const userData: ICreateUserDTO = new FakeUser();

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create new user', async () => {
    const spyCreateUserToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const newUser = await createUserService.execute(userData);

    expect(newUser).toHaveProperty('id');

    expect(newUser?.name).toBe(userData.name);
  });

  it('Should not be able to create user if email already in use', async () => {
    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new ErrorsApp('Email already registered', 409),
    );
  });
});
