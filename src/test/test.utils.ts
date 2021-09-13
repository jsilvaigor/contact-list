import faker from "faker";
export function getTestRegisterBody() {
    return {
        email: faker.datatype.number() + faker.internet.email(),
        password: faker.internet.password(15, false, null, "@"),
    };
}
