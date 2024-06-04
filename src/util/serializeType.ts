export type PrismaSerialzedType<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends object
      ? PrismaSerialzedType<T[K]>
      : T[K];
};
