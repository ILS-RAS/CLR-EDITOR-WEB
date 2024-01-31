export class HeaderQuery
{
    projectId?:string;
    status?:string;
    public constructor(fields: Partial<HeaderQuery>) {
        Object.assign(this, fields);
     }
}