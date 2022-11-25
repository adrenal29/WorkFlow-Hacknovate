import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

// Views
import Login from "./Login";
import Callback from "./Callback";
import Profile from "./Profile";
import TeamPage from "./TeamPage";
import Project from "./Project";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/callback" exact>
            <Callback />
          </Route>
          <Route path="/team/:name" exact>
            <ProSidebarProvider>
            <TeamPage />
            </ProSidebarProvider>
          </Route>
          <Route path="/project/:name" exact>
            <ProSidebarProvider>
            <Project />
            </ProSidebarProvider>
          </Route>
          <Route path="*">
          <ProSidebarProvider>
            <Profile />
          </ProSidebarProvider>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

