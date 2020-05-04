/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const settingsPage = require('./screens/SettingsPage');
const editSettingsPage = require('./screens/EditSettingsPage');

describe('Filter Page', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    password: '**********'
  };

  it('Should ensure setting icon is clickable and can navigate to Settings page', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await navigationBar.enterLoginCredential(config);
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
    await expect(navigationBar.settingsIcon.atIndex(1)).toExist();
    await navigationBar.settingsIcon.atIndex(0).tap();
  });

  it('Should check that `SETTINGS` text exits and is visible in bottom tab', async () => {
    await expect(navigationBar.settings).toExist();
    await expect(navigationBar.settings).toBeVisible();
  });

  it('Should check that home icon exists and is visible', async () => {
    await expect(navigationBar.settingsIcon.atIndex(1)).toExist();
    await expect(navigationBar.settingsIcon.atIndex(1)).toBeVisible();
  });

  // it('Should check that `Settings` text exits and is visible in bottom tab', async () => {
  //   await expect(settingsPage.settingsText).toExist();
  //   await expect(settingsPage.settingsText).toBeVisible();
  // });

  it('Should ensure username section is clickable and can navigate to edit username page', async () => {
    await settingsPage.username.tap();
  });

  it('Should edit username in settings', async () => {
    expect(editSettingsPage.editUsername).toBeVisible();
    await editSettingsPage.editUsername.tap();
    await editSettingsPage.editUsername.clearText();
    await editSettingsPage.editSettingsUsername(config);
  });

  it('Should tap the icon check', async () => {
    await editSettingsPage.iconCheck.tap();
  });
});
