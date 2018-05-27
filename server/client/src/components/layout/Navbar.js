import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from './../../actions/authAction';
import { clearCurrentProfile } from './../../actions/profileAction';
class Navbar extends Component {
    onLogoutClick = (e)=>{
        e.preventDefault();
        this.props.logOutUser();
        this.props.clearCurrentProfile();
    }
    render() {
        let { isAuthenticated, user } = this.props.auth;
        let authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">News Feed</Link>
                </li>
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick}
                        className="nav-link"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />{' '}
                        Đăng xuất
                    </a>
                </li>
            </ul>
        )
        let guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink activeClassName="active" className="navbar-brand" to="/" exact>DevConnector</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles"> Developers </Link>
                            </li>
                        </ul>
                        { isAuthenticated ? authLink : guestLink}
                    </div>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {logOutUser, clearCurrentProfile})(Navbar);