import jwt from "jsonwebtoken"
import envVars from "./environment";

export function generateAndSignToken(userId: string) {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({ userId }, envVars.JWT_SECRET, {expiresIn: "1h"}, (err, encoded) => {
            if(err){
                reject(err)
            } else {
                resolve(encoded)
            }
        })
    })
}
