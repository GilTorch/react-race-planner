/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const filterPage = require('./screens/FilterPage');

describe('Filter Page', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    password: '**********'
  };

  it('Should ensure `FILTER` button exists is clickable, and can navigate to `Filter` page', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await navigationBar.enterLoginCredential(config);
    await expect(navigationBar.home).toExist();
    await expect(navigationBar.home).toBeVisible();
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
    await expect(element(by.id('filter-button'))).toBeVisible();
    await filterPage.filterButton.tap();
  });

  // it('Should check that `LIBRARY` text is not visible in bottom tab', async () => {
  //   // await expect(element(by.id('filter-button'))).toBeVisible();
  //   await filterPage.filterButton.tap();
  // });
});
