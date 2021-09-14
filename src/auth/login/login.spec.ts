import {AuthBody} from "../auth.interface";
import {getTestAuthBody} from "../../test/test.utils";
import request from "supertest";
import {app} from "../../test/jest.setup";
import envVars from "../../utils/environment";

describe("Login", () => {

    let user: AuthBody;
    beforeAll(async () => {
        user = getTestAuthBody();
        await request(app).post(`${envVars.PREFIX}/auth/register`).send(user);
    });

    it("should login successfully", async () => {
        const response = await request(app).post(`${envVars.PREFIX}/auth/login`).send(user).expect(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });

    // e-mail validations
    it("should return Unauthorized when a e-mail not registered is sent", async () => {
        const wrongUser = { email: "notregistered@email.com", password: "Pass_w0rd"};
        const response = await request(app).post(`${envVars.PREFIX}/auth/login`).send(wrongUser).expect(401);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("E-mail or password informed is wrong.");
    });
    it("should return an error of required e-mail", async () => {
        const wrongUser = { password: "Pass_w0rd"};
        const response = await request(app).post(`${envVars.PREFIX}/auth/login`)
            .send(wrongUser)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('"email" is required');
    });

    it("should return an error of invalid e-mail", async () => {
        const wrongUser = {email: "invalid@email", password: "Pass_w0rd"};

        const response = await request(app).post(`${envVars.PREFIX}/auth/login`)
            .send(wrongUser)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('"email" must be a valid email');
    });

    // password validations
    it("should return Unauthorized when a wrong password for a registered user is sent", async () => {
        const wrongUser = { email: user.email, password: "Pass_w0rd"};
        const response = await request(app).post(`${envVars.PREFIX}/auth/login`).send(wrongUser).expect(401);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("E-mail or password informed is wrong.");
    });

});
