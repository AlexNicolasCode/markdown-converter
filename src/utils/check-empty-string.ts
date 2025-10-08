export const checkEmptyString = (content: string): boolean => {
	if (!content || content === "") {
		return true;
	}
	return false;
};
