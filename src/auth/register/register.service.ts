import Joi from "joi";
import {JoiPassword} from "joi-password";
import {BadRequestError} from "routing-controllers";
import {Repository} from "typeorm";
import {DatabaseConnection} from "../../utils/database.connection";
import {generateAndSignToken} from "../../utils/jwt.utils";
import {Logger} from "../../utils/logger";
import {hashPassword} from "../../utils/password.utils";
import {RegisterBody, TokenResponse} from "../auth.interface";
import {UserModel} from "./user.model";

export class RegisterService {

    public async registerUser(body: RegisterBody, requestId: string): Promise<TokenResponse> {
        Logger.info(`Validating request body.`, requestId);
        this.validateBody(body);
        Logger.info(`Body validated, getting user repository instance.`, requestId);
        const connection = await DatabaseConnection.getInstance();
        const repository: Repository<UserModel> = connection.getRepository(UserModel);
        Logger.info("Checking if user exists.", requestId);
        const user = await repository.findOne({email: body.email});
        if (!user) {
            Logger.info("User does not exist. Creating it", requestId);
            const hashedPassword = await hashPassword(body.password);
            const toSave = new UserModel({email: body.email, password: hashedPassword});
            const newUser = await repository.save(toSave);
            Logger.info("User created successfully. Generating token");
            const token = await generateAndSignToken(newUser.userUUID);
            return { token };
        } else {
            throw new BadRequestError("E-mail informed is already registered.");
        }

    }

    private validateBody(user: RegisterBody): boolean {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: JoiPassword.string()
                .minOfLowercase(1)
                .minOfNumeric(1)
                .minOfSpecialCharacters(1)
                .minOfUppercase(1)
                .noWhiteSpaces()
                .min(8)
                .required(),
        });
        const {error, value} = schema.validate(user);
        if (error) {
            Logger.error(error);
            throw new BadRequestError(`${error.details[0].context.key} - ${error.details[0].message}`);
        }
        return true;
    }

}
