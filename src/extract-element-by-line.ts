import { v4 as uuidv4 } from 'uuid';

import { HtmlTagEnum } from "./enums/html-type.enum";
import { HtmlFormat } from "./formats/html-format";
import { checkEmptyString } from "./utils";

export const extractElementByText = (type: HtmlTagEnum, line?: string): HtmlFormat[] => {
    if (!line) {
        return [];
    }
    const specialValues: Array<{ id: string; type: HtmlTagEnum; value: string }> = [];
    const boldTexts = extractBoldValues(line);
    for (const boldText of boldTexts) {
        const id = uuidv4();
        specialValues.push({ id, type: HtmlTagEnum.BOLD, value: boldText });
        line = line.replaceAll(`**${boldText}**`, `[[${id}]]`);
    }
    const tags: HtmlFormat[] = [];
    const words = line.split(' ');
    for (const word of words) {
        if (checkEmptyString(word)) {
            continue;
        }
        const specialValueId = extractSpecialValueId(word);
        const isSpecialValue = word.startsWith('[[');
        if (isSpecialValue) {
            const specialValue = specialValues.find((s) => specialValueId.includes(s.id));
            const content = specialValue ? word.replaceAll(`[[${specialValue.id}]]`, specialValue.value) : word;
            tags.push({ type: HtmlTagEnum.BOLD, content });
            continue;
        }
        tags.push({ type: HtmlTagEnum.P, content: word });
    }
    return tags;
}

const extractSpecialValueId = (str: string): string[] => {
  const matches = str.match(/\[\[([0-9a-fA-F-]+)\]\]/g);
  return matches ? matches.map(m => m.replace(/\[\[|\]\]/g, '')) : [];
}

const extractBoldValues = (str: string): string[] => {
  const matches = str.match(/\*\*(.*?)\*\*/g);
  return matches ? matches.map(m => m.replace(/\*\*/g, '')) : [];
}
