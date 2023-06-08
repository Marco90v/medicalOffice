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
    return 'name' in object
    && typeof (object.name) === 'string' ?
    {
        name:object.name
    } :
    false;
}
export const specialtyIdReqValidator = (object:specialtyId):specialtyId | false => {
    return '_id' in object
    && typeof (object._id) === 'string' ?
    {
        _id:object._id
    } :
    false;
}
export const updateSpecialtyReqValidator = (object:specialty):specialty | false => {
    return '_id' && 'name' in object
    && typeof(object._id) === 'string'
    && typeof(object.name) === 'string' ?
    {
        _id:object._id,
        name:object.name
    }:
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