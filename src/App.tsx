import React from "react";

import { NavBar } from "./components/NavBar/NavBar";
import Edit from "./pages/edit/Edit";
import Listing from "./pages/listing/Listing";
import SingleMenu from "./pages/singleMenu/SingleMenu";
import ItemPage from "./pages/ItemPage/ItemPage";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const { menus } = useSelector((state: RootState) => state.menu);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="body">
          <Switch>
            <Route exact path="/">
              <Listing />
            </Route>
            <Route exact path="/edit">
              <Edit />
            </Route>
            {menus.map((menu: any) => {
              return (
                <Route
                  exact
                  path={"/" + menu.name}
                  key={menu.name}
                  children={<SingleMenu {...menu} />}
                ></Route>
              );
            })}
            <Route path="/:menu/:item" children={<ItemPage />} />
            <Route>
              <NotFound />
            </Route>
            {/* <Route path={"/menu/:menuName"}>
              <SingleMenu />
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
