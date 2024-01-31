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

  private async SplitPhrase(chunkValue?: string) {

    if (chunkValue == undefined) return undefined;

    //TODO: Fix incorrect cyrillic string splitting
    let tempArray = chunkValue.split(/(?=[.\s]|\b)/);

    return Promise.resolve(tempArray);
  }

  public async ParseTextToElements(chunk: ChunkModel) {

    let elements: ElementModel[] = [];
    let list = await this.SplitPhrase(chunk.value);
    let inx = 0;
    list?.forEach((item) => {
      let element: ElementModel = new ElementModel({});
      element.chunkId = chunk._id;
      element.value = item;
      element.order = inx.toString();

      if (this.punctuation(item)) {
        element.type = ElementType.Punctuation.toString();
      }

      if (this.letter(item)) {
        element.type = ElementType.Word.toString();
      }

      if (this.number(item)) {
        element.type = ElementType.Digit.toString();
      }

      if (this.space(item)) {
        if (this.newLine(item)) {
          element.type = ElementType.NewLine.toString();
        } else {
          element.type = ElementType.Space.toString();
        }
      }

      elements.push(element);

      inx += 1;
    });

    return Promise.resolve(elements);
  }

  private punctuation(str: string) {
    return / /.test(str);
  }

  private letter(str: string) {
    return / /.test(str);
  }

  private number(str: string) {
    return / /.test(str);
  }

  private space(str: string) {
    return / /.test(str);
  }

  private newLine(str: string) {
    return / /.test(str);
  }

}
