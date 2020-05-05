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
  const emailAddress = `${firstName}.${lastName}@gmail.com`;
  const phoneNumber1 = casual.phone;
  const phoneNumber2 = casual.phone;
  const addressNumber1 = casual.address1;
  const addressNumber2 = casual.address2;
  const currentCity = casual.city;
  const currentCountry = casual.country;
  const config = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
    email: emailAddress,
    phone1: phoneNumber1,
    phone2: phoneNumber2,
    address1: addressNumber1,
    address2: addressNumber2,
    city: currentCity,
    country: currentCountry,
    password: '**********',
    currentPassword: 'TheHoodMan1839',
    newPassword: 'newPassword',
    confirmNewPassword: 'newPassword'
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
    await editSettingsPage.editFirstname.clearText();
    await editSettingsPage.editSettingsFirstname(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure lastname button is clickable and can navigate to edit lastname page', async () => {
    await settingsPage.lastname.tap();
  });

  it('Should edit lastname in settings', async () => {
    await editSettingsPage.editLastname.clearText();
    await editSettingsPage.editSettingsLastname(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure gender button is clickable and can navigate to edit gender page', async () => {
    await settingsPage.gender.tap();
  });

  it('Should edit gender in settings', async () => {
    await editSettingsPage.editGender.tap();
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure `email` button is clickable and can navigate to edit email page', async () => {
    await settingsPage.email.tap();
  });

  it('Should edit gender in settings', async () => {
    await editSettingsPage.editEmail.clearText();
    await editSettingsPage.editSettingsEmail(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should edit DOB in setting', async () => {
    await settingsPage.DOB.tap();
    await settingsPage.username.swipe('up', 'slow', 0.1);
    await element(by.text('October'))
      .atIndex(1)
      .replaceText('June');
    await element(by.text('9'))
      .atIndex(1)
      .replaceText('04');
    await element(by.text('1991'))
      .atIndex(1)
      .replaceText('2000');
    // e.element(e.by.type("UIPickerView")).setColumnToValue(1, "6");
    // await settingsPage.dateTimePicker.setColumnToValue(0, "November");
    // await settingsPage.dateTimePicker(by.type("UIPickerView")).setColumnToValue(1, "6");
    // await settingsPage.dateTimePicker.setColumnToValue(2, "1993");
  });

  it('Should ensure `phones` button is clickable and can navigate to edit phones page', async () => {
    await settingsPage.scrollScreenUp();
    await settingsPage.phones.tap();
  });

  it('Should add phone 1 in settings', async () => {
    //  await editSettingsPage.editPhoneOne.clearText();
    await editSettingsPage.editSettingsPhoneOne(config);
  });

  it('Should add phone 2 in settings', async () => {
    await editSettingsPage.editSettingsPhoneTwo(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure `Address` button is clickable and can navigate to edit phones page', async () => {
    await settingsPage.address.tap();
  });

  it('Should add address 1 in settings', async () => {
    await editSettingsPage.editSettingsAddressOne(config);
  });

  it('Should add address 2 in settings', async () => {
    await editSettingsPage.editSettingsAddressTwo(config);
  });

  it('Should add city in settings', async () => {
    await editSettingsPage.editSettingsCity(config);
  });

  it('Should add country in settings', async () => {
    await editSettingsPage.editSettingsCountry(config);
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure `Update Password` button is clickable and can navigate to edit password page', async () => {
    await settingsPage.updatePassword.tap();
  });
  it('Should enter current password in settings', async () => {
    await editSettingsPage.typeCurrentPassword(config);
  });

  it('Should enter new password in settings', async () => {
    await editSettingsPage.typeNewPassword(config);
  });

  it('Should enter confirm new password in settings', async () => {
    await editSettingsPage.typeConfirmNewPassword(config);
  });

  it('Should toggle to show & Hide new password in settings', async () => {
    await editSettingsPage.viewPasswords.tap();
    await editSettingsPage.hidePasswords.tap();
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure `Default Privacy` button is clickable and can navigate to edit default privacy page', async () => {
    await settingsPage.defaultPrivacy.tap();
  });

  it('Should select `Username & Full name` option in in settings', async () => {
    await editSettingsPage.selectUsernameAndFullname.tap();
    await editSettingsPage.iconCheck.tap();
    await editSettingsPage.backArrow.tap();
  });

  it('Should ensure `Facebook` button is clickable', async () => {
    await settingsPage.facebook.tap();
  });

  it('Should ensure `Google` button is clickable', async () => {
    await settingsPage.google.tap();
  });

  it('Should ensure `Support & Help` button is clickable', async () => {
    await settingsPage.scrollScreenUpToBotom();
    await settingsPage.supportAndHelp.tap();
  });

  it('Should ensure `Rate Us` button is clickable', async () => {
    await settingsPage.rateUs.tap();
  });

  it('Should ensure `Privacy Policy` button is clickable', async () => {
    await settingsPage.google.swipe('up', 'slow', 0.9);
    await settingsPage.privacyPolicy.tap();
  });

  it('Should ensure `Term & Service` button is clickable', async () => {
    await settingsPage.termAndService.tap();
  });

  it('Should ensure `Licences` button is clickable', async () => {
    await settingsPage.licences.tap();
  });

  it('Should ensure `Logout` button is clickable', async () => {
    await settingsPage.logout.tap();
  });

  it('Should ensure `Logout` button is clickable', async () => {
    await settingsPage.settingsLogo.swipe('up', 'slow', 0.9);
    expect(settingsPage.settingsLogo).toBeVisible();
  });

  it('Should ensure `Delete Account` button is clickable & can open delete account modal', async () => {
    await settingsPage.deleteAccount.tap();
  });

  it('Should ensure `Delete` button is clickable', async () => {
    await settingsPage.deleteAccount.atIndex(1).tap();
  });

  it('Should ensure `Cancel` button is clickable', async () => {
    await settingsPage.cancelDeletion.tap();
  });
});
