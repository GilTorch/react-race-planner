const casual = require('casual');
const signInPage = require('./screens/SignInPage')

describe('Login', () => {
  let userName = casual.username;
  const config = {
    username: userName,
    password: 'password',
  };

  describe('_login', () => {
    it("Should ensure logo is visible on screen", async () => {
      await expect(element(by.id("logo"))).toBeVisible();
    });

    // it("Should ensure ensure `Login` text exist", async () => {
    //   await expect(element(by.id("login-text")))
    //     .toExist()
    //     .withTimeout(2000);
    // });

    it("Should ensure twitter icon is visible on screen", async () => {
      await expect(element(by.id("twitter-icon-btn"))).toBeVisible();
    });

    it("Should ensure facebook icon is visible on screen", async () => {
      await expect(element(by.id("facebook-icon-btn"))).toBeVisible();
    });

    it("Should ensure google icon is visible on screen", async () => {
      await expect(element(by.id("google-icon-btn"))).toBeVisible();
    });
    
    it('Should ensure valid credential existence', async () => {
       await signInPage.signIn(config);
      //  await expect(element(by.id('login-button'))).tap();
    });
  })
})



