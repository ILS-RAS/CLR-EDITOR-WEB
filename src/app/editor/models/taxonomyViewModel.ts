import { AppType } from "../enums/appType";
import { BaseModel } from "./baseModel";

export class TaxonomyViewModel extends BaseModel {
    override apiType: string = AppType.Taxonomy;
    code?: string;
    desc?: string;
    parentId?: string;
    categoryId?: string;
    categoryCode?: string;
    categoryDesc?: string;

    public constructor(fields: Partial<TaxonomyViewModel>) {
        super();
        Object.assign(this, fields);
     }
}