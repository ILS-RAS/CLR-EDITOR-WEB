import { BaseModel } from "./baseModel";

export class ElementModel extends BaseModel{
    
    chunkId?: string;
    value?:string;
    type?:string;
    order?:string;
    morphId?:string;
    headerId?:string;

    public constructor(fields: Partial<ElementModel>) {
      super();
      Object.assign(this, fields);
    }
}