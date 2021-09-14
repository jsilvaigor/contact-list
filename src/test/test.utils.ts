import faker from "faker";
import {AuthBody} from "../auth/auth.interface";
import {CreateContact} from "../contacts/contacts.interfaces";
import request from "supertest";
import {app} from "./jest.setup";
import envVars from "../utils/environment";
export function getTestAuthBody(): AuthBody {
    return {
        email: faker.unique(faker.internet.email),
        password: `1Aa@${faker.internet.password(15)}`,
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
