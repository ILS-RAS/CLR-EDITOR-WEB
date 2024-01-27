import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkViewModel } from '../../../../models/chunkViewModel';

@Component({
  selector: 'app-text-chunk',
  templateUrl: './text-chunk.component.html',
  styleUrl: './text-chunk.component.scss'
})
export class TextChunkComponent implements OnInit {

  chunk?: ChunkViewModel;
  version?: ChunkViewModel;

  constructor(private projectService: ProjectService) {
    
  }
  ngOnInit(): void {
    this.projectService.$currentChunk.subscribe(item=>{
      this.chunk = item;
      if(this.chunk){
        this.chunk.elements = JSON.parse(item?.valueObj as string);
      }
    });

    this.projectService.$currentInterpChunk.subscribe(item=>{
      this.version = item;
      if(this.version){
        this.version.elements = JSON.parse(item?.valueObj as string);
      }
    });
  }
}
