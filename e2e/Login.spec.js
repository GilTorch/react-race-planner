const casual = require('casual');
const signInPage = require('./screens/SignInPage')

describe('Login', () => {
  let userName = casual.user_name;
  const config = {
    username: userName,
    password: 'password',
  };

  describe('_login', () => {
    it('Should ensure valid credential existence', async () => {
      await signInPage.signIn(config);
    });
  })
})



