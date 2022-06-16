import 'reflect-metadata';
import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { CreateSessionService } from '@modules/users/services/CreateSessionService';
import { CreateUserService } from '@modules/users/services/CreateUserService';

let createUserService: CreateUserService;
let createSessionService: CreateSessionService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: IUserTokensRepository;

const userData: ICreateUserDTO = new FakeUser();

describe('CreateSessionService', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create new user', async () => {
    const { user, token } = await createSessionService.execute(userData);

    expect(user).toHaveProperty('id');

    expect(user?.name).toBe(userData.name);
  });

  it('Should not be able to create user if email already in use', async () => {
    await createSessionService.execute(userData);

    await expect(createSessionService.execute(userData)).rejects.toEqual(
      new ErrorsApp('Email already registered', 409),
    );
  });
});
