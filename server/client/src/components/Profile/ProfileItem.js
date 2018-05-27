import React, { Component } from 'react';
import Proptypes from 'prop-types';
import isEmpty from '../../validation/is-emtpy';
import { Link } from 'react-router-dom'
class ProfileItem extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} alt="" className="rounded-circle" />
                    </div>
                    <div className="col-8 col-lg-6 col-md-4">
                        <h3>{profile.user.name}</h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (<span>at {profile.location}</span>)}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">Thông tin</Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Kỹ năng ({profile.skills.length})</h4>
                        <ul className="list-group">
                            {profile.skills.slice(0, profile.skills.length).map((skill, i) => (
                                <li key={i} className="list-group-item">
                                    <i>{skill}</i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
ProfileItem.propTypes = {
    profile: Proptypes.object.isRequired
}
export default ProfileItem;