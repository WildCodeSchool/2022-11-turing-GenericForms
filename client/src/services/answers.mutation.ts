import {gql} from '@apollo/client';

export const CREATE_ANSWER = gql(`
    mutation CreateAnswer($createAnswerInput: CreateAnswerInput!) {
        createAnswer(createAnswerInput: $createAnswerInput) {
            answerText
            questionId
            userId
        }
    }
`);