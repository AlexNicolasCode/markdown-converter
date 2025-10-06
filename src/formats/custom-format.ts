import { ContentTypeEnum } from "../enums/content-type.enum"

export type CustomFormat = {
    type: ContentTypeEnum;
    content: string;
}