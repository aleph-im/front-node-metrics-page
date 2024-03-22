import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NodeMetricsPage from "./pages/NodeMetricsPage";
import { themes, GlobalStyles, Logo } from "@aleph-front/core";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.aleph}>
        <GlobalStyles />
        <header className="flex flex-row items-center w-full text-center px-16 pt-6">
          <Logo text="Node Metrics" size="30" />
        </header>
        <Switch>
          <Route path="/">
            <NodeMetricsPage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
