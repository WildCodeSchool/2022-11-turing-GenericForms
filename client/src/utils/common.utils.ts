import { ThemeDTO } from "../types/theme";

export const parseToSelectItems = (items: ThemeDTO[] | undefined) => {
    if (!items) return [];
    return items.map((item) => {
        return {
            label: item.name,
            value: item.style,
        };
    });
};