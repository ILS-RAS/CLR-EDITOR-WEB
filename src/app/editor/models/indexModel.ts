
import { BaseModel } from './baseModel';

export class IndexModel extends BaseModel {
    headerId?: string;
    name?: string;
    order?: number;
    parentId?: string;
    
    public constructor(fields: Partial<IndexModel>) {
        super();
        Object.assign(this, fields);
     }
}