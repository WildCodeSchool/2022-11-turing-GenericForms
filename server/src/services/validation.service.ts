import { Repository } from "typeorm";
import Validation from "../entity/Validation";
import { IService } from "./interfaces";
import datasource from "../lib/datasource";

class ValidationService implements IService {
    db: Repository<Validation>;
    constructor() {
        this.db = datasource.getRepository(Validation);
    }

    async read(): Promise<Validation[]> {
        try {
            const validation = await this.db.find({
                relations: ["question"],
            });
            return validation;
        } catch (err) {
            console.error(err);
            throw new Error("There was an error getting the validation")
        }
    }
    


}

export default ValidationService;