
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Posts from './components/Posts';
import Pagination from './components/Pagination';
const App = () => {
  const [posts, setPosts] = useState([]);
  const [files,setFiles] = useState([])
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(50);



  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
      const res1 = await axios.get('http://localhost:5000/table');
      console.log("res1===>",res1)
      setFiles(res1.data.table)
      setPosts(res.data);
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  return (
    <div className="App">
      <Posts posts={currentPost} loading={loading} setPosts={ setPosts} files={files} totalPosts={posts.length} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={ paginate} />
    </div>
  );
}

export default App;
