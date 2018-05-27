import React, { Component } from 'react';

class ProfileAbout extends Component {
    render() {
        const { profile } = this.props;
        let cutName = profile.user.name.trim().split(' ');
        let firstName = cutName[cutName.length - 1];
        const skills = profile.skills.map((skill, i) => (
            <div className="p-3" key={i}>
                <span className="badge badge-info">{skill}</span>
            </div>
        ))
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">Thông tin về {firstName}</h3>
                        <p className="lead">
                            {profile.bio ? (<span>{profile.bio}</span>) : (<span>{firstName} không có thông tin.</span>)}
                        </p>
                        <hr />
                        <h3 className="text-center text-info">Kỹ năng</h3>
                        <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileAbout;