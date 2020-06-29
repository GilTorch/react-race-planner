/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Search {
  get searchIcon() {
    waitFor(element(by.id('search-icon'))).toBeVisible();
    return element(by.id('search-icon'));
  }

  async searchBar(config) {
    await element(by.id('random-word-search')).typeText(config.word);
  }

  get closeSearchBar() {
    waitFor(element(by.id('close-search-bar'))).toBeVisible();
    return element(by.id('close-search-bar'));
  }
}

module.exports = new Search();
