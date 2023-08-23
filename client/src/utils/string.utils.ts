export const getFirstLetter = (word: string | undefined) => {
    if (!word) {
        return '';
    }
    return word.charAt(0);
};

export const truncateTextWithDot = (text: string, maxLength: number = 15) => {
    const last10Chars = text.substring(text.length - 10, text.length);
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...${last10Chars}`;
    }
    return text;
};