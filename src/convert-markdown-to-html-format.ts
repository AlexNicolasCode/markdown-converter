import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTagEnum } from "./enums/html-type.enum";
import { formatContent } from "./format-content";
import { formatListElements } from "./format-list-elements";
import { HtmlFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";
import { checkEmptyArray, checkListType } from "./utils";

export const convertMarkDownToHtmlFormat = (content: string): HtmlFormat[] => {
    const htmlElements: HtmlFormat[] = [];
    for (const line of content.split('\n')) {
        const type: HtmlTagEnum = getTypeByString(line);
        if (checkListType(type)) {
            htmlElements.push({ type, content: cleanStringByType(type, line) });
            continue;
        }
        const childrens = formatContent(type, line);
        if (checkEmptyArray(childrens)) {
            continue;
        }
        htmlElements.push({ type, childrens });
    }
    const hasList = htmlElements.some((el) => checkListType(el.type));
    if (!hasList) {
        return htmlElements;
    }
    return formatListElements(htmlElements);
}
