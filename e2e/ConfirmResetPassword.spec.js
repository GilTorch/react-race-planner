// const casual = require("casual");
// const confirmResetPasswordPage = require("./screens/ConfirmResetPasswordPage");
// // const passwordForgottenPage = require("./screens/PasswordForgottenPage");
// // const confirmResetPasswordPage = require("./screens/ConfirmResetPasswordPage";

// describe("ConfirmResetPasswordPage", () => {
//   let firstName = casual.first_name;
//   let lastName = casual.last_name;
//    let email = firstName + "." + lastName + "@gmail.com";
 
//   const config = {
//     email: email.toLowerCase(),
  //   oneTimePassword: "password",
  //   newPassword: "myNewPassword",
  //   confirmNewPassword: "myNewPassword",
  // };

  // describe("_confirmResetPasswordPage", () => {
  //   it("Should ensure logo is visible on screen", async () => {
  //     await expect(element(by.id("logo"))).toBeVisible();
  //   });

  //   it("Should ensure one time password input field is visible", async () => {
  //     await expect(element(by.id("password-field-1"))).toBeVisible();
  //   });

  //   it("Should ensure new password input field is visible", async () => {
  //     await expect(element(by.id("new-password-field"))).toBeVisible();
  //   });

  //   it("Should ensure confirm new password input field is visible", async () => {
  //     await expect(element(by.id("confirm-new-password-field"))).toBeVisible();
  //   });

    // it("Should reset and confirm new password", async () => {
    //   await confirmResetPasswordPage.confirmResetPassword(config);
      //  await waitFor(element(by.id("password-field-1"))).toBeVisible();
      //  await confirmResetPasswordPage.oneTimePassword.typeText(config.password);
      //  await confirmResetPasswordPage.oneTimePassword.tapReturnKey();

      //  await confirmResetPasswordPage.newPassword.typeText(config.newPassword);
      //  await confirmResetPasswordPage.newPassword.tapReturnKey();

      //  await confirmResetPasswordPage.confirmNewPassword.typeText(
      //    config.confirmNewPassword
      //  );
      //  await confirmResetPasswordPage.confirmNewPassword.tapReturnKey();
      // expect(config.newPassword).toEqual(config.confirmNewPassword);
      // await  confirmResetPasswordPage.confirmResetPassword(config);
      // await expect(element(by.id("reset-password-button"))).tap();
//     });
//   });
// });
