/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class SignUpPage {
  async signUp(config) {
    waitFor(element(by.id('create-account-text'))).toBeVisible();
    await element(by.id('user-name')).typeText(config.username);
    await element(by.id('user-name')).tapReturnKey();
    await element(by.id('first-name')).typeText(config.firstname);
    await element(by.id('first-name')).tapReturnKey();
    await element(by.id('last-name')).typeText(config.lastname);
    await element(by.id('last-name')).tapReturnKey();
    await element(by.id('email-address')).typeText(config.email);
    await element(by.id('email-address')).tapReturnKey();
    await element(by.id('password')).swipe('up', 'slow', 0.9);
    await element(by.id('password')).typeText(config.password);
    await element(by.id('password')).tapReturnKey();
    await element(by.id('password-confirmation')).typeText(config.password);
    await element(by.id('password-confirmation')).tapReturnKey();
    waitFor(element(by.id('twitter-icon-btn'))).toBeVisible();
    waitFor(element(by.id('facebook-icon-btn'))).toBeVisible();
    waitFor(element(by.id('google-icon-btn'))).toBeVisible();
    waitFor(element(by.id('sign-up-button'))).toBeVisible();
    await element(by.id('sign-up-button')).tap();
  }

  get loginAccount() {
    return element(by.id('go-to-loggin-page'));
  }
}
module.exports = new SignUpPage();
