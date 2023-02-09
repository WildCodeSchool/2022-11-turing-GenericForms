import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { ResponseMessage } from "./common.type";
import User, {CreateUserInput, UpdateUserInput} from "../entity/User";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


class UserService {
    db: Repository<User>;
    constructor(){
        this.db = datasource.getRepository(User);
    }
    
    async read(): Promise<User[]> {
        try {
            const users = await this.db.find();
            return users;
          } catch (err) {
            console.error(err);
            throw new Error("There was an error getting the users")          
        }
    }

    async readOne(userId: number): Promise<User> {
        try {
            const user = await this.db.findOne({
              where: { userId},
            });
            if(user === null) {
                throw new Error("No user with this ID");
            }
            return user;
          } catch (err: any) {
            console.error(err);
            throw new Error("There was an error getting a user by id");
          }
    }

    async readOneByEmail(email: string): Promise<User> {
        try {
          const user = await this.db.findOne({
            where: {
              email,
            },
          });
          if (user === null) {
            throw new Error("Cet utilisateur n'existe pas");
          }
          return user;
        } catch (err) {
          console.log(err);
          throw new Error("Il y a eu une erreur");
        }
      }

    async create({password, ...createUserInput}: CreateUserInput): Promise<User> {
        try {
            const passwordHash = bcrypt.hashSync(password, 10);
            return await this.db.save({createdAt: new Date(), password: passwordHash , ...createUserInput});
        } catch (err) {
            console.log(err);
            throw new Error("There was an error saving the user")
        }
    }

    async generateToken(payload: any): Promise<any> {
        const token = jwt.sign(payload, process.env.SECRET_KEY ?? '', {
          expiresIn: "2h",
        });
        return token;
    }


    async checkPassword(password: string, hash: string): Promise<any> {
        return bcrypt.compareSync(password, hash); // true
    }

    async update({userId, ...updateUserInput}: UpdateUserInput): Promise<ResponseMessage> {
        try {
            // TODO add updateAt date in update

            const {affected} = await this.db.update(userId, updateUserInput);
            if(affected === 0) return {
                success: false,
                message: "Aucun utilisateur avec cet ID"
            };
            return {
                success: true,
                message: `Utilisateur #${userId} modifié avec succès`
            };
        } catch (err) {
            console.log(err);
            throw new Error("There was an error updating the user")
        }
    }

    async delete(userId: number): Promise<ResponseMessage> {
        try {
            const user = await this.db.findOne({where: {userId}});
            if(user === null) {
                throw new Error("No user with this ID");
            }
            await this.db.delete({userId});
            return {message: "User deleted successfully"};
        } catch (err) {
            console.log(err);
            throw new Error("There was an error deleting the user")
        }
    }


}

export default UserService;