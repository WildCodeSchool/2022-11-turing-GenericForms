import { Repository } from "typeorm";
import Form from "../entity/Form";
import Theme from "../entity/Theme";
import Answer from "../entity/Answer";
import Choice from "../entity/Choice";

export interface IService {
    db: Repository<Form | User | Answer | Theme | Choice>;
}

export interface Context {
    user: User | null;
}
