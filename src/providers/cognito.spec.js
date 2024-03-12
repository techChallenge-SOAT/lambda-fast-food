const AWSMock = require('aws-sdk-mock');
const CognitoAuthProvider = require('./cognito');
const { CognitoIdentityServiceProvider } = require('aws-sdk');

// Mock AWS SDK
jest.mock('aws-sdk');

const cognitoServiceMock = {
  adminGetUser: jest.fn().mockReturnThis(),
  adminCreateUser: jest.fn().mockReturnThis(),
  initiateAuth: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

AWSMock.mock('CognitoIdentityServiceProvider', 'constructor', () => cognitoServiceMock);


describe('CognitoAuthProvider', () => {
  let authService;

  beforeEach(() => {
    authService = new CognitoAuthProvider();
  });

  afterEach(() => {
    AWSMock.restore('CognitoIdentityServiceProvider');
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      // Call the createUser method
      const result = await authService.createUser(username, password);

      // Assert that the result is as expected
      expect(result).toEqual(true);
      expect(CognitoIdentityServiceProvider).toBeCalled();
    });
  });
});

     // expect(adminCreateUser).ToBeCalledWith({
      //   UserPoolId: 'YOUR_USER_POOL_ID',
      //   Username: username,
      //   Temporary: ""
      // })

// describe('loginUser', () => {
  //   it('should login a user', async () => {
  //     const username = 'testuser';
  //     const password = 'testpassword';

  //     // Call the loginUser method
  //     const result = await authService.loginUser(username, password);

  //     // Assert that the result is as expected
  //     expect(result).toEqual(/* expected result */);
  //   });
  // });

  // describe('getUser', () => {
  //   it('should get a user', async () => {
  //     //TODO
  //   })
  // });