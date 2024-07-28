type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type DeepRequireReadonly<T> = {
  readonly [P in keyof T]-?: DeepRequireReadonly<T[P]>;
};

type UpperCaseKeys<T> = {
  [P in keyof T as Uppercase<P & string>]: T[P];
};

type PropertyDescriptor<T> = {
  value: T;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
};

type ObjectToPropertyDescriptor<T> = {
  [P in keyof T]: PropertyDescriptor<T[P]>;
};

