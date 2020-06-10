/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Homepage {
  get story() {
    return element(by.id('story'));
  }
}

module.exports = new Homepage();
