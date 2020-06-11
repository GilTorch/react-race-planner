/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

class EditSettingsPage {
  async editSettingsUsername(config) {
    await element(by.id('edit-username')).typeText(config.username);
  }

  async editSettingsFirstname(config) {
    await element(by.id('edit-firstname')).typeText(config.firstname);
  }

  async editSettingsLastname(config) {
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

  async editSettingsCountry(config) {
    await element(by.id('edit-country')).typeText(config.city);
    await element(by.id('edit-country')).tapReturnKey();
  }

  async editSettingsCity(config) {
    await element(by.id('edit-city')).typeText(config.city);
    await element(by.id('edit-city')).tapReturnKey();
  }

  async typeCurrentPassword(config) {
    await element(by.id('current-password')).typeText(config.currentPassword);
    await element(by.id('current-password')).tapReturnKey();
  }

  async typeNewPassword(config) {
    await element(by.id('new-password')).typeText(config.newPassword);
    await element(by.id('new-password')).tapReturnKey();
  }

  async typeConfirmNewPassword(config) {
    await element(by.id('confirm-new-password')).typeText(config.confirmNewPassword);
    // await element(by.id("confirm-new-password")).tapReturnKey();
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

  get currentPassword() {
    return element(by.id('current-password'));
  }

  get newPassword() {
    return element(by.id('new-password'));
  }

  get confirmNewPassword() {
    return element(by.id('confirm-new-password'));
  }

  get viewPasswords() {
    return element(by.id('show-password'));
  }

  get hidePasswords() {
    return element(by.id('show-password'));
  }

  get selectUsernameAndFullname() {
    return element(by.id('username-and-fullname'));
  }

  get deleteAccount() {
    return element(by.id('delete-account'));
  }
}

module.exports = new EditSettingsPage();
