import * as fs from 'node:fs';

import { convertMarkDownToHtmlFormat } from "../src/convert-markdown-to-html-format";
import { HtmlTagEnum } from '../src/enums/html-type.enum';
import { checkListType } from '../src/utils';
import type { HtmlFormat } from '../src/formats';

describe('convertMarkDownToHtmlFormat', () => {
  it('should have correct first lines number', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    expect(lines.length).toBe(18);
  });

  it('should have correct ul list count', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const listCount = lines.filter((l) => l.type === HtmlTagEnum.UL).length;
    expect(listCount).toBe(3);
  });

  it('should have correct li list count', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const listCount = lines.filter((l) => l.type === HtmlTagEnum.OL).length;
    expect(listCount).toBe(2);
  });

  it('should have only li childrens in ul or ol item', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const invalidItemInList: HtmlFormat[] = [];
    for (const line of lines) {
      if (!checkListType(line.type)) {
        continue;
      }
      const invalidItemInList = line.childrens?.filter((c) => c.type !== HtmlTagEnum.LI);
      if (!invalidItemInList) {
        continue;
      }
      invalidItemInList.push(...invalidItemInList);
    }
    expect(invalidItemInList.length).toBe(0);
  });

  it('should have correct link type quantity', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const linkLines: HtmlFormat[] = [];
    for (const line of lines.filter((l) => checkListType(l.type))) {
      for (const lineLiChildren of line.childrens) {
        const linkLinesByLine = lineLiChildren.childrens.filter((l) => l.type === HtmlTagEnum.LINK);
        linkLines.push(...linkLinesByLine);
      }
    }
    expect(linkLines.length).toBe(2);
  });

  it('should have one program type', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const programLinesCount = lines.filter((l) => l.type === HtmlTagEnum.PROGRAM).length;
    expect(programLinesCount).toBe(1);
  });

  it('should have one program type with props in correct language', async () => {
    const markdownContent = fs.readFileSync('tests/test.md', 'utf8');

    const lines = convertMarkDownToHtmlFormat(markdownContent);

    const programLine = lines.find((l) => l.type === HtmlTagEnum.PROGRAM);
    const programLineProp = programLine?.childrens[0].props.find((p) => p.name === 'language');
    expect(programLineProp.value).toBe('js');
  });
});