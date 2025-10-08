import { HtmlTagEnum } from "../enums/html-type.enum"

export const checkListType = (type: HtmlTagEnum): boolean => {
    return [HtmlTagEnum.UL, HtmlTagEnum.OL].includes(type);
}