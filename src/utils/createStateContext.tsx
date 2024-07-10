import React, { PropsWithChildren, useContext } from "react";

const createStateContext = <P, R>(useVal: (params: P) => R) => {
  const StateContext = React.createContext<R | null>(null);
  const StateProvider: React.FC<PropsWithChildren<{ initialValue: P }>> = ({
    children,
    initialValue,
  }) => (
    <StateContext.Provider value={useVal(initialValue)}>
      {children}
    </StateContext.Provider>
  );

  const useContextState = () => {
    const val = useContext(StateContext);
    if (val === null) {
      throw new Error("Provider missing");
    }
    return val;
  };

  return [StateProvider, useContextState] as const;
};

export default createStateContext;
