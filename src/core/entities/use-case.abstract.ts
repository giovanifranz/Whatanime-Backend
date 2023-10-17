import { Observable } from 'rxjs';

export abstract class UseCase<Input, Output> {
  abstract execute(payload: Input): Observable<Output>;
}
