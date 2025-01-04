import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('BlogForm calls onSubmit with correct details when a new blog is created', async () => {
  const createNewBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createNewBlog={createNewBlog} />)

  const titleInput = document.querySelector('.titleInput')
  const authorInput = document.querySelector('.authorInput')
  const urlInput = document.querySelector('.urlInput')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'free the frail')
  await user.type(authorInput, 'jpegmafia')
  await user.type(urlInput, 'cornballs.com')

  await user.click(createButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0]).toEqual({
    title: 'free the frail',
    author: 'jpegmafia',
    url: 'cornballs.com'
  })
})