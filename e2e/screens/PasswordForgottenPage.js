class PasswordForgottenPage {
  async signIn(config) {
    await waitFor(element(by.id('forgot-password-link'))).toBeVisible();
    await element(by.text("Forget your password?")).tap();
    await element(by.id('email-address')).typeText(config.email);
    await element(by.id('email-address')).tapReturnKey();
    await waitFor(element(by.id('reset-password-button'))).toBeVisible();
    await element(by.id('reset-password-button')).tap();
  }
}

module.exports = new PasswordForgottenPage();
