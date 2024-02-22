import { BaseModel } from "./baseModel";

export class EntryElement extends BaseModel{
    value?: string;
    type?: string;
    parentId?: string;
    entryId?: string;
    public constructor(fields: Partial<EntryElement>) {
      super();
      Object.assign(this, fields);
    }
}