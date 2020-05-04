/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const settingsPage = require('./screens/SettingsPage');
const editSettingsPage = require('./screens/EditSettingsPage');

describe('Settings Page', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
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

  it('Should ensure username button is clickable and can navigate to edit username page', async () => {
    await settingsPage.username.tap();
  });

  it('Should ensure back arrow icon is clickable and can navigate back to settings page', async () => {
    await editSettingsPage.backArrow.tap();
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

  it('Should tap back arrow icon and navigate back to settings page', async () => {
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure first name button is clickable and can navigate to edit first name page', async () => {
    await settingsPage.firstname.tap();
  });

  it('Should edit first name in settings', async () => {
    expect(editSettingsPage.editFirstname).toBeVisible();
    await editSettingsPage.editFirstname.tap();
    await editSettingsPage.editFirstname.clearText();
    await editSettingsPage.editSettingsFirstname(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure lastname button is clickable and can navigate to edit lastname page', async () => {
    await settingsPage.lastname.tap();
  });

  it('Should edit lastname in settings', async () => {
    expect(editSettingsPage.editLastname).toBeVisible();
    await editSettingsPage.editLastname.tap();
    await editSettingsPage.editLastname.clearText();
    await editSettingsPage.editSettingsLastname(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure gender button is clickable and can navigate to edit gender page', async () => {
    await settingsPage.gender.tap();
  });

  it('Should edit gender in settings', async () => {
    expect(editSettingsPage.editGender).toBeVisible();
    await editSettingsPage.editGender.tap();
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });
});
