import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Form, { CreateFormInput, UpdateFormInput } from "../../entity/Form";
import { ResponseMessage } from "../../services/common.type";
import FormService from "../../services/form.service";

@Resolver(Form)
export default class FormResolver {

    @Query(() => [Form])
    async readForms(@Arg("nameContains", {nullable: true}) nameContains: string ): Promise<Form[]> {
        const forms = await new FormService().read(nameContains);
        return forms;
    }

    @Mutation(() => Form)
    async createForm(@Arg("createFormInput") createFormInput: CreateFormInput) : Promise<Form> {

        if(createFormInput.title.length > 100 || createFormInput.title.length === 0) {
            throw new Error ( "the title should be between 1 and 100 characters")
        }        
        return await new FormService().create({...createFormInput});
    }
    
}