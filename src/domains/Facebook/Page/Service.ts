import FacebookLibrary from '@libraries/Facebook';

class AuthenticationService {
  public async confirmIdentity(code: string) {
    const { access_token } = await FacebookLibrary.confirmIdentity(code);
    return access_token;
  }
}

export default new AuthenticationService();
