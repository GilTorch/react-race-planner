const casual = require('casual');
const signInPage = require('./screens/PasswordForgottenPage');

describe('Password Forgotten', () => {
  let firstName = casual.first_name;
  let lastName = casual.last_name;
  let email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    email: email.toLowerCase()
  };

  describe('_passwordForgotten', () => {
     it("Should ensure logo is visible on screen", async () => {
       await expect(element(by.id("logo"))).toBeVisible();
     });

    it("Should wait till `Reset Your Password` is visible on screen", async () => {
       await expect(element(by.text("Reset Your Password`"))).toBeVisible();
    });

    it('Should send and reset password', async () => {
      await signInPage.signIn(config);
      await expect(element(by.id('send-reset-password-button'))).tap();
    });
  });
});
