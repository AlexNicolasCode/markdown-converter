import { HtmlTagEnum } from "../enums/html-type.enum"

export type HtmlList = {
  type: HtmlTagEnum.LI;
  content: string;
}

export type HtmlFormat = {
  type: HtmlTagEnum;
  content?: string;
  childrens?: HtmlFormat[];
}