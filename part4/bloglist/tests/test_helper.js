const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')



const initialBlogs = [
  {
    title: "first",
    author: "me",
    url: "lol.com",
    likes: 3,
  },
  {
    title: "2nd",
    author: "the other guy",
    url: "wiki.com",
    likes: 1,
  }
];

const initialUsers = [
  {
    username: "kbs",
    name: "kaan",
    password: "asd"
  },
  {
    username: "kb12s",
    name: "kaan12",
    password: "pw2"
  }
];


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getToken = async () => {
  const userCredentials = {
    username: "kbs",
    password: "123"
  }

  const response = await api
  .post('/api/login')
  .send(userCredentials);

  return response.body.token;
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}