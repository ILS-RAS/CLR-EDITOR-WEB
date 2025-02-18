export class HeaderQuery
{
    projectId?:string;
    status?:string;
    lang?:string;
    editionType?:string;
    public constructor(fields: Partial<HeaderQuery>) {
        Object.assign(this, fields);
     }
}