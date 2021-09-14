import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class UserModel {
    @PrimaryGeneratedColumn("uuid")
    // tslint:disable-next-line
    public user_uuid: string;
    @Column()
    public email: string;
    @Column({name: "password_hashed"})
    public password: string;

    constructor(user: {email: string, password: string} = null) {
        if (user) {
            this.email = user.email;
            this.password = user.password;
        }
    }
}
