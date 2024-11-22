export type HttpPostParams = {
  url: string;
};

export interface HttpPostClientInterface {
  post(params: HttpPostParams): Promise<void>;
}
