/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from "ramda";

const filterReducer = R.curry((predicateFn, combineFn) => {
  return (acc: any, v: any) => {
    if (predicateFn(v)) {
      return combineFn(acc, v);
    }
    return acc;
  };
}) as any;

export default filterReducer;
