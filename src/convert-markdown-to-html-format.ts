import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTypeEnum } from "./enums/html-type.enum";
import { formatListElements } from "./format-list-elements";
import { HtmlFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";

export const convertMarkDownToHtmlFormat = (content: string): HtmlFormat[] => {
    const htmlElements: HtmlFormat[] = [];
    for (const line of content.split('\n')) {
        const type: HtmlTypeEnum = getTypeByString(line);
        const content = cleanStringByType(type, line);
        htmlElements.push({ type, content });
    }
    const listTypes = [HtmlTypeEnum.UL, HtmlTypeEnum.OL];
    const hasList = htmlElements.some((el) => listTypes.includes(el.type));
    if (!hasList) {
        return htmlElements;
    }
    return formatListElements(htmlElements);;
}
