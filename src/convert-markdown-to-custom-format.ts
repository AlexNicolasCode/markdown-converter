import { cleanStringByType } from "./clean-line-by-type";
import { ContentTypeEnum } from "./enums/content-type.enum";
import { CustomFormat } from "./formats";
import { getTypeByString } from "./get-type-by-string";

export const convertMarkDownToCustomFormat = (content: string): CustomFormat[] => {
    const lineByType: CustomFormat[] = [];
    for (const line of content.split('\n')) {
        const type: ContentTypeEnum = getTypeByString(line);
        lineByType.push({ type, content: cleanStringByType(type, line) });
    }
    return lineByType;
}
