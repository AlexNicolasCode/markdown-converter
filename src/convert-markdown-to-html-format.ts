import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTypeEnum } from "./enums/html-type.enum";
import { HtmlFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";

export const convertMarkDownToHtmlFormat = (content: string): HtmlFormat[] => {
    const lineByType: HtmlFormat[] = [];
    for (const line of content.split('\n')) {
        const type: HtmlTypeEnum = getTypeByString(line);
        lineByType.push({ type, content: cleanStringByType(type, line) });
    }
    return lineByType;
}
