import app from '../../../src/app';

describe('\'v1/mentorship-requests-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/mentorship-requests-management');
    expect(service).toBeTruthy();
  });
});
