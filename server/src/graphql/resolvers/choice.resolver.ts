import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Choice, { CreateChoiceInput, UpdateChoiceInput } from "../../entity/Choice";
import ChoiceService from "../../services/choice.service";
import { ResponseMessage } from "../../services/common.type";

@Resolver(Choice)
export default class ChoiceResolver {

    @Query(() => [Choice])
    async readChoices(): Promise<Choice[]> {
      const choices = await new ChoiceService().readChoices();
      return choices;
    }

    @Mutation(() => Choice)
    async createChoice(@Arg("createChoiceInput") createChoiceInput: CreateChoiceInput): Promise<Choice> {
      if(createChoiceInput.questionId === null) throw new Error("questionId is required to create choice");
      const choice = await new ChoiceService().createChoice(createChoiceInput);
      return choice;
    }

    @Mutation(() => ResponseMessage)
    async updateChoice(@Arg("updateChoiceInput") updateChoiceInput: UpdateChoiceInput): Promise<ResponseMessage> {
      if(updateChoiceInput.choiceId === null) throw new Error("choiceId is required to update choice");
      const response = await new ChoiceService().updateChoice(updateChoiceInput);
      return response;
    }

}