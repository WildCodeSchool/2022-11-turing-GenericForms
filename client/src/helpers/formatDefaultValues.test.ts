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
        ],
        validation: {
            validationId: 1,
            required: true,
            multipleChoiceMin: 1,
            multipleChoiceMax: 1,
            textCharMin: undefined,
            textCharMax: undefined,
        }
    },
    {
        formId: 1,
        questionId: 2,
        title: "Nouvelle question",
        description: "test description",
        type: QuestionType.TEXT,
        choices: [],
        validation: {
            validationId: 2,
            required: true,
            multipleChoiceMin: 1,
            multipleChoiceMax: 1,
            textCharMin: undefined,
            textCharMax: undefined,
        }
    },
    {
        formId: 1,
        questionId: 3,
        title: "Quel est votre plat préféré ?",
        description: "test description",
        type: QuestionType.TEXT,
        choices: [],
        validation: {
            validationId: 3,
            required: true,
            multipleChoiceMin: 1,
            multipleChoiceMax: 1,
            textCharMin: undefined,
            textCharMax: undefined,
        }
    },
    {
        formId: 1,
        questionId: 4,
        title: "Quel est votre animal préféré ?",
        description: "description",
        type: QuestionType.TEXT,
        choices: [],
        validation: {
            validationId: 4,
            required: true,
            multipleChoiceMin: 1,
            multipleChoiceMax: 1,
            textCharMin: undefined,
            textCharMax: undefined,
        }
    },
  ];

describe('transformArrayToObject', () => {
    it('should return an object with the correct keys and values', () => {
        const result = transformArrayToObject(originalArray);
        expect(result).toEqual({
            6: 'réponse #6',
            2: 'réponse #2',
            3: 'réponse #3',
            4: 'réponse #4',
        });
    });
});


