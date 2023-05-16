
export interface ThemeDTO {
    themeId: number;
    name: string;
    style: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
}

export interface ReadThemesDTO {
    readThemes: ThemeDTO[];
}