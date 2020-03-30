class ConfirmResetPasswordPage {
  async confirmResetPassword(config) {
    await waitFor(element(by.id("password-field-1"))).toBeVisible();
    await element(by.id("password-field-1")).typeText(config.oneTimePassword);

    await waitFor(element(by.id("new-password-field"))).toBeVisible();
    await element(by.id("new-password-field")).typeText(config.newPassword);

    await waitFor(element(by.id("confirm-new-password-field"))).toBeVisible();
    await element(by.id("confirm-new-password-field")).typeText(
      config.confirmNewPassword
    );
    await element(by.id("reset-password-button")).tap();
  }
}
module.exports = new ConfirmResetPasswordPage();
