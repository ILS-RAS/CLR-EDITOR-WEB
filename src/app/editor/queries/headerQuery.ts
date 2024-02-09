export class HeaderQuery
{
    projectId?:string;
    status?:string;
    lang?:string;
    public constructor(fields: Partial<HeaderQuery>) {
        Object.assign(this, fields);
     }
}