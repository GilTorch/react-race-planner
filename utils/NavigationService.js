// NavigationService.js

import { CommonActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function goBack() {
  navigator.dispatch(CommonActions.goBack());
}

function navigate(name, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  goBack
};
