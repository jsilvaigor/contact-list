import "reflect-metadata";
import envVars from "./utils/environment";

console.log(`NODE_ENV=${envVars.NODE_ENV}, LOG_LEVEL=${envVars.LOG_LEVEL}`)
