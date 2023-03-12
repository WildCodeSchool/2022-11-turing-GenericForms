import { Repository } from "typeorm";
import Choice, { CreateChoiceInput, UpdateChoiceInput } from "../entity/Choice";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import { IService } from "./interfaces";

class ChoiceService implements IService {
    db: Repository<Choice>;
    constructor() {
      this.db = datasource.getRepository(Choice);
    }
  
    async readChoices(): Promise<Choice[]> {
      try {
        const choices = await this.db.find();
        return choices;
      } catch (err) {
        console.error(err);
        throw new Error("error reading choices");
      }
    }

    async createChoice(createChoiceInput: CreateChoiceInput): Promise<Choice> {
      try {
        return await this.db.save(createChoiceInput);
      } catch(err) {
        console.error(err);
        throw new Error("error creating choice");
      }
    }

    async updateChoice({choiceId, ...updateChoiceInput}: UpdateChoiceInput): Promise<ResponseMessage> {
      try {
        const {affected} = await this.db.update(choiceId, updateChoiceInput);
        if (affected === 0) return {
            success: false,
            message: "no choice with this id"
          }
        return {
          success: true,
          message: `choice with id ${choiceId} updated`
        }
      } catch(err) {
        console.error(err);
        throw new Error("error updating choice");
      }
    }
}

export default ChoiceService;
  