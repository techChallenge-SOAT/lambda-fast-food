class CognitoToUserAdapter {
  constructor({
    CognitoIdentityServiceProvider
  }) {
    this.cognito = CognitoIdentityServiceProvider;
  }

  create({username, email, password}) {
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: username,
      TemporaryPassword: password,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'custom:CPF',
          Value: username,
        },
      ],
    };

    return this.cognito.adminCreateUser(params).promise();
  }

  login({username, password}) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    return this.cognito.initiateAuth(params).promise();
  }
}

module.exports = CognitoToUserAdapter;