import {Get, InternalServerError, JsonController} from "routing-controllers";
import envVars from "../utils/environment";

@JsonController()
export class HealthController {

    @Get('/health')
    getApplicationHealth(){
        return {
            "running": true,
            "node_env": envVars.NODE_ENV
        }
    }

}
