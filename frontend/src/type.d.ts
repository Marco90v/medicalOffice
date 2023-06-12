export interface medicalHistory {
    _id?: string,
    fullName?: string,
    fullSurname?: string,
    dni?: string,
    gender?: string,
    email?: string,
    phone?: string,
    specialty?:string,
    specialist?: string,
    smoke?: string,
    alcohol?: string,
    canavis?: string,
    cocaine?: string,
    reason?: string,
    result?: string,
    background?:{
        relationship?: string,
        details?: string
    }[]
}
export interface specialty {
    _id?: string,
    name?: string,
}
export interface error {
    error: string
}
export interface specialistByspecialty{
    _id: string,
    name: string,
    lastName: string
}
export interface specialist{
    _id?: string,
    name?: string,
    lastName?: string,
    specialty?: string,
    specialtyName?: string,
    phone?: string,
    email?: string,
    sex?: string,
    dateOfBirth?: string,
    dni?: string,
}