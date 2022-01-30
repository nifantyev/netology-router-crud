import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import PostsContext from '../contexts/PostsContext';
import NotFound from '../components/NotFound';
import PostModel from '../models/PostModel';

const PostUpdate = ({ id }) => {
  const { posts } = useContext(PostsContext);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    content: '',
  });
  const [post, setPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { refresh, savePost } = useContext(PostsContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdate = () => {
    let postModel = new PostModel(post.id, form.content, post.created);
    setSaving(true);
    savePost(postModel)
      .then(() => {
        setSaving(false);
        setError(null);
        refresh();
        navigate(`/posts/${id}`);
      })
      .catch((err) => {
        setSaving(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (posts) {
      setPost(posts.find((o) => o.id === id));
    }
  }, [posts, id]);

  useEffect(() => {
    if (post) {
      setForm((prevForm) => ({ ...prevForm, content: post.content }));
    }
  }, [post]);

  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [post]);

  return posts ? (
    post ? (
      <div className="update">
        <div className="header">
          <div>Редактировать публикацию</div>
          <Link to={`/posts/${id}`} className="close">
            <span className="material-icons-outlined">close</span>
          </Link>
        </div>
        <div className="form">
          <img src="https://i.pravatar.cc/40" alt="" className="form__avatar" />
          <textarea
            className="form__textarea"
            name="content"
            value={form.content}
            onChange={handleChange}
            ref={textareaRef}
          />
          <a href="#/" className="form__smile">
            <span className="material-icons-outlined">emoji_emotions</span>
          </a>
        </div>
        {error && <div>{error}</div>}
        <div className="buttons">
          <button className="button" onClick={handleUpdate} disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    ) : (
      <NotFound />
    )
  ) : (
    <div>Загрузка...</div>
  );
};

PostUpdate.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PostUpdate;
