/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from "ramda";

const mapReducer = R.curry((mappingFn, combineFn) => {
  return (acc: any, v: any) => {
    return combineFn(acc, mappingFn(v));
  };
}) as any;

export default mapReducer;
