import { extractCodeLanguage } from "./extract-code-language";
import type { ExtractorResult } from "./extractor-types";

export const extractCodeValues = (str: string): ExtractorResult => {
    const matches = str.match(/```([\s\S]*?)```/g);
    if (!matches) {
        return [];
    }
    const language = extractCodeLanguage(str);
    const code = matches[0];
    return [
        {
            value: code,
            props: [
                {
                    name: 'language',
                    value: language,
                }
            ],
        }
    ];
};
