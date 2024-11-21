import { HttpPostClientInterface } from "data/protocols/http/http-post-client";

class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientInterface
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url);
  }
}

describe("RemoteAuthentication", () => {
  class HttpPostClientSpy implements HttpPostClientInterface {
    url?: string;
    async post(url: string): Promise<void> {
      this.url = url;
      return Promise.resolve();
    }
  }

  test("Should call HttpPostClient with correct URL", async () => {
    const mockedUrl = "any.url";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(mockedUrl, httpPostClientSpy);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(mockedUrl);
  });
});
