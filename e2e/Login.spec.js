/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');

describe('Login', () => {
  const userName = casual.username;
  const config = {
    username: userName,
    password: '**********'
  };

  describe('_login', () => {
    it('Should ensure logo is visible on screen', async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it('Should ensure screen is scrolled upwards', async () => {
      await signUpPage.scrollScreenUp();
    });
    it('Should ensure that login link can navigate to sign page on click', async () => {
      await signUpPage.loginAccount.tap();
    });

    it('Should ensure that signup link can navigate back to sign up page on click', async () => {
      await signUpPage.backToSignUpPage.tap();
    });

    it('Should navigate back to sign page to login', async () => {
      await signUpPage.loginAccount.tap();
    });

    it('Should navigate to forgot password page on click', async () => {
      await signInPage.passwordForgottenLink.tap();
    });

    it('Should redirect back to login page on click', async () => {
      await signInPage.getBackToLoginPage.tap();
    });

    it('Should ensure a valid login username existence', async () => {
      await signInPage.enterLoginUsername(config);
    });
    it('Should ensure a valid login password existence', async () => {
      await signInPage.enterLoginPassword(config);
    });

    it('Should ensure twitter icon is visible on screen', async () => {
      await expect(element(by.id('twitter-icon-button'))).toBeVisible();
    });

    it('Should ensure facebook icon is visible on screen', async () => {
      await expect(element(by.id('facebook-icon-button'))).toBeVisible();
    });

    it('Should ensure google icon is visible on screen', async () => {
      await expect(element(by.id('google-icon-button'))).toBeVisible();
    });

    it('Should ensure that login submition button exists & is clicked', async () => {
      await signInPage.submitLoginCredentials();
    });
  });
});
