import { HtmlTypeEnum } from "../enums/html-type.enum"

export type HtmlList = {
  type: HtmlTypeEnum.LI;
  content: string;
}

export type HtmlFormat = {
    type: HtmlTypeEnum;
    content?: string;
    list?: HtmlFormat[];
}