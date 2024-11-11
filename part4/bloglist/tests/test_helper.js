const Blog = require('../models/blog')


const initialBlogs = [
  {
    title:"first",
    author: "me",
    url: "lol.com",
    likes: 3
  },
  {
    title:"2nd",
    author: "the other guy",
    url: "wiki.com",
    likes: 1
  }
]

const nonExistingId = async () => {
    const tempBlog = new Blog({
        title:"asd",
        author: "masde",
        url: "loasdl.casdaom",
        likes: 2    
    })
    await Blog.save()
    await Blog.deleteOne()
  
    return Blog.id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}