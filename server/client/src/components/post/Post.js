import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { getPost } from '../../actions/postAction';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
class Post extends Component {
    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.props.getPost(this.props.match.params.id);
        }
    }

    render() {
        const { post, loading } = this.props.post;
        let content;
        if (post === null || loading || Object.keys(post).length === 0) {
            content = <h1>Loading</h1>
        } else {
            content = (
                <div className="col-md-12">
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id}/>
                    <CommentFeed postId={post._id} comments={post.comments}/>
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back to feed</Link>
                        </div>
                        {content}
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
Post.propTypes = {
    post: Proptypes.object.isRequired,
    getPost: Proptypes.func.isRequired
}
export default connect(mapStateToProps, { getPost })(Post);