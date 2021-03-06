import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Payments from "./pages/Payments";
import New from "./pages/NewPayment";
import Update from "./pages/UpdatePayment";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/payments" component={Payments} />
        <Route path="/newpayments" component={New} />
        <Route path="/update" component={Update} />
      </Switch>
    </BrowserRouter>
  );
}
