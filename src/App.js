import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import PostsContextProvider from './contexts/PostsContextProvider';
import Home from './pages/Home';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate';
import PostView from './pages/PostView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="posts/new" element={<PostCreate />} />
          <Route path="posts/:id" element={<UpgPostView />} />
          <Route path="posts/:id/edit" element={<UpgPostUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

function withPostsContext(Component) {
  return function (props) {
    return (
      <PostsContextProvider>
        <Component {...props} />
      </PostsContextProvider>
    );
  };
}

function withPostId(Component) {
  return function (props) {
    const { id } = useParams();
    return <Component {...props} id={Number(id)} />;
  };
}

const UpgPostView = withPostId(PostView);
const UpgPostUpdate = withPostId(PostUpdate);
const UpgApp = withPostsContext(App);

export default UpgApp;
