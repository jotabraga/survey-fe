export class UnexpectedError extends Error {
  constructor() {
    super("Algo de errado ocorreu, tente novamente!");
    this.name = "UnexpectedError";
  }
}
