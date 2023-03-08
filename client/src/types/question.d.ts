import {QuestionType} from './questionEnum';

export interface QuestionDTO {
    questionId: number;
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
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