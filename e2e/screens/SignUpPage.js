/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class SignUpPage {
  async enterUsername(config) {
    waitFor(element(by.id('create-account-text'))).toBeVisible();
    await element(by.id('user-name')).typeText(config.username);
    await element(by.id('user-name')).tapReturnKey();
  }

  async enterFirstName(config) {
    await element(by.id('first-name')).typeText(config.firstname);
    await element(by.id('first-name')).tapReturnKey();
  }

  async enterLastName(config) {
    await element(by.id('last-name')).typeText(config.lastname);
    await element(by.id('last-name')).tapReturnKey();
  }

  async enterEmail(config) {
    await element(by.id('email-address')).typeText(config.email);
    await element(by.id('email-address')).tapReturnKey();
  }

  async scrollScreenUp() {
    await element(by.id('password')).swipe('up', 'slow', 0.9);
  }

  async enterPassword(config) {
    waitFor(element(by.id('twitter-icon-btn'))).toBeVisible();
    waitFor(element(by.id('facebook-icon-btn'))).toBeVisible();
    waitFor(element(by.id('google-icon-btn'))).toBeVisible();
    await element(by.id('password')).typeText(config.password);
    await element(by.id('password')).tapReturnKey();
  }

  async enterPasswordConfirmation(config) {
    await element(by.id('password-confirmation')).typeText(config.password);
    await element(by.id('password-confirmation')).tapReturnKey();
  }

  async submitCredentials() {
    waitFor(element(by.id('sign-up-button'))).toBeVisible();
    await element(by.id('sign-up-button')).tap();
  }

  async scrollScreenDown() {
    await element(by.id('password')).swipe('down', 'slow', 0.9);
  }

  get loginAccount() {
    return element(by.id('go-to-loggin-page'));
  }

  get backToSignUpPage() {
    return element(by.id('go-back-to-signup-page'));
  }
}
module.exports = new SignUpPage();
