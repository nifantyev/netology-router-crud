import { useEffect, useState } from 'react';
import PostsContext from './PostsContext';
import PostModel from '../models/PostModel';

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/posts`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        const arr = [];
        for (let post of json) {
          arr.push(
            new PostModel(post.id, post.content, new Date(post.created))
          );
        }
        setPosts(arr);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [updated]);

  const refresh = () => setUpdated(new Date());

  const savePost = async (post) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: post.id,
          content: post.content,
          created: post.created,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  };

  const deletePost = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/posts/${id}`,
      { method: 'DELETE' }
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, loading, error, refresh, savePost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
