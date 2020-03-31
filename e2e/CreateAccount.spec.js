const casual = require('casual');
const SignUpPage = require('./screens/SignUpPage');

describe('Account', () => {
  let userName = casual.user_name;
  let firstName = casual.first_name;
  let lastName = casual.last_name;
  let email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
    email: email.toLowerCase(),
    password: 'password',
    password_confirmation: 'password',
  };

  describe('_createAccount', () => {
    it('Should render text `Create an Account`', async () => {
       await expect(element(by.id("test"))).toBeVisible();
    });

    it("Should ensure logo is visible on screen", async () => {
      await expect(element(by.id('logo'))).toBeVisible();
    });

    it("Should ensure ensure `Create an Account`text exist", async () => {
      await expect(element(by.id('create-account-text'))).toBeVisible();
    });

    it("Should ensure twitter icon is visible on screen", async () => {
      await expect(element(by.id('twitter-icon-btn'))).toBeVisible();
    });

    it("Should ensure facebook icon is visible on screen", async () => {
      await expect(element(by.id('facebook-icon-btn'))).toBeVisible();
    });

     it("Should ensure google icon is visible on screen", async () => {
      await expect(element(by.id('google-icon-btn'))).toBeVisible();
    });

    it('Should ensure valid credential existence', async () => {
      await SignUpPage.signUp(config);
      await expect(element(by.id('sign-up-button'))).tap();
    });
  });
});
