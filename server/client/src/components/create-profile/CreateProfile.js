import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup.js';
import { createProfile } from './../../actions/profileAction';
class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        let { handle, company, website,
            location,status,skills,
            githubusername,bio,twitter,
            facebook,linkedin,youtube,instagram } = this.state
        const profile = {
            handle, company, website,
            location,status,skills,
            githubusername,bio,twitter,
            facebook,linkedin,youtube,instagram }
        this.props.createProfile(profile, this.props.history);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    displaySocial = (condition) => {
        if (condition) {
            return (
                <React.Fragment>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={this.state.errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={this.state.errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={this.state.errors.linkedin}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={this.state.errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={this.state.errors.instagram}
                    />
                </React.Fragment>
            )
        }
    }
    render() {
        const options = [
            { label: '* Vui lòng chọn', value: 0 },
            { label: 'Fresher Developer', value: 'Fresher Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];
        let { errors } = this.state;
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Thông tin</h1>
                            <p className="lead text-center">
                                Vui lòng cập nhật thông tin của bạn
                            </p>
                            <small className="d-block pb-3">* là bắt buộc</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="Tag tên trên đường dẫn của bạn..."
                                />
                                <SelectListGroup
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Vui lòng chọn trình độ của bạn."
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Vui lòng nhập tên công ty."
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Vui lòng nhập đường dẫn công ty."
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Vui lòng nhập địa chỉ công ty."
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Vui lòng nhập kỹ năng của bạn (VD.
                                    HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="Vui lòng nhập đường dẫn github"
                                />
                                <TextAreaGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Giới thiệu một ít về bản thân của bạn."
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState({
                                                displaySocialInputs: !this.state.displaySocialInputs
                                            })
                                        }}
                                        className="btn btn-light"
                                    >
                                        Cập nhật mạng xã hội
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {this.displaySocial(this.state.displaySocialInputs)}
                                <input
                                    type="submit"
                                    value="Đồng ý"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps, {createProfile})(CreateProfile);