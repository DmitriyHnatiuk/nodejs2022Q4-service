import { Prisma } from '@prisma/client';

// Thank J. Lee for the great solution
// https://spacerestart.com/exclude-fields-in-prisma-js/
// And I hope we find a better solution soon https://github.com/prisma/prisma/issues/5042

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof typeof Prisma[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function excludeFields<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}
