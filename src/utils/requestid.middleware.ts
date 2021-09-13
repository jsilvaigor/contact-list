import {Request, Response} from "express";
import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
import { v4 as uuidV4 } from "uuid";

@Middleware({ type: "before" })
export class RequestidMiddleware implements ExpressMiddlewareInterface {

    public use(request: Request, response: Response, next?: (err?: any) => any): any {
        const requestId = uuidV4();
        request.headers["x-request-id"] = requestId;
        response.set("x-request-id", requestId);
        next();
    }
}
