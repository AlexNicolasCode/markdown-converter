import { convertMarkDownToHtmlFormat } from "./convert-markdown-to-html-format"

export const md = {
    extract: (str: string) => convertMarkDownToHtmlFormat(str),
}
export type { HtmlTagEnum } from './enums';
export type { HtmlFormat } from './formats';
