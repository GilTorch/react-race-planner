/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class NavigationBar {
  async enterLoginCredential(config) {
    await element(by.id('login-user-name')).typeText(config.username);
    await element(by.id('login-user-name')).tapReturnKey();
    await element(by.id('login-password')).typeText(config.password);
    await element(by.id('login-password')).tapReturnKey();
    waitFor(element(by.id('login-button'))).toBeVisible();
    await element(by.id('login-button')).tap();
  }

  get library() {
    return element(by.id('library'));
  }

  get libraryIcon() {
    return element(by.id('library-icon'));
  }

  get home() {
    return element(by.id('home'));
  }

  get homeIcon() {
    return element(by.id('home-icon'));
  }

  get writing() {
    return element(by.id('writing'));
  }

  get writingIcon() {
    return element(by.id('writing-icon'));
  }

  get settings() {
    return element(by.id('settings'));
  }

  get settingsIcon() {
    return element(by.id('settings-icon'));
  }
}

module.exports = new NavigationBar();
