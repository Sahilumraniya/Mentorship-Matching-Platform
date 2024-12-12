import app from '../../../src/app';

describe('\'v1/mentorship_requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/mentorship-requests');
    expect(service).toBeTruthy();
  });
});
