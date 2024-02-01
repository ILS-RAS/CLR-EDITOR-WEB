export class ProjectQuery
{
    status?: string;
    projectType?: string;
    
    public constructor(fields: Partial<ProjectQuery>) {
        Object.assign(this, fields);
     }
}