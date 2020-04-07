/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class PasswordForgottenPage {
  async enterLoginEmail(config) {
    await element(by.id('add-email-address-to-reset')).typeText(config.email);
    await element(by.id('add-email-address-to-reset')).tapReturnKey();
  }

  get returnToLoginPage() {
    return element(by.id('return-to-login-page'));
  }

  get submitLoginCredentials() {
    return element(by.id('reset-password-button'));
  }
}

module.exports = new PasswordForgottenPage();
