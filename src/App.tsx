import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import MainHeader from "./MainHeader";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#880e4f',
    },
    secondary: {
      main: '#1e88e5',
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics" component={Topics} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}


function Home() {
  return (
    <MainHeader home="home" />
  );
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
export default App;