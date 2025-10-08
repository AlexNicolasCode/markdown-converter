import { HtmlTagEnum } from "./enums/html-type.enum";

export const cleanStringByType = (
	lineType: HtmlTagEnum,
	line: string,
): string => {
	const lineMapper: Record<HtmlTagEnum, (line: string) => string> = {
		[HtmlTagEnum.H1]: (line: string) => line.replace("# ", ""),
		[HtmlTagEnum.H2]: (line: string) => line.replace("## ", ""),
		[HtmlTagEnum.H3]: (line: string) => line.replace("### ", ""),
		[HtmlTagEnum.H4]: (line: string) => line.replace("#### ", ""),
		[HtmlTagEnum.H5]: (line: string) => line.replace("##### ", ""),
		[HtmlTagEnum.UL]: (line: string) => line.replace("- ", ""),
		[HtmlTagEnum.OL]: (line: string) => line.replace(/^\d+\.\s/, ""),
		[HtmlTagEnum.LI]: (line: string) => line,
		[HtmlTagEnum.P]: (line: string) => line,
		[HtmlTagEnum.BOLD]: (line: string) => line,
		[HtmlTagEnum.LINK]: (line: string) => line,
	};
	const removeTypeIdentifier = lineMapper[lineType];
	if (!removeTypeIdentifier) {
		return line;
	}
	return removeTypeIdentifier(line);
};
