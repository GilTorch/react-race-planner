import * as yup from 'yup';

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .label('email')
    .max(15, 'username:Must be 15 characters or less')
    .required('username:Username is required.'),
  firstName: yup
    .string()
    .max(20, 'firstName:Must be 20 characters or less')
    .required('firstName:First Name is required'),
  lastName: yup
    .string()
    .max(15, 'lastName:Must be 15 characters or less')
    .required('lastName:Last Name is required'),
  email: yup
    .string()
    .email('email:Invalid email address')
    .required('email:Email is required'),
  password: yup.string().when('socialAccount', {
    is: true,
    then: yup.string(),
    otherwise: yup
      .string()
      .min(8, 'password:Password should be at last 8 characters long')
      .matches(passwordRegExp, 'password:Password is not valid.')
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
