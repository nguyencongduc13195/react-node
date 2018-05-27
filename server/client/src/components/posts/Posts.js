import React, { Component } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { getPosts } from '../../actions/postAction';
import PostFeed from './PostFeed';
class Posts extends Component {
    componentDidMount = () => {
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.post;
        let postContent;
        if (posts === null || loading) {
            postContent = <h1>Loading</h1>
        } else {
            postContent = <PostFeed posts={posts} />
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post
    }
}
Posts.propTypes = {
    post: Proptypes.object.isRequired,
    getPosts: Proptypes.func.isRequired
}
export default connect(mapStateToProps, { getPosts })(Posts);