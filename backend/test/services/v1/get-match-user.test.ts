import app from '../../../src/app';

describe('\'v1/get-match-user\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/get-match-user');
    expect(service).toBeTruthy();
  });
});
