import {
  HttpPostClientInterface,
  HttpPostParams,
} from "data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClientInterface {
  url?: string;
  body?: object;

  async post(params: HttpPostParams): Promise<void> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return Promise.resolve();
  }
}
