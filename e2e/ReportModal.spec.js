/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const homepage = require('./screens/HomePage');
// const story = require('./stories/Story');
const boxMenu = require('./stories/BoxMenu');
// const reportModal = require("./modals/ReportModal");

describe('Filter Page', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const config = {
    username: userName,
    password: '**********'
  };

  it('Should ensure at least one story exits', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await navigationBar.enterLoginCredential(config);
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
    await expect(homepage.story).toExist();
  });

  it('Should check that story title is clickable', async () => {
    waitFor(boxMenu.threeDotMenuButton).toBeVisible();
    await boxMenu.threeDotMenuButton.tap();
  });


});
