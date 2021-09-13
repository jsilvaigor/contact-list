import {Get, JsonController} from "routing-controllers";
import envVars from "../utils/environment";
import {DatabaseConnection} from "../utils/database.connection";
import {RegisterService} from "../auth/register/register.service";

@JsonController()
export class HealthController {

    @Get('/health')
    async getApplicationHealth(){
        return {
            "running": true,
            "node_env": envVars.NODE_ENV,
            "database": await DatabaseConnection.healthCheck()
        }
    }

}
