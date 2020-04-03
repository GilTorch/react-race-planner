const casual = require("casual");
const SignUpPage = require("./screens/SignUpPage");

describe("Account", () => {
  let userName = casual.username;
  let firstName = casual.first_name;
  let lastName = casual.last_name;
  let email = firstName + "." + lastName + "@gmail.com";
  const config = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
    email: email.toLowerCase(),
    password: "**********",
    password_confirmation: "**********"
  };

  describe("_createAccount", () => {
    it("Should render text `Create an Account`", async () => {
      await expect(element(by.id("create-account-text"))).toBeVisible();
    });

    it("Should ensure logo is visible on screen", async () => {
      await expect(element(by.id("logo"))).toBeVisible();
    });
    
    it("Should check screen is scrollable", async () => {
      await expect(element(by.id("password"))).toExist();
    });

    it("Should ensure valid credential existence", async () => {
      await SignUpPage.signUp(config);
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
  });
});
