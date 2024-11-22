export type HttpPostParams = {
  url: string;
  body?: object;
};

export interface HttpPostClientInterface {
  post(params: HttpPostParams): Promise<void>;
}
