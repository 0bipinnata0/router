import React from "react";
import Route from "./components/Route";
import Routes from "./components/Routes";
import Link from "./components/Link";
import { MemoryRouter as Router } from "./components/router/memory-router";
// import Router from "./components/router/BrowserRouter";
// import Router from "./components/router/HashRouter";
import Home from "./app/Home";
import Dash from "./app/Dash";
import Info from "./app/Info";
// import { HashRouter, Link, Route, Routes } from "react-router-dom";

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <Router>
        <Link to="/">home</Link>
        <Link to="/dash">dash</Link>
        <Link to="/dash/info">dash_info</Link>
        <Link to="/dash/a/b/info">dash_a_b_info</Link>
        <Link to="/dash/a/b/x">dash_a_b_x</Link>
        <Routes>
          <div>hello</div>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dash />}>
            <div>111</div>
            <Route path="a/b/info" element={<Info />} role={["x"]} />
            <Route path="info" element={<>hello single info</>} />
          </Route>
          <Route path="/dash/a/b/info" element={<div>absolute info x</div>} />
          <Route path="/dash/a/b/x" element={<div>dash a b x</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
