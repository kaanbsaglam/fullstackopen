const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})


test('blogs are returned as json, and the correct amount', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
})

test('blogs unique identifier is called id, and not _id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    response.body.forEach(blog => {
        assert(blog.id)
        assert.strictEqual(blog._id, undefined)
    })

})

test('a valid blog can be added', async () => {
    const newBlog = {
        title:"newBlog",
        author: "newGuy",
        url: "suchanewsite.com",
        likes: 0    
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        
    const blogsAtTheEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length + 1)

    const blogTitles = blogsAtTheEnd.map(b => {
        return b.title
    })
    
    assert(blogTitles.includes(newBlog.title))

})


after(async () => {
  await mongoose.connection.close()
})
