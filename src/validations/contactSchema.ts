import * as yup from 'yup';

const phoneNumberRegularExpression =
  /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  email: yup.string().email('Email is invalid').nullable(),
  phoneNumber: yup
    .string()
    .trim()
    .when({
      is: (phoneNumber: string) => phoneNumber === '',
      then: yup.string(),
      otherwise: yup
        .string()
        .matches(phoneNumberRegularExpression, 'phone number is not valid'),
    }),
  workNumber: yup
    .string()
    .trim()
    .when({
      is: (workNumber: string) => workNumber === '',
      then: yup.string(),
      otherwise: yup
        .string()
        .matches(phoneNumberRegularExpression, 'work number is not valid'),
    }),
  homeNumber: yup
    .string()
    .trim()
    .when({
      is: (homeNumber: string) => homeNumber === '',
      then: yup.string(),
      otherwise: yup
        .string()
        .matches(phoneNumberRegularExpression, 'home number is not valid'),
    }),
  favourite: yup.boolean(),
  photograph: yup.string(),
});

export default contactSchema;
