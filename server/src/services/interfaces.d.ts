import { Repository } from "typeorm";
import Form from "../entity/Form";

export interface IService {
    db: Repository<Form | User>;
}