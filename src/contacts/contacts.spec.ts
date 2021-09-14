import {FirebaseDatabase} from "../utils/firebase.database";
import envVars from "../utils/environment";
import request from "supertest";
import {app} from "../test/jest.setup";
import {getTestContactBody, getTestAuthBody, getTestAuthToken} from "../test/test.utils";

describe("Contacts POST", () => {
    let token: string
    beforeAll( async () => {
        token = await getTestAuthToken()
    })

    it("Should return Forbidden if token is not present", async () => {
        const response = await request(app).post(`${envVars.PREFIX}/contacts`).expect(403)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Missing or invalid token provided.")
    })

    it("Should return Forbidden if a invalid token is provided", async () => {
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer invalidJWT`).expect(403)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Missing or invalid token provided.")
    })

    it("Should create a contact successfully", async () => {
        const contact = getTestContactBody()
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(201)
        expect(response.body.key).toBeDefined()
        expect(response.body.firstName).toBe(contact.firstName)
        expect(response.body.lastName).toBe(contact.lastName)
        expect(response.body.phoneNumber).toBe(contact.phoneNumber)
        expect(response.body.address).toBe(contact.address)
    })

    it("Should return a required error if firstName is not provided", async () => {
        let contact = getTestContactBody()
        delete contact.firstName
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(400)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe('"firstName" is required')
    })

    it("Should return a required error if lastName is not provided", async () => {
        const contact = getTestContactBody()
        delete contact.lastName
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(400)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe('"lastName" is required')
    })

    it("Should return a required error if phoneNumber is not provided", async () => {
        const contact = getTestContactBody()
        delete contact.phoneNumber
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(400)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe('"phoneNumber" is required')
    })

    it("Should return a required error if address is not provided", async () => {
        const contact = getTestContactBody()
        delete contact.address
        const response = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(400)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe('"address" is required')
    })

})

describe("Contacts GET", () => {
    let token: string
    beforeAll( async () => {
        token = await getTestAuthToken()
    })

    it("Should return Forbidden if token is not present", async () => {
        const response = await request(app).get(`${envVars.PREFIX}/contacts`).expect(403)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Missing or invalid token provided.")
    })

    it("Should return Forbidden if a invalid token is provided", async () => {
        const response = await request(app).get(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer invalidJWT`).expect(403)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("Missing or invalid token provided.")
    })

    it("Should return NotFound if no contacts are saved yet.", async () => {
        const response = await request(app).get(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`).expect(404)
        expect(response.body.message).toBeDefined()
        expect(response.body.message).toBe("No contacts found for this user.")
    })

    it("Should return One contact after One is saved", async () => {
        const contact = getTestContactBody()
        const saved = await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contact).expect(201)
        const {key} = saved.body
        const response = await request(app).get(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`).expect(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toMatchObject({key, ...contact})
    })

    it("Should return a list of contacts with length Three if Two more are saved", async () => {
        const contactTwo = getTestContactBody()
        await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contactTwo).expect(201)
        const contactThree = getTestContactBody()
        await request(app).post(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`)
            .send(contactThree).expect(201)

        const response = await request(app).get(`${envVars.PREFIX}/contacts`)
            .set("Authorization", `Bearer ${token}`).expect(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBe(3)
    })

})
