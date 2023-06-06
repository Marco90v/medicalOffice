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
    specialty: string
}

interface specialistByspecialty {
    idSpecialty: string
}