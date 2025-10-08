import { v4 as uuidv4 } from "uuid";

import { HtmlTagEnum } from "./enums/html-type.enum";
import type { HtmlFormat } from "./formats/html-format";
import { checkEmptyString } from "./utils";
import {
	extractBoldValues,
	extractCodeValues,
	extractLinkValues,
	extractSpecialValueId,
	type SpecialValue,
} from "./extractors";

export const extractElementByText = (
	line?: string,
): HtmlFormat[] => {
	if (!line) {
		return [];
	}
	const id = uuidv4();
	const specialValues: Array<SpecialValue> = [];
	const codeValues = extractCodeValues(line);
	for (const codeValue of codeValues) {
		specialValues.push({
			id,
			type: HtmlTagEnum.PROGRAM,
			value: codeValue.value,
			props: codeValue.props,
		});
		line = `[[${id}]]`;
	}
	const boldValues = extractBoldValues(line);
	for (const boldValue of boldValues) {
		specialValues.push({
			id,
			type: HtmlTagEnum.BOLD,
			value: boldValue.value,
			props: [],
		});
		line = line.replaceAll(`**${boldValue}**`, `[[${id}]]`);
	}
	const linkValues = extractLinkValues(line);
	for (const linkText of linkValues) {
		specialValues.push({
			id,
			type: HtmlTagEnum.LINK,
			value: linkText.value,
			props: linkText.props,
		});
		line = line.replaceAll(/\[(.*?)\]\((.*?)\)/g, `[[${id}]]`);
	}
	const tags: HtmlFormat[] = [];
	const words = line.split(" ");
	for (const word of words) {
		if (checkEmptyString(word)) {
			continue;
		}
		const specialValueId = extractSpecialValueId(word);
		const isSpecialValue = word.startsWith("[[");
		if (isSpecialValue) {
			const specialValue = specialValues.find((s) =>
				specialValueId.includes(s.id),
			);
			const content = specialValue
				? word.replaceAll(`[[${specialValue.id}]]`, specialValue.value)
				: word;
			tags.push({
				type: specialValue.type,
				content,
				props: specialValue.props,
				childrens: [],
			});
			continue;
		}
		tags.push({
			type: HtmlTagEnum.P,
			content: word,
			childrens: [],
			props: [],
		});
	}
	return tags;
};
