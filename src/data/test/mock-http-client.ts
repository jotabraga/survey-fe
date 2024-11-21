import { HttpPostClientInterface } from "data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClientInterface {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}
