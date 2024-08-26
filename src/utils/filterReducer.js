import * as R from "ramda";

const filterReducer = R.curry((predicateFn, combineFn) => {
  return (acc, v) => {
    if (predicateFn(v)) {
      return combineFn(acc, v);
    }
    return acc;
  };
});

export default filterReducer;
