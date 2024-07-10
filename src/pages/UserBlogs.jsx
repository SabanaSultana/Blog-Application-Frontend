import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `https://blog-application-backend-qcmt.onrender.com/api/v1/blog/user-blog/${id}`
      );
      console.log(data); 
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setUsername(data?.userBlog.username); 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={username} 
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You haven't added any blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
