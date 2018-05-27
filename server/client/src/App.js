import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/create-credentials/AddExperience';
import AddEducation from './components/create-credentials/AddEducation';
import Navbar from './components/layout/Navbar';
import NotFound from './components/layout/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profiles from './components/Profile/Profiles';
import Profile from './components/ProfileDev/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
    componentDidMount() {
        if (localStorage.getItem('jwtToken')) {
            setAuthToken(localStorage.getItem('jwtToken'));
            const decoded = jwt_decode(localStorage.getItem('jwtToken'));
            store.dispatch(setCurrentUser(decoded));
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                store.dispatch(logOutUser());
                store.dispatch(clearCurrentProfile());
                window.location.href = '/login'
            }
        }
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar></Navbar>
                        <Switch>
                            <Route path="/" exact component={Landing}></Route>
                            <Route path="/register" component={Register}></Route>
                            <Route path="/login" component={Login}></Route>
                            <Route path="/profiles" component={Profiles}></Route>
                            <Route path="/profile/:handle" component={Profile}></Route>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
                                <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
                                <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
                                <PrivateRoute exact path="/feed" component={Posts}></PrivateRoute>
                                <PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>
                            </Switch>
                            <Route path="/not-found" component={NotFound}></Route>
                            <Route path="*" component={NotFound}></Route>
                        </Switch>
                        <Footer></Footer>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
