/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
const signUpPage = require('./SignUpPage');

class SignInPage {
  async signIn(config) {
    await element(by.id('password')).swipe('up', 'slow', 0.9);
    await signUpPage.loginAccount.tap();
    waitFor(element(by.id('login-text'))).toBeVisible();
    waitFor(element(by.id('twitter-icon-btn'))).toBeVisible();
    waitFor(element(by.id('facebook-icon-btn'))).toBeVisible();
    waitFor(element(by.id('google-icon-btn'))).toBeVisible();
    await element(by.id('login-user-name')).typeText(config.username);
    await element(by.id('login-user-name')).tapReturnKey();
    await element(by.id('login-password')).typeText(config.password);
    await element(by.id('login-password')).tapReturnKey();
    waitFor(element(by.id('login-button'))).toBeVisible();
    await element(by.id('login-button')).tap();
  }
}

module.exports = new SignInPage();
