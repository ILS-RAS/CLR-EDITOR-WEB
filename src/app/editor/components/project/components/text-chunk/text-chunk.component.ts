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
  constructor(private projectService: ProjectService) {
    
  }
  ngOnInit(): void {
    this.projectService.$currentChunk.subscribe(item=>{
      this.chunk = item;
      if(this.chunk){
        this.chunk.elements = JSON.parse(item?.valueObj as string);
      }
    })
  }
}
