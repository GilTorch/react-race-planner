const signUpPage = require("./SignUpPage");

class ConfirmResetPasswordPage {
  async confirmResetPassword(config) {
    await element(by.id("password")).swipe("up", "slow", 0.9);
    await signUpPage.loginAccount.tap();
    await element(by.id("forgot-password-link")).tap();
    await element(by.id("add-email-address-to-reset")).typeText(config.email);
    await element(by.id("add-email-address-to-reset")).tapReturnKey();
    await waitFor(element(by.id("reset-password-button"))).toBeVisible();
    await element(by.id("reset-password-button")).tap();
  }

  async confirmResetPasswordTwo(config) {
    await element(by.id("password-field-1")).typeText(config.oneTimePassword);
    await element(by.id("password-field-1")).tapReturnKey();
    await element(by.id("new-password-field")).typeText(config.newPassword);
    await element(by.id("new-password-field")).tapReturnKey();
    await element(by.id("confirm-new-password-field")).typeText(
      config.newPassword
    );
    await element(by.id("confirm-new-password-field")).tapReturnKey();

    await waitFor(element(by.id("login-button"))).toBeVisible();
    await element(by.id("reset-password-button-2")).tap();
  }
}
module.exports = new ConfirmResetPasswordPage();
