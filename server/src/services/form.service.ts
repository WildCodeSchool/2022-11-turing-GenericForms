import { Like, Repository } from "typeorm";
import Form, { CreateFormInput, UpdateFormInput } from "../entity/Form";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import { IService } from "./interfaces";

class FormService implements IService {
    db: Repository<Form>;
    constructor(){
        this.db = datasource.getRepository(Form);
    }
    
    async read(titleContains?: string | undefined): Promise<Form[]> {
        try {
            const forms = await this.db.find({
              where: {
                title:
                  typeof titleContains === "string"
                    ? Like(`%${titleContains}%`)
                    : undefined,
              },
              relations: ["theme"],
            });
            return forms;
          } catch (err) {
            console.error(err);
            throw new Error("There was an error getting the forms")          
        }
    }

    async readOne(formId: number): Promise<Form> {
        try {
            const form = await this.db.findOne({
              where: { formId}
            });
            if(form === null) {
                throw new Error("No form with this ID");
            }
            return form;
          } catch (err: any) {
            console.error(err);
            throw new Error("There was an error getting a form by id");
          }
    }

    async create(createFormInput: CreateFormInput): Promise<Form> {
        try {
            return await this.db.save({...createFormInput});
        } catch (err) {
            console.log(err);
            throw new Error("There was an error saving the form")
        }
    }

    async delete(formId: number): Promise<ResponseMessage> {
        try {
            const { affected } = await this.db.delete(formId);
            if (affected === 0) return {
                success: false,
                message: "Aucun form supprimé"
            };
            return {
                success: true,
                message: "Form deleted"
            };
          } catch (err) {
            console.error(err);
            throw new Error("There was an error deleting the form")
          }        
    }
    
    async update({formId, ...updateFormInput}: UpdateFormInput): Promise<ResponseMessage> {
        try {
            const { affected } = await this.db.update(formId, updateFormInput);
            if (affected === 0) return {
                success: false,
                message: "Aucun formulaire modifié"
            };
            return {
                success: true,
                message: `Form #${formId} updated`
            };
          } catch (err) {
            console.error(err);
            throw new Error("There was an error updating the form")
          }        
    }


}

export default FormService;