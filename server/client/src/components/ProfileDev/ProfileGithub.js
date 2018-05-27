import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '751461abb7d9e51b9733',
            clientSecret: 'e1d303df802f143b433d99fdbb1176116d6d6610',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }
    componentDidMount = () => {
        const { username } = this.props;
        const { clientId, clientSecret, count, sort } = this.state;
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => {
                console.log(res)
                if (res.status === 404) {
                    this.setState({ repos: [] })
                } else {
                    return res.json()
                }
            })
            .then(data => {
                if (this.refs.myRef) {
                    this.setState({ repos: data })
                }
            })
            .catch(err => this.setState({ repos: [] }))
    }
    componentWillUnmount() {
        this.setState({ repos: [] })
    }
    
    render() {
        const { repos } = this.state;
        const repoItems = repos.map((val, i) => (
            <div className="card card-body mb-2" key={i}>
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={val.html_url} className="text-info" target="_blank">
                                {val.name}
                            </Link>
                        </h4>
                        <p>{val.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {val.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {val.watchers_count}
                        </span>
                        <span className="badge badge-success mr-1">
                            Forks: {val.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div ref="myRef">
                <h3 className="mb-4 mt-4">Github</h3>
                {repos.length > 0 ? repoItems : null}
            </div>
        );
    }
}
ProfileGithub.propTypes = {
    username: Proptypes.string.isRequired
}
export default ProfileGithub;