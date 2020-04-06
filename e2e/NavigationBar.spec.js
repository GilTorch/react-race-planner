const casual = require('casual');
const navigationBar = require('./screens/NavigationBar');

describe('Navigation bar', () => {
  const userName = casual.username;
  const config = {
    username: userName,
    password: '**********'
  };

  it('_should tap on the login link', async () => {
    await navigationBar.tapToGoOnLogingPage();
  });

  it('_should ensure proper login credentials exitence', async () => {
    await navigationBar.enterLoginCredential(config);
  });

  it('_should check that `home` icon exits and is visible in bottom tab', async () => {
    await expect(navigationBar.home).toExist();
    await expect(navigationBar.home).toBeVisible();
  });

  it('_should check that `writing` icon to not be visible in bottom tab', async () => {
    await expect(navigationBar.writing).toBeNotVisible();
  });

  it('_should check that `settings` icon to not be visible in bottom tab', async () => {
    await expect(navigationBar.settings).toBeNotVisible();
  });
});
