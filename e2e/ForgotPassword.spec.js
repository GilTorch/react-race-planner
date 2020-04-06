const casual = require("casual");
const passwordForgottenPage = require("./screens/PasswordForgottenPage");
const confirmResetPasswordPage = require("./screens/ConfirmResetPasswordPage");


describe("Password Forgotten", () => {
  let firstName = casual.first_name;
  let lastName = casual.last_name;
  let email = firstName + "." + lastName + "@gmail.com";
  const config = {
    email: email.toLowerCase(),
    password: "**********",
    password_confirmation: "*************",
    oneTimePassword: "newGeneratedPassword",
    newPassword: "myNewPassword",
    confirmNewPassword: "myNewPassword",
  };

  describe("_passwordForgotten", () => {
    it("Should ensure logo is visible on screen", async () => {
      await expect(element(by.id("logo"))).toBeVisible();
    });

    it("Should send and reset password", async () => {
      await passwordForgottenPage.putEmail(config);
    });

    it("Should reset and confirm new password", async () => {
      await confirmResetPasswordPage.confirmResetPasswordTwo(config);
    });
  });
});
