import React, { Component } from 'react';
import Moment from 'react-moment';
import { deleteEdu } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Education extends Component {
    onDelete = (id) => {
        this.props.deleteEdu(id);
    }
    render() {
        let education = this.props.education.map((val, i) => {
            return (
                <tr key={i}>
                    <td>{val.school}</td>
                    <td>{val.degree}</td>
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
                <h4 className="mb-4">Học vấn</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Trường học</th>
                            <th>Bằng cấp</th>
                            <th>Thời gian</th>
                            <th />
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        );
    }
}
Education.propTypes = {
    deleteEdu: PropTypes.func.isRequired
}
export default connect(null, { deleteEdu })(Education)