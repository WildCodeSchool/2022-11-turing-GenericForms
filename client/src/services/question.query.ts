import { gql } from "@apollo/client";

export const READ_QUESTION = gql(`
    query ReadQuestionById($questionId: Float!) {
        readQuestionById(questionId: $questionId) {
        questionId
        title
        description
        type
        formId
        form {
            formId
            title
            category
            themeId
        }
        }
    }
`);