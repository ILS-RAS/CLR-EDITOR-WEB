import { BaseModel } from './baseModel';

export class InterpModel extends BaseModel {
    sourceId? : string;
    interpId? : string;
    interpHeaderId? : string; 
    sourceHeaderId? : string;
    
    public constructor(fields: Partial<InterpModel>) {
        super();
        Object.assign(this, fields);
     }
}