import {Get, JsonController} from "routing-controllers";
import {RegisterService} from "../auth/register/register.service";
import {DatabaseConnection} from "../utils/database.connection";
import envVars from "../utils/environment";

@JsonController()
export class HealthController {

    @Get("/health")
    public async getApplicationHealth() {
        return {
            running: true,
            node_env: envVars.NODE_ENV,
            database: await DatabaseConnection.healthCheck(),
        };
    }

}
