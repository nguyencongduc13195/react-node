import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/authAction';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './../common/TextFieldGroup';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { name, email, password, password2 } = this.state;
        let newUser = {
            name, email, password, password2
        }
        this.props.registerUser(newUser, this.props.history);
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    render() {
        let { name, email, password, password2, errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Đăng ký</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Vui lòng nhập họ tên."
                                    name="name"
                                    error={errors.name}
                                    onChange={this.onChange}
                                    value={name} type="text"
                                />
                                <TextFieldGroup
                                    placeholder="Vui lòng nhập địa chỉ Email."
                                    name="email" value={email}
                                    type="email"
                                    error={errors.email}
                                    onChange={this.onChange}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    error={errors.password}
                                    value={password} type="password"
                                    placeholder="Vui lòng nhập mật khẩu." name="password"
                                />
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    error={errors.password2}
                                    value={password2} type="password"
                                    placeholder="Vui lòng nhập mật khẩu xác nhận." name="password2"
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
