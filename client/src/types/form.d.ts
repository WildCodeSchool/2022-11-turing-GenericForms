import { ThemeDTO } from "./theme";
import { QuestionDTO } from "./question";

interface FormDTO {
    formId: number;
    title: string;
    category: string;
    visbilility: boolean;
    themeId: number;
    theme: ThemeDTO;
    user: Partial<UserDTO>;
    questions: QuestionDTO[];
}

interface ReadFormsDTO {
    readForms: FormDTO[];
}

interface ReadOneFormDTO {
    readOneFormByFormId: FormDTO;
}