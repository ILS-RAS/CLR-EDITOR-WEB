import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextChunkComponent } from './text-chunk.component';

describe('TextChunkComponent', () => {
  let component: TextChunkComponent;
  let fixture: ComponentFixture<TextChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextChunkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
