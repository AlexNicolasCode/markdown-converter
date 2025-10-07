export const checkEmptyString = (content?: string) => {
    if (!content || content === '') {
        return true;
    }
    return false;
}