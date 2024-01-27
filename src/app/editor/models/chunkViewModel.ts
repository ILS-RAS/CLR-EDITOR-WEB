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
    ProjectCode?: string;
    HeaderCode?: string;
    HeaderLang?: string;
    elements: ChunkValueItemModel[] = []
    public constructor(fields: Partial<ChunkViewModel>) {
      super(fields);
      Object.assign(this, fields);
    }
  }