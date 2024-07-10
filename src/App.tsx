import React, { useEffect } from "react";
import Route from "./components/Route";
import Routes from "./components/Routes";
import Link from "./components/Link";
import { BrowserRouter } from "./components/router";

const Home = () => (
  <div>
    <h1>Home</h1>
    <nav></nav>
  </div>
);

const Dash = () => {
  useEffect(() => {
    console.info("Dash装载");
    return () => {
      console.info("卸载Dash");
    };
  }, []);
  return <div>Dash</div>;
};

const Info = () => {
  useEffect(() => {
    console.info("Info装载");
    return () => {
      console.info("InfoDash");
    };
  }, []);
  return <div>Dash info</div>;
};

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Link to="/">home</Link>
      <Link to="/dash">dash</Link>
      <Link to="/dash/info">dash_info</Link>
      <Routes>
        123
        <Route path="/" element={<Home />} />
        {children}
        <Route path="/dash" element={<Dash />}>
          <Route path="info" element={<Info />} />
        </Route>
        <div>
          <div>2</div>
          <div>111</div>
        </div>
      </Routes>
    </BrowserRouter>
  );
};

const X = () => {
  return (
    <App>
      <div>1</div>
      <div>2</div>
      <div>22</div>
      <div>222</div>
    </App>
  );
};

export default X;
