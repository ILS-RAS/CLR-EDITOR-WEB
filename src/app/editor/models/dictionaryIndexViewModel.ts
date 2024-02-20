import { BaseModel } from './baseModel';
import { DictionaryIndexModel } from './dictionaryIndexModel';

export class DictionaryIndexViewModel extends DictionaryIndexModel {
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
    
    public constructor(fields: Partial<DictionaryIndexViewModel>) {
        super(fields);
        Object.assign(this, fields);
     }
}