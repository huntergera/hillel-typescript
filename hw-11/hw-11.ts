type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FunctionInfo<T extends (arg: any) => any> = T extends (arg: infer P) => infer R ? [R, P] : never;