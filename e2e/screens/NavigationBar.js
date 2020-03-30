class NavigationBar {
  get home() {
    return element(by.id("home"));
  }

  get settings() {
    return element(by.id("settings"));
  }

  get writing() {
    return element(by.id("writing"));
  }
}

module.exports = new NavigationBar();
