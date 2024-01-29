import { BaseModel } from './baseModel';

export class TaxonomyModel extends BaseModel {
  code?: string;
  desc?: string;
  parentId?: string;

  public constructor(fields: Partial<TaxonomyModel>) {
    super();
    Object.assign(this, fields);
 }
}
