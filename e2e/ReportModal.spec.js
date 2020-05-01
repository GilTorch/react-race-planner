/* eslint-disable no-undef */
const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const story = require('./stories/Story');
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
    await expect(story.storyTitle.atIndex(1)).toExist();
    // await story.storyTitle();
  });

  // it('Should ensure the 3-dot menu exist and can show the `Report` button', async () => {
  //   // await story.threeDotMenuButton.atIndex(1).toBeVisible();
  //   // await expect(boxMenu.threeDotMenuButton.atIndex(1)).toExist();
  //   // await expect(boxMenu.threeDotMenuButton.atIndex(1)).toBeVisible();
  //   // await story.threeDotMenuButton.atIndex(1).tap();
     
  //   // waitFor(element(by.id("three-dot-menu-button"))).toBeVisible();
  //   //  await expect(element(by.id("three-dot-menu-button")).atIndex(1).atIndex(1)).toBeVisible();
  //   // await expect(element(by.id("three-dot-menu-button")).atIndex(1)).toExist();
  //   // await element(by.id("three-dot-menu-button")).atIndex(1).tap();
  //   // await story.threeDotMenuButton.tap();
  // });
});
