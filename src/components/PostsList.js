import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import PostModel from '../models/PostModel';

const PostsList = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="posts">
      {posts.map((o) => (
        <Post
          key={o.id}
          post={o}
          clickable
          onClick={() => navigate(`/posts/${o.id}`)}
        />
      ))}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.instanceOf(PostModel)).isRequired,
};

export default PostsList;
