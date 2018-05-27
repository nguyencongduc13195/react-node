import React, { Component } from 'react';
import Proptypes from 'prop-types';
import CommentItem from './CommentItem'
class CommentFeed extends Component {
    
    render() {
        const { comments, postId } = this.props;
        return comments.map((val,i)=>(
            <CommentItem key={i} comment={val} postId={postId}></CommentItem>
        ));
    }
}
CommentFeed.propTypes = {
    comments: Proptypes.array.isRequired
}
export default CommentFeed;