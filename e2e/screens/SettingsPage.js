/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class SettingsPage {
  get settingsText() {
    return element(by.id('settings-text'));
  }

  get username() {
    return element(by.id('username-btn'));
  }

  get firstname() {
    return element(by.id('firstname-btn'));
  }

  get lastname() {
    return element(by.id('lastname-btn'));
  }

  get gender() {
    return element(by.id('gender-btn'));
  }

  get DOB() {
    return element(by.id('dob-btn'));
  }
}

module.exports = new SettingsPage();
