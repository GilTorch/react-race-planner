/* eslint-disable no-undef */
const casual = require('casual');
const signInPage = require('./screens/SignInPage');

describe('Login', () => {
  const userName = casual.username;
  const config = {
    username: userName,
    password: 'password'
  };

  describe('_login', () => {
    it('Should ensure logo is visible on screen', async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it('Should ensure valid credential existence', async () => {
      await signInPage.signIn(config);
    });
  });
});
