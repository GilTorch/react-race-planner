class SignInPage {
  async signIn(config) {
    await waitFor(element(by.id("go-to-loggin-page"))).toBeVisible();
    await element(by.id("go-to-loggin-page")).tap();
    await waitFor(element(by.id("login-text"))).toBeVisible();
    await element(by.id("login-user-name")).typeText(config.username);
    await element(by.id("login-user-name")).tapReturnKey();
    await element(by.id("login-password")).typeText(config.password);
    await element(by.id("login-password")).tapReturnKey();
    await waitFor(element(by.id("login-button"))).toBeVisible();
    await element(by.id("login-button")).tap();
  }
}

module.exports = new SignInPage();
