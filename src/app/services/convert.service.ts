import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() {
  }

  private static htmlFontSize: number = null;

  pxToEm(px: number) {
    if (!ConvertService.htmlFontSize) {
      const W = window;
      const D = W.document;
      const htmlArray = D.getElementsByTagName('html');
      if (htmlArray.length === 0) {
        throw new Error(`Can't find the HTML tag`);
      }
      const htmlTag: HTMLHtmlElement = htmlArray[0];
      const fontSize: string = W.getComputedStyle(htmlTag).fontSize;
      const number: string = fontSize.substring(0, fontSize.length - 2);
      ConvertService.htmlFontSize = parseInt(number, 10);
    }
    return px / ConvertService.htmlFontSize;
  }
}
