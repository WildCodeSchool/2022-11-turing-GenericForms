interface FormDTO {
    formId: number;
    title: string;
    category: string;
    themeId: number;
}

interface ThemeDTO {
    themeId: number;
    name: string;
    style: string;
}

type FormsDTO = FormDTO & { theme: ThemeDTO };

interface ReadFormsDTO {
    readForms: FormsDTO[];
}