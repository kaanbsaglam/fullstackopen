const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogsZero = []

const blogsOne = [{
    _id: '123321',
    title: 'best post eva',
    author: 'me lol',
    url: 'http://yo.com',
    likes:200,
    __v: 0
}]

const blogsMultiple = [{
    _id: '5a422aa71b54a67623d17f8',
    title: 'Go To Statement Cnsidered Harmful',
    author: 'Edsger W. Dijktra',
    url: 'https://homepages.wi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes:10,
    __v: 0
},
{
    _id: '5a422aa71b54a67624d17f8',
    title: 'Go To Statement Cnsidered Harmful',
    author: 'me lol',
    url: 'https://homepages.cwi.nl/~stormteaching/reader/Dijkstra68.pdf',
    likes:20,
    __v: 0
},
{
    _id: '123321',
    title: 'best post eva',
    author: 'me lol',
    url: 'http://yo.com',
    likes:200,
    __v: 0
}]

const blogsMultiple2 = [{
    _id: '5a422aa71b54a67623d17f8',
    title: 'Go To Statement Cnsidered Harmful',
    author: 'Edsger W. Dijktra',
    url: 'https://homepages.wi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes:10,
    __v: 0
},
{
    _id: '5a422aa71b54a67624d17f8',
    title: 'Go To Statement Cnsidered Harmful',
    author: 'me lol',
    url: 'https://homepages.cwi.nl/~stormteaching/reader/Dijkstra68.pdf',
    likes:20,
    __v: 0
},
{
    _id: '123321',
    title: 'best post eva',
    author: 'me lol',
    url: 'http://yo.com',
    likes:200,
    __v: 0
},
{
    _id: '123',
    title: 'best post eva',
    author: 'not me',
    url: 'http://ayyo.com',
    likes:500,
    __v: 0
},
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes(blogsZero), 0)
    })

    test('when list has only one blog, total likes are equal to the like count of that blog', () => {
        assert.strictEqual(listHelper.totalLikes(blogsOne), 200)
    })

    test('of list of multiple blogs is calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(blogsMultiple), 230)
    })
})

describe('favorite blog', () => {


    test('of empty list is null', () => {
        assert.strictEqual(listHelper.favoriteBlog(blogsZero), null)
    })

    test('of list with one value is that blog', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogsOne),
            {
            title: "best post eva",
            author:"me lol",
            likes:200
            }    
        )}
    )
    test('of list containing multiple blogs is calculated right', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogsMultiple),
            {
            title: "best post eva",
            author:"me lol",
            likes:200
            }    
        )}
    )
})

describe('author with most blogs', () => {
    test('of empty list is null', () => {
        assert.strictEqual(listHelper.mostBlogs(blogsZero), null)
    })

    test('of list with one blog is the author of that sole blog with blogcount of 1', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogsOne),{
            author:"me lol",
            blogs: 1
        })
    })

    test('of list with multiple blogs is calculated right', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogsMultiple), {
            author:"me lol",
            blogs:2
        })
    })
})


describe('author with most total likes on their posts', () => {
    test('of empty list is null', () => {
        assert.strictEqual(listHelper.mostLiked(blogsZero), null)
    })

    test('of list with one blog is the author of that sole blog', () => {
        assert.deepStrictEqual(listHelper.mostLiked(blogsOne),{
            author:"me lol",
            likes: 200
        })
    })

    test('of list with multiple blogs is calculated right', () => {
        assert.deepStrictEqual(listHelper.mostLiked(blogsMultiple), {
            author:"me lol",
            likes:220
        })
    })

    test('of another, bigger list with multiple blogs is calculated right', () => {
        assert.deepStrictEqual(listHelper.mostLiked(blogsMultiple2), {
            author:"not me",
            likes:500
        })
    })
})