import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 
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
