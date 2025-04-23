import React from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author:""
  })
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/all')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }
  , [])
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/posts/create", formData, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      setPosts([...posts, response.data]); 
      setFormData({ title: "", content: "", author: "" });
      console.log("Post created successfully:", response.data); 
    })
    .catch(error => console.error("Error creating post:", error));
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/posts/delete/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(() => {
      setPosts(posts.filter(post => post.id !== id));
    })
    .catch(error => console.error("Error deleting post:", error));
  };
  

  return (
    <div>
      <h1>Blog App</h1>
      <h2>Posts</h2>
      <ul className='posts'>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))} 
        </ul>
        <form method='post' action='http://localhost:8080/api/posts/create' onSubmit={handleSubmit}>
          <h2>Create Post</h2>
          <input type="text" placeholder="Title" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
          <textarea placeholder="Content" value={formData.content} onChange={(e)=>setFormData({...formData,content:e.target.value})}></textarea>
          <input type="text" placeholder="Author" value={formData.author} onChange={(e)=>{setFormData({...formData,author:e.target.value})}}/>
          <button type="submit">Create Post</button>
        </form>
        <h2>Update Post</h2>
        <form method='post' action='http://localhost:8080/api/posts/update'>
          <input type="text" placeholder="Post ID" />
          <input type="text" placeholder="Title" />
          <textarea placeholder="Content"></textarea>
          <input type="text" placeholder="Author" />
          <button type="submit">Update Post</button>
        </form>

    </div>
  )
}

export default App