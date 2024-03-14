const handlerContainerContructor = require('./login');

const Login  = jest.fn()

Login.mockImplementation(() => {
  return Promise.resolve({})
})

const handler = handlerContainerContructor({
  services:  {
    User: {
      Login: Login
    }
  }
});

describe('loginHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it('should return correct status code for invalid input exceptions', async () => {
    const invalidInputExceptions = ["Username is required", "Password is required", "Incorrect username or password"];

    const req = {
      body: {}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue()


    
    await Promise.all(invalidInputExceptions.map(async (exception) => {
      Login.mockRejectedValue(new Error(exception));
  
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


    Login.mockRejectedValue(new Error("The Spanish Inquisition"));
    
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


    Login.mockResolvedValue({});
    
    await handler(req, res)
    
    expect(res.status).toHaveBeenCalledWith(200)
  });
});