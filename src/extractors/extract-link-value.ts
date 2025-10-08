import type { ExtractorResult } from "./extractor-types";

export const extractLinkValues = (str: string): ExtractorResult => {
	const regex = /\[(.*?)\]\((.*?)\)/g;
	const match = regex.exec(str);
	if (!match) {
		return [];
	}
	const label = match[1];
	const url = match[2];
	return [
		{
			value: label,
			props: [{ name: "href", value: url }],
		},
	];
};
