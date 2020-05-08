import * as yup from 'yup';

// const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Must be at least 3 characters')
    .required('Username is required.'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().when('socialAccount', {
    is: true,
    then: yup.string(),
    otherwise: yup
      .string()
      .min(8, 'Password must be at last 8 characters long')
      .required('Password is required')
  }),
  password2: yup.string().when('socialAccount', {
    is: true,
    then: yup.string(),
    otherwise: yup
      .string()
      .oneOf([yup.ref('password'), null], "Password confirmation doesn't match the password")
      .required('Password confirmation is required')
  }),
  socialAccount: yup.boolean()
});
