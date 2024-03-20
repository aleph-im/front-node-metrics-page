import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NodeMetricsPage from "./pages/NodeMetricsPage";

function App() {
  return (
    <Router>
      <header className="flex flex-row bg-[#282c34] items-center text-white w-full text-center px-4">
        <img src="/logo512.webp" height="40" width="40" />
        <h1 className="font-bold text-2xl m-5">Node Metrics</h1>
      </header>
      <Switch>
        <Route path="/">
          <NodeMetricsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
