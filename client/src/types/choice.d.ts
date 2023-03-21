export interface ChoiceDTO {
    choiceId: number;
    text: string;
}

export interface ReadChoicesDTO {
    readChoices: ChoiceDTO[];
}

export interface CreateChoiceInput {
    questionId: number;
    text: string;
}

export interface UpdateChoiceInput {
    choiceId: number;
    text: string;
}