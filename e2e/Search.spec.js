const casual = require('casual');
const signUpPage = require('./screens/SignUpPage');
const navigationBar = require('./screens/NavigationBar');
const search = require('./screens/Search');

describe('Search', () => {
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const userName = `${firstName}_${lastName}`;
  const randomWord = casual.word;
  const config = {
    username: userName,
    password: '**********',
    word: randomWord
  };

  it('Should ensure proper login credential', async () => {
    await signUpPage.scrollScreenUp();
    await signUpPage.goToLoginAccount.tap();
    await navigationBar.enterLoginCredential(config);
    await expect(navigationBar.homeIcon.atIndex(1)).toExist();
    await expect(navigationBar.homeIcon.atIndex(1)).toBeVisible();
  });

  it('Should open the search input field', async () => {
    await search.searchIcon.tap();
  });

  it('Should type a random word in search input field', async () => {
    await search.searchBar(config);
  });

  it('Should close in searchBar field', async () => {
    await search.closeSearchBar.tap();
  });
});
