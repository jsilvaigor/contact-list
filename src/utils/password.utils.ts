import * as bcrypt from "bcrypt";
import envVars from "./environment";

export function hashPassword(password: string, saltsOrRounds = envVars.SALTS_OR_ROUNDS): Promise<string> {
    return bcrypt.hash(password, saltsOrRounds);
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        return false;
    }
}
