export interface IFormInput {
    fullName: string,
    fullSurname: string,
    identityNumber: string,
    gender: string,
    email: string,
    phone: number,
    specialty:string,
    specialist: string,
}
export interface specialty {
    _id: string,
    name: string,
}
export interface error {
    error: string
}