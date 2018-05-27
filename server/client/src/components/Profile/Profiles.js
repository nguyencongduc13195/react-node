import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profileAction';
import ProfileItem from './ProfileItem';
class Profiles extends Component {
    componentDidMount = () => {
        this.props.getAllProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;
        if (profiles === null || loading) {
            profileItems = <h1>Loading</h1>;
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile=>(
                    <ProfileItem key={profile._id} profile={profile}></ProfileItem>
                ))
            } else {
                profileItems = <h4>No profiles found</h4>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
                        </div>
                        {profileItems}
                    </div>
                </div>
            </div>
        );
    }
}
Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getAllProfiles })(Profiles)