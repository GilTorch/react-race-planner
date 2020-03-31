const confirmResetPasswordPage = require("./screens/ConfirmResetPasswordPage");

describe("ConfirmResetPasswordPage", () => {
  const config = {
    oneTimePassword: "newGeneratedPassword",
    newPassword: "myNewPassword",
    confirmNewPassword: "myNewPassword"
  };

  describe("_confirmResetPasswordPage", () => {
    it("Should ensure logo is visible on screen", async () => {
      await expect(element(by.id("logo"))).toBeVisible();
    });

    it("Should ensure one time password input field is visible", async () => {
      await expect(element(by.id("password-field-1"))).toBeVisible();
    });

    it("Should ensure new password input field is visible", async () => {
      await expect(element(by.id("new-password-field"))).toBeVisible();
    });

    it("Should ensure confirm new password input field is visible", async () => {
      await expect(element(by.id("confirm-new-password-field"))).toBeVisible();
    });

    it("Should reset and confirm new password", async () => {
      await confirmResetPasswordPage.confirmResetPassword(config);
      expect(config.newPassword).toEqual(config.confirmNewPassword);
      await expect(element(by.id("reset-password-button"))).tap();
    });
  });
});
