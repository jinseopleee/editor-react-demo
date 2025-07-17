import type { SetOptional } from "type-fest";

export type OptionalExcept<T, K extends keyof T> =
  SetOptional<T, Exclude<keyof T, K>>;