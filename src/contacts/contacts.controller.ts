import {Body, CurrentUser, Get, HeaderParam, HttpCode, JsonController, Post} from "routing-controllers";
import {CreateContact} from "./contacts.interfaces";
import {ContactsService} from "./contacts.service";
import {AuthUser} from "../utils/auth.utils";

@JsonController("/contacts")
export class ContactsController {

    constructor(private readonly contactsService: ContactsService = new ContactsService()) {
    }

    @HttpCode(201)
    @Post("/")
    public createContact(@Body() body: CreateContact,
                         @HeaderParam("x-request-id") requestId: string,
                         @CurrentUser({required: true}) user: AuthUser,
                  ) {
        return this.contactsService.createContact(body, user.userId, requestId);
    }

    @Get("/")
    public retrieveAllContacts(@HeaderParam("x-request-id") requestId: string,
                               @CurrentUser({required: true}) user: AuthUser,
                  ) {
        return this.contactsService.retrieveAllContacts(user.userId, requestId);
    }

}
