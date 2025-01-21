const find = (recursionFn, predicateFn, combineFn) => {
  const notMatchedList = [];
  /**
   *
   * @param {Array} list
   * @param {Array} paths
   *
   * @returns {{find: boolean; result: Array}}
   */
  function _find(list, paths) {
    return list.reduce(
      (acc, current) => {
        if (acc.find) {
          return acc;
        }
        const result = combineFn(current, paths);
        if (predicateFn(result)) {
          return { find: true, result: [result] };
        }
        const end = _find(recursionFn(current), result);
        if (end.find) {
          return end;
        }
        notMatchedList.push(result);
        return { ...end, result: notMatchedList };
      },
      { find: false, result: paths }
    );
  }

  return _find;
};
export default find;
