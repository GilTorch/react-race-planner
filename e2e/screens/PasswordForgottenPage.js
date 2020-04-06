/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
const signUpPage = require('./SignUpPage');

class PasswordForgottenPage {
  async putEmail(config) {
    await element(by.id('password')).swipe('up', 'slow', 0.9);
    await signUpPage.loginAccount.tap();
    waitFor(element(by.id('login-text'))).toBeVisible();
    waitFor(element(by.id('twitter-icon-btn'))).toBeVisible();
    waitFor(element(by.id('facebook-icon-btn'))).toBeVisible();
    waitFor(element(by.id('google-icon-btn'))).toBeVisible();
    await element(by.id('forgot-password-link')).tap();
    await element(by.id('add-email-address-to-reset')).typeText(config.email);
    await element(by.id('add-email-address-to-reset')).tapReturnKey();
    waitFor(element(by.id('reset-password-button'))).toBeVisible();
    await element(by.id('reset-password-button')).tap();
  }
}

module.exports = new PasswordForgottenPage();
