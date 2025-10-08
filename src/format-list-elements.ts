import { HtmlTagEnum } from "./enums/html-type.enum";
import { extractElementByText } from "./extract-element-by-line";
import type { HtmlFormat } from "./formats";

export const formatListElements = (
	unformattedHtmlElements: HtmlFormat[],
): HtmlFormat[] => {
	const htmlElements: HtmlFormat[] = [];
	const lists: { ulList: HtmlFormat[]; olList: HtmlFormat[] } = {
		ulList: [],
		olList: [],
	};
	for (const element of unformattedHtmlElements) {
		const isOl = element.type === HtmlTagEnum.OL;
		const isUl = element.type === HtmlTagEnum.UL;
		if (isUl) {
			lists.ulList.push({
				type: HtmlTagEnum.LI,
				childrens: extractElementByText(element.content),
				props: [],
			});
			continue;
		}
		if (lists.ulList.length > 0 && !isUl) {
			htmlElements.push({
				type: HtmlTagEnum.UL,
				childrens: lists.ulList,
				props: [],
			});
			lists.ulList = [];
			continue;
		}
		if (isOl) {
			lists.olList.push({
				type: HtmlTagEnum.LI,
				childrens: extractElementByText(element.content),
				props: [],
			});
			continue;
		}
		if (lists.olList.length > 0 && !isOl) {
			htmlElements.push({
				type: HtmlTagEnum.OL,
				childrens: lists.olList,
				props: [],
			});
			lists.olList = [];
			continue;
		}
		htmlElements.push(element);
	}
	return htmlElements;
};
