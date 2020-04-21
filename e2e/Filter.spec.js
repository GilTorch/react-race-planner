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

    // await expect(navigationBar.home).toExist();
    // await expect(navigationBar.home).toBeVisible();
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
  });

  it('Should check  Page', async () => {
    await filterPage.filterButton();
  });

  it('Should check that `Select All` link1 exists and is visible in Filter Page', async () => {
    await expect(filterPage.selectAllOne).toExist();
    await expect(filterPage.selectAllOne).toBeVisible();
  });

  it('Should check that `Select All` link1 is clickable and can select all status', async () => {
    await filterPage.selectAllOne.tap();
  });

  it('Should check that `Select All` link1 is be hidden', async () => {
    await expect(filterPage.selectAllOne).toBeNotVisible();
  });

  it('Should check that `Select All` link2 exists and is visible in Filter Page', async () => {
    await expect(filterPage.selectAllTwo).toExist();
    await expect(filterPage.selectAllTwo).toBeVisible();
  });

  it('Should check that `Select All` link2 is clickable and can select all status', async () => {
    await filterPage.selectAllTwo.tap();
  });

  it('Should check that `Select All` link2 is be hidden', async () => {
    await expect(filterPage.selectAllTwo).toBeNotVisible();
  });

  it('Should select authors by slider', async () => {
    await filterPage.authorsSlider.atIndex(1).tapAtPoint({ x: 5, y: 10 });
  });

  it('Should check `Reset` link exist and is clickable', async () => {
    await filterPage.resetLink();
  });

  it('Should show back `Select All` link1  on screen', async () => {
    await expect(filterPage.selectAllOne).toExist();
    await expect(filterPage.selectAllOne).toBeVisible();
  });

  it('Should show back `Select All` link2  on screen', async () => {
    await expect(filterPage.selectAllTwo).toExist();
    await expect(filterPage.selectAllTwo).toBeVisible();
  });

  it('Should ensure `Done` link exists and can close `Filter` page', async () => {
    await filterPage.doneLink();
  });
});
