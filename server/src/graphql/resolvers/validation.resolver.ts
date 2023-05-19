import { Query, Resolver } from "type-graphql";
import Validation from "../../entity/Validation";
import ValidationService from "../../services/validation.service";


@Resolver(Validation)
export default class ValidationResolver {

    @Query(() => [Validation])
    async readValidation(): Promise<Validation[]> {
        return await new ValidationService().read();
    }
}