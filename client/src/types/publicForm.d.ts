type DefaultValues = {
    [key: string]: string;
};

interface PublicFormData {
    [key: string]: string
}

export type PublicFormDataArray = PublicFormData[];

export type SubmitFormAnswers = {questionId: number, answer: string}[];