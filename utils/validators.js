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

export const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Enter your username or your email'),
  password: yup
    .string()
    .min(8)
    .required('Enter your password')
});

export const otpVerificationSchema = yup.object().shape({
  otpCode: yup
    .number()
    .typeError('One-Time Password must be a number')
    .required('One-Time Password is required')
});

export const passwordResetSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Enter your username or your email')
});

export const passwordResetVerificationSchema = yup.object().shape({
  otpCode: yup
    .number()
    .typeError('One-Time Password must be a number')
    .required('Enter the otp code you received by email'),
  newPassword: yup
    .string()
    .min(8, 'Your password should be at least 8 characters')
    .required('Enter your password'),
  newPasswordConfirmation: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords are not the same')
});

export const commentSchema = yup.object().shape({
  content: yup.string().required('Please enter the comment')
});

export const newStorySchema = yup.object().shape({
  title: yup.string().required('Enter a title for the story')
});

export const newReportSchema = yup.object().shape({
  reason: yup.string().required('You need to specify the reason why you are reporting'),
  isActive: yup.boolean().default(true),
  status: yup.string().default('')
});
