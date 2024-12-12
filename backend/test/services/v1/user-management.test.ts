import app from '../../../src/app';

describe('\'v1/user-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/user-management');
    expect(service).toBeTruthy();
  });
});
