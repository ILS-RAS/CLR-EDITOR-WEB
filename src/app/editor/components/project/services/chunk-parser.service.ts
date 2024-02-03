import { Injectable } from '@angular/core';
import { ChunkModel } from '../../../models';
import { ElementModel } from '../../../models/elementModel';
import { ErrorService } from '../../../services/error.service';
import { ElementType } from '../../../enums/elementType';

@Injectable({
  providedIn: 'root',
})
export class ChunkParserService {
  constructor(private errorService: ErrorService) {}

  private async SplitPhrase(chunkValue?: string): Promise<string[]> {

    if (chunkValue == undefined) return [];

    let tempArray = chunkValue.split(/(?=[\s,.!?—–\\/{}()\"'`~])|(?<=[\s,.!?—–\\/{}()\"'`~])/);

    return Promise.resolve(tempArray);
  }

  public async ParseTextToElements(chunk: ChunkModel) {

    let elements: ElementModel[] = [];
    let list = await this.SplitPhrase(chunk.value);
    let inx = 0;
    await list?.forEach((item) => {
      let element: ElementModel = new ElementModel({});
      element.chunkId = chunk._id;
      element.value = item;
      element.order = inx;

      if (this.punctuation(item)) {
        element.type = ElementType.Punctuation;
      }else if (this.letter(item) || (this.letter(item) && item.includes('-'))) {
        element.type = ElementType.Word;
      }else if (this.number(item)) {
        element.type = ElementType.Digit;
      }else if (this.space(item)) {
        if (this.newLine(item)) {
          element.type = ElementType.NewLine;
        } else {
          element.type = ElementType.Space;
        }
      }else{
        this.errorService.errorMessage(`Неизвестный символ: ${ JSON.stringify(item) }`);
      }

      elements.push(element);

      inx += 1;
      
    });

    return Promise.resolve(elements);
  }

  private punctuation(str: string) {
    return /[,.!?—–\\/{}()\"'`~]/.test(str);
  }

  private letter(str: string) {
    return /\p{L}/u.test(str);
  }

  private number(str: string) {
    return /\d+/.test(str);
  }

  private space(str: string) {
    return /\s/.test(str);
  }

  private newLine(str: string) {
    return /\n/.test(str);
  }

}
