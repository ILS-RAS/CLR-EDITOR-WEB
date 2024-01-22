import { BaseModel } from './baseModel';

export class TaxonomyModel extends BaseModel {
  code: string | undefined;
  desc: string | undefined;
  parentId: string | undefined;
}
