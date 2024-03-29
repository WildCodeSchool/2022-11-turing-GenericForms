import { DefaultValues } from "../types/publicForm";
import { QuestionDTO } from "../types/question";


// const originalArray: QuestionDTO[] = [
//     {
//         formId: 1,
//         questionId: 6,
//         title: "Choisissez votre couleur",
//         description: "Maximum 1 choix",
//         type: QuestionType.SELECT,
//         choices: [
//             {
//                 choiceId: 2,
//                 text: "Vert"
//             },
//             {
//                 choiceId: 1,
//                 text: "Rouge"
//             },
//             {
//                 choiceId: 3,
//                 text: "Bleuet"
//             }
//         ]
//     },
//     {
//         formId: 1,
//         questionId: 2,
//         title: "Nouvelle question",
//         description: "test description",
//         type: QuestionType.TEXT,
//         choices: []
//     },
//     {
//         formId: 1,
//         questionId: 3,
//         title: "Quel est votre plat préféré ?",
//         description: "test description",
//         type: QuestionType.TEXT,
//         choices: []
//     },
//     {
//         formId: 1,
//         questionId: 4,
//         title: "Quel est votre animal préféré ?",
//         description: "description",
//         type: QuestionType.TEXT,
//         choices: []
//     },
//   ];

// Output: {"1": "value1", "2": "value2", "4": "value4", "7": "value7"}s
export const transformArrayToObject = (arr: QuestionDTO[] | undefined) => {
    const resultObj: DefaultValues = {};
    if(arr) {
        arr.forEach((item) => {
        resultObj[item.questionId] = `réponse #${item.questionId}`;
        })
    }
    return resultObj;
  }

  