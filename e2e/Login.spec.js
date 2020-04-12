/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');
const passwordForgottenPage = require('./screens/PasswordForgottenPage');

describe('Login', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    password: '**********'
  };

  it('Should ensure logo is visible on screen', async () => {
    await expect(element(by.id('logo'))).toBeVisible();
    await signUpPage.scrollScreenUp();
  });

  it('Should ensure login link is clickable and can navigate to `Log in` page', async () => {
    await signUpPage.goToLoginAccount.tap();
  });

  it('Should ensure signup link is clickable and can navigate back to `Create an Account` page', async () => {
    await signInPage.backToSignUpPage.tap();
  });

  it('Should ensure signup link is clickable and can navigate back to `Log in` page', async () => {
    await signUpPage.goToLoginAccount.tap();
  });

  it('Should ensure `Forgot your password?` link is clickable and can navigate `Reset Your Password` page', async () => {
    await signInPage.passwordForgottenLink.tap();
  });

  it('Should redirect back to `Log in` page', async () => {
    await passwordForgottenPage.returnToLoginPage.tap();
  });

  it('Should ensure a valid username input existence', async () => {
    await signInPage.enterLoginUsername(config);
  });

  it('Should ensure a valid password input existence', async () => {
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

  it('Should ensure submit button exists and is clickable', async () => {
    await signInPage.submitLoginCredentials();
  });
});
