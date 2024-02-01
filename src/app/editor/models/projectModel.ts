import { BaseModel } from './baseModel';

export class ProjectModel extends BaseModel {
  code?: string;
  desc?: string;
  creatorId?: string;
  created?: string;
  status?: string;
  projectType?: string;

  public constructor(fields: Partial<ProjectModel>) {
    super();
    Object.assign(this, fields);
 }
}
