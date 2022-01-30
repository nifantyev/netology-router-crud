import React from 'react';

const CommentForm = () => {
  return (
    <div className="comment">
      <img
        src="https://i.pravatar.cc/30"
        alt=""
        className="author__avatar author__avatar-small"
      />
      <input
        type="text"
        className="comment__input"
        placeholder="Напишите комментарий..."
      />
      <div className="attachments">
        <a href="#/" className="attachments__link">
          <span className="material-icons-outlined">sentiment_satisfied</span>
        </a>
        <a href="#/" className="attachments__link">
          <span className="material-icons-outlined">photo_camera</span>
        </a>
        <a href="#/" className="attachments__link">
          <span className="material-icons-outlined">gif_box</span>
        </a>
      </div>
    </div>
  );
};

export default CommentForm;
