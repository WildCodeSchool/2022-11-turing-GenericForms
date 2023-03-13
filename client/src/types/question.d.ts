import {QuestionType} from './questionEnum';
import { ChoiceDTO } from "./choice";

export interface QuestionDTO {
    questionId: number;
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
    choices: ChoiceDTO[];
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