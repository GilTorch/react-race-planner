class SignInPage {
  async signIn(config) {
    await waitFor(element(by.id('go-to-loggin-link'))).toBeVisible();
    await element(by.text("Log In")).tap();
    await element(by.id('email-address')).typeText(config.username);
    await element(by.id('password')).typeText(config.password)
    await waitFor(element(by.id('login-button'))).toBeVisible();
    await element(by.id('login-button')).tap()
  }

}

module.exports = new SignInPage();
