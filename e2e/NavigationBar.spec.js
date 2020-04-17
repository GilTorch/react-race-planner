/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');

describe('Navigation bar', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    password: '**********'
  };

  it('Should ensure proper login credentials exitence', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await navigationBar.enterLoginCredential(config);
  });

  it('Should check that `HOME` text exits and is visible in bottom tab', async () => {
    await expect(navigationBar.home).toExist();
    await expect(navigationBar.home).toBeVisible();
  });

  it('Should check that home icon exists and is visible', async () => {
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
  });

  it('Should check that `WRITING` text is not visible in bottom tab', async () => {
    await expect(navigationBar.writing).toBeNotVisible();
  });

  it('Should check that writing icon exists', async () => {
    await expect(navigationBar.writingIcon.atIndex(1)).toExist();
  });

  it('Should check that `SETTINGS` text is not be visible in bottom tab', async () => {
    await expect(navigationBar.settings).toBeNotVisible();
  });

  it('Should check that settings icon exists', async () => {
    await expect(navigationBar.settingsIcon.atIndex(1)).toExist();
  });
});
