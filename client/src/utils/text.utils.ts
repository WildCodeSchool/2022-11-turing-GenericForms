export const getPlural = (count: number | undefined, word: string) => {
    if (!count) return word;
    return count > 1 ? `${word}s` : word;
};