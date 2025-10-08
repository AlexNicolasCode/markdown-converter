import { HtmlFormat } from "../formats";

export const checkEmptyArray = (arr: HtmlFormat[]): boolean => {
    if (!arr || !arr.length) {
        return true;
    }
    return false;
}