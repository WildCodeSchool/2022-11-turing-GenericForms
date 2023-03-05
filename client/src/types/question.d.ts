import {QuestionType} from './questionEnum';

export interface QuestionDTO {
    questionId: number;
    title: string;
    description: string;
    type: QuestionType;
    formId: number;
    form: FormDTO;
}

export interface ReadOneQuestionDTO {
    readQuestionById: QuestionDTO;
}