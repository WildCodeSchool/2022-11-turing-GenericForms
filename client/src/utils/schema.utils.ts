import { z } from "zod";
import { InitialFormState } from "../screens/PublicForm/PublicFormScreen";

//TODO add conditional dynamic validation rules : 
// get question type and add validation rules accordingly
// ex: if question type is text, add min and max length
// ex: if question type is number, add min and max value
// ex: if question type is date, add min and max date


export const createSchema = (initialFormState: InitialFormState) => {
    // const mockDataForm1: InitialFormState = [
    //     { id: "1", answer: ''},
    //     { id: "2", answer: '' },
    //     { id: "4", answer: '' },
    //     { id: "6", answer: '' },
    //     { id: "7", answer: '' },
    // ];

    let schema = z.object({});
    for (const question of initialFormState) {
        if(question.validation.required) {
            if(question.validation.minLength && question.validation.maxLength) {
                schema = schema.setKey(
                    question.id,
                    z.string()
                    .min(question.validation.minLength , {message: `Min ${question.validation.minLength} caractères`})
                    .max(question.validation.maxLength , {message: `Max ${question.validation.maxLength} caractères`})
                    )
            }
            if(!question.validation.minLength && !question.validation.maxLength) {
                schema = schema.setKey(
                    question.id,
                    z.string().nonempty()
                    )
            }
        }
        if(!question.validation.required) {
            if(question.validation.minLength && question.validation.maxLength) {
                schema = schema.setKey(
                    question.id,
                    z.string()
                    .min(question.validation.minLength , {message: `Min ${question.validation.minLength} caractères`})
                    .max(question.validation.maxLength , {message: `Max ${question.validation.maxLength} caractères`})
                    .optional()
                    )
            }
            if(!question.validation.minLength && !question.validation.maxLength) {
                schema = schema.setKey(
                    question.id,
                    z.string().optional()
                    )
            }
        }
    }
    return schema;
}