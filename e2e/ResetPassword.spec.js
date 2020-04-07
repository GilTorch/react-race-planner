/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');
const passwordForgottenPage = require('./screens/PasswordForgottenPage');
const confirmResetPasswordPage = require('./screens/ConfirmResetPasswordPage');

describe('Reset Password', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    email: email.toLowerCase(),
    oneTimePassword: 'OneTimeGeneratedPassword',
    newPassword: 'myNewPassword',
    confirmNewPassword: 'myNewPassword'
  };

  it('Should ensure that screen is scrolled upwards', async () => {
    await signUpPage.scrollScreenUp();
  });

  it('Should ensure that login link can navigate to signin page', async () => {
    await signUpPage.loginAccount.tap();
  });

  it('Should navigate to forgot password page on click', async () => {
    await signInPage.passwordForgottenLink.tap();
  });

  it('Should send and reset password', async () => {
    await passwordForgottenPage.enterLoginEmail(config);
  });

  it('Should ensure that `send password` button exists & is clicked & navigate to reset password page', async () => {
    await passwordForgottenPage.submitLoginCredentials.tap();
  });

  describe('_resetPassword', () => {
    it('Should ensure that logo is visible on screen', async () => {
      await expect(element(by.id('logo-'))).toBeVisible();
    });
    it('Should ensure that screen is scrolled upwards', async () => {
      await confirmResetPasswordPage.scrollScreenUp();
    });

    it('Should ensure that login link can navigate to signin page on click', async () => {
      await confirmResetPasswordPage.returnToLoginPage.tap();
    });

    it('Should navigate back to forgot password page on click', async () => {
      await signInPage.passwordForgottenLink.tap();
    });

    it('Should send and reset password', async () => {
      await passwordForgottenPage.enterLoginEmail(config);
    });

    it('Should ensure that `send password` button exists & is clicked & navigate to reset password page', async () => {
      await passwordForgottenPage.submitLoginCredentials.tap();
    });

    it('Should ensure one time generated password existence', async () => {
      await confirmResetPasswordPage.enterOneTimePassword(config);
    });

    it('Should ensure new password existence', async () => {
      await confirmResetPasswordPage.enterNewPassword(config);
    });

    it('Should ensure confirmed new password existence', async () => {
      await confirmResetPasswordPage.enterConfirmedNewPassword(config);
    });

    it('Should ensure `reset Password` button exists & is clicked', async () => {
      await confirmResetPasswordPage.submitResetPassword.tap();
    });
  });
});
