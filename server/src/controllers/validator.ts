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
