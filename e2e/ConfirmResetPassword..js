const confirmResetPasswordPage = require("./screens/ConfirmResetPasswordPage");

describe("ConfirmResetPasswordPage", () => {
  const config = {
    oneTimePassword: "newGeneratedPassword",
    newPassword: "myNewPassword",
    confirmNewPassword: "myNewPassword"
  };

  describe("_confirmResetPasswordPage", () => {
    it("Should reset and confirm new password", async () => {
      await expect(element(by.id("logo"))).toBeVisible();
      await confirmResetPasswordPage.confirmResetPassword(config);
      expect(config.newPassword).toEqual(config.confirmNewPassword);
      await expect(element(by.id("reset-password-button"))).tap();
    });
  });
});
