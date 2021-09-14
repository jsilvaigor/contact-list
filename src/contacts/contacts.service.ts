import {Contact, CreateContact} from "./contacts.interfaces";
import {Logger} from "../utils/logger";
import Joi from "joi";
import {BadRequestError, NotFoundError} from "routing-controllers";
import {FirebaseDatabase} from "../utils/firebase.database";

export class ContactsService {

    public async createContact(body: CreateContact, userId: string, requestId: string): Promise<Contact> {
        this.validateCreateBody(body);
        const database = await FirebaseDatabase.getInstance();
        const refBase = `users/${userId}/contacts`;
        const userRef = database.child(refBase);
        const {key} = await userRef.push(body);
        const result = await database.child(`${refBase}/${key}`).get();
        return {key, ...result.val()};
    }

    public async retrieveAllContacts(userId: string, requestId: string): Promise<Contact[]> {
        const database = await FirebaseDatabase.getInstance();
        const refBase = `users/${userId}/contacts`;
        const contactsRef = await database.child(refBase).get();
        const result = contactsRef.val();
        if (result) {
            return Object.keys(result).map((key) => {
                return {key, ...result[key]};
            });
        } else {
            throw new NotFoundError("No contacts found for this user.");
        }

    }

    private validateCreateBody(body: CreateContact): boolean {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            address: Joi.string().required(),
        });

        const {error, value} = schema.validate(body);
        if (error) {
            Logger.error(error);
            throw new BadRequestError(error.message);
        }
        return true;
    }

}
