import * as yup from 'yup';

// const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .label('email')
    .max(15, 'Must be 15 characters or less')
    .required('Username is required.'),
  firstName: yup
    .string()
    .max(20, 'Must be 20 characters or less')
    .required('First Name is required'),
  lastName: yup
    .string()
    .max(15, 'Must be 15 characters or less')
    .required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().when('socialAccount', {
    is: true,
    then: yup.string(),
    otherwise: yup
      .string()
      .min(8, 'password:Password should be at last 8 characters long')
      .required('password:Password is required')
  }),
  password2: yup.string().when('socialAccount', {
    is: true,
    then: yup.string(),
    otherwise: yup
      .string()
      .oneOf([yup.ref('password'), null], "password2:Password don't match")
      .required('password2:Confirm Password is required')
  }),
  socialAccount: yup.boolean()
});
