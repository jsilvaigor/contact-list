import faker from "faker";
import {AuthBody} from "../auth/auth.interface";
import {v4 as uuidV4} from "uuid";
export function getTestAuthBody(): AuthBody {
    return {
        email: uuidV4() + faker.internet.email(),
        password: faker.internet.password(15, false, null, "@"),
    };
}
