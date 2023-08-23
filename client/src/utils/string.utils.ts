export const getFirstLetter = (word: string | undefined) => {
    if (!word) {
        return '';
    }
    return word.charAt(0);
};