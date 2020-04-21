/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class FilterPage {
  async enterLoginCredential(config) {
    await element(by.id('login-user-name')).typeText(config.username);
    await element(by.id('login-user-name')).tapReturnKey();
    await element(by.id('login-password')).typeText(config.password);
    await element(by.id('login-password')).tapReturnKey();
    await element(by.id('login-button')).tap();
    waitFor(element(by.id('home'))).toBeVisible();
    waitFor(element(by.id('home-icon'))).toBeVisible();
    waitFor(element(by.id('filter-button'))).toBeVisible();
    await element(by.id('filter-button')).toBeVisible();
  }

  async filterButton() {
    waitFor(element(by.id('filter-button'))).toBeVisible();
    await element(by.id('filter-button')).tap();
  }

  async resetLink() {
    waitFor(element(by.id('reset'))).toBeVisible();
    await element(by.id('reset')).tap();
  }

  async doneLink() {
    waitFor(element(by.id('done'))).toBeVisible();
    await element(by.id('done')).tap();
  }

  get selectAllOne() {
    return element(by.id('select-all-part-one'));
  }

  get selectAllTwo() {
    return element(by.id('select-all-part-two'));
  }

  get authorsSlider() {
    return element(by.id('authors-slider'));
  }
}

module.exports = new FilterPage();
