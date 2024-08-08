const DisableUserHandlerFactory = require('./disable-user');

const Disable = jest.fn();

Disable.mockImplementation(() => {
  return Promise.resolve({})
})

const handler = DisableUserHandlerFactory({
  services: {
    User: {
      Disable: Disable
    }
  }
});

describe('disableUserHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it('should return correct status code for invalid input exceptions', async () => {
    const invalidInputExceptions = [
      "Username already disabled",
    ];

    const req = {
      body: {}
    }
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue()

    await Promise.all(invalidInputExceptions.map(async (exception) => {
      Disable.mockRejectedValue(new Error(exception));
  
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


    Disable.mockRejectedValue(new Error("The Spanish Inquisition"));
    
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


    Disable.mockResolvedValue({});
    
    await handler(req, res)
    
    expect(res.status).toHaveBeenCalledWith(200)
  });
});