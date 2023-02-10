import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import User, { CreateUserInput, Login, LoginInput, UpdateUserInput, ValidationToken } from "../../entity/User";
import { ResponseMessage } from "../../services/common.type";
import UserService from "../../services/user.service";

@Resolver(User)
export default class UserResolver {

    @Query(() => Login)
    async login(@Arg("loginInput") loginInput: LoginInput ): Promise<any> {

      const { email, password } = loginInput;
      const user = await new UserService().readOneByEmail(email);
      const checkPassword = await new UserService().checkPassword(password, user.password);

        if (checkPassword === true) {
            const token = await new UserService().generateToken({email: user.email, userId: user.userId});
            console.log("token ===>", token);
            return {
                success: true,
                token,
            }
        } else {
            throw new Error("Wrong password");
        }
    
    }

    @Query(() => ValidationToken)
    async checkToken(@Ctx() ctx: any): Promise<ValidationToken> {
      console.log(ctx);
      const authorization = {
        valid: true,
      };
      if (ctx.user === undefined) {
        authorization.valid = false;
      }
      console.log("Authorization", authorization);
      return authorization;
    }
    
    @Query(() => [User])
    async readUsers(): Promise<User[]> {
        const users = await new UserService().read();
        return users;
    }

    @Query(() => User)
    async readOneUser(@Arg("id") id: string): Promise<User> {
        const user = await new UserService().readOne(+id);
        return user;
    }

    @Mutation(() => User)
    async createUser(@Arg("createUserInput") createUserInput: CreateUserInput ) : Promise<User> {
        // TODO Add validation rules on max length for names and email here ? Or on entity ? 
        return await new UserService().create({...createUserInput});
    }

    @Mutation(() => User)
    async updateUser(@Arg("updateUserInput") {userId, ...updateUserInput}: UpdateUserInput): Promise<ResponseMessage>{
        return await new UserService().update({userId, ...updateUserInput});
    }


}
