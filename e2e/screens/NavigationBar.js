/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
const signUpPage = require('./SignUpPage');

class NavigationBar {
  async tapToGoOnLogingPage() {
    await element(by.id('password')).swipe('up', 'slow', 0.9);
    await signUpPage.loginAccount.tap();
  }
  // eslint-disable-next-line lines-between-class-members
  async enterLoginCredential(config) {
    await element(by.id('login-user-name')).typeText(config.username);
    await element(by.id('login-user-name')).tapReturnKey();
    await element(by.id('login-password')).typeText(config.password);
    await element(by.id('login-password')).tapReturnKey();
    waitFor(element(by.id('login-button'))).toBeVisible();
    await element(by.id('login-button')).tap();
  }

  get home() {
    return element(by.id('home'));
  }

  get writing() {
    return element(by.id('writing'));
  }

  get settings() {
    return element(by.id('settings'));
  }
}

module.exports = new NavigationBar();
