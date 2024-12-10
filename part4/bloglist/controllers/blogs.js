const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = request.user
  if(!user){
    return response.status(401).json({error: 'user invalid'})
  } 

  const {title, url, author, likes} = request.body

  if(!title || !url){
    return response.status(400).json({
      error: "missing url and/or title"
    })
  }

  const blog = new Blog({
    title:title,
    url:url,
    author: author,
    likes: likes === undefined ? 0 : likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', {username:1, name:1})
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  if(!request.user){
    return response.status(401).json({error: "no user found"})
  }
  const blogToDelete = await Blog.findById(request.params.id)
  if(!blogToDelete){
    return response.status(400).json({error: "no blog found"})
  }
  
  if(request.user.id !== blogToDelete.user.toString()){
    return response.status(401).json({error: "you are not the creator of the blog"})
  }

  await blogToDelete.deleteOne()

  response.status(204).json(blogToDelete)

})

blogsRouter.put('/:id', async (request,response) => {
  const {title,url,author,likes,userid} = request.body
  const requestedBlog = {
    title: title,
    url: url,
    author: author,
    likes: likes === undefined ? 0 : likes,
    user:userid
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    requestedBlog,
    {new:true, runValidators:true, context:'query'}
  ).populate('user', {username:1, name:1})

  response.json(updatedBlog)

})



module.exports = blogsRouter
  