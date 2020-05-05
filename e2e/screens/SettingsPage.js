/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class SettingsPage {
  async scrollScreenUp() {
    await element(by.id('username-btn')).swipe('up', 'slow', 0.9);
  }

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

  get email() {
    return element(by.id('email-btn'));
  }

  get phones() {
    return element(by.id('phones-btn'));
  }

  get address() {
    return element(by.id('address-btn'));
  }
}

module.exports = new SettingsPage();
