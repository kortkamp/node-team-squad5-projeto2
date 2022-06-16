import 'reflect-metadata';

import { parseQueryFilters } from 'typeorm-dynamic-filters';
import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import { ListUsersService } from '@modules/users/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const user1 = await fakeUsersRepository.create(new FakeUser());

    const user2 = await fakeUsersRepository.create(new FakeUser());

    const { result } = await listUsers.execute(parseQueryFilters({}));

    expect(result).toEqual([user1, user2]);
  });
});
