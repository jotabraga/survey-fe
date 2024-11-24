export type HttpPostParams = {
  url: string;
  body?: object;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};

export interface HttpPostClientInterface {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
