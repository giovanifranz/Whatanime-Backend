export abstract class UseCase<Input, Output> {
  abstract execute(payload: Input): Promise<Output>;
}
