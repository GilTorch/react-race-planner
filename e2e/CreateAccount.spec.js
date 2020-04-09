/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');

describe('Account', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const email = `${firstName}.${lastName}@gmail.com`;
  const config = {
    username: userName.toLowerCase(),
    firstname: firstName,
    lastname: lastName,
    email: email.toLowerCase(),
    password: '**********',
    password_confirmation: '**********'
  };

  describe('_createAccount', () => {
    it('Should ensure that logo is visible on screen', async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it('Should ensure that screen is scrolled upwards', async () => {
      await signUpPage.scrollScreenUp();
    });

    it('Should ensure that login link can redirect to sign page', async () => {
      await signUpPage.loginAccount.tap();
    });

    it('Should go back to sign up page', async () => {
      await signUpPage.backToSignUpPage.tap();
    });

    it('Should ensure that screen is scrolled downwards', async () => {
      await signUpPage.scrollScreenDown();
    });

    it('Should render text `Create an Account`', async () => {
      await expect(element(by.id('create-account-text'))).toBeVisible();
    });

    it('Should ensure a valid username input existence', async () => {
      await signUpPage.enterUsername(config);
    });

    it('Should ensure a valid first name input existence', async () => {
      await signUpPage.enterFirstName(config);
    });

    it('Should ensure a valid last name input existence', async () => {
      await signUpPage.enterLastName(config);
    });

    it('Should ensure a valid email address input existence', async () => {
      await signUpPage.enterEmail(config);
    });

    it('Should ensure that screen is scrolled upwards', async () => {
      await signUpPage.scrollScreenUp();
    });

    it('Should ensure a valid password input existence', async () => {
      await signUpPage.enterPassword(config);
    });

    it('Should ensure a valid password confirmation input existence', async () => {
      await signUpPage.enterPasswordConfirmation(config);
    });

    it('Should ensure twitter icon is visible on screen', async () => {
      await expect(element(by.id('twitter-icon-btn'))).toBeVisible();
    });

    it('Should ensure facebook icon is visible on screen', async () => {
      await expect(element(by.id('facebook-icon-btn'))).toBeVisible();
    });

    it('Should ensure google icon is visible on screen', async () => {
      await expect(element(by.id('google-icon-btn'))).toBeVisible();
    });

    it('Should ensure that submit button exists and is clickable', async () => {
      await signUpPage.submitCredentials();
    });
  });
});
