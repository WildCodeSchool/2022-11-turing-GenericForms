import { Repository } from "typeorm";
import Form from "../entity/Form";
import Answer from "../entity/Answer";

export interface IService {
    db: Repository<Form | User | Answer >;
}

export interface Context {
    user: User | null;
}