import { BaseModel } from "./baseModel";

export class EntryElementModel extends BaseModel {
    value?: string;
    type?: string;
    parentId?: string;
    order?: number;
    public constructor(fields: Partial<EntryElementModel>) {
      super();
      Object.assign(this, fields);
    }
}