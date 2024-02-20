import { BaseModel } from './baseModel';

export class DictionaryIndexModel extends BaseModel {
    projectId?: string;
    morphId?: string;
    parentId?: string;
    
    public constructor(fields: Partial<DictionaryIndexModel>) {
        super();
        Object.assign(this, fields);
     }
}