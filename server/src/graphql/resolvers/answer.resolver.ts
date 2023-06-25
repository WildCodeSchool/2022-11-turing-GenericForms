import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import Answer, { CreateAnswerInput, UpdateAnswerInput } from "../../entity/Answer";
import AnswerService from "../../services/answer.service";
import { ResponseMessage } from "../../services/common.type";
import { Context } from "../../services/interfaces";

@Resolver(Answer)
export default class AnswerResolver {

    // @Authorized()
    @Query(() => [Answer])
    async readAnswers(): Promise<Answer[]> {
        const answers = await new AnswerService().read();
        return answers;
    }

    // @Authorized()
    @Query(() => [Answer])
    async readAnswersByQuestion(@Arg("questionId",) questionId: number, @Ctx() ctx: Context ): Promise<Answer[]> {
        const answers = await new AnswerService().readByQuestionId(questionId);
        return answers;
    }

    @Query(() => [Answer])
    async readAnswersByUser(@Arg("userId",) userId: number, @Ctx() ctx: Context ): Promise<Answer[]> {
        const answers = await new AnswerService().readByUserId(userId);
        return answers;
    }

    @Mutation(() => Answer)
    async createAnswer(@Arg("createAnswerInput") createAnswerInput: CreateAnswerInput) : Promise<Answer> {
        if ((createAnswerInput.questionId == null) || (createAnswerInput.userId == null)) {
            throw new Error ( "Both questionId and userId are required")
        }
        return await new AnswerService().create({...createAnswerInput});
    }

    @Mutation(() => ResponseMessage)
    async updateAnswer(@Arg("updateAnswerInput") {answerId, ...updateAnswerInput}: UpdateAnswerInput) : Promise<ResponseMessage> {
        if (answerId == null) {
            throw new Error ( "Both questionId and userId are required")
        }
        return await new AnswerService().update({answerId, ...updateAnswerInput});
    }
        

    @Mutation(() => ResponseMessage)
    async deleteAnswer(@Arg("answerId") answerId: number) : Promise<ResponseMessage> {
        return await new AnswerService().delete(answerId);
    }
}