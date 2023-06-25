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
        relations: ["form", "choices", "validation"],
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
        relations: ["form", "choices", "validation"],
      });
      return question;
    } catch (err) {
      console.error(err);
      throw new Error("error question");
    }
  }

  async readQuestionById(questionId: number): Promise<Question> {
    try {
      const question = await this.db.findOne({
        where: {
          questionId,
        },
        relations: ["form", "choices", "validation"],
      });
      if(question === null) {
        throw new Error("No form with this ID");
    }
      return question;
    } catch (err) {
      console.error(err);
      throw new Error(`Error while getting question with ID ${questionId}`);
    }
  }

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    try {
      // ? by default we create a question with validation rules null and required false
      const validation = await datasource.getRepository("Validation").save({
        required: false,
      });
      return await this.db.save({ ...createQuestionInput, validationId: validation.validationId });
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
      
      //! Can update validation rules by calling the Validation Repository here but can't pass the validation object details...
      const validation = await datasource.getRepository("Validation").update(updateQuestionInput.validationId, {
        required: true, // how to get the validation object details here ?
      });

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
