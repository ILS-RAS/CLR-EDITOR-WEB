
export class MorphQuery{
    lemma?:string;
    form?:string;
    pos?:string;
    gender?:string;
    case?:string;
    dialect?:string;
    feature?:string;
    person?:string;
    number?:string;
    tense?:string;
    mood?:string;
    voice?:string;
    degree?:string;
    lang?:string;
    isRule?:string;
    public constructor(fields: Partial<MorphQuery>) {
        Object.assign(this, fields);
     }
}