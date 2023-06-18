export interface medicalHistory {
    _id?: string,
    fullName?: string,
    fullSurname?: string,
    dni?: string,
    gender?: string,
    email?: string,
    phone?: string,
    dateOfBirth?: string,
    specialty?:string,
    specialist?: string,
    smoke?: string,
    alcohol?: string,
    canavis?: string,
    cocaine?: string,
    attention?:{
        date?: string,
        reason?: string,
        result?: string,
    }[]
    background?:{
        relationship?: string,
        details?: string
    }[]
}
type item = "_id" | 
    "fullName" | 
    "fullSurname" | 
    "dni" | 
    "gender" | 
    "email" | 
    "phone" | 
    "specialty" | 
    "specialist" | 
    "smoke" | 
    "alcohol" | 
    "canavis" | 
    "cocaine" | 
    `attention.${number}.date` | 
    `attention.${number}.reason` | 
    `attention.${number}.result` | 
    `background.${number}.details` |
    `background.${number}.relationship`;
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