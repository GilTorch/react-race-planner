/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class EditSettingsPage {
  async editSettingsUsername(config) {
    await element(by.id('edit-username')).typeText(config.username);
  }

  async editSettingsFirstname(config) {
    await element(by.id('edit-firstname')).typeText(config.firstname);
  }

  async editSettingsLaststname() {
    await element(by.id('edit-lastname')).typeText(config.firstname);
  }

  get editUsername() {
    return element(by.id('edit-username'));
  }

  get backArrow() {
    return element(by.id('back-arrow'));
  }

  get iconCheck() {
    return element(by.id('icon-check'));
  }

  get editFirstname() {
    return element(by.id('edit-firstname'));
  }

  get editLastname() {
    return element(by.id('edit-lastname'));
  }

  get editGender() {
    return element(by.id('edit-gender'));
  }
}

module.exports = new EditSettingsPage();
