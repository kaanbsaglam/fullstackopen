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

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

test('a blog without a like property is added and like is set to 0', async () => {
    const newBlog = {
        title:"newBlog123",
        author: "newGuy",
        url: "suchanewsite.com",    
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()

    const addedBlog = blogsAtTheEnd.find(blog => blog.title === newBlog.title);

    assert.strictEqual(addedBlog.likes,0)
    
})

test("a blog with url or title missing is not added", async () => {
    const missingUrl = {
        title:"newBlog123",
        author: "newGuy",
        likes: 1
    }
    const missingTitle = {
        url: "suchanewsite.com",    
        author: "newGuy",
        likes: 1
    }
    
    await api
        .post('/api/blogs')
        .send(missingUrl)
        .expect(400)


    await api
        .post('/api/blogs')
        .send(missingTitle)
        .expect(400)

    const blogsAtTheEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
})

test("deleting a single blog", async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)

    const firstBlogsId = response.body[0].id

    await api
        .delete(`/api/blogs/${firstBlogsId}`)
        .expect(204)
    
    const blogsAtTheEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtTheEnd.length,helper.initialBlogs.length-1)

    

    const deleted = await Blog.findById(firstBlogsId)

    assert(!deleted)

})

test("updating a single blog", async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)

    const firstBlog =  response.body[0]

    const firstBlogsId = response.body[0].id

    const updatedBlogJson = {
        title: firstBlog.title,
        author: firstBlog.author,
        url: firstBlog.url,
        likes: 777
    }

    const updatedResponse = await api
        .put(`/api/blogs/${firstBlogsId}`)
        .send(updatedBlogJson)
        .expect(200)

    const updatedBlog = await Blog.findById(firstBlogsId)

    assert.strictEqual(updatedBlog.likes,updatedBlogJson.likes)

})





after(async () => {
  await mongoose.connection.close()
})
