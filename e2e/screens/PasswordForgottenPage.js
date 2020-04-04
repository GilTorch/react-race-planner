const signUpPage = require("./SignUpPage");
const signInPage = require("./SignUpPage");

class PasswordForgottenPage {
  async putEmail(config) {
    await element(by.id("password")).swipe("up", "slow", 0.9);
    await signUpPage.loginAccount.tap();
    await waitFor(element(by.id("login-text"))).toBeVisible();
    await waitFor(element(by.id("twitter-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("facebook-icon-btn"))).toBeVisible();
    await waitFor(element(by.id("google-icon-btn"))).toBeVisible();
    await element(by.id("forgot-password-link")).tap();
    await element(by.id("add-email-address-to-reset")).typeText(config.email);
    await element(by.id("add-email-address-to-reset")).tapReturnKey();
    await waitFor(element(by.id("reset-password-button"))).toBeVisible();
    await element(by.id("reset-password-button")).tap();
  }
}

module.exports = new PasswordForgottenPage();
