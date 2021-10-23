import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { DisplayPage } from "./Pages/DisplayPage";
import { PostPage } from "./Pages/PostPage";
import { UpdatePage } from "./Pages/UpdatePage";
import { AppContext, intialState } from "./ReactContext/Context";

function App() {
  return (
    <AppContext.Provider value={intialState}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <DisplayPage />
            </Route>
            <Route path="/postPage">
              <PostPage />
            </Route>
            <Route path="/updatePage/:email">
              <UpdatePage />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
