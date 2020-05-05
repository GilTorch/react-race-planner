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

  async editSettingsEmail(config) {
    await element(by.id('edit-email')).typeText(config.email);
  }

  async editSettingsPhoneOne(config) {
    await element(by.id('edit-phone1')).typeText(config.phone1);
    await element(by.id('edit-phone1')).tapReturnKey();
  }

  async editSettingsPhoneTwo(config) {
    await element(by.id('edit-phone2')).typeText(config.phone2);
  }

  async editSettingsAddressOne(config) {
    await element(by.id('edit-address1')).typeText(config.address1);
    await element(by.id('edit-address1')).tapReturnKey();
  }

  async editSettingsAddressTwo(config) {
    await element(by.id('edit-address2')).typeText(config.address2);
    await element(by.id('edit-address2')).tapReturnKey();
  }

  async editSettingsCity(config) {
    await element(by.id('edit-city')).typeText(config.city);
    await element(by.id('edit-city')).tapReturnKey();
  }

  async editSettingsCountry(config) {
    await element(by.id('edit-country')).typeText(config.country);
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

  get editEmail() {
    return element(by.id('edit-email'));
  }

  get editPhoneOne() {
    return element(by.id('edit-phone1'));
  }

  get editPhoneTwo() {
    return element(by.id('edit-phone2'));
  }

  get editAddressOne() {
    return element(by.id('edit-address1'));
  }

  get editAddressTwo() {
    return element(by.id('edit-address2'));
  }

  get editCity() {
    return element(by.id('edit-city'));
  }

  get editCountry() {
    return element(by.id('edit-country'));
  }
}

module.exports = new EditSettingsPage();
