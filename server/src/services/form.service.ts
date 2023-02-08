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
            // TODO must add relation to get the questions of the form ?
            //   relations: { questions: { question: true } },
            });
            return forms;
          } catch (err) {
            console.error(err);
            throw new Error("There was an error getting the forms")          
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


}

export default FormService;