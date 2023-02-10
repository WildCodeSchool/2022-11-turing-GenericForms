import { Repository } from "typeorm";
import Form from "../entity/Form";
import Theme from "../entity/Theme";

export interface IService {
    db: Repository<Form | User | Theme>;
}

export interface Context {
    user: User | null;
}