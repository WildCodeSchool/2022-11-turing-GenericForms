import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 
dotenv.config()

export async function getPayloadFromToken(token: string): Promise<any> {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? '');
        return payload;
    } catch (err: any) {
        throw new Error(err.message);
    }
}
