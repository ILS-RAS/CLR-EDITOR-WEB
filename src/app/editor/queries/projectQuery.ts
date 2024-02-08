export class ProjectQuery
{
    status?: string;
    projectType?: string;
    creatorId?:string;
    public constructor(fields: Partial<ProjectQuery>) {
        Object.assign(this, fields);
     }
}