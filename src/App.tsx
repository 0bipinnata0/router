import React from "react";
// import Route from "./components/Route";
// import Routes from "./components/Routes";
// import { BrowserRouter } from "./components/router";
// import Link from "./components/Link";
import Home from "./app/Home";
import Dash from "./app/Dash";
import Info from "./app/Info";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <BrowserRouter>
      <Link to="/">home</Link>
      <Link to="/dash">dash</Link>
      <Link to="/dash/info">dash_info</Link>
      <Link to="/dash/a/b/info">dash_info</Link>
      <Routes>
        {/* 123 */}
        <Route path="/" element={<Home />} />
        {/* {children} */}
        <Route path="/dash" element={<Dash />}>
          <Route path="a/b/info" element={<Info />} />
        </Route>
        {/* <div>
          <div>2</div>
          <div>111</div>
        </div> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
