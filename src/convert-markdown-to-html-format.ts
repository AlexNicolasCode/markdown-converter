import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTagEnum } from "./enums/html-type.enum";
import { formatListElements } from "./format-list-elements";
import { HtmlFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";

export const convertMarkDownToHtmlFormat = (content: string): HtmlFormat[] => {
    const htmlElements: HtmlFormat[] = [];
    for (const line of content.split('\n')) {
        const type: HtmlTagEnum = getTypeByString(line);
        const content = cleanStringByType(type, line);
        htmlElements.push({ type, content });
    }
    const listTypes = [HtmlTagEnum.UL, HtmlTagEnum.OL];
    const hasList = htmlElements.some((el) => listTypes.includes(el.type));
    if (!hasList) {
        return htmlElements;
    }
    return formatListElements(htmlElements);;
}
