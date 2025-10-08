import { HtmlTagEnum } from "./enums/html-type.enum";

export const getTypeByString = (line: string): HtmlTagEnum => {
	const lineMapper = {
		[HtmlTagEnum.H1]: (line: string) => line.startsWith("# "),
		[HtmlTagEnum.H2]: (line: string) => line.startsWith("## "),
		[HtmlTagEnum.H3]: (line: string) => line.startsWith("### "),
		[HtmlTagEnum.H4]: (line: string) => line.startsWith("#### "),
		[HtmlTagEnum.H5]: (line: string) => line.startsWith("##### "),
		[HtmlTagEnum.UL]: (line: string) => line.startsWith("- "),
		[HtmlTagEnum.OL]: (line: string) => /^\d+\.\s/.test(line),
		[HtmlTagEnum.PROGRAM]: (line: string) => line.startsWith("```"),
	};
	for (const [lineType, check] of Object.entries(lineMapper)) {
		const result = check(line);
		if (!result) {
			continue;
		}
		return lineType as HtmlTagEnum;
	}
	return HtmlTagEnum.P;
};
