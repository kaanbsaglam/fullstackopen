import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('Displays title and author but not url and likes by default', ()=> {
  const blog = {
    title: 'testing by rocky',
    author: 'asap rocky',
    url: 'vivo.com',
    likes: 13345,
    user: { id: '456465', name: 'kaann' }
  }

  render(<Blog blog={blog}> </Blog>)
  const title =  screen.getByText(/testing by rocky/i)
  const author = screen.getByText(/asap rocky/i)
  expect(screen.queryByText(/vivo.com/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/13345/i)).not.toBeInTheDocument()
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('Displays url and likes after show button is clicked', async () => {

  const blog = {
    title: 'testing by rocky',
    author: 'asap rocky',
    url: 'vivo.com',
    likes: 13345,
    user: { id: '456465', name: 'kaann' }
  }

  const mockUpdate = vi.fn()
  const mockRemove = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove}></Blog>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('vivo.com')).toBeInTheDocument()
  expect(screen.getByText('likes: 13345')).toBeInTheDocument()
  

})


test('If like button is clicked twice, function recieved by props is called', async () => {

  const blog = {
    title: 'testing by rocky',
    author: 'asap rocky',
    url: 'vivo.com',
    likes: 13345,
    user: { id: '456465', name: 'kaann' }
  }

  const mockUpdate = vi.fn()
  const mockRemove = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove}></Blog>
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText("like")

  await user.click(likeButton)
  await user.click(likeButton)
  
  expect(mockUpdate.mock.calls).toHaveLength(2)
  

})