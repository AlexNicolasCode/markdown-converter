import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTagEnum } from "./enums/html-type.enum";
import { formatContent } from "./format-content";
import { formatListElements } from "./format-list-elements";
import type { HtmlFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";
import { checkEmptyArray, checkListType } from "./utils";

export const convertMarkDownToHtmlFormat = (content: string): HtmlFormat[] => {
	const htmlElements: HtmlFormat[] = [];
	let isProgram = false;
	const codeLines: string[] = [];
	for (const line of content.split("\n")) {
		const type: HtmlTagEnum = getTypeByString(line);
		if (type === HtmlTagEnum.PROGRAM) {
			codeLines.push(line);
			if (isProgram) {
				htmlElements.push({
					type: HtmlTagEnum.PROGRAM,
					childrens: formatContent(type, codeLines.join('\n')),
					props: [],
				});
			}
			isProgram = !isProgram;
			continue;
		}
		if (isProgram) {
			codeLines.push(line);
			continue;
		}
		if (checkListType(type)) {
			htmlElements.push({
				type,
				content: cleanStringByType(type, line),
				childrens: [],
				props: [],
			});
			continue;
		}
		const childrens = formatContent(type, line);
		if (checkEmptyArray(childrens)) {
			continue;
		}
		htmlElements.push({
			type,
			childrens,
			props: [],
		});
	}
	const hasList = htmlElements.some((el) => checkListType(el.type));
	if (!hasList) {
		return htmlElements;
	}
	return formatListElements(htmlElements);
};
