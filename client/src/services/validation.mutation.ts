import {gql} from '@apollo/client/core';

export const UPDATE_VALIDATION = gql(`
    mutation UpdateValidation($updateValidationInput: UpdateValidationInput!) {
    updateValidation(updateValidationInput: $updateValidationInput) {
        validationId
        required
        textCharMin
        textCharMax
        multipleChoiceMin
        multipleChoiceMax
    }
    }
`);