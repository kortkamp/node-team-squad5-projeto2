import 'reflect-metadata';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import { IUser } from '@modules/users/models/IUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  const newUserData = new FakeUser();

  let user: IUser;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUserService = new DeleteUserService(fakeUsersRepository);

    user = await fakeUsersRepository.create(newUserData);
  });

  it('should be able to delete a user', async () => {
    const deletedUser = await deleteUserService.execute({
      userId: user.id,
      authUserId: user.id,
    });

    const totalUsers = await fakeUsersRepository.getTotal();

    expect(totalUsers).toBe(0);
    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete a nonexistent user', async () => {
    await expect(
      deleteUserService.execute({
        authUserId: user.id,
        userId: 'user non-existing',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
