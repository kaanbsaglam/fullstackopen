const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const nameField = await page.getByTestId('name')
    await expect(nameField).toBeVisible()
    const passwordField = await page.getByTestId('password')
    await expect(passwordField).toBeVisible()
    const loginButton = await page.getByRole('button', { name: 'Log in' })
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Successfully logged in as mluukkai')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, "mluukkai", "wrongpw")
      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText('wrong username or password')
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, "This is a title1", "stefan", "dg.com")
        const blogs = await page.locator('.blog')
        const newBlog = await blogs.getByText("This is a title1")

        await expect(newBlog).toBeVisible()
        await expect(newBlog.getByRole('button', { name: 'view' })).toBeVisible()

        await newBlog.getByRole('button', { name: 'view' }).click()

        await expect(newBlog.getByRole('button', { name: 'hide' })).toBeVisible()
        await expect(newBlog.getByText('likes: ')).toBeVisible()
        await expect(newBlog.getByText('Matti Luukkainen')).toBeVisible()
        await expect(newBlog.getByRole('button', { name: 'like' })).toBeVisible()
      })

      describe('And blogs exist', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, "1title", "1author", "1url")
          await createBlog(page, "2title", "2author", "2url")
          await createBlog(page, "3title", "3author", "3url")
        })

        test('blogs can be liked', async ({ page }) => {
          const blogs = await page.locator('.blog')
          const firstblog = await blogs.getByText("1title")
          await firstblog.getByRole('button', { name: 'view' }).click()
          await firstblog.getByRole('button', { name: 'like' }).click()
          await expect(firstblog.getByText('1')).toBeVisible()
        })

        test('the user who added the blog can delete it', async ({ page }) => {
          const blogs = await page.locator('.blog')
          const second = await blogs.getByText("2title")
          page.on('dialog', async (dialog) => {
            await dialog.accept();
          });
          await second.getByRole('button', { name: 'view' }).click()
          await second.getByRole('button', { name: 'remove' }).click()
          await expect(blogs.getByText('2title')).not.toBeVisible()
        })
        test('user who hasnt added the blog cannot see remove button', async ({ page, request }) => {
          await request.post('http://localhost:5173/api/users', {
            data: {
              name: 'mr2nd',
              username: 'second',
              password: '222'
            }
          })
          await page.getByRole('button', { name: "logout" }).click()
          await loginWith(page, 'second', '222')
          const blogs = await page.locator('.blog')
          const thirdBlog = await blogs.getByText('3title')
          await thirdBlog.getByRole('button', { name: 'view' }).click()
          await expect(thirdBlog.getByText('Matti Luukkainen')).toBeVisible()
          await expect(thirdBlog.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are arranged in order of likes', async ({ page }) => {
          
          const blogs = page.locator('.blog');
          console.log(await blogs.allTextContents())
          await blogs.getByText('3title').getByRole('button', { name: 'view' }).click();
          await blogs.getByText('3title').getByRole('button', { name: 'like' }).click();
          await blogs.getByText('3title').getByRole('button', { name: 'like' }).click();
          await blogs.getByText('3title').getByRole('button', { name: 'hide' }).click()
          await blogs.getByText('1title').getByRole('button', { name: 'view' }).click();
          await blogs.getByText('1title').getByRole('button', { name: 'like' }).click();
          await blogs.getByText('1title').getByRole('button', { name: 'hide' }).click();

          // i should definitely change this to not depend on view buttons location
          const blogTitles = await blogs.allTextContents();
          const expectedOrder = [
            '3title 3authorview',
            '1title 1authorview',
            '2title 2authorview'
          ];
          for (let i = 0; i < expectedOrder.length; i++) {
            expect(blogTitles[i]).toContain(expectedOrder[i]);
          }
        })
      })
    })
  })
})