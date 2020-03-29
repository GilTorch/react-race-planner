const detox = require("detox");
const config = require("../package.json").detox;
const adapter = require("detox/runners/jest/adapter");
// const specReporter = require("detox/runners/jest/specReporter");

// Set the default timeout
// jest.setTimeout(120000);

jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
// jasmine.getEnv().addReporter(specReporter);

//  function timeout(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//  }
//  beforeEach(async () => {
//    await reloadApp();
//    await timeout(30000);
//  });

beforeAll(async () => {
  await detox.init(config, { launchApp: true });
  await device.launchApp({
    newInstance: true,
    permissions: {
      notifications: "YES",
      location: "always"
    }
  });
}, 300000);

beforeEach(async () => {
  // await adapter.beforeEach();
  await device.reloadReactNative();
  
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
