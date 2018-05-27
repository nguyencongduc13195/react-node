import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../../actions/authAction';
import PropTypes from 'prop-types';
import TextFieldGroup from './../common/TextFieldGroup';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: '',
            errors: {}
        }
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e)=>{
        e.preventDefault();
        let {password, email} = this.state;
        let login = {
            password, email
        }
        this.props.loginUser(login);
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    render() {
        let {password, email, errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Đăng nhập</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="Vui lòng nhập địa chỉ Email." 
                                    name="email" value={email} 
                                    type="email" 
                                    error={errors.email}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup 
                                    value={password} type="password"
                                    placeholder="Vui lòng nhập mật khẩu." name="password"
                                    error={errors.password}
                                    onChange={this.onChange}
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
Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, { loginUser })(Login);