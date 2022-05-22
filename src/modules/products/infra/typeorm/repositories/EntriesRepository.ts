import { ICreateEntryDTO } from '@modules/products/dtos/ICreateEntryDTO';
import { IEntriesRepository } from '@modules/products/repositories/IEntriesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/';

import { Entry } from '../models/Entry';

class EntriesRepository implements IEntriesRepository {
  private ormRepository: Repository<Entry>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Entry>(Entry);
  }

  public async create(data: ICreateEntryDTO): Promise<Entry> {
    const entry = this.ormRepository.create(data);

    await this.ormRepository.save(entry);

    return entry;
  }
}

export { EntriesRepository };
