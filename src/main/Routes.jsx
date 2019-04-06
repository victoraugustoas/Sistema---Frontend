import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Import Admin
import FormLogin from '../admin/form/Login/FormLogin'
import FormSignUp from '../admin/form/SignUp/FormSignUp'
import Logged from '../admin/Logged'
import AddCategory from '../admin/AddCategory'

// Import Pages
import Main from '../pages/Main'

export default props => (
    <Switch>
        <Route exact path="/" component={Main} />

        <Route exact path="/admin/login" component={FormLogin} />
        <Route path="/admin/signup" component={FormSignUp} />
        <Route path="/admin/logged" component={Logged} />
        <Route path="/admin/add-category" component={AddCategory} />

        <Redirect path="*" to="/" />
    </Switch>
)