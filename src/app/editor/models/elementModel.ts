import { BaseModel } from "./baseModel";

export class ElementModel extends BaseModel{
    
    chunkId?: string;
    value?:string;
    type?:number;
    order?:number;
    morphId?:string|null;
    headerId?:string;

    public constructor(fields: Partial<ElementModel>) {
      super();
      Object.assign(this, fields);
    }
}