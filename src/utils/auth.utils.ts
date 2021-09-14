import {Action, ForbiddenError} from "routing-controllers";
import {verifyAndDecodeToken} from "./jwt.utils";
import {Logger} from "./logger";

export interface AuthUser {
    userId: string;
}

export async function currentUserChecker(action: Action): Promise<AuthUser> {

    try {
        // tslint:disable-next-line
        const bearer: string = action.request.headers["authorization"];
        const token = bearer.replace("Bearer ", "");
        return await verifyAndDecodeToken(token);
    } catch (e) {
        Logger.error(e);
        throw new ForbiddenError("Missing or invalid token provided.");
    }
}
