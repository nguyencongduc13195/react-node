import React, { Component } from 'react';
import TextAreaGroup from '../common/TextAreaGroup';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postAction'
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            text: ''
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };
        this.props.addPost(newPost);
        this.setState({text:''})
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Say Somthing...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaGroup
                                    placeholder="Create a post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
PostForm.propTypes = {
    addPost: Proptypes.func.isRequired,
    auth: Proptypes.object.isRequired,
    errors: Proptypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, { addPost })(PostForm);