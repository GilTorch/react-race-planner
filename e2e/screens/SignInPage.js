const signUpPage = require("./SignUpPage");

class SignInPage {
  async signIn(config) {
    await element(by.id("password")).swipe("up", "slow", 0.9);
    await signUpPage.loginAccount.tap();
    await waitFor(element(by.id("login-text"))).toBeVisible();
    await waitFor(element(by.id("twitter-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("facebook-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("google-icon-btn"))).toBeVisible();
    await element(by.id("login-user-name")).typeText(config.username);
    await element(by.id("login-user-name")).tapReturnKey();
    await element(by.id("login-password")).typeText(config.password);
    await element(by.id("login-password")).tapReturnKey();
    await waitFor(element(by.id("login-button"))).toBeVisible();
    await element(by.id("login-button")).tap();
  }
}

module.exports = new SignInPage();
