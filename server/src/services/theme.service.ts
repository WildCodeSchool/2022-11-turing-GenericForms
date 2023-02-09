import { Repository } from "typeorm";
import Theme, { CreateThemeInput } from "../entity/Theme";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import { IService } from "./interfaces";

class ThemeService implements IService {
    db: Repository<Theme>;
    constructor(){
        this.db = datasource.getRepository(Theme);
    }

    async read(): Promise<Theme[]> {
        try {
            const themes = await this.db.find();
            return themes;
        } catch (err) {
            console.error(err);
            throw new Error("There was an error getting the themes")
        }
    }

    async readOne(themeId: number): Promise<Theme> {
        try {
            const theme = await this.db.findOne({
                where: { themeId }
            });
            if(theme === null) {
                throw new Error("No theme with this ID");
            }
            return theme;
        } catch (err: any) {
            console.error(err);
            throw new Error("There was an error getting a theme by id");
        }
    }

    async create(createThemeInput: CreateThemeInput): Promise<Theme> {
        try {
            return await this.db.save({...createThemeInput});
        } catch (err) {
            console.log(err);
            throw new Error("There was an error saving the theme")
        }
    }

    async delete(themeId: number): Promise<ResponseMessage> {
        try {
            const {affected} = await this.db.delete(themeId);
            if(affected === 0) return {
                success: false,
                message: "Aucun thème avec cet ID"
            }
            return {
                success: true,
                message: "Le thème a été supprimé"
            };
        } catch(err) {
            console.error(err);
            throw new Error("There was an error deleting the theme");
        }
    }


}

export default ThemeService;