import app from '../../../src/app';

describe('\'v1/profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/profile');
    expect(service).toBeTruthy();
  });
});
