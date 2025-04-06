export type Flatten<T> = T extends (infer U)[]
  ? Flatten<U>
  : Exclude<T, undefined>;
