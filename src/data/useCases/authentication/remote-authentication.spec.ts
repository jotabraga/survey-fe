import { mockAuthenticationFactory } from "../../mocks/authentication-mock";
import { HttpPostClientSpy } from "../../mocks/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};
const sutFactory = (
  url: string = faker.internet.url(),
  body?: object
): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl);
    sut.auth(mockAuthenticationFactory());
    expect(httpPostClientSpy.url).toBe(mockedUrl);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const authBody = mockAuthenticationFactory();
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    sut.auth(authBody);
    expect(httpPostClientSpy.body).toEqual(authBody);
  });
});
