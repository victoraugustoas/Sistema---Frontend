import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import FormLogin from '../admin/form/Login/FormLogin'
import FormSignUp from '../admin/form/SignUp/FormSignUp'
import Logged from '../admin/Logged'

export default props => (
    <Switch>
        <Route exact path="/" component={FormLogin} />
        <Route path="/signup" component={FormSignUp} />
        <Route path="/logged" component={Logged} />
        <Redirect path="*" to="/" />
    </Switch>
)