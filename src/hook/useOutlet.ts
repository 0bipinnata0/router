import createStateContext from "../utils/createStateContext";

const useOutletContext = (component: React.ReactNode) => component;

const [OutletProvider, useOutlet] = createStateContext(useOutletContext);

export { OutletProvider };

export default useOutlet;
