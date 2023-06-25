import { Like, Repository } from "typeorm";
import Answer, { CreateAnswerInput, UpdateAnswerInput } from "../entity/Answer";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import { IService } from "./interfaces";

class AnswerService implements IService {
  db: Repository<Answer>;
  constructor() {
    this.db = datasource.getRepository(Answer);
  }

  async read(): Promise<Answer[]> {
    try {
      const answers = await this.db.find({
        relations: ["question", "user"],
      });
      return answers;
    } catch (err) {
      console.error(err);
      throw new Error("There was an error getting the answers");
    }
  }

  async readByQuestionId(questionId: number): Promise<Answer[]> {
    try {
      const answers = await this.db.find({
        where: {
          questionId,
        },
        relations: ["question", "user"],
      });
      return answers;
    } catch (err) {
      console.error(err);
      throw new Error("There was an error getting the answers")

    }
  }

  async readByUserId(userId: number): Promise<Answer[]> {
    try {
      const answers = await this.db.find({
        where: {
          userId,
        },
        relations: ["question", "user"],
      });
      return answers;
    } catch (err) {
      console.error(err);
      throw new Error("There was an error getting the answers")

    }
  }

  async create(createAnswerInput: CreateAnswerInput): Promise<Answer> {
    try {
      return await this.db.save({ ...createAnswerInput });
    } catch (err) {
      console.log(err);
      throw new Error("There was an error saving the answer")
    }
  }

  async delete(answerId: number): Promise<ResponseMessage> {
    try {
      const { affected } = await this.db.delete(answerId);
      if (affected === 0) return {
        success: false,
        message: "No answer with this ID"
      };
      return {
        success: true,
        message: "Answer deleted"
      };
    } catch (err) {
      console.log(err);
      throw new Error("There was an error deleting the answer");
    }
  }

  async update({answerId, ...updateAnswerInput}: UpdateAnswerInput): Promise<ResponseMessage> {
    try {
      const { affected } = await this.db.update(answerId, updateAnswerInput);
      if (affected === 0) return {
        success: false,
        message: "No answer with this ID"
      };
      return {
        success: true,
        message: "Answer updated"
      };
    } catch (err) {
      console.log(err);
      throw new Error("There was an error updating the answer");
    }
  }
}

export default AnswerService;