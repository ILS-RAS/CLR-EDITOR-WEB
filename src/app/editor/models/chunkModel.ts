import { BaseModel } from './baseModel';

export class ChunkModel extends BaseModel {
  value?: string;
  valueObj?: string;
  indexId?: string;
  headerId?: string;
  status?: string;
  updated?: string;
  created?: string;
  public constructor(fields: Partial<ChunkModel>) {
    super();
    Object.assign(this, fields);
  }
}
