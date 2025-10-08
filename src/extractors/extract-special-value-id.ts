export const extractSpecialValueId = (str: string): string[] => {
	const matches = str.match(/\[\[([0-9a-fA-F-]+)\]\]/g);
	return matches ? matches.map((m) => m.replace(/\[\[|\]\]/g, "")) : [];
};
