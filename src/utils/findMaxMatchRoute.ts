export function findMaxMatchRoute(
  routePathsList: Array<IRoute[]>,
  target: string
) {
  const x = routePathsList.map((routePath) =>
    caculateMaxMatchLength(target, routePath)
  );
  return x.reduce((prev, curr) => (curr.length > prev.length ? curr : prev));
}

const reg = /^\.?\/.*$\//i;
function caculateMaxMatchLength(target: string, routePath: IRoute[]) {
  const normalizedRoutePath = routePath;

  const { count } = normalizedRoutePath.reduce(
    ({ count, offset, done }, route) => {
      if (done) {
        return { count, offset, done };
      }
      const normalizedRoutePath = route.path.replace(reg, "");
      const len = normalizedRoutePath.length;
      const startOffset = normalizedRoutePath.startsWith("/") ? 0 : offset + 1;
      if (
        target.slice(startOffset, startOffset + len) === normalizedRoutePath
      ) {
        return { count: count + 1, offset: startOffset + len, done: false };
      }
      return { count, offset, done: true };
    },
    {
      count: 0,
      offset: 0,
      done: false,
    }
  );

  return normalizedRoutePath.slice(0, count);
}
