import { Query, Authorized, Arg, Resolver, Mutation } from "type-graphql";
import Question, {
  CreateQuestionInput,
  UpdateQuestionInput,
} from "../../entity/Question";
import { ResponseMessage } from "../../services/common.type";
import QuestionService from "../../services/question.service";

@Resolver(Question)
export default class QuestionResolver {
  @Authorized()
  @Query(() => [Question])
  async readQuestionByForm(@Arg("formId") formId: number): Promise<Question[]> {
    const questions = await new QuestionService().readQuestionByForm(formId);
    return questions;
  }

  @Mutation(() => Question)
  async createQuestion(
    @Arg("createQuestionInput") createQuestionInput: CreateQuestionInput
  ): Promise<Question> {
    if (createQuestionInput.formId == null) {
      throw new Error("formId require for create question error");
    }
    return await new QuestionService().create({ ...createQuestionInput });
  }

  @Mutation(() => ResponseMessage)
  async updateQuestion(
    @Arg("updateQuestionInput")
    { questionId, ...updateQuestionInput }: UpdateQuestionInput
  ): Promise<ResponseMessage> {
    if (updateQuestionInput.formId == null) {
      throw new Error("update question error");
    }
    return await new QuestionService().update({
      questionId,
      ...updateQuestionInput,
    });
  }

  @Mutation(() => ResponseMessage)
  async deleteQuestion(
    @Arg("questionId") questionId: number
  ): Promise<ResponseMessage> {
    const response = await new QuestionService().delete(questionId);
    return response;
  }
}
