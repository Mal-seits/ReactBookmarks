import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AddBookmark from './Pages/AddBookmark';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Signup from './Pages/Signup';
import ViewUsersBookmarks from './Pages/ViewUsersBookmarks';
import PrivateRoute from './PrivateRoute';
import { UserContextComponent } from './UserContext';


const App = () => {
    return (
        <UserContextComponent>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/ViewUsersBookmarks' component={ViewUsersBookmarks} />
                <PrivateRoute exact path='/AddBookmark' component={AddBookmark} />
                <PrivateRoute exact path='/Logout' component={Logout} />
            </Layout>
        </UserContextComponent>

    )
}
export default App;