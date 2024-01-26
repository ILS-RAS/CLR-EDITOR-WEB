
import { BaseModel } from './baseModel';

export class IndexModel extends BaseModel {
    public headerId?: string;
    public name?: string;
    public order: number = 0;
    public parentId?: string;
    public bookmarked: boolean = false;
    
    public constructor(fields: Partial<IndexModel>) {
        super();
        Object.assign(this, fields);
     }
}