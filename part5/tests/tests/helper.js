
const loginWith = async (page, username, password) => {
  await page.getByTestId('name').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'create new blog'}).click()
  await page.locator('.titleInput').fill(title)
  await page.locator('.authorInput').fill(author)
  await page.locator('.urlInput').fill(url)
  await page.getByRole('button', {name:'create'}).click()
  await page.locator(".blog").getByText(title).waitFor()
}
export { loginWith , createBlog}