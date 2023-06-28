
export interface AnswerDTO {
    answerId: number;
    questionId: number;
    answerText: string;
    userId: number;
}

export interface CreateAnswerInput {
    questionId: number;
    answerText: string;
    userId: number;
}

export interface CreateAnswerResponse {
    createAnswer: Partial<AnswerDTO>;
}