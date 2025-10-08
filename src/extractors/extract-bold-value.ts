import type { ExtractorResult } from "./extractor-types";

export const extractBoldValues = (str: string): ExtractorResult => {
	const matches = str.match(/\*\*(.*?)\*\*/g);
	if (!matches) {
		return [];
	}
	return matches.map((m) => ({
		value: m.replace(/\*\*/g, ""),
		props: [],
	}));
};
