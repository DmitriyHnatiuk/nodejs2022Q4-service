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

export const tokenDuration = {
  [process.env.JWT_SECRET_KEY]: process.env.TOKEN_EXPIRE_TIME,
  [process.env.JWT_SECRET_REFRESH_KEY]: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};

export const DEFAULT_LOG_LEVELS = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
] as const;

export const getLogLevel = () =>
  DEFAULT_LOG_LEVELS.slice(0, Number(process.env.LOGGER_LEVEL) + 1);

export const generateMessage = (
  name: string,
  message: string,
  trace?: string,
) => {
  return `[${new Date().toJSON()}] [${name}] ${message} ${
    trace ? ` - ${trace}` : ''
  }`;
};
