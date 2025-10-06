import { HtmlTypeEnum } from "./enums/content-type.enum";

export const getTypeByString = (line: string): HtmlTypeEnum => {
    const lineMapper = {
        [HtmlTypeEnum.H1]: (line: string) => line.startsWith('# '),
        [HtmlTypeEnum.H2]: (line: string) => line.startsWith('## '),
        [HtmlTypeEnum.H3]: (line: string) => line.startsWith('### '),
        [HtmlTypeEnum.H4]: (line: string) => line.startsWith('#### '),
        [HtmlTypeEnum.H5]: (line: string) => line.startsWith('##### '),
        [HtmlTypeEnum.LIST]: (line: string) => line.startsWith('- '),
        [HtmlTypeEnum.NUMBER_LIST]: (line: string) => /^\d+\.\s/.test(line),
        [HtmlTypeEnum.TEXT]: (line: string) => line,
    };
    for (const [lineType, check] of Object.entries(lineMapper)) {
        const result = check(line);
        if (!result) {
            continue;
        }
        return lineType as HtmlTypeEnum;
    }
    return HtmlTypeEnum.TEXT;
}
