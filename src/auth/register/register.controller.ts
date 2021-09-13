import {Body, Header, HeaderParam, JsonController, Post} from "routing-controllers";
import {RegisterService} from "./register.service";
import {RegisterBody, TokenResponse} from "../auth.interface";

@JsonController("/auth/register")
export class RegisterController {

    constructor(private registerService: RegisterService = new RegisterService()) {
    }

    @Post("/")
    register(@Body() body: RegisterBody, @HeaderParam("x-request-id") requestId: string): Promise<TokenResponse>{
        return this.registerService.registerUser(body, requestId)
    }

}
