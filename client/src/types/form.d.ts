import { ThemeDTO } from "./theme";
import { QuestionDTO } from "./question";

interface FormDTO {
    formId: number;
    title: string;
    category: string;
    themeId: number;
    theme: ThemeDTO;
    questions: QuestionDTO[];
}

interface ReadFormsDTO {
    readForms: FormDTO[];
}

interface ReadOneFormDTO {
    readOneForm: FormDTO;
}