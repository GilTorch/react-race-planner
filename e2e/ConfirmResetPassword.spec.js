/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');
const passwordForgottenPage = require('./screens/PasswordForgottenPage');
const confirmResetPasswordPage = require('./screens/ConfirmResetPasswordPage');

describe('Confirm Reset Password', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    email: email.toLowerCase(),
    oneTimePassword: '2134567',
    newPassword: 'myNewPassword',
    confirmNewPassword: 'myNewPassword'
  };

  it('Should ensure that logo is visible on screen', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await signInPage.passwordForgottenLink.tap();
    await passwordForgottenPage.enterLoginEmail(config);
    await passwordForgottenPage.submitLoginCredentials.tap();
    await expect(element(by.id('logo-'))).toBeVisible();
    await confirmResetPasswordPage.scrollScreenUp();
  });

  it('Should ensure login link is clickable and can navigate to `Log in` page', async () => {
    await confirmResetPasswordPage.returnToLoginPage.tap();
  });

  it('Should redirect back to `Reset Your Password` page', async () => {
    await signInPage.passwordForgottenLink.tap();
    await passwordForgottenPage.enterLoginEmail(config);
    await passwordForgottenPage.submitLoginCredentials.tap();
  });

  it('Should ensure one-time password input existence', async () => {
    await confirmResetPasswordPage.enterOneTimePassword(config);
  });

  it('Should ensure new password input existence', async () => {
    await confirmResetPasswordPage.enterNewPassword(config);
  });

  it('Should ensure confirmed new password input existence', async () => {
    await confirmResetPasswordPage.enterConfirmedNewPassword(config);
  });

  it('Should ensure `Reset Password` button exists and is clickable', async () => {
    await confirmResetPasswordPage.submitResetPassword.tap();
  });
});
