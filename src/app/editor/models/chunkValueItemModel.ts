import { BaseModel } from "./baseModel";

export class ChunkValueItemModel extends BaseModel
{
    id?: string;
    value?: string;
    type?: number;
    order?: number;
    morphId?: string | null;
    lemma?: string;
    form?: string;
    pos?: string; 
    gender?: string | null;
    case?: string | null;
    dialect?: string | null;
    feature?: string | null;
    person?: string | null;
    number?: string | null;
    tense?: string | null;
    mood?: string | null;
    voice?: string | null;
    degree?: string | null;
    lang?: string;

    public constructor(fields: Partial<ChunkValueItemModel>) {
        super();
        Object.assign(this, fields);
     }
}