import { Repository } from "typeorm";
import Form from "../entity/Form";
import User from "../entity/User";

export interface IService {
    db: Repository<Form | User>;
}

export interface Context {
    user: User | null;
  }
  