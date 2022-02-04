import React from 'react';
import "../assets/css/blog.css";

export const Blog = () => {

  const token = localStorage.getItem('token');
  const token1 = localStorage.getItem('vendor');

  return (
    <div className="blog">
      <p>User:  {token}</p>
      <p>Vendor:  {token1}</p>
    </div>
  );
};