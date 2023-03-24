import { IProcessor } from 'typeorm-fixtures-cli'
import User from '../../src/entity/User'
import bcrypt from "bcrypt";

export default class UserProcessor implements IProcessor<User> {
    preProcess(name: string, object: any): any {
        const hashedPassword = bcrypt.hashSync(object.password, 10)
        return { ...object, password: hashedPassword };
    }
}