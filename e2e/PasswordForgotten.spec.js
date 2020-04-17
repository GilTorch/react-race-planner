/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const signInPage = require('./screens/SignInPage');
const passwordForgottenPage = require('./screens/PasswordForgottenPage');

describe('Password Forgotten', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const email = `${firstName}.${lastName}@gmail.com`;
  const config = {
    email: email.toLowerCase()
  };

  it('Should ensure that logo is visible on screen', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await signInPage.passwordForgottenLink.tap();
    await expect(element(by.id('logo--'))).toBeVisible();
  });

  it('Should ensure login link is clickable and can navigate to `Log in` page', async () => {
    await passwordForgottenPage.returnToLoginPage.tap();
  });

  it('Should redirect back to `Reset Your Password` page', async () => {
    await signInPage.passwordForgottenLink.tap();
  });

  it('Should ensure a valid email input existence', async () => {
    await passwordForgottenPage.enterLoginEmail(config);
  });

  it('Should ensure `Send Password Reset Code` submit button exists and is clickable', async () => {
    await passwordForgottenPage.submitLoginCredentials.tap();
  });
});
