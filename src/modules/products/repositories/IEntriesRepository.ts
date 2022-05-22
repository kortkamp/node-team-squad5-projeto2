import { ICreateEntryDTO } from '../dtos/ICreateEntryDTO';
import { IEntry } from '../models/IEntry';

interface IEntriesRepository {
  create(data: ICreateEntryDTO): Promise<IEntry>;
}

export { IEntriesRepository };
