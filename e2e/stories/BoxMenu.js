/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class BoxMenu {
  get threeDotMenuButton() {
    return element(by.id('three-dot-menu-button')).atIndex(0);
  }
}

module.exports = new BoxMenu();
