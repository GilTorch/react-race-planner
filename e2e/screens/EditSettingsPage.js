/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class EditSettingsPage {
  async editSettingsUsername(config) {
    await element(by.id('edit-username')).typeText(config.username);
  }

  get editUsername() {
    return element(by.id('edit-username'));
  }

  get iconCheck() {
    return element(by.id('icon-check'));
  }
}

module.exports = new EditSettingsPage();
