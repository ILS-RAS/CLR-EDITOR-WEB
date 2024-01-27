export class ChunkQuery
{
    indexId?:string;
    headerId?:string;
    indexName?:string;
    status?:string;

    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}