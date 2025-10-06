import { ContentTypeEnum } from "./enums/content-type.enum";

export const cleanStringByType = (lineType: ContentTypeEnum, line: string): string => {
    const lineMapper: Record<ContentTypeEnum, (line: string) => string> = {
        [ContentTypeEnum.H1]: (line: string) => line.replace('# ',''),
        [ContentTypeEnum.H2]: (line: string) => line.replace('## ',''),
        [ContentTypeEnum.H3]: (line: string) => line.replace('### ',''),
        [ContentTypeEnum.H4]: (line: string) => line.replace('#### ',''),
        [ContentTypeEnum.H5]: (line: string) => line.replace('##### ',''),
        [ContentTypeEnum.LIST]: (line: string) => line.replace('- ',''),
        [ContentTypeEnum.NUMBER_LIST]: (line: string) => line.replace(/^\d+\.\s/,''),
        [ContentTypeEnum.TEXT]: (line: string) => line,
    };
    const removeTypeIdentifier = lineMapper[lineType];
    if (!removeTypeIdentifier) {
        return line;
    } 
    return removeTypeIdentifier(line);
}
