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

  private handleResponseStatus(status: number, body?: any): void {
    const responseCases: Record<number, () => void> = {
      401: () => {
        throw new InvalidCredentialsError();
      },
      200: () => {
        return { statusCode: HttpStatusCode.OK, body };
      },
      400: () => {
        throw new UnexpectedError();
      },
    };

    return responseCases[status || 400]();
  }

  async auth(authenticationParams: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: authenticationParams,
    });
    this.handleResponseStatus(response.statusCode);
  }
}
