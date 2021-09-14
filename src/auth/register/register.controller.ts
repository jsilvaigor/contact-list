import {Body, HeaderParam, HttpCode, JsonController, Post} from "routing-controllers";
import {AuthBody, TokenResponse} from "../auth.interface";
import {RegisterService} from "./register.service";

@JsonController("/auth/register")
export class RegisterController {

    constructor(private registerService: RegisterService = new RegisterService()) {
    }

    @HttpCode(201)
    @Post("/")
    public register(@Body() body: AuthBody,
                    @HeaderParam("x-request-id") requestId: string,
    ): Promise<TokenResponse> {
        return this.registerService.registerUser(body, requestId);
    }

}
