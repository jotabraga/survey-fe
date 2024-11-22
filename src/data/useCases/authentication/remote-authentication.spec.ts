import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};
const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(mockedUrl);
  });
});
