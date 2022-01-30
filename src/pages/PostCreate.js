import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostsContext from '../contexts/PostsContext';
import PostModel from '../models/PostModel';

const PostCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    content: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { refresh, savePost } = useContext(PostsContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlePublish = () => {
    let post = new PostModel(0, form.content);
    setSaving(true);
    savePost(post)
      .then(() => {
        setSaving(false);
        setError(null);
        refresh();
        navigate('/');
      })
      .catch((err) => {
        setSaving(false);
        setError(err.message);
      });
  };

  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <div className="create">
      <div className="header">
        <div className="post-types">
          <a href="#/" className="post-types__item post-types__item-active">
            Публикация
          </a>
          <a href="#/" className="post-types__item">
            Фото/видео
          </a>
          <a href="#/" className="post-types__item">
            Прямой эфир
          </a>
          <a href="#/" className="post-types__item">
            Еще
          </a>
        </div>
        <Link to="/" className="close">
          <span className="material-icons-outlined">close</span>
        </Link>
      </div>
      <div className="form">
        <div className="form__avatar" />
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
        <button className="button" onClick={handlePublish} disabled={saving}>
          {saving ? 'Публикация...' : 'Опубликовать'}
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
