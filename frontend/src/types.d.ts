interface medicalHistory {
    _id?: string;
    fullName?: string;
    fullSurname?: string;
    dni?: string;
    gender?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    specialty?: string;
    specialist?: string;
    smoke?: string;
    alcohol?: string;
    canavis?: string;
    cocaine?: string;
    attention?: {
        date?: string;
        reason?: string;
        result?: string;
    }[];
    background?: {
        relationship?: string;
        details?: string;
    }[];
}
type item =
    | "_id"
    | "fullName"
    | "fullSurname"
    | "dni"
    | "gender"
    | "email"
    | "phone"
    | "specialty"
    | "specialist"
    | "smoke"
    | "alcohol"
    | "canavis"
    | "cocaine"
    | "dateOfBirth"
    | `attention.${number}.date`
    | `attention.${number}.reason`
    | `attention.${number}.result`
    | `background.${number}.details`
    | `background.${number}.relationship`;
interface specialty {
    _id?: string;
    name?: string;
}
interface error {
    error: string;
}
interface specialistByspecialty {
    _id: string;
    name: string;
    lastName: string;
}
interface specialist {
    _id?: string;
    name?: string;
    lastName?: string;
    specialty?: string;
    specialtyName?: string;
    phone?: string;
    email?: string;
    sex?: string;
    dateOfBirth?: string;
    dni?: string;
}

interface credential {
    user: string;
    password: string;
    rePassword: string;
    _idUser: string;
}

interface queue {
    _id: string;
    dni: string;
    specialist: string;
    specialty: string;
    patient: string;
}
type itemsSelect = {
    text: string;
    value: string;
};
