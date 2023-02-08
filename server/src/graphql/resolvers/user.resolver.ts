import { Resolver, Query, Mutation, Arg } from "type-graphql";
import User, { CreateUserInput, UpdateUserInput } from "../../entity/User";
import { ResponseMessage } from "../../services/common.type";
import UserService from "../../services/user.service";

@Resolver(User)
export default class UserResolver {

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
