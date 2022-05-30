import { ICreateEntryDTO } from '../../dtos/ICreateEntryDTO';
import { IEntry } from '../../models/IEntry';
import { IEntriesRepository } from '../IEntriesRepository';

class FakeEntriesRepository implements IEntriesRepository {
  public async create(data: ICreateEntryDTO) {
    return null; // Fix this.
  }
}

export { FakeEntriesRepository };
