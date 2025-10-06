import { ContentTypeEnum } from "./enums/content-type.enum";

export const getTypeByString = (line: string): ContentTypeEnum => {
    const lineMapper = {
        [ContentTypeEnum.H1]: (line: string) => line.startsWith('# '),
        [ContentTypeEnum.H2]: (line: string) => line.startsWith('## '),
        [ContentTypeEnum.H3]: (line: string) => line.startsWith('### '),
        [ContentTypeEnum.H4]: (line: string) => line.startsWith('#### '),
        [ContentTypeEnum.H5]: (line: string) => line.startsWith('##### '),
        [ContentTypeEnum.LIST]: (line: string) => line.startsWith('- '),
        [ContentTypeEnum.NUMBER_LIST]: (line: string) => /^\d+\.\s/.test(line),
        [ContentTypeEnum.TEXT]: (line: string) => line,
    };
    for (const [lineType, check] of Object.entries(lineMapper)) {
        const result = check(line);
        if (!result) {
            continue;
        }
        return lineType as ContentTypeEnum;
    }
    return ContentTypeEnum.TEXT;
}
