import app from '../../../src/app';

describe('\'v1/profile-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/profile-management');
    expect(service).toBeTruthy();
  });
});
