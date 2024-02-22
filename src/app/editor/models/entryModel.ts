import { BaseModel } from './baseModel';

export class EntryModel extends BaseModel {
    projectId?: string;
    morphId?: string;
    parentId?: string;
    entyObj?:string;
    public constructor(fields: Partial<EntryModel>) {
        super();
        Object.assign(this, fields);
     }
}