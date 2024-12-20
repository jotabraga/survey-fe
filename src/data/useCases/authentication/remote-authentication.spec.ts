import { mockAuthenticationBodyFactory } from "@/data/mocks/authentication-mock";
import { HttpPostClientSpy } from "@/data/mocks/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
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
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };
    const promise = sut.auth(authBody);
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw unexpected error if http client returns 400", async () => {
    const authBody = { email: "", password: "" };
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };
    const promise = sut.auth(authBody);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error if http client returns 500", async () => {
    const authBody = { email: "", password: "" };
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR,
    };
    const promise = sut.auth(authBody);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error if http client returns 404", async () => {
    const authBody = { email: "", password: "" };
    const mockedUrl = faker.internet.url();
    const { sut, httpPostClientSpy } = sutFactory(mockedUrl, authBody);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.auth(authBody);
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
