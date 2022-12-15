import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
