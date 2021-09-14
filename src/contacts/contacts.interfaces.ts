
export interface CreateContact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

export interface Contact extends CreateContact {
    key: string;
}
