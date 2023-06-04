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

// export const userValidator = (object:user):user => {
//     return '_id' && 'user' && 'name' && 'lastName' && 'email' && 'phone' && 'role' in object
//     && typeof(Object)
// }
// name:String,
// lastName:String,
// email:String,
// phone:String,
// role:String,