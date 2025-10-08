export const extractCodeLanguage = (str: string): string | undefined => {
    if (!str || str === "") {
        return;
    }
    const startLanguageIndex = str.indexOf('```') + 3;
    const endLanguageIndex = str.indexOf('\n');
    const language = str.slice(startLanguageIndex, endLanguageIndex);
    return language;
};
