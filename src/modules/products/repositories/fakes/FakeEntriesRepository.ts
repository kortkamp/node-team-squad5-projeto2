import { FakeEntry } from '@modules/products/models/fakes/FakeEntry';
import { ICreateEntryDTO } from '../../dtos/ICreateEntryDTO';
import { IEntry } from '../../models/IEntry';
import { IEntriesRepository } from '../IEntriesRepository';

class FakeEntriesRepository implements IEntriesRepository {
  private entries: IEntry[] = [];

  public async create(data: ICreateEntryDTO) {
    const entry = new FakeEntry(data);
    this.entries.push(entry);
    return entry;
  }
}

export { FakeEntriesRepository };
