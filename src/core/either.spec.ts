import { Either, left, right } from './either';

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
  if (!shouldSuccess) {
    return left('error');
  }

  return right(10);
}

test('Sucesso como resultado', () => {
  const result = doSomeThing(true);

  expect(result.isRight()).toBeTruthy();
  expect(result.isLeft()).toBeFalsy();
});

test('Erro como resultado', () => {
  const result = doSomeThing(false);

  expect(result.isLeft()).toBeTruthy();
  expect(result.isRight()).toBeFalsy();
});
