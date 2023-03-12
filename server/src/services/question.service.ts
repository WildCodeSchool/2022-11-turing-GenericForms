import { Repository } from "typeorm";
import Question, {
  CreateQuestionInput,
  UpdateQuestionInput,
} from "../entity/Question";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import { IService } from "./interfaces";

class QuestionService implements IService {
  db: Repository<Question>;
  constructor() {
    this.db = datasource.getRepository(Question);
  }

  async readQuestions(): Promise<Question[]> {
    try {
      const question = await this.db.find({
        relations: ["form", "choices"],
      });
      return question;
    } catch (err) {
      console.error(err);
      throw new Error("error question");
    }
  }

  async readQuestionByForm(formId: number): Promise<Question[]> {
    try {
      const question = await this.db.find({
        where: {
          formId,
        },
        relations: ["form", "choices"],
      });
      return question;
    } catch (err) {
      console.error(err);
      throw new Error("error question");
    }
  }

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    try {
      return await this.db.save({ ...createQuestionInput });
    } catch (err) {
      console.log(err);
      throw new Error("error saving the question");
    }
  }

  async update({
    questionId,
    ...updateQuestionInput
  }: UpdateQuestionInput): Promise<ResponseMessage> {
    try {
      const { affected } = await this.db.update(
        questionId,
        updateQuestionInput
      );
      if (affected === 0)
        return {
          success: false,
          message: "no question with id",
        };
      return {
        success: true,
        message: "question update",
      };
    } catch (err) {
      console.log(err);
      throw new Error("error update question");
    }
  }

  async delete(questionId: number): Promise<ResponseMessage> {
    try {
      const { affected } = await this.db.delete(questionId);
      if (affected === 0)
        return {
          success: false,
          message: "no question with id",
        };
      return {
        success: true,
        message: "question delete",
      };
    } catch (err) {
      console.log(err);
      throw new Error("error delete question");
    }
  }
}
export default QuestionService;
