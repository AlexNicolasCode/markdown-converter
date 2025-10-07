import { HtmlTagEnum } from "./enums/html-type.enum";
import { HtmlFormat } from "./formats";

export const formatListElements = (unformattedHtmlElements: HtmlFormat[]): HtmlFormat[] => {
    const htmlElements: HtmlFormat[] = [];
    const ulList: HtmlFormat[] = [];
    const olList: HtmlFormat[] = [];
    for (const element of unformattedHtmlElements) {
        const isOl = element.type === HtmlTagEnum.OL;
        const isUl = element.type === HtmlTagEnum.UL;
        if (isUl) {
            ulList.push({ type: HtmlTagEnum.LI, content: element.content });
            continue;
        }
        if (
            ulList.length > 0 &&
            !isUl
        ) {
            htmlElements.push({ type: HtmlTagEnum.UL, list: ulList });
            ulList.splice(0, ulList.length);
            continue;
        }
        if (isOl) {
            olList.push({ type: HtmlTagEnum.LI, content: element.content });
            continue;
        }
        if (
            olList.length > 0 &&
            !isOl
        ) {
            htmlElements.push({ type: HtmlTagEnum.OL, list: olList });
            olList.splice(0, olList.length);
            continue;
        }
    }
    return htmlElements;
}