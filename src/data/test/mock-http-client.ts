import {
  HttpPostClientInterface,
  HttpPostParams,
} from "data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClientInterface {
  url?: string;
  async post(params: HttpPostParams): Promise<void> {
    const { url } = params;
    this.url = url;
    return Promise.resolve();
  }
}
