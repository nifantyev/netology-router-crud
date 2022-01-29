import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import PostsContext from '../contexts/PostsContext';
import Post from '../components/Post';
import NotFound from '../components/NotFound';

const PostView = ({ id }) => {
  const { posts, deletePost, refresh } = useContext(PostsContext);
  const [post, setPost] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      setPost(posts.find((o) => o.id === id));
    }
  }, [posts, id]);

  const handleEdit = () => {
    navigate('edit');
  };

  const handleDelete = () => {
    setDeleting(true);
    deletePost(id)
      .then(() => {
        setDeleting(false);
        setError(null);
        refresh();
        navigate('/');
      })
      .catch((err) => {
        setDeleting(false);
        setError(err.message);
      });
  };

  return posts ? (
    post ? (
      <>
        <div className="header-wrap">
          <div className="header">
            <Link to="/" className="close">
              <span className="material-icons-outlined">close</span>
            </Link>
          </div>
        </div>
        <div className="view">
          <Post post={post} />
          <div className="buttons">
            <button onClick={handleEdit}>Изменить</button>
            <button onClick={handleDelete}>Удалить</button>
          </div>
          {deleting && <div>Удаление...</div>}
          {error && <div>{error}</div>}
        </div>
      </>
    ) : (
      <NotFound />
    )
  ) : (
    <div>Загрузка...</div>
  );
};

PostView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PostView;
