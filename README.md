# ScriptoRerum

The iOS and Android source code of ScriptoRerum - React Native

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
- Run the client:
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

### Getting Started on a Task

With that said, to quickly get started working on a task, follow those steps
1. Clone the project locally
```
git clone https://github.com/[YOUR-USERNAME]/sr-mobile ScriptoRerum
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
8. You pull from `develop` on `upstream`
9. Repeat from step 2 until a new release

## Publishing for Staging/Demoing

As mentioned above, we use the `staging` branch to setup the demo for ScriptoRerum stakeholders to test features/fixes themselves.

TBD

## Building for Production

TBD
