import { BaseModel } from './baseModel';

export class MorphModel extends BaseModel {
    
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
  isRule?: string;

  public constructor(fields: Partial<MorphModel>) {
    super();
    Object.assign(this, fields);
  }
}
