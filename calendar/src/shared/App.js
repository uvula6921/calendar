import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

import { Grid } from "../components/Styles";
import Main from "../pages/Main";
import Write from "../pages/Write";

function App() {
  const dispatch = useDispatch();

  return (
    <Grid is_root bg="#ddd">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={Write} />
      </ConnectedRouter>
    </Grid>
  );
}

export default App;
