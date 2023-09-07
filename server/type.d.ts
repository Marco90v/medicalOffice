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
interface loginId{
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
interface attention {
    date?:string,
    reason?:string,
    result?:string,
}

interface patient {
    dni: string,
    fullName: string,
    fullSurname: string,
    gender: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    _id?: string,
    smoke?: string,
    alcohol?: string,
    canavis?: string,
    cocaine?: string,
    background?: background[],
    attention?:attention[]
}

interface patientComplet extends patient{
    specialist: string,
    specialty: string,
}

interface patientDni {
    dni: string
}

interface updateLogin {
    _id:string,
    user:string,
    password:string,
    rePassword:string,
    _idUser:string
}

interface patientQueue {
    dni: string,
    specialist: string,
    specialty: string,
}