/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class SignInPage {
  async enterLoginUsername(config) {
    waitFor(element(by.id("login-text"))).toBeVisible();
    await element(by.id("login-user-name")).typeText(config.username);
    await element(by.id("login-user-name")).tapReturnKey();
  }

  async enterLoginPassword(config) {
    waitFor(element(by.id("twitter-icon-button"))).toBeVisible();
    waitFor(element(by.id("facebook-icon-button"))).toBeVisible();
    waitFor(element(by.id("google-icon-button"))).toBeVisible();
    await element(by.id("login-password")).typeText(config.password);
    await element(by.id("login-password")).tapReturnKey();
  }

  async submitLoginCredentials() {
    waitFor(element(by.id("login-button"))).toBeVisible();
    await element(by.id("login-button")).tap();
  }

  get passwordForgottenLink() {
    return element(by.id("forgot-password-link"));
  }

  // get getBackToLoginPage() {
  //   return element(by.id("return-to-login-page"));
  // }

  get backToSignUpPage() {
    return element(by.id('go-back-to-signup-page'));
  }
}

module.exports = new SignInPage();
