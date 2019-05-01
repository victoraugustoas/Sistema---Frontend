import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Import Admin
import FormLogin from '../pages/admin/form/Login/FormLogin'
import FormSignUp from '../pages/admin/form/SignUp/FormSignUp'
import Logged from '../pages/admin/Logged'
import AddCategory from '../pages/admin/AddCategory/AddCategory'
import AddPost from '../pages/admin/AddPost'

// Import Pages
import Main from '../pages/Main/Main'
import Post from '../components/Post/Post'
import CategoryPage from '../pages/CategoriesPage/Category'
import PostsCategory from '../components/PostsCategory/PostsCategory'
import Error from '../pages/Error/Error'

export default props => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/post/*" component={Post} />
        <Route exact path="/category" component={CategoryPage} />
        <Route path="/category/*" component={PostsCategory} />

        <Route path='/error' component={Error} />

        <Route exact path="/admin" component={FormLogin} />
        <Route path="/admin/login" component={FormLogin} />
        <Route path="/admin/signup" component={FormSignUp} />
        <Route path="/admin/logged" component={Logged} />

        <Route path="/admin/add-category" component={AddCategory} />
        <Route path="/admin/add-post" component={AddPost} />

        <Redirect path="*" to="/" />
    </Switch>
)