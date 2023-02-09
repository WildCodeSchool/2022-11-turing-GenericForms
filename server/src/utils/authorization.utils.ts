import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 
import { Context } from "../services/interfaces";
import { AuthChecker } from "type-graphql";
dotenv.config()

export async function getPayloadFromToken(token: string | undefined): Promise<string | jwt.JwtPayload | null> {
    if (token !== undefined) {
        try {
            const payload = jwt.verify(token, `${process.env.SECRET_KEY}` );
            return payload;
        } catch (err: any) {
            console.log("Erreur autorisation : token invalide")
            throw new Error(err.message);
        }
    } else {
        return null;
    }
}


export const customAuthChecker: AuthChecker<Context> = (
    { root, args, context, info },
    roles,
  ) => {
    // Utiliser roles pour vérifier si dans le context.user
    // console.log("Liste des roles ==>", roles);

    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    if (context.user !== null) {
      return true;
    }
    return false; // or false if access is denied
  
  };