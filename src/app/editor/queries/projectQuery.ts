export class ProjectQuery
{
    status?:string;
    public constructor(fields: Partial<ProjectQuery>) {
        Object.assign(this, fields);
     }
}