export class HeaderQuery
{
    projectId?:string;

    public constructor(fields: Partial<HeaderQuery>) {
        Object.assign(this, fields);
     }
}