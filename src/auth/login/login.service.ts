import {AuthBody, TokenResponse} from "../auth.interface";
import Joi from "joi";
import {Logger} from "../../utils/logger";
import {BadRequestError, UnauthorizedError} from "routing-controllers";
import {checkPassword, hashPassword} from "../../utils/password.utils";
import {UserModel} from "../user.model";
import {generateAndSignToken} from "../../utils/jwt.utils";
import {DatabaseConnection} from "../../utils/database.connection";
import {Repository} from "typeorm";

export class LoginService {

    public async doLogin(body: AuthBody, requestId: string): Promise<TokenResponse> {
        Logger.info(`Validating request body.`, requestId);
        this.validateLoginBody(body);
        Logger.info(`Body validated. Getting repository instance.`, requestId);
        const connection = await DatabaseConnection.getInstance();
        const repository: Repository<UserModel> = connection.getRepository(UserModel);
        Logger.info("Checking if user exists.", requestId);
        const user = await repository.findOne({email: body.email});
        if (user) {
            Logger.info("User exist. Comparing passwords", requestId);
            const isPasswordHashEqual = await checkPassword(body.password, user.password);
            if (isPasswordHashEqual) {
                Logger.info("User created successfully. Generating token");
                const token = await generateAndSignToken(user.userUUID);
                return { token };
            }

        }
        throw new UnauthorizedError("E-mail or password informed is wrong.");
    }

    private validateLoginBody(user: AuthBody): boolean {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const {error, value} = schema.validate(user);
        if (error) {
            Logger.error(error);
            throw new BadRequestError(error.message);
        }
        return true;
    }
}
