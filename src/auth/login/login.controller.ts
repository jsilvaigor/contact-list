import {Body, HeaderParam, JsonController, Post} from "routing-controllers";
import {AuthBody, TokenResponse} from "../auth.interface";
import {LoginService} from "./login.service";

@JsonController("/auth/login")
export class LoginController {

    constructor(private readonly loginService: LoginService = new LoginService()) {
    }

    @Post("/")
    public doLogin(@Body() body: AuthBody,
                   @HeaderParam("x-request-id") requestId: string): Promise<TokenResponse> {
        return this.loginService.doLogin(body, requestId);
    }
}
