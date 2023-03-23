import { IProcessor } from 'typeorm-fixtures-cli'
import User from '../../src/entity/User'
import bcrypt from "bcrypt";
import { writeToFile } from './utils';

export default class UserProcessor implements IProcessor<User> {
    preProcess(name: string, object: any): any {
        const hashedPassword = bcrypt.hashSync(object.password, 10)
        writeToFile(object.email, object.password);
        return { ...object, password: hashedPassword };
    }
}