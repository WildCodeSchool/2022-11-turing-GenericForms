import { QuestionDTO } from '../types/question';
import { QuestionType } from '../types/questionEnum';
import {transformArrayToObject} from './formatDefaultValues';

const originalArray: QuestionDTO[] = [
    {
        formId: 1,
        questionId: 6,
        title: "Choisissez votre couleur",
        description: "Maximum 1 choix",
        type: QuestionType.SELECT,
        choices: [
            {
                choiceId: 2,
                text: "Vert"
            },
            {
                choiceId: 1,
                text: "Rouge"
            },
            {
                choiceId: 3,
                text: "Bleuet"
            }
        ]
    },
    {
        formId: 1,
        questionId: 2,
        title: "Nouvelle question",
        description: "test description",
        type: QuestionType.TEXT,
        choices: []
    },
    {
        formId: 1,
        questionId: 3,
        title: "Quel est votre plat préféré ?",
        description: "test description",
        type: QuestionType.TEXT,
        choices: []
    },
    {
        formId: 1,
        questionId: 4,
        title: "Quel est votre animal préféré ?",
        description: "description",
        type: QuestionType.TEXT,
        choices: []
    },
  ];

describe('transformArrayToObject', () => {
    it('should return an object with the correct keys and values', () => {
        const result = transformArrayToObject(originalArray);
        expect(result).toEqual({
            6: 'value 6',
            2: 'value 2',
            3: 'value 3',
            4: 'value 4',
        });
    });
});


