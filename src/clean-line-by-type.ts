import { HtmlTypeEnum } from "./enums/html-type.enum";

export const cleanStringByType = (lineType: HtmlTypeEnum, line: string): string => {
    const lineMapper: Record<HtmlTypeEnum, (line: string) => string> = {
        [HtmlTypeEnum.H1]: (line: string) => line.replace('# ',''),
        [HtmlTypeEnum.H2]: (line: string) => line.replace('## ',''),
        [HtmlTypeEnum.H3]: (line: string) => line.replace('### ',''),
        [HtmlTypeEnum.H4]: (line: string) => line.replace('#### ',''),
        [HtmlTypeEnum.H5]: (line: string) => line.replace('##### ',''),
        [HtmlTypeEnum.LIST]: (line: string) => line.replace('- ',''),
        [HtmlTypeEnum.NUMBER_LIST]: (line: string) => line.replace(/^\d+\.\s/,''),
        [HtmlTypeEnum.TEXT]: (line: string) => line,
    };
    const removeTypeIdentifier = lineMapper[lineType];
    if (!removeTypeIdentifier) {
        return line;
    }
    return removeTypeIdentifier(line);
}
