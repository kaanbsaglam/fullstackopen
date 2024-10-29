



const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    let maxIndex = 0
    for (let i = 1; i < blogs.length; i++){
        if(blogs[i].likes > blogs[maxIndex].likes){
            maxIndex = i
        }
    }
    return {
        title: blogs[maxIndex].title,
        author: blogs[maxIndex].author,
        likes: blogs[maxIndex].likes,
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null

    const authorBlogs = {}
    blogs.forEach(blog => {
        authorBlogs[blog.author] = (authorBlogs[blog.author] || 0) + 1 // we could do the same trick with reduce
    });

    let maxAuthor = {author: "", blogs:-1}
    for(const author in authorBlogs) {
        if(authorBlogs[author] > maxAuthor.blogs){
            maxAuthor = {author:author, blogs:authorBlogs[author]}
        }
    }

    return maxAuthor
}

const mostLiked = (blogs) => {
    if(blogs.length === 0) return null // dont know what the actual program needs to do in these cases actually

    const likeCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + blog.likes
        return counts
    },{})

    // we cant just use reduce on an object, first we need to create an array out of that obj
    // i need to take some time to figure out how exactly javascript is doing these transformation
    // and whether or not i should avoid it in performance sensitive places
    const maxLiked = Object.entries(likeCounts).reduce((max,[author,likes]) => {
        return likes > (max.likes || -1) ? {author:author, likes:likes} : max;
    }, {})
    return maxLiked
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}