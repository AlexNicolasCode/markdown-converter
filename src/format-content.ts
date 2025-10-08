import { cleanStringByType } from "./clean-line-by-type";
import { HtmlTagEnum } from "./enums/html-type.enum";
import { extractElementByText } from "./extract-element-by-line";
import { HtmlFormat } from "./formats";
import { checkEmptyString } from "./utils";

export const formatContent = (type: HtmlTagEnum, line: string): HtmlFormat[] => {
    const cleanContent = cleanStringByType(type, line);
    if (checkEmptyString(cleanContent)) {
        return [];
    }
    const childrens = extractElementByText(type, cleanContent);
    return childrens;
}