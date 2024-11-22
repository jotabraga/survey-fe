import { AuthenticationParams } from "domain/useCases/authentication";
import { faker } from "@faker-js/faker/.";

export const mockAuthenticationFactory = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
