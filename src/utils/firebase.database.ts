import * as firebaseAdmin from "firebase-admin";
import {database} from "firebase-admin";
import envVars from "./environment";
import Reference = database.Reference;
import Database = database.Database;

export class FirebaseDatabase {

    public static instance: Reference;
    public static database: Database;

    public static async getInstance(reference: string = envVars.FIREBASE_REFERENCE) {
        if (!FirebaseDatabase.instance) {
            await firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(envVars.FIREBASE_SERVICE_ACCOUNT_KEY),
                databaseURL: envVars.FIREBASE_DATABASE_URL,
            });
            FirebaseDatabase.database = await firebaseAdmin.database();
            FirebaseDatabase.instance = await FirebaseDatabase.database.ref(reference);
        }
        return FirebaseDatabase.instance;
    }

}
