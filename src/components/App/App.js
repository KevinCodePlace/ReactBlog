import React,{ useState , useEffect } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route, useParams,} from "react-router-dom";
import Header from '../Header';
import { getMe } from '../../WebAPI';
import HomePage from '../../pages/HomePage';
import PostListPage from '../../pages/PostListPage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import SinglePost from '../../pages/SinglePost'
import { AuthContext } from '../../contexts';


const PageContainer = styled.div`
  padding-top: 56px;
  box-sizing:border-box;
`;



const BlogPost = (posts) =>{
  const { slug } = useParams();
  return <SinglePost postID={slug} posts={posts}/>;
}


function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMe().then((response => {
      if(response.ok) {
        setUser(response.data);
      }
    }));
  },[]);


  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <PageContainer>
        <Router>
        <Header />
        <Switch>
          <Route exact path="/ReactBlog">
            <HomePage posts={posts} setPosts={setPosts}/>
          </Route>
          <Route exact path="/ReactBlog/post-list" >
            <PostListPage />
          </Route>
          <Route exact path="/ReactBlog/about" >
            <AboutPage />
          </Route>
          <Route exact path="/ReactBlog/new-post" >
            <NewPostPage />
          </Route>
          <Route path="/ReactBlog/posts/:slug">
            <BlogPost posts={posts}/>
          </Route>
          <Route exact path="/ReactBlog/register">
            <RegisterPage />
          </Route>
          <Route exact path="/ReactBlog/login">
            <LoginPage />
          </Route>
        </Switch>
        </Router>
      </PageContainer>
    </AuthContext.Provider>
  );
}

export default App;
