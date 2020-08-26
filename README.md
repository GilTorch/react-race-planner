# ScriptoRerum

The iOS and Android source code of ScriptoRerum - React Native

# Table of Contents

- [ScriptoRerum](#scriptorerum)
- [Table of Contents](#table-of-contents)
  - [Screenshots](#screenshots)
  - [Requirements](#requirements)
  - [Usage](#usage)
  - [UI: Working on a specific screen](#ui-working-on-a-specific-screen)
  - [API/Database Interaction](#apidatabase-interaction)
  - [Contribution Guidelines](#contribution-guidelines)
    - [Our Git Branching Model](#our-git-branching-model)
    - [Code linting and formatting](#code-linting-and-formatting)
    - [Getting Started on a Task](#getting-started-on-a-task)
  - [Publishing for Staging/Demoing](#publishing-for-stagingdemoing)
  - [Building for Production](#building-for-production)
  - [e2e Testing with detox](#e2e-testing-with-detox)
  - [Run Github Action](#run-github-action)

## Screenshots

TBD

## Requirements

For development, you will need Node.js and Expo CLI installed

If you're gonna need database interaction, make sure you follow the instructions for running the API. (TODO: add link to API repo).

If you're dealing with the UI, no need to start the API at all.

## Usage

- Clone the repo and enter the project folder
```
git clone https://github.com/r4meau/sr-mobile ScriptoRerum
cd ScriptoRerum
```
- Install dependencies: ```npm i```
- Make sure you have an Android emulator (i.e.: AVD in Android Studio. Any phone with at least Android 5) or an iOS simulator with at least iOS 10 running.

To run the client, you have two options:
1. Run it with Expo
2. Run it with React Native directly

The only reason you would want to run it with React Native directly is if you need to test a dependency that won't work on the Expo client (Native dependencies - Java, Kotlin, Swift, etc...).

Even when we introduce a native dependency, we make sure to add checks to only use them when the app is being used outside of Expo (A standalone build or running with React Native). So the app will always be runnable within the Expo ecosystem.

1. Running with Expo:
   - iOS:
    ```
      expo start -i
    ```
   - Android:
    ```
      expo start -a
    ```

2. Running with React Native:
   - iOS:
    ```
      npm run ios
    ```
   - Android:
    ```
      npm run android
    ```

That should be enough for UI related tasks.

## UI: Working on a specific screen

TODO: Add instructions for changing the default screen for UI tasks

## API/Database Interaction

TODO: Add instructions for configuring API variables so that the developer can have dynamic data

## Contribution Guidelines

Please make sure you have discussed with the head maintainers of this repository before making any change.
If you don't need any guidance, please, read the instructions below.

### Our Git Branching Model

We like to follow a modified version of [Nvie's widely used Git branching model](https://nvie.com/posts/a-successful-git-branching-model/). If you haven't yet, please, take some time to read it so you can get used to it. Basically:

- We have three primary branches: 
  1. `master`: For production releases
  2. `develop`: For development work
  3. `staging`: For demo releases

- For new features, we create a new branch based on `develop` that we merge back into `develop` on completion. We can name it anything, except for the followings:
    - master
    - develop
    - staging
    - name that starts with `hotfix-`
    - name that starts with `release-`
- For releases (once a set of features and bug fixes are ready to be released), we create a branch from `develop` that starts with `release-`, followed by the next version number. During its lifetime, we merge small updates from `develop`. Once it's ready, we merge it back into `develop`, then we merge it into `master` and delete it.
- For hot/quick fixes (after a new production release), we create a branch from `master` that starts with `hotfix-`, followed by the next version number. So if `master` was at version `1.0.1`, the next hotfix will be named `hotfix-1.0.2`. We merge it back into both `develop` and `master` on completion.

There's some more to it, so please, read the article carefully so your contributions can get approved faster.

### Code linting and formatting

At NouKòd, we take great pride in providing quality software. To be able to do so, we start with the code formatting using Prettier. Your code will be read by other humans, so might as well keep it looking interesting, hence the ESLint linter.

Your code will not be approved until it passes our automated linting tests.

Therefor, it is crucial that you setup those two tools (ESLint and Prettier) on your preferred/current code editor so that their rules can automatically get applied on the currently opened file.

The following is a quick guide on how to set them up on your Visual Studio Code editor. If you don't use this editor, please, figure our alternatives for the one you do use.

To get started, install those two extensions within VSCode:
1. [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Then go to your user settings by going to **Code** -> **Preferences** -> **Settings** or by pressing "Ctrl/Cmd + ,".

Then look at the top right and you'll notice an icon, when you hover your mouse over it, that says "Open Settings (JSON)". Press on it and in the parent JSON object, append the following:
```json
"eslint.alwaysShowStatus": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"[javascript]": {
  "editor.defaultFormatter": "vscode.typescript-language-features",
  // The number of spaces a tab is equal to. This setting is overridden
  // based on the file contents when `editor.detectIndentation` is true.
  "editor.tabSize": 2,
  // Insert spaces when pressing Tab. This setting is overriden
  // based on the file contents when `editor.detectIndentation` is true.
  "editor.insertSpaces": true,
  // When opening a file, `editor.tabSize` and `editor.insertSpaces`
  // will be detected based on the file contents. Set to false to keep
  // the values you've explicitly set, above.
  "editor.detectIndentation": false
},
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": true,
"editor.defaultFormatter": "dbaeumer.vscode-eslint"
```

This should be enough for your editor to automatically format your code or/and point out errors in your whole codebase that you need to handle manually.

### Getting Started on a Task

With that said, to quickly get started working on a task, follow those steps
1. Clone the project locally
```
git clone https://github.com/r4meau/sr-mobile ScriptoRerum
cd ScriptoRerum
```
2. Create a new branch for the feature you're working on. Always branch out from `develop` when creating a new branch
```
git checkout -b [NEW-BRANCH-NAME] develop
```
3. Do the work and write succinct commit messages.
4. Push to `origin` on the new branch you created in step 2
5. Create a new Pull Request on GitHub. (from your branch to the `develop` branch. NOT `master`)
6. Respond to any code review feedback from your code reviewer

So, again, it goes like:
1. You clone the project locally
2. You Branch out for what you’re working on (i.e.: `new/*` or `hotfix/*` or `feature/*`) from `develop`
3. You Do the work on your new branch
4. You Push to `origin` on your new branch
5. You Make a pull request via Github (from your branch to the `develop` branch)
6. We code review
7. Lead maintenainers pull it into `develop`
8. You pull from `develop` on `origin`
9. Repeat from step 2 until a new release into `master`
10. Update your local `master` branch

## Publishing for Staging/Demoing

As mentioned above, we use the `staging` branch to setup the demo for ScriptoRerum stakeholders to test features/fixes themselves.

- Always make sure you have the latest version of the Expo cli:
```
npm install -g expo-cli
```
- Clone the repository (through SSH) and move into the directory:
```
git clone git@github.com:NouKod-Haiti/sr-mobile.git
cd sr-mobile
```
- Use the [.env file over there](https://app.clickup.com/2351815/v/dc/16z6a-777/27rp7-245) by creating it in the root directory of the repo.
- SSH into the staging VM where the API is running so you can [generate a new token for this Expo publish](https://github.com/NouKod-Haiti/sr-api/tree/staging#generating-a-new-token-for-clients)
- Update `.env` file to replace the value of the `RERUM_KEY` variable with the token you got from the API above
- Update it again to make sure the value of the `JWT_SECRET` variable matches the `USER_JWT_SECRET` one in the `.env` of the staging API above
- Install dependencies:
```
npm i
```
- Start the Expo server:
```
expo start -c
```


## Building for Production

TBD

## e2e Testing with detox

At the moment, we only have tests for iOS.

Also note that at the moment, we target iPhone 6s for maximum compatibility.

Follow those instructions if you're on a Mac:

 1. Make sure you have the latest version of Xcode
 2. Install Expo: `npm install -g expo-cli`
 2. Download Expo iOS client: `npm run dl_expo_bins`
 3. Install dependencies: `npm install`
 4. Open an iPhone 6s device: `xcrun simctl boot "iPhone 6s" && open -a Simulator`
 5. Run the app on the device: `npm run ios`
 6. Make sure Expo is running on a tunneled connection, not LAN: In the terminal session of step 6, press `d` to go to the DevTools and from there, select `Tunnel` for the `Connection` option
 5. In a different terminal session, run `npm run test:e2e` (this will run all the tests)
 6. To run a specific test in a file:
    - put `.only` after the word `it` or `describe`. Example: `it.only(should show welcome text)...`
 7. To run a specific file test, do:
    - `npm run test:e2e -c -f /filepath/`. Example: `npm run test:e2e -c -f e2e/CreateAccount.spec.js`
    - and scroll up until you can see the  full output of your tests
 8. Reminder: Expect the UI components to have `testID` instead of using `id`.


 ## Run Github Action
 
 1. After pushing your tasks, check that all your check marks are green
 2. If not, go to your respective branch
 3. In your github menu, click on `Action`
 4. Click your last commit (make sur to do that every time you wan to see the github action for your branch/tasks pass) 
 5. Once you are in the redirected page, click on the node version you want (sr-mobile action 8.x or 12.x) to view it in console
 6. Now watch your github action verify successfully you tasks
 7. If all of your check mark are not green, view the error, debug it, and 
 8. redo the same process by making you click on the lastest commit
 
