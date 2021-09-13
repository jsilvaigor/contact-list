import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class UserModel {
    @PrimaryGeneratedColumn({name: "user_uuid"})
    userUUID: string
    @Column()
    email: string
    @Column({name: "password_hashed"})
    password: string

    constructor(user: {email: string, password: string} = null) {
        if(user){
            this.email = user.email;
            this.password = user.password;
        }
    }
}
