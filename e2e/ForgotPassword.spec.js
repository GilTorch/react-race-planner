/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');
const passwordForgottenPage = require('./screens/PasswordForgottenPage');

describe('Password Forgotten', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    email: email.toLowerCase()
  };

  describe('_passwordForgotten', () => {
    it('Should ensure that logo is visible on screen', async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it('Should ensure that screen is scrolled upwards', async () => {
      await signUpPage.scrollScreenUp();
    });

    it('Should ensure that login link can navigate to signin page', async () => {
      await signUpPage.loginAccount.tap();
    });

    it('Should navigate to forgot password page on click', async () => {
      await signInPage.passwordForgottenLink.tap();
    });

    it('Should ensure that login link can navigate to signin page on click', async () => {
      await passwordForgottenPage.returnToLoginPage.tap();
    });

    it('Should navigate back to forgot password page on click', async () => {
      await signInPage.passwordForgottenLink.tap();
    });

    it('Should send and reset password', async () => {
      await passwordForgottenPage.enterLoginEmail(config);
    });

    it('Should ensure that ssend passord button exists & is clicked & navigate to reset password page', async () => {
      await passwordForgottenPage.submitLoginCredentials.tap();
    });
  });
});
