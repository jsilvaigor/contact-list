import {Body, Header, HeaderParam, JsonController, Post} from "routing-controllers";
import {RegisterBody, TokenResponse} from "../auth.interface";
import {RegisterService} from "./register.service";

@JsonController("/auth/register")
export class RegisterController {

    constructor(private registerService: RegisterService = new RegisterService()) {
    }

    @Post("/")
    public register(@Body() body: RegisterBody,
                    @HeaderParam("x-request-id") requestId: string,
    ): Promise<TokenResponse> {
        return this.registerService.registerUser(body, requestId);
    }

}
