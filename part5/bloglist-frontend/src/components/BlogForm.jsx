const BlogForm = (
  {
    addNewBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange
  }
) => {
  return (
    <form onSubmit={addNewBlog}>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthorChange} /> 
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>

    </form>
  )
}

export default BlogForm