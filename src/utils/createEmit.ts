/* eslint-disable @typescript-eslint/no-explicit-any */
export class Emitter<
  T extends Record<string | number | symbol, (args: any) => void>
> {
  #mapper = new Map<string | number | symbol, Set<(args: any) => any>>();

  on<K extends keyof T>(type: K, handle: T[K]) {
    if (this.#mapper.has(type)) {
      const typeSet = this.#mapper.get(type)!;
      typeSet.add(handle);
    } else {
      this.#mapper.set(type, new Set([handle]));
    }
    return () => {
      this.off(type, handle);
    };
  }
  off<K extends keyof T>(type: K, handle?: T[K]) {
    if (handle) {
      this.#mapper.get(type)?.delete(handle);
    } else {
      this.#mapper.get(type)?.clear();
    }
  }
  emit<K extends keyof T>(type: K, params: Parameters<T[K]>[0]) {
    this.#mapper.get(type)?.forEach((handle) => handle(params));
  }
}

const emit = new Emitter();

export default emit;

// const x = (emit as Emitter<{ popstate(): void }>)
//   .on("abc", (a: number) => {
//     console.info("a", a);
//   })
//   .on("d", (b: string) => {
//     console.info("b", b);
//   })
//   .on("z", (x: { name: string; age: number }) => {
//     console.info("a", x);
//   });
