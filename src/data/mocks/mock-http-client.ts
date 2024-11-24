import {
  HttpPostClientInterface,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClientInterface {
  url?: string;
  body?: object;
  response: HttpResponse = { statusCode: 200 };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
