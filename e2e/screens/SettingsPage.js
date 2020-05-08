/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class SettingsPage {
  async scrollScreenUp() {
    await element(by.id('username-btn')).swipe('up', 'slow', 0.9);
  }

  get openImagePicker() {
    return element(by.id('open-image-picker'));
  }

  async scrollScreenUpToBotom() {
    await element(by.id('phones-btn')).swipe('up', 'slow', 0.9);
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

  get dateTimePicker() {
    return element(by.id('dateTimePicker'));
  }

  get done() {
    return element(by.id('done-btn'));
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

  get updatePassword() {
    return element(by.id('update-password-btn'));
  }

  get defaultPrivacy() {
    return element(by.id('defaut-privacy'));
  }

  get facebook() {
    return element(by.id('facebook-btn'));
  }

  get google() {
    return element(by.id('google-btn'));
  }

  get supportAndHelp() {
    return element(by.id('support-and-help'));
  }

  get rateUs() {
    return element(by.id('rate-us-btn'));
  }

  get privacyPolicy() {
    return element(by.id('privacy-policy'));
  }

  get termAndService() {
    return element(by.id('term-and-service-btn'));
  }

  get licences() {
    return element(by.id('licences-btn'));
  }

  get logout() {
    return element(by.id('logout-btn'));
  }

  get settingsLogo() {
    return element(by.id('_logo'));
  }

  get deleteAccount() {
    return element(by.id('delete-account'));
  }

  get cancelDeletion() {
    return element(by.id('cancel-deletion'));
  }
}

module.exports = new SettingsPage();
