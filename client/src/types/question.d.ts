
export interface QuestionDTO {
    questionId: number;
    title: string;
    description: string;
    type: string;
    formId: number;
    form: FormDTO;
}

export interface ReadOneQuestionDTO {
    readQuestionById: QuestionDTO;
}