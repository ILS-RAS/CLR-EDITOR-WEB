import { BaseModel } from './baseModel';

export class HeaderModel extends BaseModel {
  code?: string;
  desc?: string;
  lang?: string;
  editionType?: string;
  projectId?: string;
  status?: string;

  public constructor(fields: Partial<HeaderModel>) {
    super();
    Object.assign(this, fields);
 }
}