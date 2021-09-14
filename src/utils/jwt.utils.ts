import jwt from "jsonwebtoken";
import envVars from "./environment";
import {AuthUser} from "./auth.utils";
import {Logger} from "./logger";

export function generateAndSignToken(userId: string) {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({ userId }, envVars.JWT_SECRET, {expiresIn: "1h"}, (err, encoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(encoded);
            }
        });
    });
}

export function verifyAndDecodeToken(token: string): Promise<AuthUser> {
    return new Promise<AuthUser>((resolve, reject) => {
        jwt.verify(token, envVars.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                Logger.log(decoded);
                resolve({userId: decoded.userId});
            }
        });
    });
}
