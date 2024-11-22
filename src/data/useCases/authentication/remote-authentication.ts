import { HttpPostClientInterface } from "data/protocols/http/http-post-client";
import { AuthenticationParams } from "domain/useCases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientInterface
  ) {}

  async auth(authenticationParams: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: authenticationParams,
    });
  }
}
