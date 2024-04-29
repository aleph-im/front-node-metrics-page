import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NodeMetricsPage from "./pages/NodeMetricsPage";
import { themes, GlobalStyles, Logo } from "@aleph-front/core";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.aleph}>
        <GlobalStyles />
        <Header />
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
