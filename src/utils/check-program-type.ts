import { HtmlTagEnum } from "../enums/html-type.enum";

export const checkProgramType = (type: HtmlTagEnum): boolean => {
	return type === HtmlTagEnum.PROGRAM;
};
