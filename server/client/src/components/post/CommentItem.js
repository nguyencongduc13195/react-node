import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { deleteComment } from '../../actions/postAction';

class CommentItem extends Component {
    onDeleteComment = (postId, commentId) => {
        this.props.deleteComment(postId, commentId)
    }
    render() {
        const { comment, postId, auth } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={comment.avatar}
                                alt=""
                            />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {comment.user === auth.user.id ? 
                        (<button onClick={() => { this.onDeleteComment(postId, comment._id) }} className="btn btn-danger mr-1" type="button">
                            <i className='fas fa-times text-light' />
                        </button>) : null}
                    </div>
                </div>
            </div>
        );
    }
}
CommentItem.propTypes = {
    deleteComment: Proptypes.func.isRequired,
    comment: Proptypes.object.isRequired,
    postId: Proptypes.string.isRequired,
    auth: Proptypes.object.isRequired
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { deleteComment })(CommentItem)