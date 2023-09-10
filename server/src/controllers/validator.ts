export const loginReqValidator = (object: login): login | false => {
  return "user" &&
    "password" in object &&
    typeof object.user === "string" &&
    typeof object.password === "string"
    ? {
        user: object.user,
        password: object.password,
      }
    : false;
};
export const updateLoginReqValidator = (
  object: updateLogin
): updateLogin | false => {
  return "_id" &&
    "user" &&
    "password" &&
    "rePassword" &&
    "_idUser" in object &&
    typeof object._id === "string" &&
    typeof object.user === "string" &&
    typeof object.password === "string" &&
    typeof object.rePassword === "string" &&
    typeof object._idUser === "string" &&
    object.password === object.rePassword
    ? {
        _id: object._id,
        user: object.user,
        password: object.password,
        rePassword: object.rePassword,
        _idUser: object._idUser,
      }
    : false;
};
export const specialtyReqValidator = (
  object: setSpecialty
): setSpecialty | false => {
  return "name" in object && typeof object.name === "string"
    ? {
        name: object.name,
      }
    : false;
};
export const specialtyIdReqValidator = (
  object: specialtyId
): specialtyId | false => {
  return "_id" in object && typeof object._id === "string"
    ? {
        _id: object._id,
      }
    : false;
};
export const updateSpecialtyReqValidator = (
  object: specialty
): specialty | false => {
  return "_id" &&
    "name" in object &&
    typeof object._id === "string" &&
    typeof object.name === "string"
    ? {
        _id: object._id,
        name: object.name,
      }
    : false;
};
export const specialistByspecialtyReqValidator = (
  object: specialistByspecialty
): specialistByspecialty | false => {
  return "idSpecialty" in object && typeof object.idSpecialty === "string"
    ? {
        idSpecialty: object.idSpecialty,
      }
    : false;
};

export const specialistReqValidator = (object: specialist): any | false => {
  return "_id" &&
    "name" &&
    "lastName" &&
    "specialty" &&
    "phone" &&
    "email" &&
    "sex" &&
    "dateOfBirth" &&
    "dni" in object &&
    typeof object._id === "string" &&
    typeof object.name === "string" &&
    typeof object.lastName === "string" &&
    typeof object.specialty === "string" &&
    typeof object.phone === "string" &&
    typeof object.email === "string" &&
    typeof object.sex === "string" &&
    typeof object.dateOfBirth === "string" &&
    typeof object.dni === "string"
    ? {
        _id: object._id,
        name: object.name,
        lastName: object.lastName,
        specialty: object.specialty,
        phone: object.phone,
        email: object.email,
        sex: object.sex,
        dateOfBirth: object.dateOfBirth,
        dni: object.dni,
      }
    : false;
};

export const removeSpecialistReqValidator = (
  object: specialist
): { _id: string } | false => {
  return "_id" in object && typeof object._id === "string"
    ? {
        _id: object._id,
      }
    : false;
};

export const removeLoginReqValidator = (object: loginId): loginId | false => {
  return "_id" in object && typeof object._id === "string"
    ? {
        _id: object._id,
      }
    : false;
};

export const setPatientProfileReqValidator = (
  object: patient
): patient | false => {
  return "dni" &&
    "fullName" &&
    "fullSurname" &&
    "gender" &&
    "email" &&
    "phone" &&
    "specialty" &&
    "specialist" &&
    "dateOfBirth" in object &&
    typeof object.dni === "string" &&
    typeof object.fullName === "string" &&
    typeof object.fullSurname === "string" &&
    typeof object.gender === "string" &&
    typeof object.email === "string" &&
    typeof object.dateOfBirth == "string" &&
    typeof object.phone === "string"
    ? {
        dni: object.dni,
        fullName: object.fullName,
        fullSurname: object.fullSurname,
        gender: object.gender,
        email: object.email,
        phone: object.phone,
        dateOfBirth: object.dateOfBirth,
      }
    : false;
};

export const patientId = (object: patientDni): patientDni | false => {
  return "dni" in object && typeof object.dni === "string"
    ? {
        dni: object.dni,
      }
    : false;
};

export const setQueueReqValidator = (
  object: patientComplet
): patientQueue | false => {
  return "dni" &&
    "specialist" &&
    "specialty" in object &&
    typeof object.dni === "string" &&
    typeof object.specialist === "string" &&
    typeof object.specialty === "string"
    ? {
        dni: object.dni,
        specialist: object.specialist,
        specialty: object.specialty,
      }
    : false;
};

export const setUpdatePatienteReqValidator = (
  object: patient
): patient | false => {
  return ("dni" &&
    "fullName" &&
    "fullSurname" &&
    "gender" &&
    "email" &&
    "phone" &&
    "specialty" &&
    "specialist" &&
    "dateOfBirth") ||
    "smoke" ||
    "alcohol" ||
    "canavis" ||
    "cocaine" ||
    "background" ||
    ("attention" in object &&
      typeof object.dni === "string" &&
      typeof object.fullName === "string" &&
      typeof object.fullSurname === "string" &&
      typeof object.gender === "string" &&
      typeof object.email === "string" &&
      typeof object.phone === "string" &&
      typeof object.dateOfBirth == "string") ||
    typeof object.smoke === "string" ||
    typeof object.alcohol === "string" ||
    typeof object.canavis === "string" ||
    typeof object.cocaine === "string" ||
    typeof object.background === "object" ||
    typeof object.attention === "object"
    ? {
        dni: object.dni,
        fullName: object.fullName,
        fullSurname: object.fullSurname,
        gender: object.gender,
        email: object.email,
        phone: object.phone,
        dateOfBirth: object.dateOfBirth,
        smoke: object?.smoke || "",
        alcohol: object?.alcohol || "",
        canavis: object?.canavis || "",
        cocaine: object?.cocaine || "",
        background: object?.background || [],
        attention: object?.attention || [],
      }
    : false;
};
