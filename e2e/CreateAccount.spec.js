const casual = require('casual');
const SignUpPage = require('./screens/SignUpPage');

describe('Account', () => {
  let userName = casual.user_name;
  let firstName = casual.first_name;
  let lastName = casual.last_name;
  let email = firstName + '.' + lastName + '@gmail.com';
  const config = {
    username: userName,
    firstname: firstName,
    lastname: lastName,
    email: email.toLowerCase(),
    password: 'password',
    password_confirmation: 'password',
  };

  describe('_createAccount', () => {
    it('Should ensure valid credential existence', async () => {
      await SignUpPage.signUp(config);
    });
  });
});
