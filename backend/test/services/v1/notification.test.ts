import app from '../../../src/app';

describe('\'v1/notification\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/notification');
    expect(service).toBeTruthy();
  });
});
