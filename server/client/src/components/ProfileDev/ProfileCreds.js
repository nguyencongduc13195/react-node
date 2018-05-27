import React, { Component } from 'react';
import Moment from 'react-moment';
class ProfileCreds extends Component {
    render() {
        const { experience, education } = this.props;
        let expItems = experience.map((exp, i) => (
            <li className="list-group-item" key={i}>
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
                    {exp.to === null ? ('Now') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
                </p>
                <p><strong>Vị trí:</strong> {exp.title}</p>
                <p>{exp.location === '' ? null : (<span><strong>Nơi làm việc:</strong> {exp.location}</span>)}</p>
                <p>{exp.description === '' ? null : (<span><strong>Mô tả:</strong> {exp.description}</span>)}</p>
            </li>
        ));
        let eduItems = education.map((exp, i) => (
            <li className="list-group-item" key={i}>
                <h4>{exp.school}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
                    {exp.to === null ? ('Hiện tại') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
                </p>
                <p><strong>Bằng cấp:</strong> {exp.degree}</p>
                <p>{exp.fieldOfStudy === '' ? null : (<span><strong>Chuyên ngành:</strong> {exp.fieldOfStudy}</span>)}</p>
                <p>{exp.description === '' ? null : (<span><strong>Mô tả:</strong> {exp.description}</span>)}</p>
            </li>
        ));
        return (

            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Kinh nghiệm</h3>
                    {experience.length > 0 ? (<ul className="list-group">{expItems}</ul>) : (<p className="text-center">Chưa có</p>)}
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Học vấn</h3>
                    {education.length > 0 ? (<ul className="list-group">{eduItems}</ul>) : (<p className="text-center">Chưa có</p>)}
                </div>
            </div>

        );
    }
}

export default ProfileCreds;