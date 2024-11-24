import { mockAuthenticationBodyFactory } from "@/data/mocks/authentication-mock";
import { HttpPostClientSpy } from "@/data/mocks/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
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
    sut.auth(mockAuthenticationBodyFactory());
    expect(httpPostClientSpy.url).toBe(mockedUrl);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const authBody = mockAuthenticationBodyFactory();
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    sut.auth(authBody);
    expect(httpPostClientSpy.body).toEqual(authBody);
  });

  test("Should throw invalid credential error if http client returns 401", async () => {
    const authBody = { email: "", password: "" };
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    httpPostClientSpy.response = {
      statusCode: 401,
    };
    const promise = sut.auth(authBody);
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
