import { BaseModel } from './baseModel';

export class ProjectModel extends BaseModel {
  code?: string;
  desc: string | undefined;
  creatorId: string | undefined;
  created: string | undefined;
  status: string | undefined;

  public constructor(fields: Partial<ProjectModel>) {
    super();
    Object.assign(this, fields);
 }
}
