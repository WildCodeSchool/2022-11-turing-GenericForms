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
    for (const prop of initialFormState) {
        schema = schema.setKey(prop.id, z.string().min(5, {message: 'Min 5 caractères'}).max(10));
        if(prop.id === '1') {
            schema = schema.setKey(prop.id, z.string().min(10, {message: 'Min 10 caractères'}).max(50));
        }
    }
    return schema;
}