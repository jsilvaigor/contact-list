import {getTestAuthBody} from "../../test/test.utils";
import request from "supertest";
import {app} from "../../test/jest.setup";
import envVars from "../../utils/environment";

describe("Register User", () => {

    it("should register a user successfully", async () => {
        const registerBody = getTestAuthBody();
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`).send(registerBody).expect(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });
    it("should return an error of duplicated user", async () => {
        let registerBody = getTestAuthBody();
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`).send(registerBody).expect(200);
        const errorResponse = await request(app).post(`${envVars.PREFIX}/auth/register`).send(registerBody).expect(400);
        expect(errorResponse.body.message).toBeDefined();
        expect(errorResponse.body.message).toBe("E-mail informed is already registered.");
    });

    // e-mail tests
    it("should return an error of required e-mail", async () => {
        let registerBody = getTestAuthBody();
        delete registerBody.email;
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('email - "email" is required');
    });

    it("should return an error of invalid e-mail", async () => {
        let registerBody = getTestAuthBody();
        registerBody.email = "invalid@email";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('email - "email" must be a valid email');
    });

    // password tests
    it("should return an error of required password", async () => {
        let registerBody = getTestAuthBody();
        delete registerBody.password;
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('password - "password" is required');
    });
    it("should return an error of incorrect password length", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "Pass_w0";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('password - "password" length must be at least 8 characters long');
    });
    it("should return an error of required uppercase in password", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "pass_w0rd";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("password - should contain at least 1 uppercase character");
    });
    it("should return an error of required lowercase in password", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "PASS_W0RD";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("password - should contain at least 1 lowercase character");
    });
    it("should return an error of required special character in password", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "Passw0rd";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("password - should contain at least 1 special character");
    });
    it("should return an error of required number in password", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "Pass_word";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("password - should contain at least 1 numeric character");
    });
    it("should return an error of invalid whitespace in password", async () => {
        let registerBody = getTestAuthBody();
        registerBody.password = "Pass_  w0rd";
        const response = await request(app).post(`${envVars.PREFIX}/auth/register`)
            .send(registerBody)
            .expect(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe("password - should not contain white spaces");
    });

});
