class SignUpPage {
  async signUp(config) {
    await waitFor(element(by.id("create-account-text"))).toBeVisible();
    await waitFor(element(by.id("twitter-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("facebook-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("google-icon-btn"))).toBeVisible();
    await element(by.id("user-name")).typeText(config.username);
    await element(by.id("user-name")).tapReturnKey();
    await element(by.id("first-name")).typeText(config.firstname);
    await element(by.id("first-name")).tapReturnKey();
    await element(by.id("last-name")).typeText(config.lastname);
    await element(by.id("last-name")).tapReturnKey();
    await element(by.id("email-address")).typeText(config.email);
    await element(by.id("email-address")).tapReturnKey();
    await element(by.id("password")).typeText(config.password);
    await element(by.id("password")).tapReturnKey();
    await element(by.id("password-confirmation")).typeText(config.password);
    await element(by.id('password-confirmation')).tapReturnKey();
    await waitFor(element(by.id('sign-up-button'))).toBeVisible();
    // await element(by.id('sign-up-button')).tap();
  }
}
module.exports = new SignUpPage();
