export interface ValidationDTO {
    validationId: number;
    required: boolean;
    multipleChoiceMin?: number;
    multipleChoiceMax?: number;
    textCharMin?: number;
    textCharMax?: number;
}

export interface MutateValidationInput {
    validationId: number;
    required: boolean;
    multipleChoiceMin?: number;
    multipleChoiceMax?: number;
    textCharMin?: number;
    textCharMax?: number;
}


