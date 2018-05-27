import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteProfile } from './../../actions/profileAction';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileAction from './ProfileAction';
import Experience from './Experience';
import Education from './Education';
class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDelete = ()=>{
        this.props.deleteProfile();
    }
    render() {
        let {user} = this.props.auth;
        let {profile, loading} = this.props.profile;
        let dashboardContent;
        if(profile === null || loading){
            dashboardContent = <h4>Loading....</h4>
        }else{
            if(Object.keys(profile).length>0){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Chào mừng{' '}
                            <Link to={`/profile/${profile.handle}`}>{profile.user.name}</Link>
                        </p>
                        <ProfileAction></ProfileAction>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}></Education>
                        <div style={{marginBottom: '60px'}}></div>
                        <button onClick={this.onDelete} className="btn btn-danger">Xóa thông tin</button>
                    </div>
                )
            }else{
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>Bạn chưa cập nhật thông tin.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Cập nhật thông tin
                        </Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired
}
const mapStateToProps = state =>{
    return {
        profile: state.profile,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{getCurrentProfile, deleteProfile})(Dashboard);