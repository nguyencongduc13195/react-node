import React, { Component } from 'react';
import Proptypes from 'prop-types';
import PostItem from './PostItem';
class PostFeed extends Component {

    render() {
        const { posts } = this.props;
        const postItem = posts.map((val,i)=>(<PostItem key={i} post={val}/>))
        return (
            <div>
                {postItem}
            </div>
        );
    }
}
PostFeed.propTypes = {
    posts: Proptypes.array.isRequired
}
export default PostFeed;