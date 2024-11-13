const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
/*     Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }) */
})
  
blogsRouter.post('/', async (request, response) => {
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
    likes: likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  const blogToDelete = await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()

})

blogsRouter.put('/:id', async (request,response) => {
  const {title,url,author,likes} = request.body
  const requestedBlog = {
    title: title,
    url: url,
    author: author,
    likes: likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, requestedBlog, {new:true, runValidators:true, context:'query'})

  response.json(updatedBlog)

})



module.exports = blogsRouter
  