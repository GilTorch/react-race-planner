const navigationBar = require("./screens/NavigationBar");

describe("Navigation bar", () => {
  it("_should show home icon and text", async () => {
    await navigationBar.home.tap();
    await expect(element(by.text("HOME"))).toBeVisible();
  });

  it("_should show settings icon and text", async () => {
    await navigationBar.settings.tap();
    await expect(element(by.text("SETTINGS"))).toBeVisible();
  });

  it("_should show writing icon and text", async () => {
    await navigationBar.writing.tap();
    await expect(element(by.text("WRITING"))).toBeVisible();
  });
});
