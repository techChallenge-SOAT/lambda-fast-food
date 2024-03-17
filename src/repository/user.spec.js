const UserRepository = require('./user');

const mockAdapter = {
  create: jest.fn(),
  login: jest.fn(),
};

const userRepository = new UserRepository(mockAdapter);

describe('UserRepository', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      }

      await userRepository.create(user);

      expect(mockAdapter.create).toHaveBeenCalledWith(user);
    });

    it('should throw an error if username is missing', async () => {
      const user = {
        email: 'test@test.com',
        password: 'password',
      }

      await expect(userRepository.create(user)).rejects.toThrow('Username is required');
    });

    it('should throw an error if email is missing', async () => {
      const user = {
        username: 'test',
        password: 'password',
      }
      await expect(userRepository.create(user)).rejects.toThrow('Email is required');
    });

    it('should throw an error if password is missing', async () => {
      const user = {
        username: 'test',
        email: 'test@test.com',
      }
      await expect(userRepository.create(user)).rejects.toThrow('Password is required');
    });

    it('should throw the error thrown by the create method from adapter', async () => {
      const user = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      }
      mockAdapter.create.mockRejectedValue(new Error('Unexpected Error'));
      await expect(userRepository.create(user)).rejects.toThrow('Unexpected Error');
    })
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const user = {
        username: 'test',
        password: 'password',
      }
      await userRepository.login(user);

      expect(mockAdapter.login).toHaveBeenCalledWith(user);
    });

    it('should throw an error if username is missing', async () => {
      const user = {
        password: 'password',
      }

      await expect(userRepository.login(user)).rejects.toThrow('Username is required');
    });

    it('should throw an error if password is missing', async () => {
      const user = {
        username: 'test',
      }

      await expect(userRepository.login(user)).rejects.toThrow('Password is required');
    });

    it('should throw the error thrown by the login method from adapter', async () => {
      const user = {
        username: 'test',
        password: 'password',
      }
      mockAdapter.login.mockRejectedValue(new Error('Unexpected Error'));
      await expect(userRepository.login(user)).rejects.toThrow('Unexpected Error');
    })
  });
});
