import app from '../../../src/app';

describe('\'v1/notification-managemnt\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/notification-managemnt');
    expect(service).toBeTruthy();
  });
});
