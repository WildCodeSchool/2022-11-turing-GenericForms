import { gql } from "@apollo/client";

export const UPDATE_QUESTION = gql(`
    mutation UpdateQuestion($updateQuestionInput: UpdateQuestionInput!) {
        updateQuestion(updateQuestionInput: $updateQuestionInput) {
            message
            success
        }
    }
`);

