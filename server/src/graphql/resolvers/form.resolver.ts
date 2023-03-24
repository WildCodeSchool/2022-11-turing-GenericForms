import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import Form, { CreateFormInput, UpdateFormInput } from "../../entity/Form";
import { ResponseMessage } from "../../services/common.type";
import FormService from "../../services/form.service";
import { Context } from "../../services/interfaces";

@Resolver(Form)
export default class FormResolver {

    // @Authorized()
    @Query(() => [Form])
    async readForms(@Arg("nameContains", {nullable: true}) nameContains: string, @Ctx() ctx: Context ): Promise<Form[]> {
        
        console.log("user from ctx ==>", ctx.user)

        const forms = await new FormService().read(nameContains);
        return forms;
    }

    @Query(() => Form) 
    async readOneFormByFormId(@Arg("formId") formId: string): Promise<Form> {
        const Forms = await new FormService().readOne(+formId);
        return Forms;
    }

    @Mutation(() => Form)
    async createForm(@Arg("createFormInput") createFormInput: CreateFormInput) : Promise<Form> {

        if(createFormInput.title.length > 100 || createFormInput.title.length === 0) {
            throw new Error ( "the title should be between 1 and 100 characters")
        }        
        return await new FormService().create({...createFormInput});
    }

    @Mutation(() => ResponseMessage )
    async updateForm(@Arg("updateFormInput") {formId, ...updateFormInput}: UpdateFormInput): Promise<ResponseMessage>{
         if((updateFormInput.title != null) && (updateFormInput.title.length > 100 || updateFormInput.title.length === 0)) {
            throw new Error ( "the name should be between 1 and 100 characters")
        }   
        return await new FormService().update({formId, ...updateFormInput});
    }

    @Mutation(() => ResponseMessage) // retournera {success: true, message: ""}
    async deleteForm(@Arg("id") id: string): Promise<ResponseMessage> {
        const response = await new FormService().delete(+id);
        return response;
    }    
    
}