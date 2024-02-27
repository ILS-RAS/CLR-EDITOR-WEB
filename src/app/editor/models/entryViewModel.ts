import { BaseModel } from './baseModel';
import { EntryModel } from './entryModel';

export class EntryViewModel extends EntryModel {
    lemma?: string;
    form?: string;
    pos?: string;
    gender?: string;
    case?: string;
    dialect?: string;
    feature?: string;
    person?: string;
    number?: string;
    tense?: string;
    mood?: string;
    voice?: string;
    degree?: string;
    
    public constructor(fields: Partial<EntryViewModel>) {
        super(fields);
        Object.assign(this, fields);
     }
}