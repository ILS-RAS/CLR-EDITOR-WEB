export class ElementQuery{
    chunkId?:string;
    morphId?:string;
    value?:string;
    type?:string;
    headerId?:string;
    public constructor(fields: Partial<ElementQuery>) {
        Object.assign(this, fields);
     }
}