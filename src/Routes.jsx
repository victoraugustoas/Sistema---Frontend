import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import FormLogin from './form/FormLogin'
import FormSignUp from './form/FormSignUp'
import User from './User/User'
import Logged from './Logged';

export default props => (
    <Switch>
        <Route exact path="/" component={FormLogin} />
        <Route path="/signup" component={FormSignUp} />
        <Route path="/users" component={User} />
        <Route path="/logged" component={Logged} />
        <Redirect path="*" to="/" />
    </Switch>
)