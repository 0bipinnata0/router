import emit, { type Emitter } from "../utils/createEmit";

const routeEmit = emit as Emitter<{
  popstate: (pathname: string) => void;
}>;

export default routeEmit;
