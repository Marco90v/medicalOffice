interface login {
    user: string,
    password: string
}
interface user {
    _id: mongoose.Schema.Types.ObjectId,
    user: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
}
interface token {
    _id: string,
    name: string,
    user: string
}
interface specialty {
    _id: string,
    name: string
}
interface setSpecialty {
    name: string
}
interface specialtyId{
    _id:string
}
interface specialistByspecialty {
    idSpecialty: string
}
interface specialist {
    _id: string,
    name: string,
    lastName: string,
    specialty: string,
    phone: string,
    email: string,
    sex: string,
    dateOfBirth: string,
    dni: string,
}

interface background {
    relationship?: string,
    details?: string
}

interface patient {
    dni: string,
    fullName: string,
    fullSurname: string,
    gender: string,
    email: string,
    phone: string,
    _id?: string,
    smoke?: string,
    alcohol?: string,
    canavis?: string,
    cocaine?: string,
    background?: background[]
}