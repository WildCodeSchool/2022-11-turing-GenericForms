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