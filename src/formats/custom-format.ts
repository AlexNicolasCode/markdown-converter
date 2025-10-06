import { HtmlTypeEnum } from "../enums/content-type.enum"

export type HtmlFormat = {
    type: HtmlTypeEnum;
    content: string;
}