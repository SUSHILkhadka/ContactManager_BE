import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('password is required'),
});

export default loginSchema;
