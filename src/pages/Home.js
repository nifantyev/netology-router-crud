import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsList from '../components/PostsList';
import PostsContext from '../contexts/PostsContext';

const Home = () => {
  const { posts, loading } = useContext(PostsContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="buttons">
        <button className="button" onClick={() => navigate('posts/new')}>
          Создать пост
        </button>
      </div>
      {loading && <div>Загрузка...</div>}
      {!loading && posts && <PostsList posts={posts} />}
    </>
  );
};

export default Home;
