const CognitoToUserAdapter = require('./cognito');

const promiseMock = jest.fn()

const cognitoServiceMock = {
  adminGetUser: jest.fn().mockReturnThis(),
  adminCreateUser: jest.fn().mockReturnThis(),
  initiateAuth: jest.fn().mockReturnThis(),
  promise: promiseMock,
};


describe('CognitoToUserAdapter', () => {
  let cognitoToUserAdapter;

  beforeEach(() => {
    cognitoToUserAdapter = new CognitoToUserAdapter({
      CognitoIdentityServiceProvider: cognitoServiceMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return error if the email is invalid', async () => {
      const username = '12345678910';
      const password = 'Testpassword1*';
      const email = 'invalid email';
      const expectedError = 'Invalid email'

      promiseMock.mockRejectedValue(new Error(expectedError));

      const resultPromise = cognitoToUserAdapter.create({username, password, email});

      await expect(resultPromise).rejects.toThrow('Invalid email');
    });

    it('should return error if the password is not compliant', async () => {
      const username = '12345678910';
      const password = 'testpassword';
      const email = 'test@test.com';
      const expectedError = 'Password did not conform with password policy: Password must have uppercase characters'

      promiseMock.mockRejectedValue(new Error(expectedError));

      const resultPromise = cognitoToUserAdapter.create({username, password, email});
      
      await expect(resultPromise).rejects.toThrow(expectedError);

    });

    it('should create the user', async () => {
      const username = '12345678910';
      const password = 'Testpassword1*';
      const email = 'test@test.com';
      const expected = {"User": {"Attributes": [{"Name": "sub", "Value": "34383b62-6506-4167-a2a0-ac5c7a4ef05a"}, {"Name": "custom:CPF", "Value": "12345678910"}, {"Name": "email", "Value": "test@test.com"}], "Enabled": true, "UserCreateDate": "2024-03-13T18:27:41.277Z", "UserLastModifiedDate": "2024-03-13T18:27:41.277Z", "UserStatus": "FORCE_CHANGE_PASSWORD", "Username": "12345678910"}}

      promiseMock.mockResolvedValue(expected);

      const result = await cognitoToUserAdapter.create({username, password, email});

      expect(result).toBe(expected);
    });
  });

  describe('login', () => {
    it('should return error when wrong email or password', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const expectedError = 'Incorrect username or password'

      promiseMock.mockRejectedValue(new Error(expectedError));

      const resultPromise = cognitoToUserAdapter.login(username, password);

      await expect(resultPromise).rejects.toThrow(expectedError);
    });

    it('should the session data when auth is ok ', async () => {
      const username = '12345678910';
      const password = 'Testpassword1*';
      const expected = {
        "ChallengeName": "NEW_PASSWORD_REQUIRED",
        "ChallengeParameters": {
          "USER_ID_FOR_SRP": "12345678910",
          "requiredAttributes": "[]",
          "userAttributes": "{\"custom:CPF\":\"12345678910\",\"email\":\"test@test.com\"}"
        },
        "Session": "AYABeGBybQQfnQvyZEVbrQANN2AAHQABAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAS2Fybjphd3M6a21zOnVzLWVhc3QtMTo3NDU2MjM0Njc1NTU6a2V5L2IxNTVhZmNhLWJmMjktNGVlZC1hZmQ4LWE5ZTA5MzY1M2RiZQC4AQIBAHgDHnKSW2nDRJSDSLf55TGFyX5On_wV32whMfiMxuCEIAEb1f4IgcwdrUbAVqYeajsuAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMA3eESH24rrzmBjIZAgEQgDsNkVamoUVdtFyzalScF_tSXNfPlun4opleCiMJp7ZvMGlNQbRxAi2dVTEMPABSdjqgwpsdz_DkErEBfQIAAAAADAAAEAAAAAAAAAAAAAAAAADEvomhBduDJ5ofaTe2k8U2_____wAAAAEAAAAAAAAAAAAAAAEAAAC7hZJtEMxy_dM2h6PVkh2uY8JhmuH5wV6ghyg3ka4adNe8i7ReP2u4TptbV-sKqjIt4bH5EsNOGN9OM3r65V0ZBbAwraO1-zWf7wwfnNB6MsMg4T0OTC_Ifg3slWfYfo1GUGb-kh_hjxkQ2NWgRsoOVxDgUrfRuA9D8gjg1tKCspPGK44UrXOY_yYNnifNHYnVaXQ9EJtkVZL6nzmSYsQ5qAvqfXW0_gV72sfstjEQByRTBlJ7lj-csinuUyEQVuvTrv2AZZHg39sh63c"
      }

      promiseMock.mockResolvedValue(expected);

      // Call the login method
      const result = await cognitoToUserAdapter.login(username, password);

      // Assert that the result is as expected
      expect(result).toBe(expected);
    });
  });
})



