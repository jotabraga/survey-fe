export interface HttpPostClientInterface {
  post(url: string): Promise<void>;
}
