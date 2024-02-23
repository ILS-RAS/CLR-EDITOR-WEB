import { BaseModel } from './baseModel';

export class EntryModel extends BaseModel {
    public projectId?: string;
    public morphId?: string;
    public parentId?: string;
    public entryObj?:string;
    public constructor(fields: Partial<EntryModel>) {
        super();
        Object.assign(this, fields);
     }
}