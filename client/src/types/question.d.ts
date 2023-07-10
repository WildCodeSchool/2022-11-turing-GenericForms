import {QuestionType} from './questionEnum';
import { ChoiceDTO } from "./choice";
import { ValidationDTO } from './validation';

export interface QuestionDTO {
    questionId: number;
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
    choices: ChoiceDTO[];
    validation: ValidationDTO;
    deleted?: boolean;
}

export interface ReadOneQuestionDTO {
    readQuestionById: QuestionDTO;
}

export interface UpdateQuestionInput {
    questionId: number;
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
    validationId: number;
}

export interface CreateQuestionInput {
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
}

export interface CreateQuestionResponse {
    createQuestion: Partial<QuestionDTO>;
}

export interface DeleteQuestionResponse {
    deleteQuestion: {
        message: string;
        success: boolean;
    }
}

interface NewEmptyQuestion {
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
    choices: ChoiceDTO[];
    validation: {
        required: boolean;
        textCharMin: number | null;
        textCharMax: number | null;
        multipleChoiceMin: number | null,
        multipleChoiceMax: number | null,
    };
}