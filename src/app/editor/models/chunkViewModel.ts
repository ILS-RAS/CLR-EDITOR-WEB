import { ChunkModel } from "./chunkModel";
import { ChunkValueItemModel } from "./chunkValueItemModel";

export class ChunkViewModel extends ChunkModel {
    parentId?: string;
    indexName?: string;
    indexOrder?: string;
    headerDesc?: string;
    projectDesc?: string;
    headerEditionType?: string;
    projectId?: string;
    projectCode?: string;
    headerCode?: string;
    headerLang?: string;
    elements: ChunkValueItemModel[] = []
    public constructor(fields: Partial<ChunkViewModel>) {
      super(fields);
      Object.assign(this, fields);
    }
  }