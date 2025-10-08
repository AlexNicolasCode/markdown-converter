import { cleanStringByType } from "./clean-line-by-type";
import type { HtmlTagEnum } from "./enums/html-type.enum";
import { extractElementByText } from "./extract-element-by-line";
import type { HtmlFormat } from "./formats";
import { checkEmptyString } from "./utils";

export const formatContent = (
	type: HtmlTagEnum,
	line: string,
): HtmlFormat[] => {
	const cleanContent = cleanStringByType(type, line);
	if (checkEmptyString(cleanContent)) {
		return [];
	}
	const childrens = extractElementByText(cleanContent);
	return childrens;
};
