import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({component: Component, auth, ...rest})=>{
    return <Route {...rest} 
        render={props => auth.isAuthenticated ?
        (<Component {...props}/>) : (<Redirect to="/login"/>)}></Route>
}
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,null)(PrivateRoute);