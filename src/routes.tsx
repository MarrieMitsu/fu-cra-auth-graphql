// Packages
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useMeQuery } from "./generated/graphql";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Router
const Router: React.FC = () => {
    const { data } = useMeQuery();

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute 
                    needAuth={false}
                    isAuthenticated={Boolean(data?.me)}
                    exact 
                    path="/" 
                    component={Home} 
                />
                <ProtectedRoute
                    needAuth={false}
                    isAuthenticated={Boolean(data?.me)}
                    exact
                    path="/login"
                    component={Login}
                />
                <ProtectedRoute
                    needAuth={false}
                    isAuthenticated={Boolean(data?.me)}
                    exact
                    path="/register"
                    component={Register}
                />
                <ProtectedRoute
                    needAuth={false}
                    isAuthenticated={Boolean(data?.me)}
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                />
                <ProtectedRoute
                    needAuth={true}
                    isAuthenticated={Boolean(data?.me)}
                    exact
                    path="/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoute
                    needAuth={false}
                    isAuthenticated={Boolean(data?.me)}
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                />
            </Switch>
        </BrowserRouter>
    );
}

// Export
export default Router;