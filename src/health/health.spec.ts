import request from "supertest";
import {app} from "../test/jest.setup";
import envVars from "../utils/environment";

describe("Health Check", () => {
    it("should return 200 with some application info", async () => {
        const response = await request(app).get(`${envVars.PREFIX}/health`);
        expect(response.ok).toBeTruthy();
        expect(response.body.running).toBeTruthy();
        expect(response.body.node_env).toBe("test");
        expect(response.body.database).toBeTruthy();
    });
});
