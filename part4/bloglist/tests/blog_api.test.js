const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)


describe('tests without login', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        for (let user of helper.initialUsers) {
            let userObject = new User(user)
            await userObject.save()
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


    test('a valid user can be added', async () => {
        const userToAdd = {
            username: "newlyAdded",
            name: "neu",
            password: "dangiforgor"
        }

        await api
            .post('/api/users')
            .send(userToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtTheEnd = await helper.usersInDb()

        assert.strictEqual(usersAtTheEnd.length, helper.initialBlogs.length + 1)
    })

    test('a non valid user is not added', async () => {
        const nonValidUserOne = {
            username: "a",
            name: "allo",
            password: "yeee"
        }

        await api
            .post('/api/users')
            .send(nonValidUserOne)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const nonValidUserTwo = {
            username: "awww",
            name: "ahalloa",
            password: "e"
        }

        await api
            .post('/api/users')
            .send(nonValidUserTwo)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtTheEnd = await helper.usersInDb()

        assert.strictEqual(usersAtTheEnd.length, helper.initialBlogs.length)
    })

})

describe('Tests about login', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        for (let user of helper.initialUsers) {
            let userObject = new User(user)
            await userObject.save()
        }
        const newUser = {
            username: "testguy1",
            name: "tester1",
            password: "test"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

    })

    test('a valid user can log in, and recieves a token', async () => {

        const userCredentials = {
            username: "testguy1",
            password: "test"
        }
        const response = await api
            .post('/api/login')
            .send(userCredentials)
            .expect(200)

        assert(response.body.token)


    })

    test('a non-valid user cant recieve a token', async () => {

        const userCredentials = {
            username: "testguy1",
            password: "wrong"
        }
        const response = await api
            .post('/api/login')
            .send(userCredentials)
            .expect(401)

        assert(!response.body.token)


    })

})

describe('test with which a login is required', () => {
    let token;
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        for (let user of helper.initialUsers) {
            let userObject = new User(user)
            await userObject.save()
        }
        const newUser = {
            username: "testguy1",
            name: "tester1",
            password: "test"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        const userCredentials = {
            username: "testguy1",
            password: "test"
        }
        const response = await api
            .post('/api/login')
            .send(userCredentials)
            .expect(200)
        
        token = response.body.token

    })

    test('a valid blog can be added', async () => {

        const newBlog = {
            title: "newBlog",
            author: "newGuy",
            url: "suchanewsite.com",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
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
            title: "newBlog123",
            author: "newGuy",
            url: "suchanewsite.com",
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDb()

        const addedBlog = blogsAtTheEnd.find(blog => blog.title === newBlog.title);

        assert.strictEqual(addedBlog.likes, 0)

    })

    test("a blog with url or title missing is not added", async () => {
        const missingUrl = {
            title: "newBlog123",
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
            .set('Authorization', `Bearer ${token}`)
            .expect(400)


        await api
            .post('/api/blogs')
            .send(missingTitle)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        const blogsAtTheEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
    })

    test("deleting a single blog that user created", async () => {


        const newlyCreatedBlogJson = {
            title: "newBlog",
            author: "newGuy",
            url: "suchanewsite.com",
            likes:0
        }

        await api
            .post('/api/blogs')
            .send(newlyCreatedBlogJson)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)

        const newlyCreatedBlog = await Blog.findOne({title:newlyCreatedBlogJson.title})

        const blogsId = newlyCreatedBlog.toJSON().id

        await api
            .delete(`/api/blogs/${blogsId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtTheEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)



        const deleted = await Blog.findById(blogsId)

        assert(!deleted)

    })

    test("updating a single blog", async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        const firstBlog = response.body[0]

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
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        const updatedBlog = await Blog.findById(firstBlogsId)

        assert.strictEqual(updatedBlog.likes, updatedBlogJson.likes)

    })

})



after(async () => {
    await mongoose.connection.close()
})
