const CreateUserHandlerFactory = require('./create-user');

const Create = jest.fn();

Create.mockImplementation(() => {
  return Promise.resolve({})
})

const handler = CreateUserHandlerFactory({
  services: {
    User: {
      Create: Create
    }
  }
});

describe('createUserHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it('should return correct status code for invalid input exceptions', async () => {
    const invalidInputExceptions = [
      "Username is required",
      "Password is required",
      "Email is required",
      "Invalid Email",
      "Password did not conform with password policy: Password must have uppercase characters",
    ];

    const req = {
      body: {}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue()

    await Promise.all(invalidInputExceptions.map(async (exception) => {
      Create.mockRejectedValue(new Error(exception));
  
      await handler(req, res)
      return expect(res.status).toHaveBeenCalledWith(400)
    }))
  });

  it('should return correct status code for unexpected exceptions', async () => {

    const req = {
      body: {}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue()


    Create.mockRejectedValue(new Error("The Spanish Inquisition"));
    
    await handler(req, res)
    
    expect(res.status).toHaveBeenCalledWith(500)
  });

  it('should return correct status code for success', async () => {

    const req = {
      body: {}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue()


    Create.mockResolvedValue({});
    
    await handler(req, res)
    
    expect(res.status).toHaveBeenCalledWith(200)
  });
});