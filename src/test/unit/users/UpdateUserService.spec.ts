import 'reflect-metadata';

import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import { IUser } from '@modules/users/models/IUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

const userData = new FakeUser();
const anotherUserData = new FakeUser();
const adminData = new FakeUser();

let user: IUser;
let anotherUser: IUser;
let admin: IUser;

describe('UpdateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);

    const userHashPassword = await fakeHashProvider.create(
      userData.password,
      8,
    );
    const anotherUserHashPassword = await fakeHashProvider.create(
      anotherUserData.password,
      8,
    );

    user = await fakeUsersRepository.create({
      ...userData,
      password: userHashPassword,
    });
    anotherUser = await fakeUsersRepository.create({
      ...anotherUserData,
      password: anotherUserHashPassword,
    });
  });

  it('should be able to update the profile', async () => {
    const updatedUser = await updateUser.execute({
      authUserId: user.id,
      userId: user.id,
      data: {
        email: 'updated_email@example.com',
      },
    });

    expect(updatedUser.email).toBe('updated_email@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateUser.execute({
        authUserId: user.id,
        userId: 'non-existing-user-id',
        data: {
          email: 'johntre@example.com',
        },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  /* it('should not be able to change another user data', async () => {
    await expect(
      updateUser.execute({
        authUserId: user.id,
        userId: anotherUser.id,
        data: {
          email: 'hahaha@example.com',
        },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  }); */

  it('should be able to update the password', async () => {
    const newPassword = '999999';
    const updatedUser = await updateUser.execute({
      authUserId: user.id,
      userId: user.id,
      data: {
        password: newPassword,
        old_password: userData.password,
      },
    });
    const match = await fakeHashProvider.verify(
      newPassword,
      updatedUser.password,
    );
    expect(match).toBe(true);
  });

  it('should not be able to update the password without old password', async () => {
    const newPassword = '999999';
    await expect(
      updateUser.execute({
        authUserId: user.id,
        userId: user.id,
        data: {
          password: newPassword,
        },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const newPassword = '999999';
    await expect(
      updateUser.execute({
        authUserId: user.id,
        userId: user.id,
        data: {
          password: newPassword,
          old_password: 'wrong_password',
        },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
