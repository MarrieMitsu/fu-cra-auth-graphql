// Packages
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Router
const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/change-password/:token" component={ChangePassword} />
            </Switch>
        </BrowserRouter>
    );
}

// Export
export default Router;