import { Repository } from "typeorm";
import Form from "../entity/Form";
import Theme from "../entity/Theme";
import Answer from "../entity/Answer";

export interface IService {
    db: Repository<Form | User | Answer | Theme>;
}

export interface Context {
    user: User | null;
}
