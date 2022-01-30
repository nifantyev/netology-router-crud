import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import ru from 'date-fns/locale/ru';
import PostModel from '../models/PostModel';

const DateTime = ({ date }) => {
  return <div className="date">{'' + date}</div>;
};

function withPrettyDateTime(Component) {
  return function (props) {
    let prettyDate;
    let unit;
    const seconds = (new Date() - new Date(props.date)) / 1000;

    if (seconds < 3600) {
      unit = 'minute';
    } else if (seconds < 3600 * 24) {
      unit = 'hour';
    } else {
      unit = 'day';
    }
    prettyDate = formatDistanceStrict(new Date(props.date), new Date(), {
      addSuffix: true,
      unit: unit,
      locale: ru,
    });
    return <Component {...props} date={prettyDate} />;
  };
}

const DateTimePretty = withPrettyDateTime(DateTime);

const Post = ({ post, clickable = false, onClick }) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick(post.id);
    }
  };

  return (
    <article className="post">
      <div className="author">
        <img src="https://i.pravatar.cc/40" alt="" className="author__avatar" />
        <div>
          <a href="#/" className="author__name">
            Ilnaz Gilyazov
          </a>
          <div className="author__status">
            <div>Основатель группы</div>
            &nbsp;&sdot;&nbsp;
            <DateTimePretty date={post.created} />
          </div>
        </div>
      </div>
      <div
        className={`post__text ${clickable ? ' post__text-clickable' : ''}`}
        onClick={handleClick}
      >
        {post.content}
      </div>
      <div className="reactions">
        <a href="#/" className="reactions__link">
          <span className="material-icons-outlined">thumb_up</span>Нравится
        </a>
        <a href="#/" className="reactions__link">
          <span className="material-icons-outlined">chat_bubble_outline</span>
          <span>Комментировать</span>
        </a>
      </div>
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.instanceOf(PostModel),
  clickable: PropTypes.bool,
};

export default Post;
