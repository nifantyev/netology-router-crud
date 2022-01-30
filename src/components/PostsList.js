import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import PostModel from '../models/PostModel';
import CommentForm from './CommentForm';

const PostsList = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="posts">
      {posts.map((o) => (
        <div key={o.id} className="post-wrap">
          <Post post={o} clickable onClick={() => navigate(`/posts/${o.id}`)} />
          <CommentForm />
        </div>
      ))}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.instanceOf(PostModel)).isRequired,
};

export default PostsList;
