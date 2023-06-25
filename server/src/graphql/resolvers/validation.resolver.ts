import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Validation, { CreateValidationInput } from "../../entity/Validation";
import ValidationService from "../../services/validation.service";


@Resolver(Validation)
export default class ValidationResolver {

    @Query(() => [Validation])
    async readValidation(): Promise<Validation[]> {
        return await new ValidationService().read();
    }

    @Mutation(() => Validation)
    async createValidation(
        @Arg("createValidationInput") createValidationInput: CreateValidationInput
    ): Promise<Validation> {
        return await new ValidationService().create({ ...createValidationInput});
    }
}