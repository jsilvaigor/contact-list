import request from "supertest";
import {App} from "../app";
const app = new App();

describe("Health Check", () => {
    test("should return 200 with some application info", async () => {
        const response = await request(app.getApp()).get("/api/v1/health");
        expect(response.ok).toBeTruthy();
        expect(response.body.running).toBeTruthy();
        expect(response.body.node_env).toBe("test");
        expect(response.body.database).toBeTruthy();
    });
});
