/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class SettingsPage {
  get settingsText() {
    return element(by.id('settings-text'));
  }

  get username() {
    return element(by.id('username-btn'));
  }
}

module.exports = new SettingsPage();
