export const loginReqValidator = (object:login):login | false =>{
    return 'user' && 'password' in object
    && typeof(object.user) === 'string'
    && typeof(object.password) === 'string' ?
    {
        user:object.user,
        password:object.password
    } : 
    false;
}
export const specialtyReqValidator = (object:setSpecialty):setSpecialty | false => {
    return 'specialty' in object
    && typeof (object.specialty) === 'string' ?
    {
        specialty:object.specialty
    } :
    false;
}
export const specialistByspecialtyReqValidator = (object:specialistByspecialty):specialistByspecialty | false => {
    return 'idSpecialty' in object
    && typeof (object.idSpecialty) === 'string' ?
    {
        idSpecialty:object.idSpecialty
    } :
    false;
}