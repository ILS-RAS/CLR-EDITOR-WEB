export class IndexQuery
{
    headerId?:string;
    parentId?:string;
    name?:string;
    public constructor(fields: Partial<IndexQuery>) {
        Object.assign(this, fields);
     }
}