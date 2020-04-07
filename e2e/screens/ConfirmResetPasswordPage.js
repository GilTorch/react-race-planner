/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class ConfirmResetPasswordPage {
  async enterOneTimePassword(config) {
    await element(by.id('password-field-1')).typeText(config.oneTimePassword);
    await element(by.id('password-field-1')).tapReturnKey();
  }

  async enterNewPassword(config) {
    await element(by.id('new-password-field')).typeText(config.newPassword);
    await element(by.id('new-password-field')).tapReturnKey();
  }

  async enterConfirmedNewPassword(config) {
    await element(by.id('confirm-new-password-field')).typeText(config.newPassword);
    await element(by.id('confirm-new-password-field')).tapReturnKey();
  }

  async scrollScreenUp() {
    await element(by.id('password-field-1')).swipe('up', 'slow', 0.9);
  }

  get returnToLoginPage() {
    return element(by.id('return-to-login-page-'));
  }

  get submitResetPassword() {
    return element(by.id('reset-password-button-2'));
  }
}
module.exports = new ConfirmResetPasswordPage();
