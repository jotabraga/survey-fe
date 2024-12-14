import { HttpPostClientInterface } from "@/data/protocols/http/http-post-client";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AuthenticationParams } from "@/domain/useCases/authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientInterface
  ) {}

  private handleResponseStatus(status: number, body?: any): any {
    switch (status) {
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      case HttpStatusCode.OK:
        return { statusCode: HttpStatusCode.OK, body };
      case HttpStatusCode.NO_CONTENT:
        return { statusCode: HttpStatusCode.NO_CONTENT };
      case HttpStatusCode.BAD_REQUEST:
        throw new UnexpectedError();
      case HttpStatusCode.SERVER_ERROR:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }

  async auth(authenticationParams: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: authenticationParams,
    });
    this.handleResponseStatus(response.statusCode);
  }
}
