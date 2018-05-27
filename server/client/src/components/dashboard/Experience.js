import React, { Component } from 'react';
import Moment from 'react-moment';
import { deleteExp } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
class Experience extends Component {
    onDelete = (id) => {
        this.props.deleteExp(id);
    }
    render() {
        let experience = this.props.experience.map((val, i) => {
            return (
                <tr key={i}>
                    <td>{val.company}</td>
                    <td>{val.title}</td>
                    <td>
                        <Moment format="DD/MM/YYYY">{val.from}</Moment>{' '}
                        -{' '}{val.to === null ? 'Now' : <Moment format="DD/MM/YYYY">{val.to}</Moment>}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(val._id) }}>Xóa</button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <h4 className="mb-4">Kinh nghiệm làm việc</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Công ty</th>
                            <th>Chức vụ</th>
                            <th>Thời gian</th>
                            <th />
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        );
    }
}
Experience.propTypes = {
    deleteExp: PropTypes.func.isRequired
} 
export default connect(null, {deleteExp})(Experience)