/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class FilterPage {
  async enterLoginCredential(config) {
    await element(by.id('login-user-name')).typeText(config.username);
    await element(by.id('login-user-name')).tapReturnKey();
    await element(by.id('login-password')).typeText(config.password);
    await element(by.id('login-password')).tapReturnKey();
    waitFor(element(by.id('all-sotries'))).toBeVisible();
    await element(by.id('login-button')).tap();
    waitFor(element(by.id('filter-button'))).toBeVisible();
    await element(by.id('filter-button')).toBeVisible();
  }

  get filterButton() {
    return element(by.id('filter-button'));
  }
}

module.exports = new FilterPage();
