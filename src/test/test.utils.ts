import faker from "faker";
import {AuthBody} from "../auth/auth.interface";
import {v4 as uuidV4} from "uuid";
import {CreateContact} from "../contacts/contacts.interfaces";
import request from "supertest";
import {app} from "./jest.setup";
import envVars from "../utils/environment";
export function getTestAuthBody(): AuthBody {
    return {
        email: `${uuidV4()}${faker.datatype.number()}@email.com`,
        password: faker.internet.password(15, false, null, "@"),
    };
}

export function getTestContactBody(): CreateContact {
    return {
        address: faker.address.streetAddress(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.phoneNumber(),
    };
}

export async function getTestAuthToken(): Promise<string> {
    const registerBody = getTestAuthBody();
    const response = await request(app).post(`${envVars.PREFIX}/auth/register`).send(registerBody);
    return response.body.token;
}
